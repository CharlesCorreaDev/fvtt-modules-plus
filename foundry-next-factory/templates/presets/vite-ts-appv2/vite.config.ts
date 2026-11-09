import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      name: "{{PACKAGE_ID}}",
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "{{PACKAGE_ID}}.mjs"
    }
  }
});

