/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["scaling-tree.sgp1.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
