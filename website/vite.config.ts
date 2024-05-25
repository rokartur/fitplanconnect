import MillionLint from '@million/lint'
import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react-swc'
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
		plugins: [react(), MillionLint.vite(), svgr({ icon: false, svgo: false })],
		publicDir: 'src/public',
		define: processEnvValues,
		json: {
			namedExports: false,
		},
		manualChunks: {
			lodash: ['lodash'],
		},
		css: {
			devSourcemap: true,
			modules: {
				generateScopedName: '[hash:base64:12]',
			},
		},
		esbuild: {
			logOverride: {
				'this-is-undefined-in-esm': 'silent',
			},
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		build: {
			minify: true,
			rollupOptions: {
				output: {
					compact: true,
				},
			},
		},
	}
})
