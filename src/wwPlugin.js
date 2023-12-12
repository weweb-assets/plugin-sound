import { getSoundManagerInstance } from './soundManagerInstances';

export default {
    soundManager: null,

    async onLoad(settings) {
        this.soundManager = getSoundManagerInstance(this.id);
    },

    async loadSound({ id, src, metadata }) {
        return await this.soundManager.loadSound(id, src, metadata);
    },

    async unloadSound(id) {
        await this.soundManager.unloadSound(id);
    },

    async playSound(id, playOptions) {
        await this.soundManager.playSound({ id, playOptions });
    },

    async pauseSound(id) {
        await this.soundManager.pauseSound(id);
    },

    async stopSound(id) {
        await this.soundManager.stopSound(id);
    },

    async seekTo({ id, position }) {
        await this.soundManager.seekTo(id, position);
    },

    async muteSound({ id, mute }) {
        await this.soundManager.muteSound(id, mute);
    },

    async setVolume({ id, volume }) {
        await this.soundManager.setVolume(id, volume);
    },

    async fadeSound({ id, fromVolume, toVolume, duration }) {
        await this.soundManager.fadeSound(id, fromVolume, toVolume, duration);
    },

    async setRate({ id, rate }) {
        await this.soundManager.setRate(id, rate);
    },

    async setLoop({ id, loop }) {
        await this.soundManager.setLoop(id, loop);
    },
};
