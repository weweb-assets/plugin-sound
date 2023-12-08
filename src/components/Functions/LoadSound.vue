<template>
    <div>
        <wwEditorInputRow label="Sound ID" type="query" :model-value="id" bindable @update:modelValue="setid" />
        <div v-if="idNotValid" class="error label-3">Sound ID already exist.</div>
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
import { useSoundManager } from '../../Use/useSoundManager';

export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    setup(props) {
        const { sounds } = useSoundManager(props.plugin.id);

        console.log(props.plugin);

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
