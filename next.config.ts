import type { NextConfig } from "next";
import { securityHeaders } from "./src/config/security";

const nextConfig: NextConfig = {
  reactCompiler: true,
  headers: securityHeaders,
};

export default nextConfig;
