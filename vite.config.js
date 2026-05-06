import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

function normalizeBasePath(basePath) {
  if (!basePath) return '/'
  const trimmed = basePath.trim()
  if (!trimmed || trimmed === '/') return '/'
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`
}

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

export default defineConfig(() => {
  const base = normalizeBasePath(process.env.VITE_PUBLIC_BASE_PATH)

  return {
    plugins: [treatJsAsJsx, react()],
    base,
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: { '.js': 'jsx' },
      },
    },
  }
})
