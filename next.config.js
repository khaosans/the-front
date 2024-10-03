/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  // Add this line
  metadataBase: new URL('http://localhost:3000'),
}

module.exports = nextConfig