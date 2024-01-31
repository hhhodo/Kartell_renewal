$(document).ready(function(){
    var slides = $('.main_05_item_all')
    var slide = $('.main_05_item')
    var currentIdx = 0
    var slideCount = slide.length;
    var slideWidth = 0
    var prevBtn = $('#prev-05')
    var nextBtn = $('#next-05')

    makeClone()
    function makeClone(){
        slide.each(function(){
            var cloneSlide = $(this).clone();
            cloneSlide.addClass('clone');
            slides.append(cloneSlide);
        })
        slide.get().reverse().forEach(function(slide) {
            var cloneSlide = $(slide).clone();
            cloneSlide.addClass('clone');
            slides.prepend(cloneSlide);
        });
        updateWidth();
        setInitialPos();
        setTimeout(function(){
            slides.addClass('animated');
        },300);
    }

    function updateWidth(){
        var newSlideCount = $('.main_05_item').length;
        slideWidth = parseInt(slide.css('width'));
        
        var newWidth = slideWidth * newSlideCount;
        slides.css('width', newWidth + 'px');
        slides.css('width', newWidth + 'px');
    }

    function setInitialPos() {
        slideWidth = parseInt(slide.css('width'));
        var initialTranslateValue = -slideWidth* slideCount;
        slides.css('transform', 'translateX(' + initialTranslateValue + 'px)');
        slides.css('transform', 'translateX(' + initialTranslateValue + 'px)');
    }

    /* 슬라이드 무브 ----------------------------------*/
    nextBtn.on('click', function(){
        moveSlide(currentIdx + 1);
        console.log(slideWidth)
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
})