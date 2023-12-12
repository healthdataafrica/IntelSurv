import nextMDX from '@next/mdx';
import { remarkPlugins } from './mdx/remark.mjs';
import { rehypePlugins } from './mdx/rehype.mjs';
import { recmaPlugins } from './mdx/recma.mjs';
import withPWA from 'next-pwa';

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    scrollRestoration: true,
  },
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  // Use default runtimeCaching provided by next-pwa
};

export default withPWA(pwaConfig)(withMDX(nextConfig));
