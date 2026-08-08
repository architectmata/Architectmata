import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve("."),
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
