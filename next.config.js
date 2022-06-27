/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            '/user': { page: '/user', query: { slug: 'username' } },
            '/groups': { page: '/groups', query: { slug: 'id' } }
        };
    },
    reactStrictMode: true,
    trailingSlash: true
};

module.exports = nextConfig;
