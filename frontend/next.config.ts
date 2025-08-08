import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'assets.stickpng.com',
      'via.placeholder.com',
      'i.postimg.cc',       // Aapke uploaded images ke liye ye add karna mat bhoolna
    ],
  },
};

export default nextConfig;
