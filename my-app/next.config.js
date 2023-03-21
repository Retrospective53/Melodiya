/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["f005.backblazeb2.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f005.backblazeb2.com",
        port: "",
        pathname: "/b2api/v1/**",
      },
    ],
  },
};

module.exports = nextConfig;
