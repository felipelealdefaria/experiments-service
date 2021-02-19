const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts', // initial react file
  output: {
    path: path.join(__dirname, 'lib'), // output directory for bundle,
    publicPath: '/lib',
    filename: 'bundle.js' // generate name bundle file
  },
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      buffer: require.resolve('buffer/')
    },
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.join(__dirname, 'src') // imports paths - (replace @ for src),
    }
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  devServer: {
    contentBase: './public', // file in browser
    writeToDisk: true, // for bundle generate and listen server,
    historyApiFallback: true // map routes
  },
  externals: { // generate bundle file without this libs
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}