var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var config        = require('../config');

var usemin        = require('gulp-usemin');
var uglify        = require('gulp-uglify');
var minifyHtml    = require('gulp-minify-html');
var autoprefixer  = require('gulp-autoprefixer');
var minifyCSS     = require('gulp-minify-css');
var sass          = require('gulp-sass');

gulp.task('usemin:dist', function () {
  return gulp.src( config.paths.source + '/index.html' )
      .pipe( plumber() )
      .pipe( usemin({
        html: [minifyHtml({empty: true})],
        css: [ sass(), autoprefixer(config.autoprefixer), minifyCSS() ],
        js: [uglify()],
        js1: [uglify()]
      }) )
      .pipe(gulp.dest( config.paths.tmp ));
});


gulp.task('usemin:debug', function () {
  return gulp.src( config.paths.source + '/index.html' )
      .pipe( plumber() )
      .pipe( usemin({
        css: [ sass(), autoprefixer(config.autoprefixer) ]
      }) )
      .pipe( gulp.dest( config.paths.tmp ) );
});
