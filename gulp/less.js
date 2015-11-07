"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');

module.exports = function(options, page, version) {
  gulp.src('example/'+page+'/'+version+'/'+options.main_less)
    //.pipe(sourcemaps.init())
    .pipe(less())
    //.pipe(sourcemaps.write('./',{includeContent:false,sourceRoot:'../../../src/page/'+page}))
    .pipe(gulp.dest('example/'+page+'/'+version));

  gutil.log(gutil.colors.green('Build CSS: example/'+page+'/'+version+'/index.css'));
};
