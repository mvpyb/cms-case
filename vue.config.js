'use strict'
const path = require( 'path' )
const defaultSettings = require( './src/settings.js' )
const env = process.env
const publicPath = './'
const name = defaultSettings.title || 'SIAB'
const port = env.port || env.npm_config_port || 9527
function resolve( dir ) {
  return path.join( __dirname, dir )
}

// https://cli.vuejs.org/config/#publicpath
module.exports = {
  publicPath,
  outputDir : 'dist',
  assetsDir : 'static',
  indexPath : 'index.html',
  filenameHashing : true,
  // lintOnSave: env.NODE_ENV === 'development',
  lintOnSave : false,
  runtimeCompiler : false,
  productionSourceMap : false,
  // // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  //   // transpileDependencies : [
  //   //   /[/\\]node_modules[/\\]mediasoup-client[/\\]/
  //   // ],

  configureWebpack : {
    name : name,
    resolve : {
      alias : {
        '@' : resolve( 'src' ),
        '@c' : resolve( 'src/components' ),
        '@u' : resolve( 'src/utils' ),
        '@a' : resolve( 'src/api' ),
        '@sty' : resolve( 'src/styles' )
      }
    }
  },
  chainWebpack( config ) {
    config.plugin( 'preload' ).tap( () => [
      {
        rel : 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist : [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include : 'initial'
      }
    ] )

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete( 'prefetch' )

    // set svg-sprite-loader
    config.module
      .rule( 'svg' )
      .exclude.add( resolve( 'src/icons' ) )
      .end()

    // 添加多个loader
    config.module
      .rule( 'icons' )
      .test( /\.svg$/ )
      .include.add( resolve( 'src/icons' ) )
      .end()
      .use( 'svg-sprite-loader' )
      .loader( 'svg-sprite-loader' )
      .options( {
        symbolId : 'icon-[name]'
      } )
      .end()

    // 将小于 10kb 的资源内联，以减少 HTTP 请求的数量
    config.module
      .rule( 'images' )
      .use( 'url-loader' )
      .loader( 'url-loader' )
      .tap( options => Object.assign( options, { limit : 10240 } ) )
    config.module
      .rule( 'fonts' )
      .use( 'url-loader' )
      .loader( 'url-loader' )
      .tap( options => Object.assign( options, { limit : 1024 } ) )

    config
      .when( env.NODE_ENV !== 'development',
        config => {
          config
            .plugin( 'ScriptExtHtmlWebpackPlugin' )
            .after( 'html' )
            .use( 'script-ext-html-webpack-plugin', [{
              inline : /runtime\..*\.js$/
            }] )
            .end()
          config
            .optimization.splitChunks( {
              chunks : 'all',
              cacheGroups : {
                libs : {
                  name : 'chunk-libs',
                  test : /[\\/]node_modules[\\/]/,
                  priority : 10,
                  chunks : 'initial' // only package third parties that are initially dependent
                },
                elementUI : {
                  name : 'chunk-elementUI', // split elementUI into a single package
                  priority : 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test : /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons : {
                  name : 'chunk-commons',
                  test : resolve( 'src/components' ), // can customize your rules
                  minChunks : 3, //  minimum common number
                  priority : 5,
                  reuseExistingChunk : true
                }
              }
            } )
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk( 'single' )
        }
      )
  },
  devServer : {
    port : port,
    open : false,
    https : false,
    hotOnly : true,
    compress : true,
    overlay : {
      warnings : false,
      errors : false
    },
    // before: require('./mock/mock-server.js'),
    proxy : {
      '/user' : {
        target : env.VUE_APP_PREFIX,
        secure : true,
        changeOrigin : true
      },
      '/file' : {
        target : env.VUE_APP_PREFIX,
        secure : true,
        changeOrigin : true
      },
      '/banner' : {
        target : env.VUE_APP_PREFIX,
        secure : true,
        changeOrigin : true
      },
      '/friendshipLink' : {
        target : env.VUE_APP_PREFIX,
        secure : true,
        changeOrigin : true
      },
      '/contacts' : {
        target : env.VUE_APP_PREFIX,
        secure : true,
        changeOrigin : true
      },
      '/staff' : {
        target : env.VUE_APP_PREFIX,
        secure : true,
        changeOrigin : true
      },
      '/article' : {
        target : env.VUE_APP_PREFIX,
        secure : true,
        changeOrigin : true
      },

    }
  }
}
