"use strict";

var gulp = require('gulp'),
  gulpConnect = require('gulp-connect'),
  gulpLess = require('gulp-less'),
  gulpCleanCss = require('gulp-clean-css'),
  gulpUglify = require('gulp-uglify'),
  gulpPlumber = require('gulp-plumber'),
  gulpSourcemaps = require('gulp-sourcemaps'),
  gulpBabel = require('gulp-babel');

gulp.task('connect', function() {
  gulpConnect.server({
    root: '',
    port: 8080,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('*.html')
    .pipe(gulpConnect.reload());
});

gulp.task('less', function() {
  gulp.src('style/less/*.less')
    .pipe(gulpSourcemaps.init({loadMaps: true}))
    .pipe(gulpLess())
    .pipe(gulpCleanCss())
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest('style/css'))
    .pipe(gulpConnect.reload());
});

gulp.task('scripts', function() {
  gulp.src('./javascript/original/*.js')
    .pipe(gulpSourcemaps.init({loadMaps: true}))
    .pipe(gulpBabel({
      presets: ['es2015']
    }))
    .pipe(gulpPlumber())
    .pipe(gulpUglify())
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest('./javascript/minify'))
    .pipe(gulpConnect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./javascript/original/*.js', ['scripts']);
  gulp.watch(['*.html'], ['html']);
  gulp.watch('style/less/*.less', ['less']);
});

gulp.task('default', ['connect', 'watch']);