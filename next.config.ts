import type { NextConfig } from "next";

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/, so the
// site needs a basePath equal to the repo name. Override with NEXT_PUBLIC_BASE_PATH
// ("" for a custom domain or a root-level preview).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/debt-angel-site";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
