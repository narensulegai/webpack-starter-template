const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return {
    entry: {
      app: ['./src/app/index.js'],
      vendor: ['./src/vendor/index.js']
    },
    output: {
      filename: '[name].[contenthash].js',
      path:
        `${__dirname}/dist`
    },
    devServer: {open: true, port: 9000, bonjour: true},
    plugins: [
      new Dotenv(),
      new webpack.DefinePlugin({
        isProd: JSON.stringify(true),
        path: JSON.stringify(process.env.PATH)
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: false
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      })
    ],
    module:
      {
        rules: [
          {
            test: [/.css$|.scss$/],
            use: [
              process.env.NODE_ENV !== 'production'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: [/\.(png|jpg|gif)$/],
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
              },
            ],
          }
        ]
      }
  }
};
