import { ref, reactive } from 'vue';
import { useSound } from '@vueuse/sound';

export default {
    soundInstances: reactive({}),
    sounds: ref({}),

    async onLoad(settings) {
        console.log('Sound plugin loaded 🔊', this);
    },

    async loadSound({ label, src, options = {} }) {
        const soundInstance = useSound(src, {
            ...options,
            onplay: () => this.updateSoundProperties(id),
            onpause: () => this.updateSoundProperties(id),
            onstop: () => this.updateSoundProperties(id),
            onend: () => this.updateSoundProperties(id),
            onload: () => console.log('Sound loaded', id),
            onloaderror: (id, error) => console.error('Load error', id, error),
            onplayerror: (id, error) => console.error('Play error', id, error),
        });

        if (!soundInstance) {
            throw new Error(`Failed to load sound: ${id}`);
        }

        const id = wwLib.wwUtils.getUid();

        this.soundInstances[id] = soundInstance;
        this.sounds.value[id] = {
            id,
            label,
            isPlaying: ref(false),
            totalTime: ref(0),
            currentTime: ref(0),
            currentTimePercent: ref(0),
        };

        console.log('loadSound', label, src, soundInstance);

        return id;
    },

    async updateSoundProperties(id) {
        if (!this.soundInstances[id]) {
            throw new Error(`Sound not found: ${id}`);
        }

        const sound = this.soundInstances[id];
        const soundInfo = this.sounds.value[id];

        soundInfo.soundInfo = sound;
        soundInfo.totalTime.value = sound.duration;
        soundInfo.currentTime.value = sound.currentTime;
        soundInfo.currentTimePercent.value = (sound.currentTime / sound.duration) * 100;
    },

    async unloadSound(id) {
        if (!this.soundInstances[id]) {
            throw new Error(`Sound not found: ${id}`);
        }
        delete this.soundInstances[id];
        delete this.sounds.value[id];
    },

    async playSound({ id, playOptions = {} }) {
        const sound = this.soundInstances[id];

        if (sound) {
            const { play } = sound;

            console.log('plauSound', id, sound);

            play(playOptions);
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    },

    async pauseSound(id) {
        const sound = this.soundInstances[id];
        if (sound) {
            const { pause } = sound;
            pause();
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    },

    async stopSound(id) {
        const sound = this.soundInstances[id];
        if (sound) {
            const { stop } = sound;
            stop();
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    },

    async setVolume(id, volume) {
        const sound = this.soundInstances[id];
        if (sound) {
            sound.volume = volume;
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    },

    async setPlaybackRate(id, rate) {
        const sound = this.soundInstances[id];
        if (sound) {
            sound.playbackRate = rate;
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    },

    async playSprite(id, spriteId) {
        const sound = this.soundInstances[id];
        if (sound) {
            const { play } = sound;
            play({ id: spriteId });
        } else {
            throw new Error(`Sound not found: ${id}`);
        }
    },
};
