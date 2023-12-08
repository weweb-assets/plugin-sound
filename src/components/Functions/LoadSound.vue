<template>
    <div>
        <wwEditorFormRow>
            <div class="flex items-center">
                <wwEditorInput
                    label="Sound ID"
                    placeholder="Enter an unique ID for the sound"
                    type="query"
                    :model-value="id"
                    @update:modelValue="setid"
                    bindable
                />
                <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="soundIdHelp" />
            </div>
        </wwEditorFormRow>
        <wwEditorInputRow label="Source" type="query" :model-value="src" bindable @update:modelValue="setsrc" />
        <wwEditorInputRow
            required
            :model-value="options"
            type="object"
            label="Options"
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
    data() {
        return {
            soundIdHelp: `The sound ID need to be unique for each loaded sound.`,
        };
    },
    setup(props) {
        const { sounds } = getSoundManagerInstance(props.plugin.id);

        const id = computed(() => props.args.id);

        const idNotValid = computed(() =>
            Object.values(sounds.value)
                .map(sound => sound.id)
                .includes(id.value)
        );

        return {
            id,
            idNotValid,
        };
    },
    computed: {
        src() {
            return this.args.src;
        },
        options() {
            return this.args.options;
        },
    },
    methods: {
        setid(id) {
            this.$emit('update:args', { ...this.args, id });
        },
        setsrc(src) {
            this.$emit('update:args', { ...this.args, src });
        },
        setOptions(options) {
            this.$emit('update:args', { ...this.args, options });
        },
    },
};
</script>

<style lang="scss" scoped>
.error {
    color: var(--ww-color-red-500);
}
</style>
