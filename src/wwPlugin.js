import { useSoundManager } from './Use/useSoundManager';

export default {
    soundManager: null,

    async onLoad(settings) {
        this.soundManager = useSoundManager();

        console.log('Sound plugin loaded 🔊', this);
    },

    async loadSoundInPlugin({ label, src }) {
        const id = await this.soundManager.loadSound({ label, src });
        return id;
    },

    async unloadSound(id) {
        await this.soundManager.unloadSound(id);
    },

    async playSound({ id, playOptions = {} }) {
        await this.soundManager.playSound({ id, playOptions });
    },
};
