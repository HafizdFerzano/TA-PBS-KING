import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**", // mengizinkan semua path dari cdn.pixabay.com
      },
    ],
  },
};

export default nextConfig;
