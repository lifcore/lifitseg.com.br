import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos temáticas das páginas de seguros já usadas no site anterior
    // (preservadas na etapa 3, conforme o briefing de imagens do Chat).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
