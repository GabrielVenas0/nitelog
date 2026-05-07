import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { json5Plugin } from "vite-plugin-json5";

import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), json5Plugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

json5Plugin({ dts: true })
