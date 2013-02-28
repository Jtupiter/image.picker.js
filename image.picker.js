var ImagePicker = (function () {
  var reader = new FileReader();
  var fileInputElement;
  var successCallback;
  var img;
  var imageCanvas;
  var context;
  var rotation = 0;
  var width, height;

  var drawImage = function (dataUrl) {
    img = new Image();
    img.onload = function () {
      successCallback && successCallback();
    };
    img.src = dataUrl;
  };

  var clearCanvas = function () {
    context.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  };

  var render = function () {
    switch (rotation) {
      case 0:
        rotate0();
        break;
      case 1:
        rotate90();
        break;
      case 2:
        rotate180();
        break;
      case 3:
        rotate270();
        break;
    }
  };

  var setMaxEdge = function (edgeLength) {
    if (img.naturalWidth > img.naturalHeight && img.naturalWidth > edgeLength) {
      width = edgeLength;
      height = Math.round(width * (img.naturalHeight / img.naturalWidth));
    } else if (img.naturalHeight > edgeLength) {
      height = edgeLength;
      width = Math.round(height * (img.naturalWidth / img.naturalHeight));
    } else {
      width = img.naturalWidth;
      height = img.naturalHeight;
    }
  };

  var skew = function (w, h) {
    width = w;
    height = h;
  };

  var rotate0 = function () {
    imageCanvas.width = width;
    imageCanvas.height = height;
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, width, height);
  };

  var rotate90 = function () {
    imageCanvas.width = height;
    imageCanvas.height = width;
    context.save();
    context.translate(height / 2, width / 2);
    context.rotate(Math.PI / 2);
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, -width / 2, -height / 2, width, height);
    context.restore();
  };

  var rotate180 = function () {
    imageCanvas.width = width;
    imageCanvas.height = height;
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(Math.PI);
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, -width / 2, -height / 2, width, height);
    context.restore();
  };

  var rotate270 = function () {
    imageCanvas.width = height;
    imageCanvas.height = width;
    context.save();
    context.translate(height / 2, width / 2);
    context.rotate(-Math.PI / 2);
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, -width / 2, -height / 2, width, height);
    context.restore();
  };

  var readDataURL = function () {
    reader.onloadend = function (event) {
      drawImage(event.target.result);
    };
    reader.readAsDataURL(fileInputElement.files[0]);
  };

  $(document).ready(function () {
    fileInputElement = document.createElement("input");
    fileInputElement.type = "file";
    fileInputElement.accept = "image/*";
    fileInputElement.style.display = "none";
    fileInputElement.addEventListener("change", function (e) {
      setTimeout(readDataURL, 0);
    }, false);
    document.body.appendChild(fileInputElement);
    imageCanvas = document.createElement('canvas');
    context = imageCanvas.getContext("2d");
  });
  return {
    pick      :function (success) {
      successCallback = success;
      $(fileInputElement).trigger("click");
    },
    canvas    :function () {
      return imageCanvas;
    },
    render    :render,
    skew      :skew,
    setMaxEdge:setMaxEdge,
    rotateCW  :function () {
      rotation = (rotation + 1) % 4;
      render();
    },
    rotateCCW :function () {
      rotation--;
      if (rotation < 0) {
        rotation = 3;
      }
      render();
    },
    getDataURL:function () {
      return cvs.toDataURL("image/jpeg", 1);
    }
  };
})();