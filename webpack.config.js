var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
     'babel-polyfill',
     './src/index'
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style!css' },
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
     /*new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('production')
       }
    })*/
  ]
};
