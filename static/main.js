function load(){
    window.location.reload()
    window.scrollTo(0,0)
}
function back(){
    history.back()
}


function go_main(){
    location.href = '/'
}
function go_recipe(){
    location.href = '/recipe'
}
function write_feed(){
    location.href = '/write_feed'
}
function go_auction(){
    location.href = '/auction'
}
function go_mypage(){
    location.href = '/mypage'
}
function go_camera(){
    location.href = '/camera'
}

$(window).on('load', function() {
  setTimeout(function(){
      $("#waiting").fadeOut();
  }, 500);
});