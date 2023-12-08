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
        <wwEditorFormRow label="From Volume">
            <div class="flex items-center">
                <wwEditorInputRow
                    label="From Volume"
                    type="number"
                    :model-value="fromVolume"
                    bindable
                    @update:modelValue="setFromVolume"
                />
                <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="fromFade" />
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="To Volume">
            <div class="flex items-center">
                <wwEditorInputRow
                    label="To Volume"
                    type="number"
                    :model-value="fromVolume"
                    bindable
                    @update:modelValue="setFromVolume"
                />
                <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="toFade" />
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Duration">
            <div class="flex items-center">
                <wwEditorInputRow
                    label="Duration"
                    type="number"
                    :model-value="duration"
                    bindable
                    @update:modelValue="setDuration"
                />
                <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="durationFade" />
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
            fromFade: `The volume where the fade will start. The volume is a number between 0 and 1. 0 is silent, 0.5 is half volume, 1 is full volume.`,
            toFade: `The volume where the fade will end. The volume is a number between 0 and 1. 0 is silent, 0.5 is half volume, 1 is full volume.`,
            durationFade: `The time in milliseconds that the fade will take to complete`,
        };
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
