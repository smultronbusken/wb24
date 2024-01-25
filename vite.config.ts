import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), NodeModulesPolyfillPlugin(),],
    base: '/wb24/',
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
});
