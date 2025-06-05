// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";

// export default defineConfig({
//   plugins: [
//     react(),
//     eslint({
//       failOnWarning: false,
//       failOnError: false,
//       cache: false,
//       fix: true,
//     }),
//   ],
//   resolve: {
//     alias: {
//       fsevents: false, // 👈 this tells Vite to ignore fsevents
//     },
//   },
//   optimizeDeps: {
//     exclude: ["fsevents"], // 👈 ignore in pre-bundling
//   },
//   ssr: {
//     external: ["fsevents"], // 👈 treat as external in SSR (just in case)
//   },
//   server: {
//     hmr: {
//       overlay: false,
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["fsevents"],
  },
});
