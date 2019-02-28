module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      compass: {
          options: {
              sassDir: 'src/assets/sass',
              imagesDir: 'src/img',
              cssDir: 'web/assets/css',
              force: true
          },
          dist: {
              options: {
                  environment: 'production',
                  noLineComments: true
              }
          },
          dev: {
              options: {
                  noLineComments: true
              }
          },
          watch: {
              options: {
                  noLineComments: true,
                  watch: true
              }
          }
      },
      assemble: {
        options: {
            layoutdir: 'src/templates/layouts',
            layout: ['default.hbs'],
            partials: ['src/templates/partials/{,*/}*.*'],
            helpers: ['partial'],
            flatten: true
        },
        en: {
            options: {
                data: ['src/templates/data/en/*.yml', 'src/templates/data/*.yml']
            },
            src: ['src/templates/pages/en/*.hbs'],
            dest: './web'
        },
    },
    watch: {
        options: {
        },
        dev: {
            files: ['src/assets/sass/**/*.scss', 'src/templates/**/*.hbs'],
            tasks: ['compass:dev', 'assemble:en']
        },
        handlebars: {
            files: ['src/templates/*/*.hbs', 'src/templates/layouts/*.hbs' ],
            tasks: ['assemble:en']
        }
    },
  });

  [
    'grunt-contrib-compass',
    'grunt-contrib-watch',
    'grunt-assemble',
].forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('default', [
      'compass:dist',
      'assemble:en'
  ]);

};
