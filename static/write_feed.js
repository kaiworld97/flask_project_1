// /write_feed 페이지로딩되며모달팝업뜨게 되어있는데
// 홈부분에서 모달팝업 뜨게 바꿔주실 수 있나요?!

$(document).ready(function(){
    document.getElementById('this-dialog').showModal();
    document.querySelector('#_back').style.visibility = "hidden";
    document.querySelector('#_next').style.visibility = "hidden";
    document.querySelector('#_share').style.visibility = "hidden";

    document.getElementById('filter_part').classList.add('hidden')
    document.getElementById('write_part').classList.add('hidden')

});

// var dialog = document.querySelector('this-dialog');
//     dialogPolyfill.registerDialog(dialog);



function back_home(){
    // console.log('홈으로 돌아가기')
    history.back()
}


// 2200자 넘으면 글자수제한하는부분 추가하기
function contentLength(){

    let max_length = document.querySelector("textarea#_textarea")
    document.querySelector('#maxlen').innerHTML = max_length.value.length + '/2,200';

    console.log(max_length.value.length)

    if (max_length.value.length >= 2200){
        // console.log('2200자넘음')
        alert('2,200자 이내로 작성해 주세요')
    }}


function loadFile(input){

    document.querySelector('#_back').style.visibility = "visible";
    document.querySelector('#_next').style.visibility = "visible";
    document.getElementById('_share').classList.add('hidden')


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

function writeText(){
    document.getElementById('_next').classList.add('hidden')
    document.querySelector('#_share').style.visibility = "visible";
    document.getElementById('_share').classList.remove('hidden')
    document.getElementById('write_part').classList.remove('hidden')
}



 function posting() {
    // let title = $('#chooseFile')[0].files[0].name
    let file = $('#select_file')[0].files[0]
    let content = $('#_textarea').val()
     console.log(content)
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

