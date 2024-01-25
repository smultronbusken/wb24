import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import Inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), 
      /*NodeModulesPolyfillPlugin(
        {
          name: "Buffer"
        }
      ),
      Inject( {
        modules: {
          Buffer: ['buffer', 'Buffer']
        },
      })*/
    ],
    base: '/wb24/',
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
          'Buffer': 'rollup-plugin-node-polyfills/polyfills/Buffer',
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
    /*
    build: {
      commonjsOptions: { transformMixedEsModules: true } // Change
    }*/
});
