var gulp        = require('gulp');
var config      = require('../config');

gulp.task('watch', 'Watch for javascript', ['lint'], function(){
  gulp.watch( config.lint, ['lint'] );
});
