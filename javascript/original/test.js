var gulp = require('gulp'),       
        // 載入 gulp
    gulpUglify = require('gulp-uglify');  // 載入 gulp-uglify









gulp.task('watch', function () {
    gulp.watch('javascript/original/*.js', ['scripts']);
});






gulp.task('scripts', function () {
    gulp.src('javascript/original/*.js')        // 指定要處理的原始 JavaScript 檔案目錄
        .pipe(gulpUglify())                     // 將 JavaScript 做最小化
        .pipe(gulp.dest('javascript/minify'));  // 指定最小化後的 JavaScript 檔案目錄
});