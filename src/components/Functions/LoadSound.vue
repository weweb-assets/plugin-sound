<template>
    <div>
        <wwEditorInputRow label="Sound ID" type="query" :model-value="id" bindable @update:modelValue="setid" />
        <wwEditorInputRow label="Sound Source" type="query" :model-value="src" bindable @update:modelValue="setsrc" />
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
        id() {
            return this.args.id;
        },
        src() {
            return this.args.src;
        },
        options() {
            return this.args.options;
        },
    },
    methods: {
        setid(id) {
            this.$emit('update:args', { ...this.args, id });
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
