export default {
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
            },
        ],
    },
    variables: [
        { name: 'Sounds', value: 'sounds', type: 'object', defaultValue: null },
    actions: [
        {
            name: 'Load sound',
            code: 'loadSound',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/LoadSound.vue'),
            getIsValid({ sound_id, soundSrc }) {
                return !!sound_id && !!soundSrc;
            },
            /* wwEditor:end */
        },
    ],
};
