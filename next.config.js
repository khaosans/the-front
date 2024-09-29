/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    metadataBase: new URL('http://localhost:3000'),
  },
}

module.exports = nextConfig
