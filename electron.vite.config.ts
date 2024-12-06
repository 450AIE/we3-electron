import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    main: {
        resolve: {
            alias: {
                '@shared': resolve('src/shared/'),
                '@': resolve('src')
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        resolve: {
            alias: {
                '@shared': resolve('src/shared/'),
                '@': resolve('src')
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src'),
                '@utils': resolve('src/renderer/src/utils'),
                '@assets': resolve('src/renderer/src/assets/'),
                '@shared': resolve('src/shared/'),
                '@': resolve('src')
            }
        },
        plugins: [react()]
    },
    shared: {
        resolve: {
            alias: {
                '@shared': resolve('src/shared/'),
                '@': resolve('src')
            }
        },
        plugins: [externalizeDepsPlugin()]
    }
});
