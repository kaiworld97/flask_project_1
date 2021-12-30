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


// 프로필사진이랑 닉네임은 DB에서 받아오기?(현재로그인한계정의..)

// 입력값DB로보내기
// 사진 ->???f
// 닉네임 = id.value
// 게시글내용 = text_content.value

function img_upload(){
    console.log('올리기')
}

// 레이어팝업기능만들기