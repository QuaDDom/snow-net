/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            '/user/:username': { page: '/user', query: { username: '' } },
            '/groups/:id': { page: '/groups', query: { id: '' } }
        };
    },
    reactStrictMode: true,
    exportTrailingSlash: true,
    trailingSlash: true
};

module.exports = nextConfig;
