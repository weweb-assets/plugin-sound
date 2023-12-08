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
        <wwEditorInputRow label="Mute" type="onoff" :model-value="mute" bindable @update:modelValue="setMute" />
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
        mute() {
            return this.args.mute;
        },
    },
    methods: {
        setId(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setMute(mute) {
            this.$emit('update:args', { ...this.args, mute });
        },
    },
};
</script>
