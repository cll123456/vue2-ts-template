const path = require('path')

const devServerPort = 10003
const name = '综合事务管理平台'
const publicPath = './';
module.exports = {
  devServer: {
    port: devServerPort,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
        '/api': {
            target: `http://192.168.0.110:9989/ncdmz/iamptest`,
            changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            // ws: true,// proxy websockets
            pathRewrite: { // pathRewrite方法重写url
               '^/api': ''
            }
        }
    }
  },
  lintOnSave: false,
  // publicPath:"./",
  publicPath:process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir:"docs",
 
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', config =>
      config.devtool('cheap-source-map')
    )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
      
    })
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@assets', path.resolve('src/assets'))
     
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      // 公共使用的样式
      patterns: [
        path.resolve(__dirname, 'src/styles/variables.scss'),
        path.resolve(__dirname, 'src/styles/mixins.scss')
      ]
    }
  }
}
