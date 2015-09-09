var gulp    = require('gulp-help')(require('gulp'));
var plumber = require('gulp-plumber');
var config  = require('../config').lint;
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', 'Check yo self before yo wreck yo self', function() {
  return gulp.src( config )
    .pipe( plumber() )
    .pipe( jshint() )
    .pipe( jshint.reporter(stylish) );
});
