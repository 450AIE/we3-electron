import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src'),
                '@utils': resolve('src/renderer/src/utils'),
                '@assets': resolve('src/renderer/src/assets/'),
                '@': resolve('src')
            }
        },
        plugins: [react()]
    }
});