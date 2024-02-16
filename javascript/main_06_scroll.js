/*
function initializeSlideEvents() {
        // 버튼 클릭 시 슬라이드 애니메이션 실행
        nextBtn.on('click', function(){
            moveSlide(currentIdx + 1);
        });
        prevBtn.on('click', function(){
            moveSlide(currentIdx - 1);
        });
    }
    
    // 슬라이드 및 버튼 이벤트 해제
    function removeSlideEvents() {
        // slide02 관련 코드
        nextBtn.off('click');
        prevBtn.off('click');
    }
    
    function checkWindowSize() {
        var windowWidth = $(window).width();
        
        // 일정 사이즈 이하인 경우
        if (windowWidth <= 1024) {
            removeSlideEvents(); // 슬라이드 및 버튼 이벤트 해제
        } else {
            initializeSlideEvents(); // 슬라이드 및 버튼 이벤트 초기화
        }
    }

    // 초기에 한 번 실행하고, 윈도우 크기가 변경될 때마다 다시 실행합니다.
    checkWindowSize();
*/
$(document).ready(function(){
    var slides = $('.main_06_contents')
    var slide = $('.main_06_01_all')
    var currentIdx = 0;
    var slideCount = slide.length;
    var slideWidth = 0;
    var prevBtn = $('#main_06_prev')
    var nextBtn = $('#main_06_next')


    console.log(slide.css('width'))

    function updateWidth(){
        var newSlideCount = slideCount;
        slideWidth = parseInt(slide.css('width'));
        
        var newWidth = (slideWidth * newSlideCount);
        slides.css('width', newWidth + 'px');
        slides.css('left', '0px')
    }
    // 버튼 클릭 시 슬라이드 애니메이션 실행
    nextBtn.on('click', function(){
        moveSlide(currentIdx + 1);
    });
    prevBtn.on('click', function(){
        moveSlide(currentIdx - 1);
    });


    function moveSlide(num){
        slides.css('left', -num * slideWidth + 'px');
        currentIdx = num;
        console.log(slideWidth)
        if(currentIdx%4 === 0){
            slides.css('left', 0 + 'px');
            currentIdx = 0;
        } else if(currentIdx === -1){
            slides.css('left', -3 * slideWidth + 'px');
            currentIdx = 3;
        }
    }

    function initializeSlideEvents() {
        // 버튼 클릭 시 슬라이드 애니메이션 실행
        nextBtn.on('click', function(){
            moveSlide(currentIdx + 1);
        });
        prevBtn.on('click', function(){
            moveSlide(currentIdx - 1);
        });
        updateWidth()
    }
    
    // 슬라이드 및 버튼 이벤트 해제
    function removeSlideEvents() {
        // slide02 관련 코드
        nextBtn.off('click');
        prevBtn.off('click');
    }
    
    function checkWindowSize() {
        var windowWidth = $(window).width();
        
        // 일정 사이즈 이하인 경우
        if (windowWidth <= 1024) {
            removeSlideEvents();
            console.log("사이즈변경") // 슬라이드 및 버튼 이벤트 해제
        } else {
            initializeSlideEvents(); // 슬라이드 및 버튼 이벤트 초기화
        }
    }

    // 초기에 한 번 실행하고, 윈도우 크기가 변경될 때마다 다시 실행합니다.
    checkWindowSize();
})