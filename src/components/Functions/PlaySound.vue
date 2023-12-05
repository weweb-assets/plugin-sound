<template>
    <div>
        <wwEditorInputRow label="Sound ID" type="query" :model-value="id" bindable @update:modelValue="setid" />
        <wwEditorInputRow
            required
            :model-value="options"
            type="object"
            label="Options"
            placeholder="Enter play options"
            bindable
            small
            @update:modelValue="setOptions"
        />
        {{ soundInstancesOptions }}
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
        options() {
            return this.args.options;
        },
        soundInstancesOptions() {
            console.log(this.plugin);
            return this.plugin.sounds.map(soundInstance => ({
                label: soundInstance.label,
                value: soundInstance.id,
            }));
            // return this.plugin.sounds.map(soundInstance => ({
            //     label: soundInstance.label,
            //     value: soundInstance.id,
            // }));
        },
    },
    methods: {
        setid(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setOptions(options) {
            this.$emit('update:args', { ...this.args, options });
        },
    },
    mounted() {
        console.log('TOTO', this.plugin, this.args);
    },
};
</script>
