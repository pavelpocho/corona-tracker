
var path = require("path");
var webpack = require("webpack");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.jsx",
  node: {
    fs: "empty"
  },
  output: {
    filename: "bundle_0.6.2.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/dist/",
    path: path.resolve("C:/xampp/htdocs/corona-tracker/dist")
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "style_0.6.2.css",
      chunkFilename: "something.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /utils/,
        use: {
          loader: "babel-loader",
          options: {
              presets: ["@babel/env", "@babel/react"]
          }
        }
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
      test: /\.(gif|png|jpe?g|svg|mp4)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader'
          },
        ],
      }
    ]
  }
};
