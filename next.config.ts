import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  experimental: { optimizeCss: true },
  images: { domains: [] },
}
export default nextConfig
