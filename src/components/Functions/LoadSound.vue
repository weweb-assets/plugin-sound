<template>
    <div>
        <wwEditorFormRow label="Sound ID">
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
        <div class="flex items-center">
            <wwEditorInputRow
                required
                :model-value="options"
                type="object"
                label="Options"
                bindable
                small
                @update:modelValue="setOptions"
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="soundIdHelp" />
        </div>
        <div class="flex items-center">
            <wwEditorInputRow
                required
                :model-value="metadata"
                type="object"
                label="Metadata"
                bindable
                small
                @update:modelValue="setMetadata"
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="soundIdHelp" />
        </div>
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
            soundOptionsHelp: `The available options for the sound instance: <a href="https://github.com/goldfire/howler.js?tab=readme-ov-file#options" target="_blank">Sound documentation</a>`,
            soundMediaHelp: `A title, an artist, an album and a cover as an array: <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata" target="_blank">MediaMetadata documentation</a>`,
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
        metadata() {
            return this.args.metadata;
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
        setMetadata(metadata) {
            this.$emit('update:args', { ...this.args, metadata });
        },
    },
};
</script>

<style lang="scss" scoped>
.error {
    color: var(--ww-color-red-500);
}
</style>
