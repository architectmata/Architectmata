import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep tracing inside this project when the parent user folder has lockfiles.
  outputFileTracingRoot: process.cwd(),
};
export default nextConfig;
