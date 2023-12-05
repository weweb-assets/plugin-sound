<template>
    <div>
        <wwEditorInputRow
            label="Sound label"
            type="query"
            :model-value="label"
            bindable
            @update:modelValue="setlabel"
        />
        <wwEditorInputRow label="Sound source" type="query" :model-value="src" bindable @update:modelValue="setsrc" />
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
        label() {
            return this.args.label;
        },
        src() {
            return this.args.src;
        },
        options() {
            return this.args.options;
        },
    },
    methods: {
        setlabel(label) {
            this.$emit('update:args', { ...this.args, label });
        },
        setsrc(src) {
            this.$emit('update:args', { ...this.args, src });
        },
        setOptions(options) {
            this.$emit('update:args', { ...this.args, options });
        },
    },
};
</script>
