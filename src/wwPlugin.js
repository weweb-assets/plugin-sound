import { getSoundManagerInstance } from './soundManagerInstances';

export default {
    soundManager: null,

    async onLoad(settings) {
        this.soundManager = getSoundManagerInstance(this.id);
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
