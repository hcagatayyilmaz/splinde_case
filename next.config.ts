import type {NextConfig} from "next"

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Optional: Disable telemetry for production builds
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}

export default nextConfig
