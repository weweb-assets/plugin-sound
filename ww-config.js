export default {
    editor: {
        designSystemId: '034f28c4-972a-4951-9abc-7a411412a8f2',
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
            copilot: {
                description: 'Loads a sound file for playback',
                returns: 'string',
                schema: {
                    id: {
                        type: 'string',
                        description: 'Unique identifier for the sound',
                        bindable: true
                    },
                    src: {
                        type: 'string',
                        description: 'URL or path to the sound file',
                        bindable: true
                    },
                    options: {
                        type: 'array',
                        description: 'Array of key-value pairs for Howler.js options',
                        bindable: true
                    },
                    metadata: {
                        type: 'array',
                        description: 'Array of key-value pairs for sound metadata',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Unloads a previously loaded sound',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to unload',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Plays a loaded sound',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to play',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Pauses a playing sound',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to pause',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Stops a playing sound and resets its position',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to stop',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Seeks to a specific time in the sound',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to seek',
                        bindable: true
                    },
                    time: {
                        type: 'number',
                        description: 'Time in seconds to seek to',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Sets the volume of a sound',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to adjust volume',
                        bindable: true
                    },
                    volume: {
                        type: 'number',
                        description: 'Volume level (0.0 to 1.0)',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Mutes or unmutes a sound',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to mute/unmute',
                        bindable: true
                    },
                    mute: {
                        type: 'boolean',
                        description: 'Whether to mute (true) or unmute (false)',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Fades the volume of a sound from one level to another',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to fade',
                        bindable: true
                    },
                    fromVolume: {
                        type: 'number',
                        description: 'Starting volume (0.0 to 1.0)',
                        bindable: true
                    },
                    toVolume: {
                        type: 'number',
                        description: 'Ending volume (0.0 to 1.0)',
                        bindable: true
                    },
                    duration: {
                        type: 'number',
                        description: 'Duration of fade in milliseconds',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Sets the playback rate of a sound',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to adjust rate',
                        bindable: true
                    },
                    rate: {
                        type: 'number',
                        description: 'Playback rate (1.0 is normal speed)',
                        bindable: true
                    }
                }
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
            copilot: {
                description: 'Sets whether a sound should loop',
                returns: 'void',
                schema: {
                    id: {
                        type: 'string',
                        description: 'ID of the sound to set loop',
                        bindable: true
                    },
                    loop: {
                        type: 'boolean',
                        description: 'Whether to enable (true) or disable (false) looping',
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
    ],
};