const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
let htmlPageNames = ['post','bookmark',"notes"];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.ejs`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
  mode: "development",
  entry: { index: "./src/index.js", post: "./src/post.js", bookmark: "./src/bookmark.js" , notes: "./src/notes.js" },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    proxy: {
      "/api/*": {
        target: "https://api.divar.ir",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    watchFiles: ["src/**/*"],
    liveReload: true,
    port: 9000,
  },
  watch:true,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].svg",
              outputPath: "icons",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
  ].concat(multipleHtmlPlugins),
};
