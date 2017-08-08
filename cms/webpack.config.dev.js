//webpack-dev-server --config webpack.config.dev.js

const webpack = require('webpack')
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8081',
    './index.js',
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'server/assets'),
    publicPath: "http://localhost:8081/assets/",
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
        query: {
          presets: ['react', 'es2015'],
          plugins: [
            ["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
          ]
        },
      },
      { test: /\.(png|svg|jpg|gif)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }

    ]

  },
  resolve: {
    //使用户在引入模块时不带扩展
    extensions: ['.js', '.jsx', '.json']
  },
  //报错时显示代码具体位置
  devtool: "cheap-module-eval-source-map",
  plugins: [
    // webpack-dev-server 强化插件 启用 HMR
    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

  ],
};