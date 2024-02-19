<template>
    <wwEditorInputRow
        label="Sound ID"
        type="select"
        :model-value="id"
        :options="soundOptions"
        bindable
        @update:modelValue="setId"
    />
    <wwEditorInputRow
        label="Seek Time (seconds)"
        type="number"
        :model-value="time"
        bindable
        @update:modelValue="setTime"
    />
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
        time() {
            return this.args.time;
        },
    },
    methods: {
        setId(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setTime(time) {
            this.$emit('update:args', { ...this.args, time });
        },
    },
};
</script>
