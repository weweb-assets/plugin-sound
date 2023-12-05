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
        <wwEditorInputRow
            required
            :model-value="options"
            type="object"
            label="Options"
            placeholder="Enter sound options"
            bindable
            small
            @update:modelValue="setOptions"
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
        options() {
            return this.args.options;
        },
    },
    methods: {
        setSoundId(soundId) {
            this.$emit('update:args', { ...this.args, soundId });
        },
        setSoundSrc(soundSrc) {
            this.$emit('update:args', { ...this.args, soundSrc });
        },
        setOptions(options) {
            this.$emit('update:args', { ...this.args, options });
        },
    },
};
</script>
