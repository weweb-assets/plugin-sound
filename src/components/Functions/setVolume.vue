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
            label="Volume"
            type="range"
            :model-value="volume"
            min="0"
            max="1"
            step="0.1"
            bindable
            @update:modelValue="setVolume"
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
        volume() {
            return this.args.volume;
        },
    },
    methods: {
        setId(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setVolume(volume) {
            this.$emit('update:args', { ...this.args, volume });
        },
    },
};
</script>
