'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    uglify: {
      all: {
        files: {
          "image.picker.min.js":[
            "canvas-to-blob.js",
            "image.picker.js"
          ]
        }
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
