const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const Parts = require('./webpack.parts');
const PATHS = {
  src: path.resolve(__dirname, 'client/src/'),
  dist: path.resolve(__dirname, 'client/build/')
};

const Common = merge([
  {
    context: PATHS.src,
    entry: {
      main: './index.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: PATHS.dist
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'client/src/'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          ]
        },
        // {
        //   test: /\.(js|jsx)$/,
        //   include: path.resolve(__dirname, 'client/src'),
        //   exclude: /node_modules/,
        //   use: 'babel-loader'
        // }
      ]
    },
    plugins: [
      // generate html with injected js and css
      new HtmlWebpackPlugin({template: path.join(PATHS.src, 'index.html')})
    ]
  }
]);

module.exports = function (env) {
  // production
  if (env === 'production') {
    return merge([
      Common,
      Parts.CSS(env)
    ]);
  }
  // dev
  return merge([
    Common,
    Parts.devServer({
      host: process.env.HOST,
      port: process.env.PORT
    }),
    Parts.CSS(env)
  ]);
};
