/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.alanced.com",
      },
    ],
  },
};

export default nextConfig;

