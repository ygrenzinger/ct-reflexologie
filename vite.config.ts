import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  ? `/${repositoryName}/`
  : '/'
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [
    ...(isGitHubPages ? [] : [tanstackStart()]),
    react(),
    tailwindcss(),
  ],
  base,
})
