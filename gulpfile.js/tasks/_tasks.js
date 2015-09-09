/* ---------------------------------------
    CHAIN TASKS
   --------------------------------------- */

var gulp        = require('gulp-help')(require('gulp'));
var runSequence = require('run-sequence');

gulp.task('debug', 'Run the app for current platform', function(callback) {
  runSequence(['clean', 'lint'],
              ['usemin:debug', 'copy'],
              'nw:run',
              callback);
});

gulp.task('dist', 'Build the app for targeted platforms', function(callback) {
  runSequence(['clean', 'lint'],
              ['usemin:dist', 'copy'],
              'nw:build',
              callback);
});
