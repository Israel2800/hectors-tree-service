import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin: transforms .js files as JSX before Vite's import-analysis sees them.
// Vite 5 requires .jsx extension by default; this plugin lifts that restriction.
const treatJsAsJsx = {
  name: 'treat-js-as-jsx',
  enforce: 'pre',
  async transform(code, id) {
    if (id.includes('node_modules')) return null
    if (!id.endsWith('.js')) return null
    return transformWithEsbuild(code, id, {
      loader: 'jsx',
      jsx: 'automatic',
      jsxImportSource: 'react',
    })
  },
}

export default defineConfig(({ command }) => ({
  plugins: [treatJsAsJsx, react()],
  base: command === 'build' ? '/hectors-tree-service/' : '/',
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
}))
