module.exports = function (grunt) {
  grunt.initConfig({
    min      :{
      "image.picker.min.js":[
        "image.picker.js"
      ]
    }
  });
  grunt.registerTask("release", "min");
};