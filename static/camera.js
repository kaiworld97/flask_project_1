(function() {

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
      var width = document.getElementById("all-container").offsetWidth;
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
    var width = document.getElementById("all-container").offsetWidth;
    document.getElementById('video').classList.add('hidden')
    document.getElementById('startbutton').classList.add('hidden')
    document.getElementById('restart').classList.remove('hidden')
    document.getElementById('output').classList.remove('hidden')
    document.getElementById('camerafeed').classList.remove('hidden')
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

  window.addEventListener('load', startup, false);
})();

function posting() {
    let camerafeed = $('#camerafeed').val()
    let file = $('#photo')[0]
    let form_data = new FormData()

    form_data.append("camerafeed_give", camerafeed)
    form_data.append("file_give", file)

    $.ajax({
        type: "POST",
        url: "/camerafeedupload",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["result"])
            window.location.reload()
        }
    });
  }