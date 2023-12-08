<template>
    <div>
        <wwEditorInputRow
            label="Sound ID"
            type="select"
            :model-value="id"
            :options="soundOptions"
            bindable
            @update:modelValue="setId"
        />
        <wwEditorInputRow
            label="From Volume"
            type="range"
            :model-value="fromVolume"
            min="0"
            max="1"
            step="0.1"
            bindable
            @update:modelValue="setFromVolume"
        />
        <wwEditorInputRow
            label="To Volume"
            type="range"
            :model-value="toVolume"
            min="0"
            max="1"
            step="0.1"
            bindable
            @update:modelValue="setToVolume"
        />
        <wwEditorInputRow
            label="Duration (ms)"
            type="number"
            :model-value="duration"
            min="0"
            bindable
            @update:modelValue="setDuration"
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

        const soundOptions = computed(() =>
            Object.values(sounds.value).map(sound => ({
                label: sound.id,
                value: sound.id,
            }))
        );

        return { soundOptions };
    },
    computed: {
        id() {
            return this.args.id;
        },
        fromVolume() {
            return this.args.fromVolume;
        },
        toVolume() {
            return this.args.toVolume;
        },
        duration() {
            return this.args.duration;
        },
    },
    methods: {
        setId(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setFromVolume(fromVolume) {
            this.$emit('update:args', { ...this.args, fromVolume });
        },
        setToVolume(toVolume) {
            this.$emit('update:args', { ...this.args, toVolume });
        },
        setDuration(duration) {
            this.$emit('update:args', { ...this.args, duration });
        },
    },
};
</script>
