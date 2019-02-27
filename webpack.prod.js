const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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

          {
            // autoprefix
            loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')]
              },
          },
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
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),

      // minify css
      new OptimizeCSSAssetsPlugin()
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),

    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: "[id].[hash:8].css"
    }),

    // generate a service worker
    new WorkboxPlugin.GenerateSW({

      // Exclude images from the precache
      exclude: [/\.(?:png|jpg|jpeg|svg|webp)$/]
    })
  ],

});
