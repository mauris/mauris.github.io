var gulp = require('gulp');

/**
 * Main gulp script to perform requires and starting the build process
 * @exports null
 */

(function(){
  'use strict';

  require('require-dir')('./gulp/');

  gulp.task('default', ['pre-clean'], function(){
    gulp.start('build');
  });
})();
