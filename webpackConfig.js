const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app/index.js',
    vendor: './src/vendor/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: `${__dirname}/dist`
  },
  devServer: {
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false
    })
  ]
};
