import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import scss from 'rollup-plugin-scss'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      }
    }, {}),
  }

  return {
    plugins: [
      react(),
      scss(),
      svgr({
        svgrOptions: { exportType: 'named', ref: true },
        include: '**/*.svg',
      }),
    ],
    define: processEnvValues,
    publicDir: 'src/public',
    build: {
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
        },
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      modules: {
        generateScopedName: '[hash:base64:12]',
      },
    },
    json: {
      namedExports: false,
    },
    esbuild: {
      logOverride: {
        'this-is-undefined-in-esm': 'silent',
      },
    },
    manualChunks: {
      lodash: ['lodash'],
    },
  }
})
