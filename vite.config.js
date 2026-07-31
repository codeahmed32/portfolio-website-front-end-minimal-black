import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig(() => {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    plugins: [
      react(), 
      tailwindcss(),
      isProd && obfuscator({
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: true, 
        debugProtectionInterval: 4000,
        disableConsoleOutput: true, 
        splitStrings: true,
        stringArrayThreshold: 0.75
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, 
          drop_debugger: true 
        }
      },
      rollupOptions: {
        output: {

          entryFileNames: 'assets/[hash:16].js',
          chunkFileNames: 'assets/[hash:16].js',
          assetFileNames: 'assets/[hash:16].[ext]'
        }
      }
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});