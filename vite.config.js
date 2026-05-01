import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gr_d3_p2_habitkit_anti/', // GitHub Pages 레포지토리 이름
})
