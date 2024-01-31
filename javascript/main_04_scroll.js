$(document).ready(function() {
    var slides02 = $('.main_02 .main_item_slides');
    var slides04 = $('.main_04 .main_item_slides');
    var slide02 = $('.main_02 .main_slide_con');
    var slide04 = $('.main_04 .main_slide_con');
    var currentIdx2 = 0;
    var currentIdx4 = 0;
    /* slide arrows */
    var prevBtn02 = $('#main_02_prev');
    var nextBtn02 = $('#main_02_next');
    var prevBtn04 = $('#main_04_prev');
    var nextBtn04 = $('#main_04_next');
    //공통
    var slideCount = slide02.length;
    var slideWidth = 0;
    
    /*slide 코드(개별) */
    //slide02
    makeClone02();
    function makeClone02(){
        slide02.each(function() {
            var cloneSlide = $(this).clone();
            cloneSlide.addClass('clone');
            slides02.append(cloneSlide);
        });
        slide02.get().reverse().forEach(function(slide) {
            var cloneSlide = $(slide).clone();
            cloneSlide.addClass('clone');
            slides02.prepend(cloneSlide);
        });
        updateWidth();
        setInitialPos();
        setTimeout(function(){
            slides02.addClass('animated');
        },300);
    }
    //slide04
    makeClone04();
    function makeClone04(){
        slide04.each(function() {
            var cloneSlide = $(this).clone();
            cloneSlide.addClass('clone');
            slides04.append(cloneSlide);
        });
        slide04.get().reverse().forEach(function(slide) {
            var cloneSlide = $(slide).clone();
            cloneSlide.addClass('clone');
            slides04.prepend(cloneSlide);
        });
        updateWidth();
        setInitialPos();
        setTimeout(function(){
            slides04.addClass('animated');
        },300);
    }
    

    /* 공통 코드(넓이, 시작 translateX위치) */
    function updateWidth(){
        var newSlideCount = $('.main_02 .main_slide_con').length;
        slideWidth = parseInt(slide02.css('width'));
        
        var newWidth = slideWidth * newSlideCount;
        console.log(slideWidth)
        slides02.css('width', newWidth + 'px');
        slides04.css('width', newWidth + 'px');
    }

    function setInitialPos() {
        slideWidth = parseInt(slide02.css('width'));
        var initialTranslateValue = -slideWidth * slideCount;
        slides02.css('transform', 'translateX(' + initialTranslateValue + 'px)');
        slides04.css('transform', 'translateX(' + initialTranslateValue + 'px)');
    }

    /* 개별 코드(좌우 버튼) */
    //slide02----------------------------------
    nextBtn02.on('click', function(){
        moveSlide02(currentIdx2 + 1);
    });
    prevBtn02.on('click', function(){
        moveSlide02(currentIdx2 - 1);
    });
    
    /* 개별 */
    function moveSlide02(num){
        slides02.css('left', -num * slideWidth + 'px');
        currentIdx2 = num;
        console.log(slideWidth)
        if(currentIdx2 === slideCount || currentIdx2 === -8){
            setTimeout(function(){
                slides02.removeClass('animated');
                slides02.css('left', '0px');
                currentIdx2 = 0;
            }, 500);
            setTimeout(function(){
                slides02.addClass('animated');
            }, 550);
        }
    }

    //slide04--------------------------------
    nextBtn04.on('click', function(){
        moveSlide04(currentIdx4 + 1);
    });
    prevBtn04.on('click', function(){
        moveSlide04(currentIdx4 - 1);
    });

    /* 개별 */
    function moveSlide04(num){
        slides04.css('left', -num * slideWidth + 'px');
        currentIdx4 = num;
        console.log(slideWidth)
        if(currentIdx4 === slideCount || currentIdx4 === -8){
            setTimeout(function(){
                slides04.removeClass('animated');
                slides04.css('left', '0px');
                currentIdx4 = 0;
            }, 500);
            setTimeout(function(){
                slides04.addClass('animated');
            }, 550);
        }
    }
    //이미지 호버
    slideImgBox();
    function slideImgBox(){
        $('.main_slide_con').each(function(){
            var slideBox = $(this);
            var slideImgAll = slideBox.find('.content_slide_img');
            var slideImg = slideImgAll.find('img');
            slideImg.eq(0).css({display:"block"})
    
            //box hover
            slideBox.hover(
                function(){
                    var slideImg = slideImgAll.find('img');
                    slideImg.eq(0).removeClass('hover').css({display:"none"});
                    var slideImgs = slideImg.eq(1).addClass('hover');

                    //animation 중간 스톱
                    slideImgs.stop(true).css({opacity:"0", display:"block"})
                    //animation line
                    slideImg.animate({
                        display:"block"
                    }, 50, "swing",()=>{
                        slideImgs.css({opacity:"1"})
                    })
                },
                function(){
                    var slideImg = slideImgAll.find('img');
                    var slideImgs = slideImg.eq(0).addClass('hover').css({display:"block"});
                    slideImg.eq(1).removeClass('hover').css({display:"none"});
                    
                    //animation 중간 스톱
                    slideImgs.stop(true).css({opacity:"0", display:"block"})
                    //animation line
                    slideImgs.animate({
                        opacity:"1"
                    }, 300, "swing", ()=>{

                    })
                }
            )
        })
    }
});