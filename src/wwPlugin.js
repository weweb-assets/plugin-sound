import { ref } from 'vue';
import { useSound } from '@vueuse/sound';

export default {
    soundInstances: ref({}),
    sounds: ref({}),

    async onLoad(settings) {
        console.log('Sound plugin loaded 🔊', this);
    },

    async loadSound({ label, src }) {
        const id = wwLib.wwUtils.getUid();

        // const soundInstance = useSound(src);
        const [play, exposedData] = useSound(src);

        if (!soundInstance) {
            throw new Error(`Failed to load sound: ${id}`);
        }

        this.soundInstances.value[id] = exposedData;
        this.sounds.value[id] = {
            id,
            label,
            isPlaying: ref(false),
            totalTime: ref(0),
            currentTime: ref(0),
            currentTimePercent: ref(0),
        };

        console.log('loadSound', label, src, exposedData);

        return id;
    },

    async updateSoundProperties(id) {
        if (!this.soundInstances.value[id]) {
            throw new Error(`Sound not found: ${id}`);
        }

        const sound = this.soundInstances.value[id];
        const soundInfo = this.sounds.value[id];

        soundInfo.soundInfo = sound;
        soundInfo.totalTime.value = sound.duration;
        soundInfo.currentTime.value = sound.currentTime;
        soundInfo.currentTimePercent.value = (sound.currentTime / sound.duration) * 100;
    },

    async unloadSound(id) {
        if (!this.soundInstances.value[id]) {
            throw new Error(`Sound not found: ${id}`);
        }
        delete this.soundInstances.value[id];
        delete this.sounds.value[id];
    },

    async playSound({ id, playOptions = {} }) {
        const sound = this.soundInstances.value[id];

        if (sound) {
            const { play } = sound;

            console.log('plauSound', id, sound);

            play({ volume: ref(0.5) });
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    },
};
