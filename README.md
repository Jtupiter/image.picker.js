image.picker.js
===============

A project to capture, modify and upload images using web technologies

USAGE:

```javascript
    var getPicture = function() {
        ImagePicker.pick(function() {
            ImagePicker.setMaxEdge(1024);
            ImagePicker.render();
            $(document.body).append(ImagePicker.canvas());
        });
    };
```