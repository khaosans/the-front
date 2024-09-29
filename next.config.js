/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove the experimental section entirely if it's empty
  experimental: {
    metadataBase: new URL('http://localhost:3000'),
  },
}

module.exports = nextConfig
