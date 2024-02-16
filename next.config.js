/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: true,
  },
  reactStrictMode: false,
  images: {
    domains: ["raptoriq-images.s3.amazonaws.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
