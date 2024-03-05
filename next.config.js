/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
  //transpilePackages: ["@uniswap/widgets", "@uniswap/conedison"],
};

module.exports = nextConfig;
