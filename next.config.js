/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/philosophy", destination: "/about#our-philosophy", permanent: true },
      { source: "/csr", destination: "/about#csr", permanent: true },
    ];
  },
};

module.exports = nextConfig;
