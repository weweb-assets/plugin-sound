<template>
    <div>
        <wwEditorInputRow
            label="Sound"
            type="select"
            :model-value="id"
            placeholder="Select a sound"
            :options="soundInstancesOptions"
            bindable
            @update:modelValue="setid"
        />
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
    </div>
</template>

<script>
import { useSoundManager } from '../../Use/useSoundManager';

export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    setup(props) {
        const { sounds } = useSoundManager(props.plugin.id);

        return {
            sounds,
        };
    },
    computed: {
        id() {
            return this.args.id;
        },
        options() {
            return this.args.options;
        },
        soundInstancesOptions() {
            console.log('TOTO', this);

            return Object.values(this.sounds.value).map(sound => ({
                label: sound.label,
                value: sound.id,
            }));
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
};
</script>
