var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern : ['gulp-*', 'main-bower-files', 'del'],
  camelize: true
});

/**
 * Code performs gulp building from the bower_components folder.
 * @exports null
 */

(function(){
  'use strict';

  gulp.task('bower-less', function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter("**/*.less"))
      .pipe($.less())
      .pipe(gulp.dest('.tmp/'));
  });

  gulp.task('bower-sass', function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter("**/*.scss"))
      .pipe($.sass())
      .pipe(gulp.dest('.tmp/'));
  });

  gulp.task('bower-fonts', function () {
    return gulp.src(
      [
        "bower_components/*/{font,fonts}/*",
      ]
    )
      .pipe($.flatten())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe(gulp.dest("assets/fonts"));
  });

  gulp.task('bower-css', function(){
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.css'))
      .pipe($.flatten())
      .pipe(gulp.dest('.tmp'));
  });

  gulp.task('bower-stylesheets', ['bower-less', 'bower-sass', 'bower-css'], function () {
    return gulp.src(
      [
        ".tmp/*.css"
      ]
    )
      .pipe($.concat('vendor.css'))
      .pipe($.replace('../font/', '../fonts/'))
      .pipe($.cleanCss())
      .pipe(gulp.dest("assets/css"));
  });

  gulp.task('bower-js', function() {
    var jsFilter = $.filter('**/*.js');
    return gulp.src($.mainBowerFiles())
      .pipe(jsFilter)
      .pipe($.concat('vendor.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('assets/js'));
  });

  gulp.task('bower', ['bower-js', 'bower-stylesheets', 'bower-fonts']);

})();
