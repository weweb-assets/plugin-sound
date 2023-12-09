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

    const loadSound = ({ id, src }) => {
        return new Promise((resolve, reject) => {
            const soundInstance = new Howl({
                src: [src],
                html5: true,
                volume: 0.2,
                onload: () => setupSoundInstance(id, soundInstance, resolve),
                onloaderror: (id, error) => reject(error),
                onplay: () => startInterval(id),
                onpause: () => clearTimeInterval(id),
                onstop: () => clearTimeInterval(id),
                onend: () => clearTimeInterval(id),
                onseek: () => updateSoundProperties(id),
            });
        });
    };

    const unloadSound = id => {
        soundInstances[id].unload();
        delete soundInstances[id];
        delete sounds.value[id];
    };

    async playSound({ id, playOptions = {} }) {
        const sound = this.soundInstances[id];
        if (sound) {
            sound.play(playOptions);

            if ('mediaSession' in navigator && this.sounds.value[id].metadata) {
                const { title, artist, album, artwork } = this.sounds.value[id].metadata;
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: title || 'Unknown Title',
                    artist: artist || 'Unknown Artist',
                    album: album || 'Unknown Album',
                    artwork: artwork || []
                });
            }
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    }


    const pauseSound = id => {
        const sound = soundInstances[id];
        if (sound) {
            sound.pause();
            clearTimeInterval(id);
        }
    };

    const stopSound = id => {
        const sound = soundInstances[id];
        if (sound) {
            sound.stop();
            clearTimeInterval(id);
        }
    };

    const seekTo = (id, time) => {
        const sound = soundInstances[id];
        if (sound) {
            sound.seek(time);
            updateSoundProperties(id);
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
            sound.volume(volume);
        }
    };

    const fadeSound = (id, from, to, duration) => {
        const sound = soundInstances[id];
        if (sound) {
            sound.fade(from, to, duration);
        }
    };

    const setRate = (id, rate) => {
        const sound = soundInstances[id];
        if (sound) {
            sound.rate(rate);
        }
    };

    const setLoop = (id, loop) => {
        const sound = soundInstances[id];
        if (sound) {
            sound.loop(loop);
        }
    };

    const setupSoundInstance = (id, soundInstance, resolve) => {
        soundInstances[id] = markRaw(soundInstance);
        sounds.value[id] = createSoundObject(id, soundInstance);
        updateSoundProperties(id);
        resolve(id);
    };

    const createSoundObject = (id, soundInstance) => ({
        id,
        isPlaying: ref(false),
        totalTime: ref(soundInstance.duration()),
        currentTime: ref(0),
        currentTimePercent: ref(0),
        metadata: ref(metadata || {}),
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
        const soundInfo = sounds.value[id];
        assignSoundProperties(soundInfo, sound);
    };

    const assignSoundProperties = (soundInfo, sound) => {
        soundInfo.isPlaying = sound.playing();
        soundInfo.totalTime = sound.duration();
        soundInfo.currentTime = sound.seek();
        soundInfo.currentTimePercent = (sound.seek() / sound.duration()) * 100;
    };

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
