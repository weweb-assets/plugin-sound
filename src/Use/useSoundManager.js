import { ref, reactive, watch, toRaw } from 'vue';
import { Howl } from 'howler';

export function useSoundManager(pluginId) {
    const soundInstances = reactive({});
    const sounds = ref({});

    const loadSound = ({ label, src }) => {
        const id = wwLib.wwUtils.getUid();
        const soundInstance = new Howl({
            src: [src],
            onload: () => {
                soundInstances[id] = soundInstance;
                sounds.value[id] = {
                    id,
                    label,
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
            // Add other relevant events here
        });

        return id;
    };

    const updateSoundProperties = id => {
        const sound = soundInstances[id];
        const soundInfo = sounds.value[id];
        soundInfo.isPlaying.value = sound.playing();
        soundInfo.totalTime.value = sound.duration();
        soundInfo.currentTime.value = sound.seek();
        soundInfo.currentTimePercent.value = (sound.seek() / sound.duration()) * 100;
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
            wwLib.wwVariable.updateValue(`${pluginId}-sounds`, toRaw(newSounds));
        },
        { deep: true }
    );

    return { sounds, loadSound, unloadSound, playSound, updateSoundProperties };
}
