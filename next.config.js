/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {

    exportPathMap: async function (defaultPathMap) {
        return {
            '/': { page: '/' }
        }
    },
    async rewrites() {
        return [
            {
                source: '/.well-known/webfinger',
                destination: '/api/.well-known/webfinger'
            },
            {
                source: '/.well-known/nodeinfo',
                destination: '/api/.well-known/nodeinfo'
            },
            {
                source: '/.well-known/host-meta',
                destination: '/api/.well-known/host-meta'
            }
        ];
    },
}
