var gulp      = require('gulp-help')(require('gulp'));
var gutil     = require('gulp-util');
var config    = require('../config').nodewebkit;

var NwBuilder = require('nw-builder');

var debugConfig = mergeOptions( config.global, config.debug );
var buildConfig = mergeOptions( config.global, config.dist );

var nw;

gulp.task('nw:run', false, function(){
  nw = new NwBuilder( debugConfig );
  nw.on('log', gutil.log);
  nw.on('stderr', function(d){ gutil.log(d.toString()) });
  nw.on('stdout', function(d){ gutil.log(d.toString()) });

  nw.run();
});

gulp.task('nw:build', false, function(){
  nw = new NwBuilder( buildConfig );
  nw.on('log', gutil.log);

  nw.build().then(function (info) {
    gutil.log('All done!');
  }).catch(function (error) {
    gutil.log(error);
    gutil.beep();
  });
});


function mergeOptions(obj1,obj2){
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}
