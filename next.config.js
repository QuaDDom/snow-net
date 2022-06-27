/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            '/user': { page: '/user', query: { username: '' } },
            '/groups': { page: '/groups', query: { id: '' } }
        };
    },
    reactStrictMode: true,
    exportTrailingSlash: true,
    trailingSlash: true
};

module.exports = nextConfig;
