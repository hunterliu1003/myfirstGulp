 var gulp = require('gulp'),               // 載入 gulp
	gulpConnect = require('gulp-connect'),	  // 載入 gulp-connect
    gulpUglify = require('gulp-uglify'),  // 載入 gulp-uglify
    gulpSass = require('gulp-sass'),      // 載入 gulp-sass
    gulpPlumber = require('gulp-plumber'),// 載入 gulp-plumber
    // gulpLivereload = require('gulp-livereload');  // 載入 gulp-livereload
    gulpNotify = require('gulp-notify');
    gulpLess = require('gulp-less');
    gulpCssmin = require('gulp-minify-css');

gulp.task('connect', function() {
  gulpConnect.server({
    root: '',
    livereload: true
  });
});
gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(gulpConnect.reload())
    .pipe(gulpNotify({ message: 'HTML task complete' }));
});
gulp.task('watch', function () {
    // gulpLivereload.listen();
    gulp.watch('javascript/original/*.js', ['scripts', 'html']);
    gulp.watch('scss/**/*.scss', ['styles', 'html']);
    gulp.watch(['*.html'], ['html']);
    gulp.watch('less/**/*.less',['less', 'html']);
});

gulp.task('scripts', function () {
    gulp.src('javascript/original/*.js')        // 指定要處理的原始 JavaScript 檔案目錄
        .pipe(gulpPlumber())                    // 使用 gulp-plumber 處理例外
        .pipe(gulpUglify())                     // 將 JavaScript 做最小化
        .pipe(gulp.dest('javascript/minify'))  // 指定最小化後的 JavaScript 檔案目錄
        .pipe(gulpNotify({ message: 'Scripts task complete' }));
        // .pipe(gulpLivereload());                // 當檔案異動後自動重新載入頁面
});

gulp.task('styles', function () {
    gulp.src('scss/**/*.scss')    // 指定要處理的 Scss 檔案目錄
        .pipe(gulpPlumber())      // 使用 gulp-plumber 處理例外
        .pipe(gulpSass({          // 編譯 Scss
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('css'))  // 指定編譯後的 css 檔案目錄
        .pipe(gulpNotify({ message: 'Styles task complete' }));
        // .pipe(gulpLivereload());  // 當檔案異動後自動重新載入頁面
});


gulp.task('less', function () {
    gulp.src('less/**/*.less')
        .pipe(gulpLess())
        .pipe(gulpCssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('css'));
        .pipe(gulpNotify({ message: 'Less task complete' }));
});


gulp.task('default', ['connect', 'watch']);
