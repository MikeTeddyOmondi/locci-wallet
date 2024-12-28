// @ts-check

/** @type {import('next').NextConfig} */
export  default {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
};
