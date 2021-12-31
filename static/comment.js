$(document).ready(function () {
    show_comment();
});

function show_comment() {
    $.ajax({
        type: 'GET',
        url: '/comments',
        data: {},
        success: function (response) {
            let rows = response['comments']
            for (let i = 0; i < rows.length; i++) {
                let comment = rows[i]['comment']
                let num = rows[i]['num']

                let temp_html = `<div class="comment_wrapper" >
                                            <b>carrot_vely</b>
                                            <b style="font-weight: lighter">${comment}</b>
                                            <button onclick="comment_delete(${num})">삭제</button>
                                        </div>`
                $('.comment-box').append(temp_html)
            }

        }
    });
}

function comment_write() {
    let comment = $('.comment').val()
    $.ajax({
        type: 'POST',
        url: '/comments',
        data: {'comment_give': comment},
        success: function (response) {
            window.location.reload()
        }
    });
}

function comment_delete(num) {
    $.ajax({
        type: "POST",
        url: "/comments/delete",
        data: {'num_give': num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}