'use strict';
const
  gulp     = require('gulp'),
  uglify   = require('gulp-uglify'),
  concat   = require('gulp-concat'),
  less     = require('gulp-less'),
  cleanCSS = require('gulp-clean-css'),
  paths    = {
    less:       ['./desenv/less/**/*.less'],
    js: ['./desenv/js/**/*.js']
  };

gulp.task('less', () => {
  return gulp.src('./desenv/less/main.less')
         .pipe(less())
         .pipe(gulp.dest('./public/styles'));
});


gulp.task('releasejs', () => {
  return gulp.src(["./desenv/js/modules/*.js", "./desenv/js/main.init.js"])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./public/js'));
});


gulp.task('buildJs', () => {
  return gulp.src('./public/js/main.js')
          .pipe(uglify({mangle: false}))
          .pipe(gulp.dest('./public/js'))
});

gulp.task("buildCss", () => {
  return gulp.src('./public/styles/main.css')
          .pipe(cleanCSS())
          .pipe(gulp.dest('./public/styles/css'));
});

gulp.task("build", ['buildJs', "buildCss"])

gulp.task('default', () => {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ["releasejs"]);
});
