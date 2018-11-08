const path = require('path');
// Optimizes duplicates in splitted bundles 
const webpack = require('webpack');
// creates index.html file by a template index.ejs
const HtmlWebpackPlugin = require('html-webpack-plugin');
// cleans dist folder
const CleanWebpackPlugin = require('clean-webpack-plugin');
// copies the assets folder into dist folder
const CopyWebpackPlugin = require('copy-webpack-plugin');
// output folder location
const distFolder = "./dist";

module.exports = {
  //mode: 'development',
  entry: { 
      
      take1 : './src/take1/take1.ts',
      book2 : './src/book/chapter2.ts'
    
    },


  plugins: [
    new CleanWebpackPlugin([distFolder]),
    
    new HtmlWebpackPlugin({

        filename : 'take1/index.html',
        title : 'Take 1',
        template: 'src/take1/index.ejs',
        inject : true,
        chunks : ['take1','vendors']

      }),
    new CopyWebpackPlugin([
      { from: 'src/take1/assets', to: 'take1/assets' },
      { from : 'src/index.html' , to: 'index.html' }
    ])
  ],
  //devtool: 'inline-source-map',
  devServer: {
    contentBase: distFolder,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type'
      },
      compress : true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  
  optimization: {
    splitChunks: {
        cacheGroups: {    //중복되는 공통모듈 분리
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all"
            }
        
        }		
    }
    
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  output: {
    filename: 'js/[name].[chunkhash].bundle.js',//js 들은 js폴더에...
    path: path.resolve(__dirname, distFolder)
  }
};