/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.api.alanced.com",
      },
    ],
  },
};

export default nextConfig;
