import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
