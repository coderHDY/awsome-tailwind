const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin(
  // Specify a custom path here
  "./i18n.js"
);
const nextConfig = {
  reactStrictMode: true,
  env: {
    SECRET: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.artany.ai",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "huggingface.co",
      },
      {
        protocol: "https",
        hostname: "cdn-lfs-us-1.huggingface.co",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        hostname: "cdn.reveai.art",
      },
      {
        protocol: "https",
        hostname: "toolplate.ai",
      },
      {
        protocol: "https",
        hostname: "a.nel.cloudflare.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
    domains: [
      "cdn2.reveai.art",
      "cdn.wan-ai.org",
      "cdn.seedance.ai",
      "cdn.artany.ai",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.artany.ai",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals.push({ canvas: "commonjs canvas" });
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
module.exports = withNextIntl(nextConfig);
