const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function (options) {
  return {
    // confg for webpack-dev-server plugin
    devServer: {
      host: options.host, // 8080
      port: options.port,
      inline: true,
      stats: 'errors-only' // show only errors to limit webpack output size
    }
  };
};

exports.CSS = function (env) {
  // In prod, extract CSS to separate file
  // In dev, inline
  if (env === 'production') {
    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            // use: ExtractTextPlugin.extract({
            //   fallback: 'style-loader',
            //   use: [
            //     'css-loader'
            //   ],
            //   publicPath: '/css/'
            // })
            use: ExtractTextPlugin.extract({
              use: {
                loader: ['css-loader'],
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              }
            })
          },
          {
            test: /\.css$/,
            include: /styles-global/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: false
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin({
          filename: 'main.bundle.css',
          allChunks: true
        })
      ]
    };
  }
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /styles-global/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          include: /styles-global/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: false
              }
            }
          ]
        }
      ]
    }
  };
};
