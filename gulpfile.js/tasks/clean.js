var gulp      = require('gulp-help')(require('gulp'));
var del       = require('del');
var config    = require('../config').clean;

gulp.task('clean', 'Clean out the temp dir', function (cb) {
  del(config.all, cb);
});
