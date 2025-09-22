import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

/**
 * Vite config tuned for GitHub Pages deployment.
 *
 * - dev: base = '/'
 * - prod: base = process.env.VITE_BASE_PATH || '/portfolio/'
 * Update '/portfolio/' to your repo name if needed.
 */
export default defineConfig(({ mode }) => {
  const isDev = mode === "development" || process.env.NODE_ENV === "development";

  return {
    base: isDev ? "/" : process.env.VITE_BASE_PATH || "/portfolio/",
    optimizeDeps: {
      entries: ["src/main.tsx", "src/tempobook/**/*"],
    },
    plugins: [
      react(),
      // Only enable tempo devtools in development to keep production builds clean
      ...(isDev ? [tempo()] : []),
    ],
    resolve: {
      preserveSymlinks: true,
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      // Make the dev server accessible from the network (useful for testing on mobile).
      host: true,
    },
  };
});
