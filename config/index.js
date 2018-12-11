// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var glob = require('glob')
var version = 2;
var title = 'huodongUI'; //请配置活动的标题

function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = basename; // 正确输出js和html的路径
        entries[pathname] = entry;
    });

    return entries;
}

var entries = getEntry('./src/entrances/**/*.js');
var template = [];
for (var i in entries) {
    template.push({
        filename: 'view/' + i + '.html',
        template: './src/template.ejs',
        inject: true,
        chunks: ["" + i, 'vendor', 'manifest'],
        title: title,
        chunksSortMode: 'dependency'
    });
}

module.exports = {
    entries: entries,
    template: template,
    version: version,
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../../release/index.html'),
        assetsRoot: path.resolve(__dirname, '../release'),
        assetsSubDirectory: './static',
        assetsPublicPath: '../',
        productionSourceMap: false,
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
        port: 7070,
        autoOpenBrowser: true,
        assetsSubDirectory: './static',
        assetsPublicPath: '/',
        proxyTable: {
            '/redirect/': {
                target: 'http://mobi.4399tech.com',
                pathRewrite: {
                    '^/redirect/': '/redirect/'
                },
                changeOrigin: true
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        stats: { colors: true },
    }
}