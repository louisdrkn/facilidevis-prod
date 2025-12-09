import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ignore ESLint errors during build for Vercel deployment
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress ESLint warnings during build
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        warn(warning);
      },
    },
  },
  esbuild: {
    // Ignore TypeScript errors during build (Vercel will handle them separately)
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
}));
