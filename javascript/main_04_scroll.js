document.addEventListener('DOMContentLoaded', function() {
    var slides = document.querySelector('.main_04_item_slides');
    var slide = document.querySelectorAll('.main_04_slide_con');
    var currentIdx = 0;
    var slideCount = slide.length;
    var slideWidth = 286;
    var prevBtn = document.getElementById('main_04_prev');
    var nextBtn = document.getElementById('main_04_next');

    makeClone();

    function makeClone(){
        for(var i = 0; i<slideCount; i++) {
            var cloneSlide = slide[i].cloneNode(true);
            cloneSlide.classList.add('clone');
            slides.appendChild(cloneSlide);
        }
        for(var i = slideCount -1; i>=0; i--) {
            var cloneSlide = slide[i].cloneNode(true);
            cloneSlide.classList.add('clone');
            slides.prepend(cloneSlide);
        }
        updateWidth();
        setInitialPos();
        setTimeout(function(){
            slides.classList.add('animated');
        },100);
    }

    function updateWidth(){
        var currentSlides = document.querySelectorAll('.main_04_slide_con');
        var newSlideCount = currentSlides.length;

        var newWidth = slideWidth*newSlideCount;
        slides.style.width = newWidth + 'px';
    }
    function setInitialPos() {
        var initialTranslateValue = -slideWidth*slideCount;
        slides.style.transform = 'translateX('+initialTranslateValue+'px)';
    }

    nextBtn.addEventListener('click', function(){
        moveSlide(currentIdx + 1);
    });
    prevBtn.addEventListener('click', function(){
        moveSlide(currentIdx - 1);
    });

    function moveSlide(num){
        slides.style.left = -num*slideWidth + 'px';
        currentIdx = num;
        if(currentIdx == slideCount || currentIdx == -8){
            setTimeout(function(){
                slides.classList.remove('animated');
                slides.style.left = '0px';
                currentIdx = 0;
            }, 500);
            setTimeout(function(){
                slides.classList.add('animated');
            }, 550);
        };
    }
});