/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  images: {
    domains: ['flagcdn.com'], // For country flags
  },
}

module.exports = nextConfig
