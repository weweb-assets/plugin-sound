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
        <wwEditorFormRow label="Playback Rate">
            <div class="flex items-center">
                <wwEditorInputRow
                    label="Volume"
                    type="number"
                    :model-value="volume"
                    bindable
                    @update:modelValue="setVolume"
                />
                <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="volumeHelp" />
            </div>
        </wwEditorFormRow>
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
    data() {
        return {
            volumeHelp: `The volume is a number between 0 and 1. 0 is silent, 0.5 is half volume, 1 is full volume.`,
        };
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
