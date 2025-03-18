import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/bun'
import tsconfigPaths from 'vite-tsconfig-paths'
import cxx from '@jk2908/cxx/vite-plugin-cxx'
import build from '@hono/vite-build/bun'
import react from '@vitejs/plugin-react'

const resolver = (p: string) => resolve(dirname(fileURLToPath(import.meta.url)), p)

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			plugins: [cxx()],
			build: {
				rollupOptions: {
					input: {
						client: resolver('./app/entry.client.tsx'),
					},
					output: {
						entryFileNames: 'assets/[name].js',
					},
				},
			},
			resolve: {
				alias: {
					'#': resolver('./'),
				},
			},
		}
	}

	const entry = './app/entry.server.tsx'

	return {
		plugins: [
			devServer({
				adapter,
				entry,
				exclude: [
					/.*\.tsx?($|\?)/,
					/.*\.(s?css|less)($|\?)/,
					/.*\.(svg|png)($|\?)/,
					/^\/@.+$/,
					/^\/favicon\.ico$/,
					/^\/(public|assets|static)\/.+/,
					/^\/node_modules\/.*/,
				],
				injectClientScript: false,
			}),
			build({ entry }),
			react(),
			cxx(),
			tsconfigPaths(),
		],
		server: {
			port: 8787,
		},
		ssr: {
			external: ['react', 'react-dom'],
		},
	}
})
