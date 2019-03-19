const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  outputDir: 'admin',
  configureWebpack: {
    externals: {
      // jquery: 'jQuery',
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