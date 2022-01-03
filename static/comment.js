// $(document).ready(function () {
//     show_comment();
// });

// function show_comment() {
//     $.ajax({
//         type: 'GET',
//         url: '/comments',
//         data: {},
//         success: function (response) {
//             let rows = response['comments']
//             for (let i = 0; i < rows.length; i++) {
//                 let comment = rows[i]['comment']
//                 let num = rows[i]['num']
//
//                 let temp_html = `<div class="comment_wrapper" >
//                                             <b>carrot_vely</b>
//                                             <b style="font-weight: lighter">${comment}</b>
//                                             <button onclick="comment_delete(${num})">삭제</button>
//                                         </div>`
//                 $('.comment-box').append(temp_html)
//             }
//
//         }
//     });
// }

function comment_write(data, id) {
    let comment = $(`#${data}comment`).val()
    const date = new Date();
    let time = String(date.getTime())
    $.ajax({
        type: 'POST',
        url: '/comments',
        data: {'comment_give': comment,'feed_id_give': data, 'id_give': id, 'date_give': time},
        success: function (response) {
            window.location.reload()
        }
    });
}

function comment_delete(comment_id) {

    $.ajax({
        type: "POST",
        url: "/comments/delete",
        data: {'comment_id': comment_id},
        success: function (response) {
            window.location.reload()
        }
    });
}

function comment_update_btn(comment_id){
    document.getElementById(`${comment_id}comment`).classList.add('hidden')
    document.getElementById(`${comment_id}update`).classList.add('hidden')
    document.getElementById(`${comment_id}delete`).classList.add('hidden')
    document.getElementById(`${comment_id}input`).classList.remove('hidden')
    document.getElementById(`${comment_id}ok`).classList.remove('hidden')
    document.getElementById(`${comment_id}cancel`).classList.remove('hidden')
}

function comment_update(comment_id) {
    let comment = $(`#${comment_id}input`).val()
    $.ajax({
        type: "POST",
        url: "/comments/update",
        data: {'comment_id': comment_id, 'update_comment': comment},
        success: function (response) {
            window.location.reload()
        }
    });
}
function comment_update_cance(comment_id){
    document.getElementById(`${comment_id}comment`).classList.remove('hidden')
    document.getElementById(`${comment_id}update`).classList.remove('hidden')
    document.getElementById(`${comment_id}delete`).classList.remove('hidden')
    document.getElementById(`${comment_id}input`).classList.add('hidden')
    document.getElementById(`${comment_id}ok`).classList.add('hidden')
    document.getElementById(`${comment_id}cancel`).classList.add('hidden')
}
function comment_dialog_open(){
    document.getElementById('comment-dialog').showModal()
}

function button_event(comment_id){
    if(confirm("정말 삭제하시겠습니까?")==true){
        comment_delete(comment_id)
    }else {
        return
    }
}


