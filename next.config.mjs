// next.config.mjs
const nextConfig = {
  pageExtensions: ["tsx", "ts", "js", "jsx"],
  images: {
    domains: ["encrypted-tbn0.gstatic.com", "images.pexels.com"], // Add the allowed external image domain
  },
  reactStrictMode: true,
  // srcDir: "./src",
};

export default nextConfig;
