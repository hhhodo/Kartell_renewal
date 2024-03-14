"use strict";

$(document).ready(function () {
  // 리사이즈 끝나고 0.3초마다 리셋
  var delay = 300;
  var timer = null;
  $(window).on('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      document.location.reload();
    }, delay);
  });
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
  var nextBtn04 = $('#main_04_next'); //공통

  var slideCount = slide02.length;
  var slideWidth = 0;
  /*slide 코드(개별) */
  //slide02

  function makeClone02() {
    slide02.each(function () {
      var cloneSlide = $(this).clone();
      cloneSlide.addClass('clone');
      slides02.append(cloneSlide);
    });
    slide02.get().reverse().forEach(function (slide) {
      var cloneSlide = $(slide).clone();
      cloneSlide.addClass('clone');
      slides02.prepend(cloneSlide);
    });
    updateWidth();
    setInitialPos();
    setTimeout(function () {
      slides02.addClass('animated');
    }, 300); //slide hover 이벤트 순서를 위해 안에 넣어둠

    slideImgBox();
  } //slide04


  function makeClone04() {
    slide04.each(function () {
      var cloneSlide = $(this).clone();
      cloneSlide.addClass('clone');
      slides04.append(cloneSlide);
    });
    slide04.get().reverse().forEach(function (slide) {
      var cloneSlide = $(slide).clone();
      cloneSlide.addClass('clone');
      slides04.prepend(cloneSlide);
    });
    updateWidth();
    setInitialPos();
    setTimeout(function () {
      slides04.addClass('animated');
    }, 300);
  }
  /* 공통 코드(넓이, 시작 translateX위치) */


  function updateWidth() {
    var newSlideCount = $('.main_02 .main_slide_con').length;
    slideWidth = parseInt(slide02.css('width'));
    var newWidth = slideWidth * newSlideCount;
    console.log(slideWidth);
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

  /* 개별 */


  function moveSlide02(num) {
    slides02.css('left', -num * slideWidth + 'px');
    currentIdx2 = num;
    console.log(slideWidth);

    if (currentIdx2 === slideCount || currentIdx2 === -8) {
      setTimeout(function () {
        slides02.removeClass('animated');
        slides02.css('left', '0px');
        currentIdx2 = 0;
      }, 500);
      setTimeout(function () {
        slides02.addClass('animated');
      }, 550);
    }
  } //slide04--------------------------------

  /* 개별 */


  function moveSlide04(num) {
    slides04.css('left', -num * slideWidth + 'px');
    currentIdx4 = num;
    console.log(slideWidth);

    if (currentIdx4 === slideCount || currentIdx4 === -8) {
      setTimeout(function () {
        slides04.removeClass('animated');
        slides04.css('left', '0px');
        currentIdx4 = 0;
      }, 500);
      setTimeout(function () {
        slides04.addClass('animated');
      }, 550);
    }
  } //이미지 호버


  function slideImgBox() {
    $('.main_slide_con, .clone').each(function () {
      var slideBox = $(this);
      var slideImgAll = slideBox.find('.content_slide_img');
      var slideImg = slideImgAll.find('img');
      slideImg.eq(0).css({
        display: "block"
      }); // mouse enter

      slideBox.on('mouseenter', function () {
        var slideImg = slideImgAll.find('img');
        slideImg.eq(0).removeClass('hover').css({
          display: "none"
        });
        var slideImgs = slideImg.eq(1).addClass('hover'); // animation 중간 스톱

        slideImgs.stop(true).css({
          opacity: "0",
          display: "block"
        }); // animation line

        slideImg.animate({
          display: "block"
        }, 50, "swing", function () {
          slideImgs.css({
            opacity: "1"
          });
        });
      }); // mouse leave

      slideBox.on('mouseleave', function () {
        var slideImg = slideImgAll.find('img');
        var slideImgs = slideImg.eq(0).addClass('hover').css({
          display: "block"
        });
        slideImg.eq(1).removeClass('hover').css({
          display: "none"
        }); // animation 중간 스톱

        slideImgs.stop(true).css({
          opacity: "0",
          display: "block"
        }); // animation line

        slideImgs.animate({
          opacity: "1"
        }, 300, "swing", function () {});
      });
    });
  } // 슬라이드 및 버튼 이벤트 초기화


  function initializeSlideEvents() {
    // slide02 관련 코드
    nextBtn02.on('click', function () {
      moveSlide02(currentIdx2 + 1);
    });
    prevBtn02.on('click', function () {
      moveSlide02(currentIdx2 - 1);
    }); // slide04 관련 코드

    nextBtn04.on('click', function () {
      moveSlide04(currentIdx4 + 1);
    });
    prevBtn04.on('click', function () {
      moveSlide04(currentIdx4 - 1);
    });
  } // 슬라이드 및 버튼 이벤트 해제


  function removeSlideEvents() {
    // slide02 관련 코드
    nextBtn02.off('click');
    prevBtn02.off('click'); // slide04 관련 코드

    nextBtn04.off('click');
    prevBtn04.off('click');
  } // 윈도우 크기를 확인하고 작업을 결정하는 함수


  function checkWindowSize() {
    var windowWidth = $(window).width(); // 일정 사이즈 이하인 경우

    if (windowWidth <= 1024) {
      removeSlideEvents(); // 슬라이드 및 버튼 이벤트 해제
    } else {
      initializeSlideEvents(); // 슬라이드 및 버튼 이벤트 초기화

      makeClone02();
      makeClone04();
    }
  } // 초기에 한 번 실행하고, 윈도우 크기가 변경될 때마다 다시 실행합니다.


  checkWindowSize();
});