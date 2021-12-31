$(document).ready(function(){
    show_feed()
    });

function back_home(){
    // console.log('홈으로 돌아가기')
    history.back()
}


// 2200자 넘으면 글자수제한하는부분 추가하기
function contentLength(){
    let max_length = document.querySelector("textarea#textarea")
    document.querySelector("span.content_length").innerHTML = max_length.value.length + '/2,200';

    if (max_length.value.length >= 2200){
        // console.log('2200자넘음')
        alert('2,200자 이내로 작성해 주세요')
    }}

function loadFile(input){
    // let file_name = input.files[0]['name']
    let file = input.files[0];
    let file_img = document.createElement("img");
    file_img.setAttribute("class", 'img')
   file_img.src = URL.createObjectURL(file);

    file_img.style.width = "100%";
    file_img.style.height = "100%";
    file_img.style.visibility = "visible";
    file_img.style.objectFit = "contain"

    $("#svg_icon").remove();
    $("#up_msg").remove();


    let container = document.getElementById("pharea_one");
    container.style.width = "70%";
    container.appendChild(file_img);
}

// 프로필사진이랑 닉네임은 DB에서 받아오기?(현재로그인한계정의..)

// 입력값DB로보내기
// 사진 ->???f
// 닉네임 = id.value
// 게시글내용 = text_content.value



 function posting() {
    console.log('올리기')
    let title = $('#chooseFile')[0].files[0].name
    let file = $('#chooseFile')[0].files[0]
    let content = $('#textarea').val()
    // 지금은 유저id 직접 타이핑한거라 .text로했지만 db에서 불러올경우 수정필요
    let user_id = document.querySelector("#user_name").textContent

     console.log('title:',title, '파일:',file, '내용:', content, 'id:' ,user_id)

     let form_data = new FormData()

    form_data.append("title_give", title)
    form_data.append("file_give", file)
    form_data.append("content_give", content)
    form_data.append("id_give", user_id)

    $.ajax({
        type: "POST",
        url: '/feed_upload',
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["msg"])
            history.back()
        }
    });
  }

  // 사진 불러올페이지에 해당하는 js파일에 함수 추가
  function show_feed(){
    $.ajax({
        type: "GET",
        url: "/feed_read",
        data: {},
        success: function (response) {
            console.log(response)
        }
  })
}




// 레이어팝업기능만들기