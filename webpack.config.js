const {AngularCompilerPlugin} = require('@ngtools/webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: './src/app/app.module#AppModule',
      sourceMap: true
    }),
    //new UglifyJsPlugin({
    //  sourceMap: true
    //})
  ],
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.html/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        include: /\.component\.scss/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.component\.scss/
      },
      {
       // test: /\.ts$/,
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: '@ngtools/webpack'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
