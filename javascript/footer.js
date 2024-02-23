$(document).ready(function(){
    
    var openBtn = $('#open-button');
    var num = 0

    // 슬라이드 및 버튼 이벤트 초기화
    function initializeSlideEvents() {
        openBtn.on('click', function(){
            var footerSpecific = $(this).closest('.footer_specific');
            num++
            //클릭시 이벤트
            if(num%2 === 1){
                openBtn.css({ transform: "rotate(" + 180 + "deg)" });
                footerSpecific.css({"max-height":"50rem", "margin-bottom":"2rem"})
            } else {
                openBtn.css({ transform: "rotate(" + 0 + "deg)" });
                footerSpecific.css({"max-height":"5rem", "margin-bottom":"0"})
            }
        })
    }

    // 슬라이드 및 버튼 이벤트 해제
    function removeSlideEvents() {
        // slide02 관련 코드
        openBtn.off('click');
    }
    
    function checkWindowSize() {
        var windowWidth = $(window).width();
        
        // 일정 사이즈 이하인 경우
        if (windowWidth <= 1024) {
            initializeSlideEvents(); // 슬라이드 및 버튼 이벤트 초기화
        } else {
            removeSlideEvents();// 슬라이드 및 버튼 이벤트 해제
        }
    }

    // 초기에 한 번 실행하고, 윈도우 크기가 변경될 때마다 다시 실행합니다.
    checkWindowSize();
})