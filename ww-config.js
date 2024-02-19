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
        {
            name: 'Stop sound',
            code: 'stopSound',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/StopSound.vue'),
            getIsValid({ id }) {
                return !!id;
            },
            /* wwEditor:end */
        },
        {
            name: 'Seek to time',
            code: 'seekTo',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/SeekTo.vue'),
            getIsValid({ id, time }) {
                return !!id && time != null;
            },
            /* wwEditor:end */
        },
        {
            name: 'Set volume',
            code: 'setVolume',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/SetVolume.vue'),
            getIsValid({ id, volume }) {
                return !!id && volume != null;
            },
            /* wwEditor:end */
        },
        {
            name: 'Mute sound',
            code: 'muteSound',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/MuteSound.vue'),
            getIsValid({ id }) {
                return !!id;
            },
            /* wwEditor:end */
        },
        {
            name: 'Fade sound',
            code: 'fadeSound',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/FadeSound.vue'),
            getIsValid({ id, fromVolume, toVolume, duration }) {
                return !!id && fromVolume != null && toVolume != null && duration != null;
            },
            /* wwEditor:end */
        },
        {
            name: 'Set playback rate',
            code: 'setRate',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/SetRate.vue'),
            getIsValid({ id, rate }) {
                return !!id && rate != null;
            },
            /* wwEditor:end */
        },
        {
            name: 'Set loop',
            code: 'setLoop',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/SetLoop.vue'),
            getIsValid({ id, loop }) {
                return !!id && loop != null;
            },
            /* wwEditor:end */
        },
    ],
};
