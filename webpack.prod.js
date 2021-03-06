const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const SitemapPlugin = require('sitemap-webpack-plugin').default;

// TODO: generate these paths for my sitemap
const paths = [
  {
    path: '',
    changefreq: 'yearly'
  },
  {
    path: '/projects',
    changefreq: 'yearly'
  },
  {
    path: '/about',
    changefreq: 'yearly'
  },
  {
    path: '/contact',
    changefreq: 'yearly'
  }
];

// Workbox - plugin to create a simple service worker
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },

  optimization: {
    // Tree shaking
    usedExports: true,
    minimizer: [
      // minify js
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     output: {
      //       comments: false
      //     }
      //   }
      // }),
      // minify css
      // new OptimizeCSSAssetsPlugin()
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: "json" }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      chunkFilename: "[id].[fullhash].css"
    }),
    // generate a service worker
    new WorkboxPlugin.GenerateSW({
      // Exclude images from the precache
      exclude: [/\.(?:png|jpg|jpeg|svg|webp|htaccess)$/]
    }),

    // generate a sitemap
    new SitemapPlugin({ base: 'https://vandiessen.com', paths }),
  ],

});
