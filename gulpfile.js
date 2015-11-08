var wrench = require('wrench');
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var fs = require('fs');

var pkg = require('./package');

var options = {
  name: pkg.name,
  version: pkg.version,
  main_js: 'index.js',
  main_less: 'index.less',
  main_css: 'index.css',
  main_html: 'index.html'
};

var gulpMap = {};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  gulpMap[file.split('.')[0]] = require('./gulp/' + file);
});

// 获取example下的目录，并把这些目录下的less文件编译成css文件
var pages = fs.readdirSync(path.join(__dirname, 'example'));
if (pages.indexOf('.DS_Store') !== -1) {
  pages.splice(pages.indexOf('.DS_Store'), 1);
}
var versionMap = {};
for (var i = 0; i < pages.length; i++) {
  var versionFile = fs.readdirSync(path.join(__dirname, 'example/'+pages[i]));
  if (versionFile.indexOf('.DS_Store') !== -1) {
    versionFile.splice(versionFile.indexOf('.DS_Store'), 1);
  }
  versionMap[pages[i]] = versionFile;
}

gulp.task('default', function() {
  del(['build'], function() {
     for (var i = 0; i < pages.length; i++) {
       var versionFile = versionMap[pages[i]];
       for (var j = 0;j < versionFile.length;j++) {
         gulpMap['less'](options, pages[i], versionFile[j]);
       }
     }
    gulpMap['webpack'](options);
    gulpMap['lib']();
  });
});

// 启动watch
gulp.task('server', function() {
  gulpMap['watch'](options, pages, versionMap);
});

// 启动test
gulpMap['test']();
