import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' so the built site works from any folder (for example GitHub Pages under /zerabytes/).
export default defineConfig({ base: './', plugins: [react()] });
