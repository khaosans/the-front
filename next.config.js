/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove the experimental section entirely if it's empty
  experimental: {
    metadataBase: new URL('http://localhost:3000'),
  },
  eslint: {
    // This disables ESLint during builds
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig