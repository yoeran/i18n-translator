var path  = require('path');
var fs    = require('fs');
var YAML  = require('js-yaml');
var dot   = require('dot-object');

var core = {
  buildYamlIndex: function(dir) {
    var files = [];

    // Recursive search for YAML files
    core.findYamlFiles(dir, /\.yml$/, function( filePath ){
      var parts = filePath.split('.').slice(-3);
      var id    = parts[0].split('/').slice(-1)[0];
      var loc   = parts[1];

      if ( loc === 'yml' ) {
        loc = id;
        id  = 'No prefix';
      }

      var fileObj = {
        path: filePath,
        id: id,
        locale: loc,
      };

      files.push( fileObj );
    });

    return files;
  },

  findYamlFiles: function (startPath,filter,callback) {
    if ( !fs.existsSync(startPath) ) {
      console.log('no dir ',startPath);
      return;
    }

    var files = fs.readdirSync(startPath);
    for(var i=0; i < files.length; i++){
      var filename  = path.join(startPath,files[i]);
      var stat      = fs.lstatSync(filename);

      if ( stat.isDirectory() ) {
        core.findYamlFiles(filename, filter, callback); //recurse
      } else if ( filter.test(filename) ) {
        callback( filename );
      }
    }
  },

  buildYamlDocument: function (files) {
    var doc = {};

    var locales = _.map(files, 'locale');
    var localeObj = {};
    _.each(locales, function(l){
      localeObj[l] = '';
    });

    _.each(files, function(f){
      var data = dotize.convert( core.readYaml( f.path ) );

      _.each(data, function(val, key){
        key = key.replace( f.locale+'.', '' );
        if ( !doc[key] ) { doc[key] = _.clone(localeObj); }
        doc[key][ f.locale ] = val;
      });
    });

    return doc;
  },

  readYaml: function ( filePath ) {
    var doc = {};
    try {
      doc = YAML.safeLoad( fs.readFileSync( filePath, 'utf8' ) );
    } catch (err) {
      console.log(err);
    }

    return doc;
  },

  saveYaml: function ( yaml ) {
    for ( var fi in yaml.files ) {
      var file    = yaml.files[ fi ],
          locale  = file.locale;

      var data = _.clone(yaml.data);
      _.each(data, function(d, key){
        data[key] = d[ locale ];
      });

      dot.object(data);
      var toYaml = {};
      toYaml[ locale ] = data;

      var yamlData = YAML.safeDump( toYaml );
      fs.writeFile( file.path, yamlData, 'utf8' );
    }
  }

};
