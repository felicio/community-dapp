import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// import inject from '@rollup/plugin-inject'
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    // exclude: ['zlib'],
  },
  build: {
    minify: false,
    rollupOptions: {
      plugins: [
        // inject({
        //   include: [
        //     // 'process/browser.js',
        //     // '**/*.js',
        //     'node_modules/ethereumjs-util/**',
        //     // 'node_modules/eth-sig-util/**',
        //     // '../../node_modules/ethereumjs-util/**',
        //     // '../../node_modules/eth-sig-util/**'
        //   ],
        //   modules: { Buffer: ['buffer', 'Buffer'] },
        // }),
      ],
      // external: ['zlib'],
    },
    // transpile: ['@status-im/js'],
    commonjsOptions: {
      // include: [/@status-im\/js/, /node_modules/],
    },
  },
  resolve: {
    alias: {
      // zlib: 'export default {}',
      // zlib: undefined,
      // zlib: false,
      // zlib: './zlib.ts',
      buffer: 'buffer/',
      // crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      util: 'util/',
      // '@': path.resolve(__dirname, 'src'),
    },
    // preserveSymlinks: true,
  },
  define: {
    'process.env.ENV': JSON.stringify(process.env.ENV ?? 'localhost'),
    'process.env.VOTING_CONTRACT': JSON.stringify(process.env.VOTING_CONTRACT),
    'process.env.DIRECTORY_CONTRACT': JSON.stringify(process.env.DIRECTORY_CONTRACT),
    'process.env.MULTICALL_CONTRACT': JSON.stringify(process.env.MULTICALL_CONTRACT),
    'process.env.TOKEN_CONTRACT': JSON.stringify(process.env.TOKEN_CONTRACT),
  },
  plugins: [react()],
  optimizeDeps: {
    // include: ['@status-im/js'],
    // exclude: ['zlib'],
    force: true,
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          // process: true,
          buffer: true,
        }),
      ],
    },
  },
})
