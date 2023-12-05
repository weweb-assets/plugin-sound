<template>
    <div>
        <wwEditorInputRow
            label="Sound ID"
            type="query"
            :model-value="soundId"
            bindable
            @update:modelValue="setSoundId"
        />
        <wwEditorInputRow
            label="Sound Source"
            type="query"
            :model-value="soundSrc"
            bindable
            @update:modelValue="setSoundSrc"
        />
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    computed: {
        soundId() {
            return this.args.soundId;
        },
        soundSrc() {
            return this.args.soundSrc;
        },
    },
    methods: {
        setSoundId(newId) {
            this.$emit('update:args', { ...this.args, soundId: newId });
        },
        setSoundSrc(newSrc) {
            this.$emit('update:args', { ...this.args, soundSrc: newSrc });
        },
    },
};
</script>
