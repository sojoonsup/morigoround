module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // uglify: {
        //     options: {
        //         mangle: false
        //     },
        //     my_target:{
        //         files:{
        //             'public/js/*.js': ['public/js/deploy/']
        //         }
        //     }
        // },
        sass: {
            options:{
                style: 'compact',
                // banner: '<%= meta.banner %>\n',
                sourcemap: 'none',
                dest: 'public/css/',
                loadPath: [
                    'bower_components/bourbon/app/assets/stylesheets',
                    'bower_components/neat/app/assets/stylesheets'
                ]
            },
            dist: {
                files: {
                    'public/css/main.css': 'sass/main.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css/',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass:{
                options:{
                    livereload: true
                },
                files:['sass/**/*.scss'],
                tasks:['sass']
            },
            express:{
                files: ['src/*.js'],
                tasks : ['express:dev'],
                options: {
                    spawn:false
                }
            }
        },
        express: {
            options: {
                // Override defaults here 
            },
            dev: {
                options: {
                    script: 'src/server.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-express-server');


    grunt.registerTask('serve', [
        'sass',
        'cssmin',
        'express',
        'watch'
    ]);
    grunt.registerTask('deploy', [
        'sass',
        'cssmin',
        'express'
    ]);
};
