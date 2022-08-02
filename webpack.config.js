const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: { index: './src/index.js', postPage: './src/postPage.js' },
  devtool: 'source-map',
  watch: true,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    proxy: {
      '/api/*': {
        target: 'https://api.divar.ir',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    logLevel: "debug"

    },
    watchFiles: ['./src/**/*'],
    liveReload: true,
    port: 9000,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].svg',
              outputPath: 'icons',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(), 
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/postPage.ejs',
      filename: 'postPage.html',
      chunks: ['postPage']
    }),
  ],
};
