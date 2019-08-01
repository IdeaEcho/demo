var path = require('path')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
var utils = require('./utils')
var ora = require('ora')
var chalk = require('chalk')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  mode: 'production',
  entry: {
    dest: path.resolve(__dirname, '../src/packages/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../src/packages/'),
    filename: '[name].js',
    publicPath: '../',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 60000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  externals: {
    vue: 'vue'
  }
}

var spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, function(err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
