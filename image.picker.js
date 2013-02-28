var ImagePicker = (function() {
  var reader = new FileReader();
  var successCallback;
  var compressImage = function(dataUrl, maxSize, quality, callback) {
    var newWidth, newHeight;
    var img = new Image();
    img.onload = function() {
      var cvs = document.createElement('canvas');
      if (img.naturalWidth > img.naturalHeight && img.naturalWidth > maxSize) {
        newWidth = maxSize;
        newHeight = Math.round(newWidth * (img.naturalHeight / img.naturalWidth));
      } else if  (img.naturalHeight > maxSize) {
        newHeight = maxSize;
        newWidth = Math.round(newHeight * (img.naturalWidth / img.naturalHeight));
      } else {
        newWidth = img.naturalWidth;
        newHeight = img.naturalHeight;
      }
      cvs.width = newWidth;
      cvs.height = newHeight;
//      var ctx = cvs.getContext("2d").drawImage(img,0,0,img.naturalWidth, img.naturalHeight, 0, 0, newWidth, newHeight);
      var ctx = cvs.getContext("2d").drawImage(img, 0, 0, cvs.width, cvs.height);
      callback.call(null, cvs.toDataURL("image/jpeg",quality));
    };
    img.src = dataUrl;
  };

  var reportDataUrl = function() {
    reader.readAsDataURL($("#camera")[0].files[0]);
//    reader.readAsBinaryString($("#camera")[0].files[0]);
  };
  $(document).ready(function() {
    $(document.body).append('<input id="camera" type="file" accept="image/*" style="display:none">');
    $("#camera").change(function(e) {
      setTimeout(reportDataUrl, 0);
    });
  });
  return {
    getPicture: function(success, error, options) {
      successCallback = success;
      reader.onloadend = function(evt) {
        compressImage(evt.target.result, 600, 0.6, function(dataUrl) {
          success(dataUrl);
        });
      };
      $("#camera").trigger("click");
    }
  };
})();