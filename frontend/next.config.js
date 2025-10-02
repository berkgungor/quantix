/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BACKEND_API_URL: process.env.BACKEND_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
