<template>
    <div>
        <wwEditorInputRow label="Sound ID" type="text" v-model="soundId" />
        <wwEditorInputRow label="Sound Source URL" type="text" v-model="soundSrc" />
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
    },
    data() {
        return {
            soundId: '',
            soundSrc: '',
        };
    },
    watch: {
        soundId(newId) {
            this.updateSoundConfig(newId, this.soundSrc);
        },
        soundSrc(newSrc) {
            this.updateSoundConfig(this.soundId, newSrc);
        },
    },
    methods: {
        updateSoundConfig(id, src) {
            if (id && src) {
                this.plugin.settings.soundInstance[id] = {
                    id: id,
                    src: src,
                    isPlayed: false,
                    totalTime: 0,
                    currentTime: 0,
                    currentTimePercent: 0,
                };
            }
        },
    },
};
</script>
