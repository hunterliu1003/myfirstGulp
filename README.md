# myfirstGulp
# 目的

- 使用 Gulp 轉換 LESS → CSS。
- 將.css 及 .js 檔案做 Minify。
- 存檔後自動刷新頁面。
- 提醒 javascript 語法錯誤。

# 使用

```
> npm install
> gulp
  [16:29:07] Using gulpfile /trainee_practice/less-practice/gulpfile.js
  [16:29:07] Starting 'connect'...
  [16:29:07] Finished 'connect' after 17 ms
  [16:29:07] Starting 'watch'...
  [16:29:07] Finished 'watch' after 22 ms
  [16:29:07] Starting 'default'...
  [16:29:07] Finished 'default' after 65 μs
  [16:29:07] Server started http://localhost:7000
  [16:29:07] LiveReload started on port 35729
```

# 套件介紹

## gulp-less <a href="https://www.npmjs.com/package/gulp-less"><img alt="NPM Version" src="https://img.shields.io/npm/v/gulp-less.svg?style=flat"/></a>

> 將 less 編譯成 css。

```javascript
  var gulp = require('gulp'),
  gulpLess = require('gulp-less');

  gulp.task('less', function() {
  gulp.src('style/less/*.less')  //指定 style/less 中所有 .less 的檔案。
    .pipe(gulpLess())  //將 .less 檔編譯成 .css 檔。
    .pipe(gulp.dest('style/css'))  //指定檔案位址。
  });

  gulp.task('watch', function() {
    gulp.watch('style/less/*.less', ['less']);
    //監看 style/less 中所有 .less 的檔案有任何異動，執行 ['less'] 這個 task。
  });
```

## gulp-clean-css <a href="https://www.npmjs.com/package/gulp-clean-css"><img alt="NPM Version" src="https://img.shields.io/npm/v/gulp-clean-css.svg?style=flat"/></a>

> 將 css 壓縮成 .min.css。

```javascript
  var gulpCleanCss = require('gulp-clean-css');

  gulp.task('less', function() {
  gulp.src('style/less/*.less')
    .pipe(gulpLess())
    .pipe(gulpCleanCss())  //將 .css 檔壓縮。
    .pipe(gulp.dest('style/css'))  //指定檔案位址。
  });

  gulp.task('watch', function() {
  gulp.watch('style/less/*.less', ['less']);
});
```

## gulp-uglify <a href="https://www.npmjs.com/package/gulp-uglify"><img alt="NPM Version" src="https://img.shields.io/npm/v/gulp-uglify.svg?style=flat"/></a>

> 將 javascript 壓縮成 .min.js。

```javascript
  var gulpUglify = require('gulp-uglify');

  gulp.task('scripts', function() {
    gulp.src('javascript/original/*.js') //指定 javascript/original 中所有 .js 的檔案。
      .pipe(gulpUglify())  //將 .css 檔壓縮。
      .pipe(gulp.dest('javascript/minify'))  //指定檔案位址。
  });

  gulp.task('watch', function() {
    gulp.watch('javascript/original/*.js', ['scripts']);
    //監看 javascript/original 中所有 .js 的檔案有任何異動，執行 ['scripts'] 這個 task。
  });
```

## gulp-connect <a href="https://www.npmjs.com/package/gulp-connect"><img alt="NPM Version" src="https://img.shields.io/npm/v/gulp-connect.svg?style=flat"/></a>

> 實現 livereload 功能。

```javascript
  gulpConnect = require('gulp-connect');

  gulp.task('connect', function() {
    gulpConnect.server({
      root: 'app',
      port: 8000,  //指定 port
      livereload: true  //開啟 livereload 功能
    });
  });

  gulp.task('html', function() {
    gulp.src('*.html')  //指定所有 .html 檔案
      .pipe(gulpConnect.reload());  //執行 reload
  });

  gulp.task('watch', function() {
    gulp.watch(['*.html'], ['html']);
    //監看所有 .html 有任何異動，執行 ['html'] 這個 task。
  });

  gulp.task('default', ['connect', 'watch']);
  //將 task ['connect'] 加入 gulp default task。
```

## gulp-plumber <a href="https://www.npmjs.com/package/gulp-plumber"><img alt="NPM Version" src="https://img.shields.io/npm/v/gulp-plumber.svg?style=flat"/></a>

> 例外處理，提示程式 bug。

```javascript
  var gulpPlumber = require('gulp-plumber');

  gulp.task('scripts', function() {
  gulp.src('javascript/original/*.js')
    .pipe(gulpPlumber())  //檢查 javascript/original 下所有 .js 檔案的可能錯誤。
  });

  gulp.task('watch', function() {
    gulp.watch('javascript/original/*.js', ['scripts']);
    //監看 javascript/original 中所有 .js 的檔案有任何異動，執行 ['scripts'] 這個 task。
  });
```

## gulp-babel <a href="https://www.npmjs.com/package/gulp-babel"><img alt="NPM Version" src="https://img.shields.io/npm/v/gulp-babel.svg?style=flat"/></a>

### install

```javascript
npm install --save-dev gulp-babel babel-preset-es2015
```

> 將 ES6 轉換成。

```javascript
  var gulpBabel = require('gulp-babel');

  gulp.task('scripts', function() {
    gulp.src('./javascript/original/*.js')
      .pipe(gulpBabel({
        presets: ['es2015']
      }))
      .pipe(gulpPlumber())
      .pipe(gulpUglify())
      .pipe(gulp.dest('./javascript/minify'))
      .pipe(gulpConnect.reload());
  });

  gulp.task('watch', function() {
    gulp.watch('javascript/original/*.js', ['scripts']);
    //監看 javascript/original 中所有 .js 的檔案有任何異動，執行 ['scripts'] 這個 task。
  });
```

## gulp-sourcemaps <a href="https://www.npmjs.com/package/gulp-sourcemaps"><img alt="NPM Version" src="https://img.shields.io/npm/v/gulp-sourcemaps.svg?style=flat"/></a>

CSS 和 JavaScript 變得越來越複雜。大部分源碼都要經過轉換，才能投入生產環境。
常見的源碼轉換，主要是以下三種情況：

- 壓縮，減小體積。
- 多個文件合併，減少HTTP請求數。
- 其他語言編譯成 CSS 或 JavaScript。

這三種情況將使得實際運行的代碼不同於開發的代碼。
舉例來說代碼壓縮後只有1行，你看著錯誤信息根本不知道它所對應的原始位置。
這就是Source map想要解決的問題。

```javascript
  var gulpSourcemaps = require('gulp-sourcemaps');

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
    gulp.watch('javascript/original/*.js', ['scripts']);
    //監看 javascript/original 中所有 .js 的檔案有任何異動，執行 ['scripts'] 這個 task。
  });
```