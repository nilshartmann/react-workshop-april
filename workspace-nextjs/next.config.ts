import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// in real life i would not disable strict mode (default is on),
	// but I think without strict mode logging output is simpler
	reactStrictMode: false,
	devIndicators: false
	// https://nextjs.org/docs/app/api-reference/config/next-config-js/devIndicators
};

export default nextConfig;
