import { ref, reactive } from 'vue';
import { Howl } from 'howler';

export function useSoundManager() {
    const soundInstances = reactive({});
    const sounds = ref({});

    const loadSound = ({ label, src }) => {
        const id = wwLib.wwUtils.getUid();
        const soundInstance = new Howl({
            src: [src],
            onload: () => {
                sounds.value[id] = {
                    id,
                    label,
                    isPlaying: ref(false),
                    totalTime: ref(soundInstance.duration()),
                    currentTime: ref(0),
                    currentTimePercent: ref(0),
                };
            },
        });

        soundInstances[id] = soundInstance;
        return id;
    };

    const updateSoundProperties = id => {
        const sound = soundInstances[id];
        const soundInfo = sounds.value[id];
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

    return { sounds, loadSound, unloadSound, playSound };
}
