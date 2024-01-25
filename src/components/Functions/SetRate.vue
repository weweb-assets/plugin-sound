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
        <wwEditorFormRow>
            <div class="flex items-center">
                <wwEditorInputRow
                    label="Playback Rate"
                    type="number"
                    :model-value="rate"
                    bindable
                    @update:modelValue="setRate"
                />
                <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="playRateHelp" />
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
            playRateHelp: `The playback rate is the speed at which the sound is played. 1 is the normal speed, 0.5 is half the normal speed, 2 is twice the normal speed, etc.`,
        };
    },
    computed: {
        id() {
            return this.args.id;
        },
        rate() {
            return this.args.rate;
        },
    },
    methods: {
        setId(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setRate(rate) {
            this.$emit('update:args', { ...this.args, rate });
        },
    },
};
</script>
