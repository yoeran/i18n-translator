var gulp      = require('gulp-help')(require('gulp'));
var plumber   = require('gulp-plumber');
var config    = require('../config').copy;

gulp.task('copy', false, function(){
  return gulp.src( config.source )
    .pipe( plumber() )
    .pipe( gulp.dest(config.dest) );
});
