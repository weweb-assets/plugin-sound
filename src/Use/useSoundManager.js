import { ref, reactive } from 'vue';
import { useSound } from '@vueuse/sound';

export function useSoundManager() {
    const soundInstances = reactive({});
    const sounds = ref({});

    const loadSound = async ({ label, src }) => {
        const id = wwLib.wwUtils.getUid();

        const soundInstance = useSound(src);
        if (!soundInstance) {
            throw new Error(`Failed to load sound: ${id}`);
        }

        soundInstances[id] = soundInstance;
        sounds.value[id] = {
            id,
            label,
            isPlaying: ref(false),
            totalTime: ref(0),
            currentTime: ref(0),
            currentTimePercent: ref(0),
        };

        console.log('Sound loaded', id, soundInstance);

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
