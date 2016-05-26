var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern : ['gulp-*', 'del'],
  camelize: true
});

/**
 * Code performs gulp pre-build cleaning, building and post-build cleaning
 * @exports null
 */

(function(){
  "use strict";

  gulp.task('pre-clean', function (done) {
    return $.del(['.tmp/'], done);
  });

  // Deletes any temporary files after a build
  gulp.task('post-clean', function (done) {
    return $.del(['.tmp/'], done);
  });

  gulp.task('build', ['bower'], function () {
    return gulp.start('post-clean');
  });

})();
