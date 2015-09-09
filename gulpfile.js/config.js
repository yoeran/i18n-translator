  /* ---------------------------------------
    CONFIG
   --------------------------------------- */

var dist    = './dist';
var source  = './app';
var tmp     = './.tmp';

module.exports = {
  paths: {
    dist: dist,
    source: source,
    tmp: tmp
  },

  lint: [
    source+'/scripts/**/*.js'
  ],

  nodewebkit: {
    global: {
      files: tmp+'/**/**',
      macIcns: './icon.icns',
      macPlist: {
        CFBundleName: 'i18n_translator',
        CFBundleDisplayName: 'i18n_translator',
        CFBundleIdentifier: 'com.yoeran.i18n_translator',
        CFBundleDevelopmentRegion: 'nl'
      },
      version: '0.12.2'
    },
    dist: {
      platforms: ['osx64', 'win32'],
      buildType: 'versioned',
      macZip: true
    },
    debug: {
      platforms: ['osx64'],
      buildDir: './debug'
    }
  },

  clean: {
    all: tmp
  },

  autoprefixer: {
    browsers: ['Chrome >= 35'],
    cascade: false
  },

  copy: {
    source: [
      source+'/**/*.*',
      '!'+source+'/scripts/**',
      '!**/{examples,demo,benchmark,benchmarks,test,tests}/**',
      '!**/*.scss'
    ],
    dest: tmp
  }
};
