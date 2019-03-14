const path = require('path')

module.exports = {
  // chainWebpack: config => {
  //   config.module
  //     .rule('pug')
  //     .test(/\.pug$/)
  //     .use('pug-plain-loader')
  //       .loader('pug-plain-loader')
  //       .end()
  // },
  configureWebpack: {
    externals: {
      jquery: 'jQuery',
      vue: 'Vue'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      }
    }
  },
  // baseUrl: process.env.NODE_ENV === 'production' ? '/adminadmin/' : '/',
  devServer: {
    proxy: {
      '/dev': {
        target: 'http://39.98.197.90:8081/',
        changeOrigin: true,
        pathRewrite: {'^/dev' : ''}
      }
    }
  }
}