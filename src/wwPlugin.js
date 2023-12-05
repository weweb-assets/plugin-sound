import { ref } from 'vue';
import { useSound } from '@vueuse/sound';

export default {
    soundInstances: ref({}),
    sounds: ref({}),

    async onLoad(settings) {
        console.log('Sound plugin loaded 🔊', this);
    },

    // async loadSound({ label }) {
    //     const src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    //     // Minimal options for testing
    //     const options = {
    //         volume: 0.5,
    //         preload: true,
    //     };

    //     const id = wwLib.wwUtils.getUid();

    //     const soundInstance = useSound(src, {
    //         ...options,
    //         onplay: () => this.updateSoundProperties(id),
    //         onpause: () => this.updateSoundProperties(id),
    //         onstop: () => this.updateSoundProperties(id),
    //         onend: () => this.updateSoundProperties(id),
    //         onload: () => console.log('Sound loaded', id),
    //         onloaderror: (id, error) => console.error('Load error', id, error),
    //         onplayerror: (id, error) => console.error('Play error', id, error),
    //     });

    //     if (!soundInstance) {
    //         throw new Error(`Failed to load sound: ${id}`);
    //     }

    //     this.soundInstances.value[id] = soundInstance;
    //     this.sounds.value[id] = {
    //         id,
    //         label,
    //         isPlaying: ref(false),
    //         totalTime: ref(0),
    //         currentTime: ref(0),
    //         currentTimePercent: ref(0),
    //     };

    //     console.log('loadSound', label, src, soundInstance);

    //     return id;
    // },

    async loadSound() {
        const sound = new Howl({
            src: '/helix.mp3',
            volume: 0.5,
            onload: () => console.log('Sound loaded'),
            onloaderror: (id, error) => console.error('Load error', id, error),
            onplayerror: (id, error) => console.error('Play error', id, error),
        });

        sound.play();
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
