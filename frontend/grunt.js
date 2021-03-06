module.exports = function(grunt) {
  'use strict';

  var prodStaticRoot = '../kanjihub/static/';

  // Load up npm task plugins
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-exec');
  // Load up local tasks
  grunt.loadTasks('grunt/tasks');
  grunt.loadTasks('grunt/helpers');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      grunt: 'grunt.js',
      tests: 'test/**/*.js',
      frontend: 'public/js/**/*.js'
    },
    recess: {
      dev: {
        src: ['public/less/**/*.less'],
        dest: prodStaticRoot + 'css/style.css',
        options: {
          compile: true
        }
      },
      prod: {
        src: ['public/less/**/*.less'],
        dest: prodStaticRoot + 'css/style.css',
        options: {
          compile: true,
          compress: true
        }
      }
    },
    concat: {
      prod: {
        src: ['public/extern/require/require.min.js'],
        dest: prodStaticRoot + 'js/require.min.js'
      }
    },
    requirejs: {
      baseUrl: 'public/js',
      name: 'main',
      mainConfigFile: 'public/js/main.js',
      out: prodStaticRoot + 'js/main.min.js',
      preserveLicenseComments: false
    },
    handlebars: {
      srcRoot: 'public/templates/',
      src: 'public/templates/**/*.handlebars',
      dest: 'public/dist/templates/'
    },
    mochaphantom: {
      src: 'test/**/*.js',
      requirejsConfig: '',
      // The port here must match the one used below in the server config
      testRunnerUrl: 'http://127.0.0.1:3002/testrunner/index.html'
    },
    server: {
      port: 3002,
      base: '.'
    },
    watch: {
      less: {
        files: ['<config:recess.dev.src>'],
        tasks: 'less'
      },
      templates: {
        files: ['<config:handlebars.src>'],
        tasks: 'templates'
      },
      lint: {
        files: ['<config:lint.frontend>'],
        tasks: 'lint'
      }
    },
    jshint: {
      // Defaults
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        strict: true,
        es5: true,
        trailing: true,
        maxlen: 80,
        browser: true
      },
      globals: {
        define: true,
        require: true,
        module: true
      },
      tests: {
        options: {},
        globals: {
          describe: true,
          it: true,
          expect: true,
          spyOn: true,
          beforeEach: true,
          afterEach: true,
          setFixtures: true
        }
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('less', 'recess:dev');
  grunt.registerTask('compile', 'requirejs');
  grunt.registerTask('templates', 'handlebars');
  grunt.registerTask('copyrequire', 'concat:prod');

  // Does a basic build.
  grunt.registerTask('default', 'lint templates recess:dev');
  // Does a full production-ready build and compresses and minifies everything.
  grunt.registerTask('prod', 'lint templates copyrequire compile recess:prod');
  grunt.registerTask('test', 'server mochaphantom');
};
