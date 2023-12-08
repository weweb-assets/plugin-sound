import { useSoundManager } from './Use/useSoundManager';

export default {
    soundManager: null,

    async onLoad(settings) {
        this.soundManager = useSoundManager();
    },

    async loadSound({ id, src }) {
        return await this.soundManager.loadSound({ id, src });
    },

    async unloadSound(id) {
        await this.soundManager.unloadSound(id);
    },

    async playSound({ id, playOptions = {} }) {
        await this.soundManager.playSound({ id, playOptions });
    },
};
