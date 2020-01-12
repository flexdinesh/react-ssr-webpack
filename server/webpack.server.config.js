const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./index.js",
  target: "node",
  node: {
    __dirname: true
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    publicPath: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      // {
      //   test: /\.svg$/,
      //   use: ["@svgr/webpack"]
      // },
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: 'url-loader?limit=8192'
      },
    ]
  }
};
