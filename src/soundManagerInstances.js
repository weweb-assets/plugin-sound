import { ref, reactive, watch, toRaw, markRaw } from 'vue';
import { Howl } from 'howler';

const instances = {};

export function getSoundManagerInstance(pluginId) {
    if (!instances[pluginId]) {
        instances[pluginId] = createSoundManager(pluginId);
    }
    return instances[pluginId];
}

function createSoundManager(pluginId) {
    const soundInstances = reactive({});
    const sounds = ref({});

    const loadSound = (id, src, options, metadata) => {
        if (!src) {
            return Promise.reject(`Source is undefined for sound ID: ${id}`);
        }

        return new Promise((resolve, reject) => {
            try {
                const soundInstance = new Howl({
                    src: [src],
                    html5: true,
                    preload: true,
                    ...options,
                    onload: () => setupSoundInstance(id, soundInstance, options, metadata, resolve),
                    onloaderror: (id, error) => reject(error),
                    onplay: () => handleSoundPlay(id),
                    onpause: () => clearTimeInterval(id),
                    onstop: () => clearTimeInterval(id),
                    onend: () => clearTimeInterval(id),
                    onseek: () => updateSoundProperties(id),
                });
            } catch (error) {
                throw new Error(`Error loading sound: ${error}`);
                reject(error);
            }
        });
    };

    const handleSoundPlay = id => {
        startInterval(id);

        const soundInfo = sounds.value[id];

        if (id && soundInfo) {
            setupMediaSession(id, soundInfo.metadata);
        }
    };

    const unloadSound = id => {
        if (!soundInstances[id]) {
            throw new Error(`Sound not found: ${id}`);
        }

        soundInstances[id].unload();
        delete soundInstances[id];
        delete sounds.value[id];
    };

    const playSound = id => {
        const sound = soundInstances[id];
        const soundInfo = sounds.value[id];

        if (sound && soundInfo) {
            if (soundInfo.isPlaying) return;

            sound.play();
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    };

    const setupMediaSession = (id, metadata) => {
        if ('mediaSession' in navigator) {
            const { title, artist, album, artwork } = metadata;
            navigator.mediaSession.metadata = new MediaMetadata({
                title: title || 'Unknown Title',
                artist: artist || 'Unknown Artist',
                album: album || 'Unknown Album',
                artwork: artwork || [],
            });

            navigator.mediaSession.setActionHandler('play', () => playSound(id));
            navigator.mediaSession.setActionHandler('pause', () => pauseSound(id));
            navigator.mediaSession.setActionHandler('seekto', details => seekTo(id, details.seekTime));
            navigator.mediaSession.setActionHandler('previoustrack', () => seekTo(id, 0));
        }
    };

    const pauseSound = id => {
        const sound = soundInstances[id];
        if (sound) {
            sound.pause();
            clearTimeInterval(id);
        }
    };

    const seekTo = (id, time) => {
        const sound = soundInstances[id];

        if (sound) {
            console.log('seeking to', time, parseInt(time));
            sound.seek(parseInt(time));
            updateSoundProperties(id);
        }
    };

    const stopSound = id => {
        const sound = soundInstances[id];
        if (sound) {
            sound.stop();
            clearTimeInterval(id);
        }
    };

    const muteSound = (id, mute) => {
        const sound = soundInstances[id];
        if (sound) {
            sound.mute(mute);
        }
    };

    const setVolume = (id, volume) => {
        const sound = soundInstances[id];

        if (sound) {
            sound.volume(parseInt(volume));
        }
    };

    const fadeSound = (id, from, to, duration) => {
        const sound = soundInstances[id];
        if (sound) {
            sound.fade(parseInt(from), parseInt(to), parseInt(duration));
        }
    };

    const setRate = (id, rate) => {
        const sound = soundInstances[id];
        if (sound) {
            sound.rate(parseInt(rate));
        }
    };

    const setLoop = (id, loop) => {
        const sound = soundInstances[id];
        if (sound) {
            sound.loop(loop);
        }
    };

    const setupSoundInstance = (id, soundInstance, options, metadata, resolve) => {
        soundInstances[id] = markRaw(soundInstance);
        sounds.value[id] = createSoundObject(id, soundInstance, options, metadata);
        updateSoundProperties(id);
        resolve(id);
    };

    const createSoundObject = (id, soundInstance, options, metadata) => ({
        id,
        isPlaying: ref(false),
        totalTime: ref(soundInstance.duration()),
        currentTime: ref(0),
        currentTimePercent: ref(0),
        metadata,
        options,
    });

    const startInterval = id => {
        soundInstances[id].intervalId = setInterval(() => updateSoundProperties(id), 333);
    };

    const clearTimeInterval = id => {
        const sound = soundInstances[id];
        if (sound && sound.intervalId) {
            clearInterval(sound.intervalId);
            sound.intervalId = null;
        }
        updateSoundProperties(id);
    };

    const updateSoundProperties = id => {
        const sound = soundInstances[id];
        if (sound) {
            sounds.value[id] = assignSoundProperties(sounds.value[id], sound);
        }
    };

    const assignSoundProperties = (soundInfo, sound) => ({
        ...soundInfo,
        isPlaying: sound.playing(),
        totalTime: sound.duration(),
        currentTime: sound.seek(),
        currentTimePercent: (sound.seek() / sound.duration()) * 100,
    });

    const convertToRawSounds = newSounds =>
        Object.keys(newSounds).reduce((acc, key) => {
            const sound = newSounds[key];
            acc[key] = convertSoundToRaw(sound);
            return acc;
        }, {});

    const convertSoundToRaw = sound => ({
        id: sound.id,
        isPlaying: toRaw(sound.isPlaying),
        totalTime: toRaw(sound.totalTime),
        currentTime: toRaw(sound.currentTime),
        currentTimePercent: toRaw(sound.currentTimePercent),
        metadata: toRaw(sound.metadata),
        options: toRaw(sound.options),
    });

    watch(sounds, newSounds => wwLib.wwVariable.updateValue(`${pluginId}-sounds`, convertToRawSounds(newSounds)), {
        deep: true,
    });

    return {
        sounds,
        loadSound,
        unloadSound,
        playSound,
        pauseSound,
        stopSound,
        seekTo,
        muteSound,
        setVolume,
        fadeSound,
        setRate,
        setLoop,
        updateSoundProperties,
    };
}
