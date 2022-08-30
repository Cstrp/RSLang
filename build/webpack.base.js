const path = require('path');
const notifier = require('node-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDev = process.env.NODE_ENV === 'production';
const fileName = ['index'];

module.exports = {
  context: path.resolve(__dirname, '../src'),
  devtool: isDev ? 'source-map' : 'cheap-module-source-map',
  entry: fileName.reduce((config = {}, page) => {
    config[page] = `./${page}.ts`;
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: (path) => {
      const filePath = path.dirname.split('/').slice(1).join('/');
      return `${filePath}/[name][ext]`;
    },
    clean: {
      keep: /\.git/,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@data': path.resolve(__dirname, '../src/data'),
      '@view': path.resolve(__dirname, '../src/view'),
    },
    extensions: ['.ts', '.js', '.json', '.css', '.scss'],
  },
  plugins: [].concat(
    fileName.map(
      (file) =>
        new HtmlWebpackPlugin({
          inject: 'head',
          template: `./${file}.html`,
          filename: `./${file}.html`,
          chunks: [file],
          minify: {
            html5: true,
            collapseWhitespace: true,
            removeComments: true,
          },
        }),
    ),
    [
      new FriendlyWebpackPlugin({
        onErrors: (severity, errors) => {
          if (severity !== 'error') {
            return;
          }
          const error = errors[0];
          notifier.notify({
            title: 'Webpack error',
            message: severity + ': ' + error.name,
            subtitle: error.file || '',
            sound: true,
            wait: true,
          });
        },
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configFile: '../tsconfig.json',
        },
        devServer: true,
      }),
      new ESLintPlugin({
        extensions: ['.ts', '.js'],
        failOnError: false,
        exclude: 'node_modules',
      }),
    ].filter(Boolean),
  ),
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [isDev ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts?|js?)$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workerParallelJobs: 2,
              cacheGroups: {
                default: {
                  reuseExistingChunk: true,
                  chunks: 'all',
                  priority: -20,
                  name: 'default',
                  test: /\.(ts|js)$/,
                  enforce: true,
                  minSize: 0,
                  minChunks: 1,
                },
              },
            },
          },
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico|avif|mp3)$/i,
        type: isDev ? 'asset' : 'asset/resource',
        generator: {
          filename: 'assets/img/[name][hash][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          enforce: true,
          minSize: 0,
          minChunks: 1,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '../cache'),
    hashAlgorithm: 'md5',
    buildDependencies: {
      config: [path.join(__dirname, '../webpack.config.js')],
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
