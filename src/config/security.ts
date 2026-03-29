import type { NextConfig } from "next";

type HeaderRules = NonNullable<NextConfig["headers"]>;

export const securityHeaders: HeaderRules = async () => {
  // TODO(security): add production security headers after final CSP/payment policy is approved.
  return [];
};
