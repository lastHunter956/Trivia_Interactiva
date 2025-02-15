import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // Remove the output: 'export' since we need server-side features for auth
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
}

export default nextConfig
