"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var footer = require('gulp-footer');

module.exports = function(options) {
  // var entry = {};
  // entry[page] = './src/' + options.main_js;
  var name = options.name;
  var version = options.version;
  // webpack配置
  var cfg = {
    cache: true,
    entry: './src/' + options.main_js,
    output: {
      path: './dist/'+version,
      filename: '/'+name+'.js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.js$/,
        loader: 'babel'
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }]
    },
    devtool: 'source-map',
    plugins: [new webpack.optimize.DedupePlugin()]
  };


  webpack(cfg, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    // 压缩webpack生成的js文件
    gulp.src('dist/' + version + '/' + name + '.js')
      .pipe(uglify({
        output: {
          ascii_only: true
        }
      }))
      .pipe(rename({
        suffix: '-min'
      }))
      .pipe(footer('//# sourceMappingURL='+options.main_js+'.map'))
      .pipe(gulp.dest('dist/' + version));
    gutil.log(gutil.colors.green('Minify JS: dist/' + version + '/' + name + '-min.js'));
  });
};
