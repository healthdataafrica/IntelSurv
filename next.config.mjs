// next.config.mjs

import nextMDX from '@next/mdx';
import { remarkPlugins } from './mdx/remark.mjs';
import { rehypePlugins } from './mdx/rehype.mjs';
import { recmaPlugins } from './mdx/recma.mjs';
import { GenerateSW } from 'workbox-webpack-plugin'; // Import GenerateSW

const mdxOptions = {
  remarkPlugins,
  rehypePlugins,
  recmaPlugins,
};

const withMDX = nextMDX({
  options: mdxOptions,
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    scrollRestoration: true,
  },
};

export default withMDX({
  ...nextConfig,
  webpack(config, { isServer }) {
    if (!isServer) {
      // Check if GenerateSW has already been added
      const hasGenerateSW = config.plugins.some(
        (plugin) => plugin instanceof GenerateSW
      );

      // If not added already, add GenerateSW with configuration
      if (!hasGenerateSW) {
        config.plugins.push(
          new GenerateSW({
            // Configure your service worker here
            // You can specify cache strategies, routes to cache, etc.
            // Example:
            clientsClaim: true,
            skipWaiting: true,
 
            // Add more configuration options as needed
          })
        );
      }
    }
    return config;
  },
});
