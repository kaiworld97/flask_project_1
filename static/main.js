function load() {
    window.location.reload()
    window.scrollTo(0, 0)
}

function back() {
    history.back()
}

function go_main() {
    location.href = '/'
}

function go_recipe() {
    location.href = '/recipe'
}

function go_auction() {
    location.href = '/auction'
}

$(window).on('load', function () {
    setTimeout(function () {
        $("#waiting").fadeOut();
    }, 500);
});

function dropdownmenu() {
    document.getElementById("dropdown").classList.toggle("show");
}

function dropupmenu() {
    document.getElementById("dropup").classList.toggle("show");
}

function feed_write_dialog() {
     document.getElementById("feed_write_dialog").showModal();

    document.querySelector('#_back').style.visibility = "hidden";
    document.querySelector('#_next').style.visibility = "hidden";
    document.querySelector('#_share').style.visibility = "hidden";

    document.getElementById('second_part').classList.add("hidden")

}

function feed_recipe_dialog() {
    document.getElementById("recipe_write_dialog").showModal();
}

function camera_dialog() {
    document.getElementById("camera_dialog").showModal();
}

function close_camera_dialog() {
    document.getElementById('camera_dialog').close()
}


(function () {
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
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
                document.getElementById('cameraoff').addEventListener('click', function () {
                    stopStream(stream);
                });
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function (ev) {
            var width = document.getElementById("all-container").offsetWidth;
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);


                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function (ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }


    function stopStream(stream) {
        console.log('stop called');
        stream.getVideoTracks().forEach(function (track) {
            track.stop();
        });
    }


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
        document.getElementById('camera_feed').classList.remove('hidden')
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
    document.getElementById('camera_icon').addEventListener('click', startup, false);
    // window.addEventListener('load', startup, false);
})();

function camera_posting(data) {
    let camera_feed = $('#camera_feed').val()
    let img = $('#photo').attr('src')
    fetch(img)
        .then(res => res.blob())
        .then(blob => {

            const file = new File([blob], 'photo.png', blob)
            const date = new Date();
            let time = String(date.getTime())
            let form_data = new FormData()
            let user_id = data

            form_data.append("file_give", file)
            form_data.append("content_give", camera_feed)
            form_data.append("id_give", user_id)
            form_data.append("date_give", time)

            $.ajax({
                type: "POST",
                url: '/feed_upload',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    alert(response["msg"])
                    location.href = '/'
                }
            });
        })
}


function back_home() {
    // console.log('홈으로 돌아가기')
    history.back()
}


// 2200자 넘으면 글자수제한하는부분 추가하기
function contentLength() {

    let max_length = document.querySelector("#textarea")
    document.querySelector('#max-len').innerHTML =  max_length.value.length + '/2,200';

    console.log(max_length.value, max_length.value.length)

    if (max_length.value.length >= 2200){
        // console.log('2200자넘음')
        alert('2,200자 이내로 작성해 주세요')
    }
}


function loadFile(input) {

    document.querySelector('#_back').style.visibility = "visible";
    document.querySelector('#_next').style.visibility = "visible";
    document.getElementById('_share').classList.add('hidden')
    document.getElementById('header_title').classList.add('hidden')


    // let file_name = input.files[0]['name']
    let file = input.files[0];
    let file_img = document.createElement("img");
    file_img.setAttribute("class", 'img')
    file_img.src = URL.createObjectURL(file);

    file_img.style.width = "100%";
    file_img.style.height = "100%";
    file_img.style.visibility = "visible";
    file_img.style.objectFit = "cover"

    document.getElementById('uf_one').classList.add('hidden')
    document.getElementById('uf_two').classList.add('hidden')
    document.getElementById('uf_three').classList.add('hidden')


    let container = document.getElementById("upload_box");
    container.style.width = "100%";
    container.appendChild(file_img);
}

function writeText() {
    document.getElementById('_next').classList.add('hidden')
    document.querySelector('#_share').style.visibility = "visible"
    document.getElementById('_share').classList.remove('hidden')
    document.getElementById('second_part').classList.remove('hidden')


}


function posting() {
    // let title = $('#chooseFile')[0].files[0].name
    let file = $('#select_file')[0].files[0]
    let content = $('#textarea').val()
    // 지금은 유저id 직접 타이핑한거라 .text로했지만 db에서 불러올경우 수정필요
    let user_id = document.querySelector("#user_name").textContent
    const date = new Date();
    let time = String(date.getTime())
    let form_data = new FormData()

    // console.log(file, content, user_id, date, time, form_data)

    // form_data.append("title_give", title)
    form_data.append("file_give", file)
    form_data.append("content_give", content)
    form_data.append("id_give", user_id)
    form_data.append("date_give", time)

    $.ajax({
        type: "POST",
        url: '/feed_upload',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["msg"])
            location.href = '/'
        }
    });
}

