const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();


function html() {
  return src('src/**.html')
    .pipe(
      include({
        prefix: '@@',
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('dist'));
}

function scss() {
  return src('src/assets/scss/index.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
      })
    )
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist/assets/css'));
}




function bootstrap() {
  return src('src/assets/bootstrap/*.css').pipe(csso())
  .pipe(concat('bootstrap.css'))
  .pipe(dest('dist/assets/css'));
}



function fonts() {
  return src('src/assets/fonts/**/*').pipe(dest('dist/assets/fonts'));
}
function img() {
  return src('src/assets/img/**/*').pipe(dest('dist/assets/img'));
}
function svg() {
  return src('src/assets/svg/**/*').pipe(dest('dist/assets/svg'));
}
function js() {
  return src('src/assets/js/**/index.js')
    .pipe(include())
    .pipe(dest('dist/assets/js'))
    .pipe(sync.stream());
}

function clear() {
  return del('dist');
}



function serve() {
  sync.init({
    server: './dist',
  });

  watch('src/**/**.html', series(html)).on('change', sync.reload);
  watch('src/assets/scss/**.scss', series(scss)).on('change', sync.reload);
  watch('src/assets/js/**/*.js', series(js)).on('change', sync.reload);
  watch('src/assets/img/**.**', series(img)).on('change', sync.reload);
  watch('src/assets/svg/**.**', series(svg)).on('change', sync.reload);

}

exports.build = series(clear, scss, bootstrap, html, js, fonts, img, svg);
exports.serve = series(clear, scss, bootstrap, html, js, fonts, img, svg, serve);
exports.clear = clear;

