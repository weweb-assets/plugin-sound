import { ref, reactive, watch, toRaw } from 'vue';
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

            soundInstance.play();
        });
    };

    const setupSoundInstance = (id, soundInstance, resolve) => {
        soundInstances[id] = soundInstance;
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

    const unloadSound = id => {
        soundInstances[id].unload();
        delete soundInstances[id];
        delete sounds.value[id];
    };

    const playSound = ({ id, playOptions = {} }) => {
        const sound = soundInstances[id];
        sound.play(playOptions);
    };

    watch(sounds, newSounds => wwLib.wwVariable.updateValue(`${pluginId}-sounds`, convertToRawSounds(newSounds)), {
        deep: true,
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
    });

    return { sounds, loadSound, unloadSound, playSound, updateSoundProperties };
}
