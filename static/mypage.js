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
    let c = 1
    let feed_wrapper = `<div id="img-wrapper1" class="img-wrapper"></div>`
    $('#Mypage-panel1').append(feed_wrapper)
    for (a of data) {
        let feed_img = a['feed_img']

        if (b % 3 == 0 && b != 0){
            let feed_div = `
            <div>
                <a href="#">
                    <div>
                        <img src="/static/img/${feed_img}" class="mypageimg">
                    </div>
                </a>
            </div>
            `
            $(`#img-wrapper${c}`).append(feed_div)
        }else {
            let feed_div = `
                <div class="margin-right-div">
                    <a href="#">
                        <div>
                            <img src="/static/img/${feed_img}" class="mypageimg">
                        </div>
                    </a>
                </div>
                `
            $(`#img-wrapper${c}`).append(feed_div)
        }
        if (b % 3 == 0 && b != 0) {
            c++
            let feed_wrapper1 = `<div id="img-wrapper${c}" class="img-wrapper"></div>`
            $('#Mypage-panel1').append(feed_wrapper1)
        }
        b++
    }
    if ((b-1) % 3 != 0){
        let d = 3 - ((b-1) % 3)

        if (d == 1){
            let feed_div = `
                <div>
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}`).append(feed_div)
        }else {
            let feed_div = `
                <div class="margin-right-div">
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}`).append(feed_div)

            let feed_div1 = `
                <div>
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}`).append(feed_div1)
        }
    }
}

function rasipi(data) {
    let b = 1
    let c = 1
    let feed_wrapper = `<div id="img-wrapper12" class="img-wrapper"></div>`
    $('#Mypage-panel2').append(feed_wrapper)
    for (a of data) {
        let feed_img = a['rasipi_img']

        if (b % 3 == 0 && b != 0){
            let feed_div = `
            <div>
                <a href="#">
                    <div>
                        <img src="/static/img/${feed_img}" class="mypageimg">
                    </div>
                </a>
            </div>
            `
            $(`#img-wrapper${c}2`).append(feed_div)
        }else {
            let feed_div = `
                <div class="margin-right-div">
                    <a href="#">
                        <div>
                            <img src="/static/img/${feed_img}" class="mypageimg">
                        </div>
                    </a>
                </div>
                `
            $(`#img-wrapper${c}2`).append(feed_div)
        }
        if (b % 3 == 0 && b != 0) {
            c++
            let feed_wrapper1 = `<div id="img-wrapper${c}2" class="img-wrapper"></div>`
            $('#Mypage-panel2').append(feed_wrapper1)
        }
        b++
    }
    if ((b-1) % 3 != 0){
        let d = 3 - ((b-1) % 3)

        if (d == 1){
            let feed_div = `
                <div>
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}2`).append(feed_div)
        }else {
            let feed_div = `
                <div class="margin-right-div">
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}2`).append(feed_div)

            let feed_div1 = `
                <div>
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}2`).append(feed_div1)
        }
    }
}

function user(data) {
    let b = 1
    let c = 1
    let feed_wrapper = `<div id="img-wrapper13" class="img-wrapper"></div>`
    $('#Mypage-panel3').append(feed_wrapper)
    for (a of data) {
        let feed_img = a['user_img']

        if (b % 3 == 0 && b != 0){
            let feed_div = `
            <div>
                <a href="#">
                    <div>
                        <img src="/static/img/${feed_img}" class="mypageimg">
                    </div>
                </a>
            </div>
            `
            $(`#img-wrapper${c}3`).append(feed_div)
        }else {
            let feed_div = `
                <div class="margin-right-div">
                    <a href="#">
                        <div>
                            <img src="/static/img/${feed_img}" class="mypageimg">
                        </div>
                    </a>
                </div>
                `
            $(`#img-wrapper${c}3`).append(feed_div)
        }
        if (b % 3 == 0 && b != 0) {
            c++
            let feed_wrapper1 = `<div id="img-wrapper${c}3" class="img-wrapper"></div>`
            $('#Mypage-panel3').append(feed_wrapper1)
        }
        b++
    }
    if ((b-1) % 3 != 0){
        let d = 3 - ((b-1) % 3)

        if (d == 1){
            let feed_div = `
                <div>
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}3`).append(feed_div)
        }else {
            let feed_div = `
                <div class="margin-right-div">
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}3`).append(feed_div)

            let feed_div1 = `
                <div>
                    <div>
                        <div class="mypagediv"> <div>
                    </div>
                </div>
            `
            $(`#img-wrapper${c}3`).append(feed_div1)
        }
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

// 이벤트 바인딩 - 이벤트와, 실행될 함수를 연결해줌
$('[role="tab"]').on('click', eventHandler);


// function tab1(){
//     document.getElementById('tab1').classList.remove('hidden')
//     document.getElementById('tab2').classList.add('hidden')
//     document.getElementById('tab3').classList.add('hidden')
// }
// function tab2(){
//     document.getElementById('tab2').classList.remove('hidden')
//     document.getElementById('tab1').classList.add('hidden')
//     document.getElementById('tab3').classList.add('hidden')
// }
//
// function tab3(){
//     document.getElementById('tab3').classList.remove('hidden')
//     document.getElementById('tab2').classList.add('hidden')
//     document.getElementById('tab1').classList.add('hidden')
// }




document.getElementById('tab1').addEventListener('click', tab1)
document.getElementById('tab2').addEventListener('click', tab2)
document.getElementById('tab3').addEventListener('click', tab3)