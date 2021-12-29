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