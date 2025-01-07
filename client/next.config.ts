import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_PERM: process.env.NEXT_PUBLIC_PERM,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    output: "standalone",
};

export default nextConfig;
