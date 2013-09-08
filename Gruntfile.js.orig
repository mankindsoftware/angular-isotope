module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        library: grunt.file.readJSON('bower.json'),
        concat: {
            options: {
                separator: ''
            },
            library: {
                src: [
                    'src/<%= library.name %>/<%= library.name %>.prefix',
                    'src/<%= library.name %>/<%= library.name %>.js',
                    'src/<%= library.name %>/controllers/**/*.js',
                    'src/<%= library.name %>/directives/**/*.js',
                    'src/<%= library.name %>/filters/**/*.js',
                    'src/<%= library.name %>/services/**/*.js',
                    'src/<%= library.name %>/<%= library.name %>.suffix'
                ],
                dest: 'dist/<%= library.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            jid: {
                files: {
                    'dist/<%= library.name %>.min.js': ['<%= concat.library.dest %>']
                }
            }
        },
        jshint: {
            beforeConcat: {
                src: ['gruntfile.js', '<%= library.name %>/**/*.js']
            },
            afterConcat: {
                src: [
                    '<%= concat.library.dest %>'
                ]
            },
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    angular: true
                },
                globalstrict: false
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['dist/<%= library.name %>.min.js'], dest: 'demo/scripts/<%= library.name %>.min.js'},
                    {src: ['dist/<%= library.name %>.js'], dest: 'demo/scripts/<%= library.name %>.js'}
                ]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: [
                'Gruntfile.js',
                'src/**/*'
            ],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat', 'uglify', 'copy:main']);
    grunt.registerTask('livereload', ['default', 'watch']);

};
