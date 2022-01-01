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
    // let likey = Number(document.getElementById(`${data.id}likey`).innerText.split('명')[0])
    let feed_id = data.id.split('_')[0]
    let id = 'carrot_vely'
    if (data.attributes[2].value === '/static/img/like@3x.png'){
        data.setAttribute('src', '/static/img/like@4x.png')
            $.ajax({
                type: 'POST',
                url: '/feed_like',
                data: {'feed_id': feed_id, 'id': id, 'type': 'up'},
                success: function (response) {
                    window.location.reload()
                }
            });
    } else {
        data.setAttribute('src', '/static/img/like@3x.png')
            $.ajax({
                type: 'POST',
                url: '/feed_like',
                data: {'feed_id': feed_id, 'id': id, 'type': 'down'},
                success: function (response) {
                    window.location.reload()
                }
            });
    }
}
function favorite(data){
    if (data.attributes[3].value === '/static/img/favorite@3x.png'){
        data.setAttribute('src', '/static/img/favorite@4x.png')


    }else {
        data.setAttribute('src', '/static/img/favorite@3x.png')

    }
}
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
