const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'development',

  devServer: {
    contentBase: './dist',

    // let the browser know where we left of on reload
    historyApiFallback: true,

    // gzip compression
    compress: true,
    port: 4000,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // style loder can only be used in development
          'style-loader',
          'css-loader',
          {
            // css autoprefix
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
});
