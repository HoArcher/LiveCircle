"use strict";
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config.dev');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');
const path = require('path');
//## --------your proxy----------------------
var app = express();

var someDatas = require('./loadDatas');

//# -----your-webpack-dev-server------------------
var server = new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, 'server/assets'),
  hot: true,
  quiet: false,
  noInfo: false,
  publicPath: "http://localhost:8081/assets/",

  stats: { colors: true },
  headers: {
    "Access-Control-Allow-Origin": "*",//处理跨域请求
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
});



//获取菜单
app.get('/navUrl', function (req, res) {
  res.send(someDatas.navUrl);
})




app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'assets') + '/index.html');
});



//## run the two servers

//webpack-dev-server服务器
server.listen(8081, "localhost", function () { });

//express服务器---页面访问
app.listen(8080);