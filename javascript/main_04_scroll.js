$(document).ready(function() {
    var slides = $('.main_item_slides');
    var slide = $('.main_slide_con');
    var currentIdx = 0;
    var slideCount = slide.length;
    var slideWidth = 0;
    /* slide arrows */
    var prevBtn = $('#main_02_prev');
    var nextBtn = $('#main_02_next');

    /*slide 코드(개별) */
    makeClone();

    function makeClone(){
        slide.each(function() {
            var cloneSlide = $(this).clone();
            cloneSlide.addClass('clone');
            slides.append(cloneSlide);
        });
        slide.each(function() {
            var cloneSlide = $(this).clone();
            cloneSlide.addClass('clone');
            slides.prepend(cloneSlide);
        });
        updateWidth();
        setInitialPos();
        setTimeout(function(){
            slides.addClass('animated');
        },100);
    }

    /* 공통 코드(넓이, 시작 translateX위치) */
    function updateWidth(){
        var newSlideCount = $('.main_slide_con').length;
        slideWidth = parseInt(slide.css('width'));
        
        var newWidth = slideWidth * newSlideCount;
        console.log(slideWidth)
        slides.css('width', newWidth + 'px');
    }

    function setInitialPos() {
        slideWidth = parseInt(slide.css('width'));
        var initialTranslateValue = -slideWidth * slideCount;
        slides.css('transform', 'translateX(' + initialTranslateValue + 'px)');
    }

    /* 개별 코드(좌우 버튼) */
    nextBtn.on('click', function(){
        moveSlide(currentIdx + 1);
    });
    prevBtn.on('click', function(){
        moveSlide(currentIdx - 1);
    });

    /* 개별 */
    function moveSlide(num){
        slides.css('left', -num * slideWidth + 'px');
        currentIdx = num;
        console.log(slideWidth)
        if(currentIdx === slideCount || currentIdx === -8){
            setTimeout(function(){
                slides.removeClass('animated');
                slides.css('left', '0px');
                currentIdx = 0;
            }, 500);
            setTimeout(function(){
                slides.addClass('animated');
            }, 550);
        }
    }
    //이미지 호버
    var slideImgBox = $('.content_slide_img');

        slideImgBox.each(function(){
            var slideImg = $(this).find('img');
            slideImg.eq(1).addClass('remove');
            console.log(slideImg);
    
            slideEach.hover(
                function(){
                    slideImg.eq(1).removeClass('remove');
                    slideImg.eq(0).addClass('remove');
                },
                function(){
                    slideImg.eq(0).removeClass('remove');
                    slideImg.eq(1).addClass('remove');
                }
            )
        })
});
