/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/vizmap.html' },
      ],
    };
  },
};
module.exports = nextConfig;
