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

    updateWidth()

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
    // 리사이즈 끝나고 0.3초마다 리셋
    var delay = 300;
    var timer = null; 
    $(window).on('resize', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
        document.location.reload();
        }, delay);
    });
})