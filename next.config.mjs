/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**", // Allows images from all domains
          },
        ],
        domains: ["*"], // Allows all domains (alternative approach)
      },
};

export default nextConfig;
