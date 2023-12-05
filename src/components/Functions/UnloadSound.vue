<template>
    <div>
        <wwEditorInputRow label="Sound ID" type="text" :model-value="soundId" @update:modelValue="setSoundId" />
        <wwEditorInputRow label="Sound Source" type="text" :model-value="soundSrc" @update:modelValue="setSoundSrc" />
    </div>
</template>

<script>
export default {
    props: {
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    data() {
        return {
            soundId: '',
            soundSrc: '',
        };
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
