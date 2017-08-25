"use strict";

var gulp = require('gulp'),
  gulpConnect = require('gulp-connect'),
  gulpLess = require('gulp-less'),
  gulpCleanCss = require('gulp-clean-css'),
  gulpUglify = require('gulp-uglify'),
  gulpPlumber = require('gulp-plumber'),
  gulpSourcemaps = require('gulp-sourcemaps'),
  gulpBabel = require('gulp-babel'),
  gulpRename = require('gulp-rename');

var config = {
  styles: {
    src: 'style/less/*.less',
    dest: 'style/css'
  },
  scripts: {
    src: 'js/original/*.js',
    dest: 'js/minify'
  }
}
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
  gulp.src(config.styles.src)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpLess())
    .pipe(gulpCleanCss())
    .pipe(gulpRename({suffix: '.min'}))
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpConnect.reload());
});

gulp.task('scripts', function() {
  gulp.src(config.scripts.src)
    .pipe(gulpPlumber())
    .pipe(gulpSourcemaps.init())
    .pipe(gulpBabel({
      presets: ['es2015']
    }))
    .pipe(gulpUglify())
    .pipe(gulpRename({suffix: '.min'}))
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(gulpConnect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['*.html'], ['html']);
  gulp.watch(config.styles.src, ['less']);
  gulp.watch(config.scripts.src, ['scripts']);
});

gulp.task('default', ['connect', 'watch']);