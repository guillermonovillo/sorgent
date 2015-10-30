'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: 'dist',
		site: 'site',
		theme: 'sorgente',

		sass: {
			options: {
				includePaths: ['<%= app %>/bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss',
					'<%= app %>/css/foundation.css': '<%= app %>/scss/foundation.scss'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: '<%= dist %>/'
				}]
			}
			// wp: {
			// 	files: [{
			// 		expand: true,
			// 		cwd:'<%= dist %>/',
			// 		src: ['css/**', 'js/*.js'],
			// 		dest: '<%= site %>/wp-content/themes/<%= theme %>/'
			// 	}]
			// }
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/img/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/img/'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			assemble:{
				files: ['<%= app %>/templates/**/*.hbs'],
				tasks: ['assemble','bower-install', ]
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/img/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= app %>/',
					open: true,
					livereload: true,
					hostname: '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.html'
				],
				exclude: [
					'modernizr',
					'jquery-placeholder',
					'foundation'
				]
			}
		},


		assemble: {
            options: {
                flatten: true,
                layout: '<%= app %>/templates/layouts/default.hbs',
                partials: '<%= app %>/templates/partials/*.hbs',
                data: '<%= app %>/templates/data/*.{json,yml}'
            },
            pages: {
                files: {
                    '<%= app %>': ['<%= app %>/templates/pages/*.hbs']
                }
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
		  strict: {
		    options: {
		        important: false
		    },
		    src: ['<%= app %>/css/app.css']
		  },
		  lax: {
		    options: {
		      import: false
		    },
		    src: ['<%= app %>/css/app.css']
		  }
		},

	    sprite: {
		    buildretina: {
		        'src': ['<%= app %>/img/sprites/core/*@2x.png'],
		        'dest': '<%= app %>/img/sprites/sprite@2x.png',
		        'destCss': '<%= app %>/scss/utils/_sprite.scss',
		        'padding': 20
		    },
		    build: {
		        'src': ['<%= app %>/img/sprites/core/*.png', '!<%= sprite.buildretina.src %>'],
		        // dest should be same as in sprite:buildretina task, but without @2x
		        'dest': '<%= app %>/img/sprites/sprite.png',
		        // padding should be twice smaller, than padding in sprite:buildretina task
		        'padding': 10,
		        // path to template
		        'cssTemplate': 'spritesmith-retina-mixins.template.mustache',
		        'destCss': '<%= sprite.buildretina.destCss %>'
		    }
		},

		autoprefixer: {
				options: {
				  browsers: ['last 2 versions', 'ie 9']
				},
			    no_dest: {
			      src: '<%= app %>/css/app.css' // globbing is also possible here
			    }
		},

		csscomb: {
			options: {
	            sortOrder: '.csscomb.json',
	        },
			examples: {
				expand: true,
				cwd: '<%= app %>/css/',
				src: ['**/*.css'],
				dest: '<%= app %>/css/'
			}
    	},

    	uncss: {
		  dist: {
		    options: {
		      ignore: ['']
		    },
		    files: {
		      '<%= dist %>/css//app.min.css': ['dist/*.html']
		    }
		  }
		},

		criticalcss: {
        custom: {
            options: {
                url: 'http://127.0.0.1:9001',
                width: 1200,
                height: 900,
                outputfile: 'dist/css/critical/critical.css',
                filename: 'dist/css/critical/app.min.css',
                buffer: 800*1024,
                ignoreConsole: false
            }
        }
    },
	});

	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-criticalcss');


	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('img', ['sprite']);
	grunt.registerTask('bower-install', ['wiredep']);
	grunt.registerTask('css-lint', ['csslint:lax']);
	grunt.registerTask('css-auto', ['autoprefixer']);
	grunt.registerTask('css-order', ['csscomb']);
	grunt.registerTask('css-clean', ['uncss']);
	grunt.registerTask('css-critical', ['connect:dist','criticalcss']);


	grunt.registerTask('default', ['compile-sass', 'autoprefixer', 'csscomb','css-lint', 'assemble', 'bower-install', 'validate-js', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);

	grunt.registerTask('publish', ['compile-sass', 'autoprefixer', 'csscomb', 'css-lint:strict', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};
