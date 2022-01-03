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
    document.getElementById(`${comment_id}_comment`).classList.add('hidden')
    document.getElementById(`${comment_id}_update`).classList.add('hidden')
    document.getElementById(`${comment_id}_delete`).classList.add('hidden')
    document.getElementById(`${comment_id}_input`).classList.remove('hidden')
    document.getElementById(`${comment_id}_ok`).classList.remove('hidden')
    document.getElementById(`${comment_id}_cancel`).classList.remove('hidden')
}

function comment_update_cancel(comment_id){
    document.getElementById(`${comment_id}_comment`).classList.remove('hidden')
    document.getElementById(`${comment_id}_update`).classList.remove('hidden')
    document.getElementById(`${comment_id}_delete`).classList.remove('hidden')
    document.getElementById(`${comment_id}_input`).classList.add('hidden')
    document.getElementById(`${comment_id}_ok`).classList.add('hidden')
    document.getElementById(`${comment_id}_cancel`).classList.add('hidden')
}

function comment_update_btn1(comment_id){
    document.getElementById(`${comment_id}_comment1`).classList.add('hidden')
    document.getElementById(`${comment_id}_update1`).classList.add('hidden')
    document.getElementById(`${comment_id}_delete1`).classList.add('hidden')
    document.getElementById(`${comment_id}_input1`).classList.remove('hidden')
    document.getElementById(`${comment_id}_ok1`).classList.remove('hidden')
    document.getElementById(`${comment_id}_cancel1`).classList.remove('hidden')
}

function comment_update_cancel1(comment_id){
    document.getElementById(`${comment_id}_comment1`).classList.remove('hidden')
    document.getElementById(`${comment_id}_update1`).classList.remove('hidden')
    document.getElementById(`${comment_id}_delete1`).classList.remove('hidden')
    document.getElementById(`${comment_id}_input1`).classList.add('hidden')
    document.getElementById(`${comment_id}_ok1`).classList.add('hidden')
    document.getElementById(`${comment_id}_cancel1`).classList.add('hidden')
}

function comment_update(comment_id) {
    let comment = $(`#${comment_id}_input`).val()
    console.log(comment)
    $.ajax({
        type: "POST",
        url: "/comments/update",
        data: {'comment_id': comment_id, 'update_comment': comment},
        success: function (response) {
            window.location.reload()
        }
    });
}
function comment_update1(comment_id) {
    let comment = $(`#${comment_id}_input1`).val()
    console.log(comment)
    $.ajax({
        type: "POST",
        url: "/comments/update",
        data: {'comment_id': comment_id, 'update_comment': comment},
        success: function (response) {
            window.location.reload()
        }
    });
}

function comment_dialog_open(data){
    document.getElementById(`${data}_comment-dialog`).showModal()
}
function comment_dialog_open1(data){
    document.getElementById(`${data}_comment-dialog1`).showModal()
}

function button_event(comment_id){
    if(confirm("정말 삭제하시겠습니까?")==true){
        comment_delete(comment_id)
    }else {
        return
    }
}


