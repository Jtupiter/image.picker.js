module.exports = function (grunt) {
  grunt.initConfig({
    min      :{
      "image.picker.min.js":[
        "canvas-to-blob.js",
        "image.picker.js"
      ]
    }
  });
  grunt.registerTask("release", "min");
};