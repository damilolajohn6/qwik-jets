import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.unsplash.com", 
      },
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
