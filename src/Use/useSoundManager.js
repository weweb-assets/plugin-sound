import { ref, reactive } from 'vue';
import { useSound } from '@vueuse/sound';

export function useSoundManager() {
    const soundInstances = reactive({});
    const sounds = ref({});

    const loadSound = ({ label, src }) => {
        const id = wwLib.wwUtils.getUid();

        const soundInstance = useSound(src, {
            onload: () => {
                soundInstances[id] = soundInstance;
                sounds.value[id] = {
                    id,
                    label,
                    isPlaying: ref(false),
                    totalTime: ref(soundInstance.sound.duration()),
                    currentTime: ref(0),
                    currentTimePercent: ref(0),
                };
                console.log(`Sound ${id} loaded`, { soundInstance, sounds });
            },
            onloaderror: (id, error) => {
                console.error(`Load error for sound ${id}:`, error);
            },
        });

        if (!soundInstance) {
            throw new Error(`Failed to load sound: ${id}`);
        }

        return id;
    };

    const updateSoundProperties = async id => {
        if (!soundInstances[id]) {
            throw new Error(`Sound not found: ${id}`);
        }

        const sound = soundInstances[id];
        const soundInfo = sounds.value[id];

        soundInfo.soundInfo = sound;
        soundInfo.totalTime.value = sound.duration;
        soundInfo.currentTime.value = sound.currentTime;
        soundInfo.currentTimePercent.value = (sound.currentTime / sound.duration) * 100;
    };

    const unloadSound = async id => {
        if (!soundInstances[id]) {
            throw new Error(`Sound not found: ${id}`);
        }
        delete soundInstances[id];
        delete sounds.value[id];
    };

    const playSound = async ({ id, playOptions = {} }) => {
        const sound = soundInstances[id];
        if (sound) {
            const { play } = sound;
            play(playOptions);
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    };

    return {
        sounds,
        loadSound,
        updateSoundProperties,
        unloadSound,
        playSound,
    };
}
