var webpack = require('webpack');
var path = require('path');

var DIR_SRC = path.resolve(__dirname,'src');
var DIR_DIST = path.resolve(__dirname,'dist');

var config = {
  entry: DIR_SRC + '/app/index.js',
  output: {
    path: DIR_DIST + '/app',
    filename: 'bundle.js',
    publicPath: '/app/'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        include: DIR_SRC,
        query: {
          presets: ['react','env','stage-2']
        }
      },
      {
        test: /\.s?css$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
}

module.exports = config;
