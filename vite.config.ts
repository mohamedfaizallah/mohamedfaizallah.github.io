import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NOTE FOR GITHUB PAGES:
// This site is configured for a USER site (https://<user>.github.io/) and a
// custom domain, both of which serve from the root, so `base` is '/'.
// If you switch to a PROJECT page (https://<user>.github.io/<repo>/), set
// `base` to '/<repo>/' (e.g. VITE_BASE=/portfolio/ npm run build).
const base = process.env.VITE_BASE ?? '/';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
