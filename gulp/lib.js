"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = function() {
  gulp.src('src/lib/**')
    .pipe(gulp.dest('dist/lib/'));
  gutil.log(gutil.colors.green('Copy libs: dist/lib'));
};
