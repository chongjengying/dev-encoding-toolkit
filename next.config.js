/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for Cloudflare Pages
  output: 'export',
  // Disable image optimization (Cloudflare doesn't support it)
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig