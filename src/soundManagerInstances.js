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
        const soundInstance = new Howl({
            src: [src],
            onload: () => {
                soundInstances[id] = soundInstance;
                sounds.value[id] = {
                    id,
                    isPlaying: ref(false),
                    totalTime: ref(soundInstance.duration()),
                    currentTime: ref(0),
                    currentTimePercent: ref(0),
                };

                updateSoundProperties(id);
            },
            onplay: () => updateSoundProperties(id),
            onend: () => updateSoundProperties(id),
            onpause: () => updateSoundProperties(id),
            onstop: () => updateSoundProperties(id),
        });

        return id;
    };

    const updateSoundProperties = id => {
        const sound = soundInstances[id];
        const soundInfo = sounds.value[id];
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

    watch(
        sounds,
        newSounds => {
            const rawSounds = Object.keys(newSounds).reduce((acc, key) => {
                const sound = newSounds[key];

                console.log('sound', sound);

                acc[key] = {
                    id: sound.id,
                    isPlaying: toRaw(sound.isPlaying),
                    totalTime: toRaw(sound.totalTime),
                    currentTime: toRaw(sound.currentTime),
                    currentTimePercent: toRaw(sound.currentTimePercent),
                };
                return acc;
            }, {});
            wwLib.wwVariable.updateValue(`${pluginId}-sounds`, rawSounds);
        },
        { deep: true }
    );

    return { sounds, loadSound, unloadSound, playSound, updateSoundProperties };
}
