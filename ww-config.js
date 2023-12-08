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
    variables: [{ name: 'sounds', value: 'sounds', type: 'object', defaultValue: null }],
    actions: [
        {
            name: 'Load sound',
            code: 'loadSound',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/LoadSound.vue'),
            getIsValid({ id, src, idNotValid }) {
                return !!id && !!src && !idNotValid;
            },
            /* wwEditor:end */
        },
        {
            name: 'Unload sound',
            code: 'unloadSound',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/UnloadSound.vue'),
            getIsValid({ id }) {
                return !!id;
            },
            /* wwEditor:end */
        },
        {
            name: 'Play sound',
            code: 'playSound',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/PlaySound.vue'),
            getIsValid({ id }) {
                return !!id;
            },
            /* wwEditor:end */
        },
        {
            name: 'Pause sound',
            code: 'pauseSound',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/PauseSound.vue'),
            getIsValid({ id }) {
                return !!id;
            },
            /* wwEditor:end */
        },
    ],
};
