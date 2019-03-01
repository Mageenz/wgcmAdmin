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
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
  },
  // baseUrl: process.env.NODE_ENV === 'production' ? '/adminadmin/' : '/',
  devServer: {
    proxy: {
      '/dev': {
        target: 'http://www.lianduhz.cn/',
        changeOrigin: true,
        pathRewrite: {'^/dev' : ''}
      }
    }
  }
}