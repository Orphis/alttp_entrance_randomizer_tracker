import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {
  entry: './js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]',
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]',
      },
      {
        test: /\.(eot|ttf|svg|gif|png)$/,
        use: [{ loader: 'file-loader', options: { name: '[path][name].[ext]' } }],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([
      {
        from: 'CNAME',
      },
    ]),
  ],
};
