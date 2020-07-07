const path = require('path');
const webpack = require('webpack');

// to create dynamicly an html file with the right sources
const HtmlWebpackPlugin = require('html-webpack-plugin');

// A webpack plugin for automatically wiring up asynchronous (and other types) of JavaScript chunks 
// using <link rel='preload'>. This helps with lazy-loading.
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },

  // The base directory
  context: path.resolve(__dirname, ''),

  // great for bug fixing
  devtool: 'inline-source-map',

  plugins: [
    /**
      * All files inside webpack's output.path directory will be removed once, but the
      * directory itself will not be. If using webpack 4+'s default configuration,
      * everything under <PROJECT_DIR>/dist/ will be removed.
      * Use cleanOnceBeforeBuildPatterns to override this behavior.
      *
      * During rebuilds, all webpack assets that are not used anymore
      * will be removed automatically.
      */
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // hash: true,
      title: "Hi I'm Thijs van Diessen, a more creative front end developer",
      template: './src/index.html',
      filename: 'index.html',
      favicon: './src/favicon.ico',
      // inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),

    new webpack.HotModuleReplacementPlugin(),

    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.(woff|woff2)$/.test(entry)) return 'font';
        if (/\.(png|svg|jpg|jpeg|gif|webp)$/.test(entry)) return 'image';
        if (/\.js$/.test(entry)) return 'script';
        return
      }
    }),

    // A static asset folder
    new CopyPlugin({
      patterns: [
        { 
          from: 'static/**',
          toType: 'dir',
          flatten: true,
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
    ]
  },

  output: {
    filename : '[name].[hash:8].js',
    path : path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash:8].js',

    // relative to HTML page
    publicPath: '/'
  }
};
