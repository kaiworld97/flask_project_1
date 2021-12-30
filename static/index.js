let dialog = document.getElementById('dialog');

function opendia() {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    alert("The <dialog> API is not supported by this browser");
  }
}
dialog.addEventListener('cancel', function onClose() {
    window.location.reload()
});


let story_list = [{'src': '/static/img/12344.gif', 'name': '제리','msg':'여러분 안녕하세요!'},{'src': '/static/img/595454.PNG', 'name': '제리','msg':'토요일에 한살 더 먹는다 ㅜㅜ'},
                    {'src': '/static/img/12344.jpg', 'name': '제리','msg':'발표 너무 떨려'},{'src': '/static/img/13444.jpg', 'name': '제리','msg':'같이 롤 하실 분...ㅎ'},{'src': '/static/img/15202.PNG', 'name': '제리','msg':'쒸익 쒸익!'}]
function storyclick(data){
    data.classList.replace('story-img', 'clicked-story-img')
}
function like(data){
    let likey = Number(document.getElementById(`${data.alt}likey`).innerText.split('명')[0])

    if (data.attributes[3].value === '/static/img/like@3x.png'){
        data.setAttribute('src', '/static/img/like@4x.png')
        document.getElementById(`${data.alt}likey`).innerText = `${String(likey + 1)}명`
    }else {
        data.setAttribute('src', '/static/img/like@3x.png')
        document.getElementById(`${data.alt}likey`).innerText = `${String(likey - 1)}명`
    }
}
function favorite(data){
    if (data.attributes[3].value === '/static/img/favorite@3x.png'){
        data.setAttribute('src', '/static/img/favorite@4x.png')
        $('.feed-icon').off('hover');


    }else {
        data.setAttribute('src', '/static/img/favorite@3x.png')

    }
}
makefeed(story_list)
makestory(story_list)
makestory(story_list)
followme(story_list)
function makestory(data){
    let b = 1
    for (a of data){
        let imgsrc = a['src']
        let name = a['name']

        let storytemp = `<div class="story-wrapper">
                    <img class="story-img " src="${imgsrc}" alt="" onClick="storyclick(this)">
                        <div>${name}${b}</div>
                </div>`

        $('#story-container').append(storytemp)
        b++
    }
}
function makefeed(data){
    let b = 1
    for (a of data){
        let imgsrc = a['src']
        let name = a['name']
        let msg = a['msg']
        let feedtemp = `<div class="feed-wrapper">
                            <div class="feed-head-container">
                                <div class="feed-head-wrapper">
                                    <img class="feed-head-img" src="${imgsrc}" alt="">
                                    <div>${name}${b}</div>
                                </div>
                                <img class="more-icon" style="" src="/static/img/more@3x.png" alt="" onclick="opendia()">
                            </div>
                            <img class="feed-img" src="${imgsrc}" alt="">
                            <div>
                                <div class="feed-icons-container">
                                    <div class="feed-icons-wrapper">
                                        <img class="feed-icon" style=""  onclick="like(this)" src="/static/img/like@3x.png" alt="${name}${b}">
                                        <img class="feed-icon" src="/static/img/comment@3x.png">
                                        <img class="feed-icon" src="/static/img/dm@3x.png">
                                    </div>

                                    <img class="feed-icon feed-right-icon" style="" onclick="favorite(this)" src="/static/img/favorite@3x.png">

                                </div>
                                <div class="feed-feed-container">
                                    <div class="feed-like-wrapper">
                                        <img class="feed-like-img" src="${imgsrc}" alt="">
                                        <div id="${name}${b}" class="flex"><div class="strong">${name}${b}</div>님 외에 <div id="${name}${b}likey" class="strong">9999명</div>이 좋아합니다</div>
                                    </div>
                                    <div class="feed-feed-wrapper">
                                        <div class="feed-msg flex">
                                            <div class="strong">${name}${b}</div> ${msg}
                                        </div>
                                        <div class="feed-comment-wrapper">
                                            <div class="comment-write-wrapper">
                                                <b style="font-weight: bold">user-id(?)</b>
                                                <input type="text" class="comment">
                                                
                                            </div>
                                            <div class="comment-box">
<!--                                            여기에 댓글 추가-->
                                            </div>
                                            <button onclick="comment_write()">작성</button>
                                           
                                        </div>
                                        <div class="feed-time">12시간 전</div>
                                    </div>

                                </div>
                            </div>
                        </div>`

        $('#feed-container').append(feedtemp)
        b++
    }
}
function followme(data){
    let b = 1
    for (a of data){
        let imgsrc = a['src']
        let name = a['name']
        let temp = `<div class="container">
                        <div class="wrapper">
                            <div><img class="icon" src="${imgsrc}"/>
                            </div>
                            <div style="padding-left: 5%">
                                <div class='strong'>${name}${b}${b}</div>
                                <p>회원님을 위한 추천</p>
                            </div>
                        </div>
                        <p>팔로우</p>
                    </div>`
        $('#follow-people').append(temp)
        b++
    }
}
