"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

var gulpMap = {
  'html': require('./html'),
  'less': require('./less'),
  'webpack': require('./webpack')
};
// 从sudo降权，避免build后的文件为root权限
function unRoot() {

  if (process.setgid && process.setuid) {
    var env = process.env,
      uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
      gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);
    process.setgid(gid);
    process.setuid(uid);
  }
}
module.exports = function(options, pages, versionMap) {

  var watchers = {};
  for (var i = 0; i < pages.length; i++) {
    var versionFile = versionMap[pages[i]];
    watchers[pages[i]] = [];
    for (var j = 0;j < versionFile.length;j++) {
      (function(page, version) {
        watchers[page][j] = gulp.watch(['example/'+page+'/'+version+'/**'], function() {

          unRoot();
          //gulpMap['html'](options, page);
          gulpMap['less'](options, page, version);
          //gulpMap['webpack'](options, page);

        });
        watchers[page][j].on('change', function(event) {

          gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
        });
      }(pages[i], versionFile[j]));
    }
  }

  watchers['lib'] = gulp.watch(['src/lib/**'], function() {

    unRoot();
    gulpMap['lib']();
  });
  watchers['lib'].on('change', function(event) {
    gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
  });
};
