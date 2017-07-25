// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: { // 配置解决跨域问题(http://www.jianshu.com/p/95b2caf7e0da)
        '/v2': {
            target: 'https://api.douban.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/v2': '/v2'
            }
        },
        '/v3': {
            target: 'http://music.qq.com/musicbox/shop/',
            changeOrigin: true,
            pathRewrite: {
                '^/v3': '/v3'
            }
        },
        '/fcgi-bin': {
            target: 'http://s.music.qq.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/fcgi-bin': '/fcgi-bin'
            }
        },
        '/splcloud': {
            target: 'https://c.y.qq.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/splcloudn': '/splcloud'
            }
        },
        '/miniportal': {
            target: 'http://music.qq.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/miniportal': '/miniportal'
            }
        },
        '/musichall': {
            target: 'https://c.y.qq.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/musichall': '/musichall'
            }
        },
        '/soso': {
            target: 'https://c.y.qq.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/soso': '/soso'
            }
        },
        '/v8': {
            target: 'https://c.y.qq.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/v8': '/v8'
            }
        },
        '/music': {
            target: 'http://imgcache.qq.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/music': '/music'
            }
        },
        '/music': {
            target: 'http://imgcache.qq.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/music': '/music'
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
