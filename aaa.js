/*
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:13:14
 * @LastEditors: -_-
 * @Description: vue配置文件
 */
import { chalk } from 'chalk'
import { path } from 'path'
import { webpack } from 'webpack'
import { HtmlWebpackPlugin } from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { ProgressBarPlugin } from 'progress-bar-webpack-plugin'

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080
  },
  plugins: [
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/index.html'), // template file
      filename: 'index.html' // output file
    }),
    new CleanWebpackPlugin(),
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
}
