// @ts-check

/** @type {import('next').NextConfig} */
export  default {
	output: 'standalone',
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
};
