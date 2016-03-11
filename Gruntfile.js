module.exports = function(grunt) {
    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
         },
         build: {
            src: 'client/app.js',
            dest: 'server/public/scripts/app.min.js'
         }
       },
       copy: {
         main : {
           expand: true,
           cwd: "node_modules/jquery/dist/",
           src: "jquery.min.js",
           dest: "server/public/vendors/"
         }
       }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
}
