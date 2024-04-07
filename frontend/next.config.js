/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        PROJECT_NAME: process.env.PROJECT_NAME
    }
}

module.exports = nextConfig
