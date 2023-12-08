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
import { computed } from 'vue';
import { getSoundManagerInstance } from '../../soundManagerInstances';

export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    setup(props) {
        const { sounds } = getSoundManagerInstance(props.plugin.id);

        const soundInstancesOptions = computed(() =>
            Object.values(sounds.value).map(sound => ({
                label: sound.id,
                value: sound.id,
            }))
        );

        return {
            sounds,
            soundInstancesOptions,
        };
    },
    computed: {
        id() {
            return this.args.id;
        },
        options() {
            return this.args.options;
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
