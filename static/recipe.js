// more 눌렸을때 나타나는 팝업메뉴
let rasipi_list = [{
    'img': '12344.gif',
    'recipe_id': '제리',
    'content': '여러분 안녕하세요!',
    'like_count': '1'
}, {'img': '595454.PNG', 'recipe_id': '제리', 'content': '토요일에 한살 더 먹는다 ㅜㅜ', 'like_count': '25'},
    {'img': '12344.jpg', 'recipe_id': '제리', 'content': '발표 너무 떨려', 'like_count': '100'}, {
        'img': '13444.jpg',
        'recipe_id': '제리',
        'content': '같이 롤 하실 분...ㅎ',
        'like_count': '250'
    }, {'img': '15202.PNG', 'recipe_id': '제리', 'content': '쒸익 쒸익!', 'like_count': '300'}]


rasipi(rasipi_list)

function rasipi(data) {
    let b = 1
    for (a of data) {
        let imgsrc = a['img']
        let name = a['recipe_id']
        let comment = a['content']
        let like = a['like_count']
        // let temp = `
        //                <div class ="rasipi-item">
        //                 <div class ="rasipi_main">
        //                         <div class="rasipi-head-container">
        //                             <div class="rasipi-head-wrapper">
        //                                 <img class="rasipi-head-img" src=../static/img/${imgsrc} alt="">
        //                                 <div>${name}${b}</div>
        //                             </div>
        //                             <img class="more-icon"  src=../static/img/more@3x.png alt=""onclick="opendia()">
        //                         </div>
        //                         <img class="rasipi-img" src=../static/img/${imgsrc} alt="">
        //                         <div style="margin-top: -2%;">
        //                             <div class="rasipi-icons-container">
        //                                 <div class="rasipi-icons-wrapper">
        //                                     <img class="feed-icon" style="" onclick="like(this)" src=../static/img/like@3x.png alt=${name}${b}>
        //                                     <img class="feed-icon" src=../static/img/comment@3x.png>
        //                                     <img class="feed-icon" src=../static/img/dm@3x.png>
        //                                 </div>
        //
        //                                 <img class="feed-icon feed-right-icon" style="" onclick="favorite(this)"src=../static/img/favorite@3x.png>
        //
        //                             </div>
        //                             <div class="feed-feed-container">
        //                                 <div class="rasipi-like-wrapper">
        //                                     <img class="rasipi-like-img" src=../static/img/${imgsrc} alt="">
        //                                     <div id="${name}${b}"><strong>${name}${b}</strong>님 외에 <strong id="홍채영likey">${like}명</strong>이 좋아합니다</div>
        //                                 </div>
        //                                 <div class="rasipi-rasipi-wrapper">
        //                                     <div class="feed-msg">
        //                                         <strong>${name}${b}</strong> ${comment}
        //                                     </div>
        //                                     <div class="feed-time">2일 전</div>
        //                                 </div>
        //                             </div>
        //
        //                             </div>
        //                         </div>
        //                     </div>`
        let temp = `<li class ="rasipi_li_list">
                        <div class = "rasipi_img_box">
                            <a class ="rasipi_img">
                                  <img class ="rasipi-imgs" src = ../static/img/${imgsrc} >
                            </a>                          
                        </div>
                        <div class =rasipi_comant_box">
                            <div class="rasipi_commant">
                                      ${comment}                              
                           </div>
                           <div class = "name_box">
                                <img class ="name_img" src =../static/img/${imgsrc}> "${name}"
                           </div>
                           <div class="rasipi_poot_box">
                                <span class ="heart_box" >
                                    <img  style="width: 14px; margin: 0; " src= ../static/img/like@4x.png>
                                    공감수
                                </span>
                                <span class ="heart_count">
                                        ${like}                                
                                </span>
                           
                           </div>
                             
                        </div>
                        
                        </div>


                </li>`
        $('#rasipi_container').append(temp)
        b++
    }
}

let dialog = document.getElementById('dialog');

function opendia() {
    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        alert("The <dialog> API is not supported by this browser");
    }
};
dialog.addEventListener('cancel', function onClose() {
    window.location.reload()
});