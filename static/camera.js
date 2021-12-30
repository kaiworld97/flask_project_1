(function() {
  var width = 600;
  var height = 0;
  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;


  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
      document.getElementById('cameraoff').addEventListener('click', function () {
            stopStream(stream);
        });
    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);


        if (isNaN(height)) {
          height = width / (4/3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);

    clearphoto();
  }


  function stopStream(stream) {
  console.log('stop called');
  stream.getVideoTracks().forEach(function (track) {
      track.stop();
  });}


  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/jpeg');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }

  document.getElementById('cameraon').addEventListener('click', startup, false);
})();

function copyimg(){
  html2canvas($("#photo")[0]).then(function(canvas){
  canvas.toBlob(function(blob) {
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
      });
  });
}
  $("#copyimg").on('click', function(e) {
  html2canvas($("#canvas")[0]).then(function(canvas) {
  document.body.appendChild(canvas)
  });
  html2canvas($("#canvas")[0]).then(function(canvas) {
  $('body').append('<img src="' + canvas.toDataURL("image/jpeg") + '"/>');
  });
});
