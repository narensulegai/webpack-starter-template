const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = () => {
  const isDev = process.env.NODE_ENV !== 'production';

  return {
    entry: {
      app: [`${__dirname}/src/app/index.js`],
      vendor: [`${__dirname}/src/vendor/index.js`],
    },
    output: {
      filename: '[name].[contenthash].js',
      path:
        `${__dirname}/dist`,
    },
    devServer: {
      open: true,
      port: 9000,
      bonjour: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: 'localhost:9000',
          cookiePathRewrite: '/',
        },
      },
    },
    // optimization: { minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()] },
    devtool: isDev ? 'inline-source-map' : false,
    plugins: [
      // new BundleAnalyzerPlugin({ analyzerPort: '9001' }),
      // Export as globals
      new webpack.ProvidePlugin({ _: 'lodash' }),
      new Dotenv(),
      new webpack.DefinePlugin({
        isDev,
        path: JSON.stringify(process.env.PATH),
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: `${__dirname}/src/index.html`,
        // The following code will include chunks in that particular order.
        chunks: ['vendor', 'app'],
        chunksSortMode: 'manual',
      }),
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
      new StylelintPlugin({ failOnError: !isDev, emitError: true }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            minimize: !isDev,
          },
        },
        {
          test: /\.(png|jpg|gif|svg|pdf)$/,
          use: [
            {
              // Moves all files to web folder
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash].[ext]',
              },
            },
          ],
        },
        {
          enforce: 'pre',
          test: /\.m?js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            warning: false,
            failOnError: !isDev,
            emitError: false,
          },
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/typescript'],
              plugins: [],
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$|\.scss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 2, sourceMap: isDev } },
            // Resolve relative url() paths in css files, should always come before sass-loader
            'resolve-url-loader',
            { loader: 'postcss-loader', options: { sourceMap: isDev } },
            { loader: 'sass-loader', options: { sourceMap: isDev } },
          ],
        },
      ],
    },
  };
};
