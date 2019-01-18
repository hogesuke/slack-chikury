const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/js/background.js',
    popup: './src/js/popup.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'chrome-extension/js')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        },
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/style.css'
    })
  ]
};
