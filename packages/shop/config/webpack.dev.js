const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8081/',
  },
  devtool: "eval-source-map",
  devServer: {
      port: 8081,
      historyApiFallback: {
        index: 'index.html',
      },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'shop',
            filename: 'remoteEntry.js',
            exposes: {
                './ShopApp': './src/bootstrap'
            },
            shared: packageJSON.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);
