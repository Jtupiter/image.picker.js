image.picker.js
===============

A project to capture, modify and upload images using web technologies

###USAGE:

##Select an image and render it:

```javascript
ImagePicker.pick(function() {
    ImagePicker.setMaxEdge(1024);
    ImagePicker.render();
    $(document.body).append(ImagePicker.canvas());
});
```
##Get canvas contents and upload to server:

```javascript
ImagePicker.canvas().toBlob(function(blob) {
  var data = new FormData();
  data.append("upload", blob, "test.jpg");
  $.ajax('upload.php', {
    type:"POST",
    processData: false,
    contentType: false,
    data: data,
    success: function(response) {
      alert("Success!");
    },
    error: function(xhr, status, error) {
      alert(status + " " + error);
    }
  });
}, "images/jpeg", 0.6);
```

###DEPENDENCIES:

Added canvas-to-blob.js polyfill for browsers that don't support: https://github.com/blueimp/JavaScript-Canvas-to-Blob

###TESTED ON:
Firefox, Safari, Chrome