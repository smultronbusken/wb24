import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import Inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react() ],
    base: '/wb24/',
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
    },

    build: {
      commonjsOptions: { transformMixedEsModules: true }, // Change
      rollupOptions: {
        plugins: [Inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    }
});
