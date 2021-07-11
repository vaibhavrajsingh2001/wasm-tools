module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: '/:path*',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
};
