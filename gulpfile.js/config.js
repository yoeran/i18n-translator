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
      // macIcns: './icon.icns',
      macPlist: {
        CFBundleName: 'I18n Translator',
        CFBundleDisplayName: 'I18n Translator',
        CFBundleIdentifier: 'com.yoeran.i18n_translator',
        CFBundleDevelopmentRegion: 'nl'
      },
      version: '0.12.2'
    },
    dist: {
      platforms: ['win','osx','linux'],
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
