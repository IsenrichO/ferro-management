const webpack = require('webpack'),
      path = require('path');


module.exports = {
  entry: [
    path.join(__dirname, 'app/App')
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /\.scss$/i,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      }, {
        test: /\.(jpe?g|png|gif|bmp|tiff|svg)$/i,
        loader: 'file-loader?name=/images/[name].[ext]'
      }, {
        test: /\.(pdf|docx?|pptx?|txt|od[fpst])$/i,
        loader: 'file-loader?name=/resources/[name].[ext]'
      }
    ]
  },
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    colors: true,
    contentBase: __dirname,
    hot: true,
    inline: true,
    noInfo: false,
    port: 3000,
    host: 'localhost'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
