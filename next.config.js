/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Remove the 'appDir' option as it's no longer needed in Next.js 14
  },
  // Remove the 'metadataBase' option if it's not needed
}

module.exports = nextConfig