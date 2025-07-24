/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        hostname: 'media.kitsu.io',
        port: '',
        pathname: '/**',
        protocol: 'https',
      },
      {
        hostname: 'media.kitsu.app',
        port: '',
        pathname: '/**',
        protocol: 'https',
      },
      {
        protocol: 'https',
        hostname: 'asianimg.pro',
        pathname: '/cover/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pngall.com',
      },
      {
        protocol: 'https',
        hostname: 'gogocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'asianimg.pro',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'artworks.thetvdb.com',
      },
      {
        protocol: 'https',
        hostname: 'dramacool.bg',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  async rewrites() {
    return [
      {
        // Proxy /api/tmdb requests to TMDB API to hide API key
        source: '/api/tmdb/:path*',
        destination: `https://api.themoviedb.org/3/:path*?api_key=${process.env.TMDB_API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
