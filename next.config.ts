import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
  experimental: {
    // Limit to 1 worker to prevent module initialization race condition
    // in Next.js 16 Turbopack's app-page runtime during static generation
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.vertacore.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-7021f4bc341042cbbd61efee31d6bad0.r2.dev",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      // Next.js handles Cache-Control for static assets automatically
      // {
      //   source: "/_next/static/:path*",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable",
      //     },
      //   ],
      // },
    ];
  },
};

export default nextConfig;
