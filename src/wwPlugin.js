import { useSound } from '@vueuse/sound';

export default {
    soundInstances: {},

    async onLoad(settings) {
        console.log('Sound plugin loaded 🔊', this);
    },

    async loadSound({ id, src, options }) {
        this.soundInstances[id] = useSound(src, options);
        if (!this.soundInstances[id]) {
            throw new Error(`Failed to load sound: ${id}`);
        }

        console.log('Sound loaded', this.soundInstances);
    },

    async unloadSound(id) {
        if (!this.soundInstances[id]) {
            throw new Error(`Sound not found: ${id}`);
        }
        delete this.soundInstances[id];
    },

    async playSound(id, playOptions = {}) {
        const sound = this.soundInstances[id];
        if (sound) {
            const { play } = sound;
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
