/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		PUBLIC_URL: process.env.PUBLIC_URL || '',
		FIREBASE_BUCKET_NAME: process.env.FIREBASE_BUCKET_NAME || '',
	},
};

module.exports = nextConfig;
