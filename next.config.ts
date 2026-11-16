import type { NextConfig } from "next";
import { redirecionamentos } from "./src/utils/redirecionamentos";

const nextConfig: NextConfig = {
  // S-01 e S-02 (SITE_MESTRE): sem www vai para www; endereços antigos conferidos vão à página equivalente (301).
  async redirects() {
    return redirecionamentos();
  },
  images: {
    // Fotos temáticas das páginas de seguros já usadas no site anterior
    // (preservadas na etapa 3, conforme o briefing de imagens do Chat).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
