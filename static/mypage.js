let feed_table = [{
    'feed_img': '12344.gif',
    'recipe_id': '제리',
    'content': '여러분 안녕하세요!',
    'like_count': '1'
},

    {
        'feed_img': '595454.PNG',
        'recipe_id': '제리',
        'content': '토요일에 한살 더 먹는다 ㅜㅜ',
        'like_count': '25'
    },

    {
        'feed_img': '12344.jpg',
        'recipe_id': '제리',
        'content': '발표 너무 떨려',
        'like_count': '100'
    },
    {
        'feed_img': '13444.jpg',
        'recipe_id': '제리',
        'content': '같이 롤 하실 분...ㅎ',
        'like_count': '250'
    },
    {
        'feed_img': '15202.PNG',
        'recipe_id': '제리',
        'content': '쒸익 쒸익!',
        'like_count': '300'
    }]
let rasipi_table = [{
    'rasipi_img': '12344.gif',
    'feed_id': '제리',
    'content': '여러분 안녕하세요!',
    'like_count': '1'
},

    {
        'rasipi_img': '595454.PNG',
        'feed_id': '제리',
        'content': '토요일에 한살 더 먹는다 ㅜㅜ',
        'like_count': '25'
    },

    {
        'rasipi_img': '12344.jpg',
        'feed_id': '제리',
        'content': '발표 너무 떨려',
        'like_count': '100'
    },

    {
        'rasipi_img': '13444.jpg',
        'feed_id': '제리',
        'content': '같이 롤 하실 분...ㅎ',
        'like_count': '250'
    },

    {
        'rasipi_img': '15202.PNG',
        'feed_id': '제리',
        'content': '쒸익 쒸익!',
        'like_count': '300'
    }]


let user_table = [{
    'user_img': '12344.gif',
    'feed_id': '제리',
    'content': '여러분 안녕하세요!',
    'like_count': '1'
},

    {
        'user_img': '595454.PNG',
        'feed_id': '제리',
        'content': '토요일에 한살 더 먹는다 ㅜㅜ',
        'like_count': '25'
    },

    {
        'user_img': '12344.jpg',
        'feed_id': '제리',
        'content': '발표 너무 떨려',
        'like_count': '100'
    },

    {
        'user_img': '13444.jpg',
        'feed_id': '제리',
        'content': '같이 롤 하실 분...ㅎ',
        'like_count': '250'
    },

    {
        'user_img': '15202.PNG',
        'feed_id': '제리',
        'content': '쒸익 쒸익!',
        'like_count': '300'
    }]


/*1번 텝에 넣을 내용*/
feed(feed_table)

/*2번 텝에 넣을 내용*/
rasipi(rasipi_table)

/*3번 텝에 넣을 내용*/
user(user_table)

function feed(data) {
    let b = 1
    for (a of data) {
        let feed_img = a['feed_img']
        let feed_contain = `<li class ="myp_li_list">
                        <div class = "rasipi_img_box">
                            <a class ="rasipi_img">
                                  <img class ="myp-imgs" src = ../static/img/${feed_img} >
                            </a>                          
                        </div>                                                   
                </li>`


        $('#feed-img-contain').append(feed_contain)
        b++
    }
}

function rasipi(data) {
    let b = 1
    for (a of data) {
        let rasipi_img = a['rasipi_img']

        let rasipi_contain = `<li class ="myp_li_list">
                        <div class = "myp_img_box">
                            <a class ="rasipi_img">
                                  <img class ="myp-imgs" src = ../static/img/${rasipi_img} >
                            </a>                          
                        </div>                                                   
                </li>`

        $('#rasipi-img-contain').append(rasipi_contain)
        b++
    }
}

function user(data) {
    let b = 1
    for (a of data) {
        let user_img = a['user_img']
        let user_contain = `<li class ="myp_li_list">
                        <div class = "rasipi_img_box">
                            <a class ="rasipi_img">
                                  <img class ="myp-imgs" src = ../static/img/${user_img} >
                            </a>                         
                      
                        </div>                                                
                </li>`
        $('#user-img-contain').append(user_contain)

        b++
    }
}


function eventHandler(e) {
    var $eTarget = $(e.currentTarget);
    var $targetPanel = $('[aria-labelledby="' + $eTarget.attr('id') + '"]');
    $eTarget
        .attr('aria-selected', true)
        .addClass('Mypage-grid-box-active') // 구버전 IE
        .siblings('[role="tab"]')
        .attr('aria-selected', false)
        .removeClass('Mypage-grid-box-active'); // 구버전 IE

    $targetPanel
        .attr('aria-hidden', false)
        .addClass('panel') // 구버전 IE
        .siblings('[role="tabpanel"]')
        .attr('aria-hidden', true)
        .removeClass('panel'); // 구버전 IE
}

// 이벤트 바인딩 - 이벤트와, 실행될 함수를 연결해줌
$('[role="tab"]').on('click', eventHandler);



