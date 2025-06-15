import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",            // <- upewnij się, że wskazuje na katalog główny
  base: "/",            // <- ścieżka bazowa (ważne dla preview)
  build: {
    outDir: "dist",     // <- folder wyjściowy
  },
});
