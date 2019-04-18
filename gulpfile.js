'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', function () {
  browserSync.init({
    server: {
      baseDir: './'
    },
    notify: false
  });
  gulp.watch('js/*.js').on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
});

