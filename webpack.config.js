const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPLugin = require('@pmmmwh/react-refresh-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports ={
  mode: isDevelopment ? 'development': 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //ficheiro de entrada
  output: {
    path: path.resolve(__dirname, 'dist'), //ficheiro de saida
    filename: 'bundle.js'
  },
  resolve: { //extensoes permitidas
    extensions:['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPLugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  module: {
    rules: [
      {
      test: /\.(j|t)sx$/, //Extensões dos imports são JSX
      exclude : /node_modules/, //nao verificar dentro da pasta node_modules
      use: {
        loader: 'babel-loader',
        options: {
          plugins: [
            isDevelopment && require.resolve('react-refresh/babel')
          ].filter(Boolean)
        }
      } //conexao entre o Babel e o Webpack
    },
    {
      test: /\.scss$/, //Extensões dos imports são JSX
      exclude : /node_modules/, //nao verificar dentro da pasta node_modules
      use: ['style-loader', 'css-loader', 'sass-loader'] 
    }
  ]
  }
}