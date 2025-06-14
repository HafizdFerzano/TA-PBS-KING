import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vijguqckovtbmvggckvj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**", // izinkan semua file dalam bucket public
      },
    ],
  },
};

export default nextConfig;
