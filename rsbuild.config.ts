import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginMdx } from '@rsbuild/plugin-mdx';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass({
      // sass文件默认注入全局的变量文件
      sassLoaderOptions: {
        //   additionalData: `@use 'src/styles/variables.scss' as *;`,
      },
    }),
    pluginMdx(),
  ],
  source: {
    entry: {
      index: './example/index.tsx', // 指向入口为 example 的 index
    },
  },
  output: {
    distPath: {
      root: './distExample',
    },
    assetPrefix: './',
    cssModules: {
      exportGlobals: true,
    },
  },
  server: {
    open: false,
    proxy: {
      '/api': {
        target: 'https://wx.zaicang.net/api',
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
