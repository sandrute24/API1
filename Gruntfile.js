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
          environment: 'development',
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
        partials: ['src/templates/partials/{,*/}*.*', 'src/sprites/svg/*'],
        helpers: ['partial'],
        flatten: true
      },
      en: {
        options: {
          data: ['src/templates/data/en/*.yml']
        },
        src: ['src/templates/pages/en/*.hbs'],
        dest: './web'
      },
      lt: {
        options: {
          data: ['src/templates/data/lt/*.yml']
        },
        src: ['src/templates/pages/lt/*.hbs'],
        dest: './web/lt/'
      },
    },
    watch: {
      options: {},
      dev: {
        files: ['src/assets/sass/**/*.scss', 'src/templates/**/*.hbs'],
        tasks: ['compass:dev', 'assemble:site']
      },
      handlebars: {
        files: ['src/templates/*/*.hbs', 'src/templates/layouts/*.hbs'],
        tasks: ['assemble:site']
      }
    },

    svg_sprite: {
      generate: {
        cwd: 'web/assets/vendor/material-design-icons',
        src: [
          '../../../../web/assets/images/ic_menu_24px.svg',
          '../../../../web/assets/images/ic_notification_24px.svg',
          '../../../../web/assets/images/ic_home_24px.svg',
          '../../../../web/assets/images/ic_build_24px.svg',
          '../../../../web/assets/images/ic_indicator_24px.svg',
          '../../../../web/assets/images/ic_love_24px.svg',
          '../../../../web/assets/images/ic_offline_24px.svg',
          '../../../../web/assets/images/ic_pets_24px.svg',
          '../../../../web/assets/images/ic_star_24px.svg',
          '../../../../web/assets/images/ic_dashboard_24px.svg',
          '../../../../web/assets/images/ic_language_24px.svg',
          '../../../../web/assets/images/ic_loyalty_24px.svg',
          '../../../../web/assets/images/ic_front_24px.svg',

        ],
        dest: 'src/sprites',
        options: {
          shape: {
            id: {
              generator: function(filename) {
                var id = filename.match(/ic_(\w+)_\d+/);
                return id[1];
              }
            },
          },
          mode: {
            symbol: {
              dest: ''
            }
          }
        }
      }
    },
  });

  [
    'grunt-contrib-compass',
    'grunt-contrib-watch',
    'grunt-assemble',
    'grunt-svg-sprite'
  ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('assemble:site', [
    'assemble:en',
    'assemble:lt',
  ]);

  grunt.registerTask('default', [
    'compass:dist',
    'assemble:en',
    'assemble:lt',
  ]);

};
