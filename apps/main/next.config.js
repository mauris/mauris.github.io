const withTM = require('next-transpile-modules')(['@libs/common'], { resolveSymlinks: false });

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  experimental: {
    // React 18
    // @link https://nextjs.org/docs/advanced-features/react-18
    reactRoot: true,
    // React 18 streaming
    // @link https://nextjs.org/docs/advanced-features/react-18/streaming
    runtime: undefined,
    // React 18 server components
    // @link https://nextjs.org/docs/advanced-features/react-18/server-components
    serverComponents: false,
    // Standalone build
    // @link https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
    outputStandalone: false,
    // @link https://nextjs.org/docs/advanced-features/output-file-tracing#caveats
    outputFileTracingRoot: undefined, // ,path.join(__dirname, '../../'),
    // Prefer loading of ES Modules over CommonJS
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
    esmExternals: true,
    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
  },
  images: {
    loader: 'akamai',
    path: '',
  },
};

module.exports = withTM(nextConfig);