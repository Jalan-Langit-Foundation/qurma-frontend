import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  experimental: {
    agentUpgrade: "security",
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },

  async redirects() {
    return [
      {
        source: "/registrasi",
        destination: "/tabungan/baru",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
