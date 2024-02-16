"use strict";

$(document).ready(function () {
  var slideImg = $(".main_02_img");
  var slideText = $(".main_02_text");
  slideImg.not(".active").css({
    opacity: "0"
  });
  slideText.not(".active").css({
    opacity: "0"
  });
  var clickCount = 0;
  var interval;
  startMoving();

  function startMoving() {
    interval = setInterval(nextSlide, 4000);
  } // 이미지 움직임을 멈추는 함수


  function stopMoving() {
    clearInterval(interval);
  }

  $('#stop').click(function () {
    clickCount++; // 클릭 횟수 증가

    if (clickCount % 2 !== 0) {
      // 클릭 횟수가 홀수일 때
      stopMoving(); // 움직임 시작
    } else {
      // 클릭 횟수가 짝수일 때
      startMoving(); // 움직임 멈춤
    }
  }); //button 클릭

  $("#prev-02").click(function () {
    prevSlide();
  });
  $("#next-02").click(function () {
    nextSlide();
  }); //이전 슬라이드

  function prevSlide() {
    slideImg.css({
      opacity: "0"
    });
    slideText.css({
      opacity: "0"
    }); //모든 div 숨김

    var allSlide = slideImg; //모든 div 객체를 변수에 저장

    var currentIndex = 0; //현재 나타난 슬라이드의 인덱스 변수
    //반복문으로 현재 active클래스를 가진 div를 찾아 index 저장

    slideImg.each(function (index, item) {
      if ($(this).hasClass("active")) {
        currentIndex = index;
      }
    }); //새롭게 나타낼 div의 index

    var newIndex = 0;

    if (currentIndex <= 0) {
      //현재 슬라이드의 index가 0인 경우 마지막 슬라이드로 보냄(무한반복)
      newIndex = allSlide.length - 1;
    } else {
      //현재 슬라이드의 index에서 한 칸 만큼 뒤로 간 index 지정
      newIndex = currentIndex - 1;
    } //모든 div에서 active 클래스 제거


    slideImg.removeClass("active");
    slideText.removeClass("active"); //새롭게 지정한 index번째 슬라이드에 active 클래스 부여 후 show()

    slideImg.eq(newIndex).addClass("active");
    slideImg.eq(newIndex).css({
      opacity: "1"
    });
    slideText.eq(newIndex).addClass("active");
    slideText.eq(newIndex).css({
      opacity: "1"
    });
  } //다음 슬라이드


  function nextSlide() {
    slideImg.css({
      opacity: "0"
    });
    slideText.css({
      opacity: "0"
    });
    var allSlide = slideImg;
    var currentIndex = 0;
    slideImg.each(function (index, item) {
      if ($(this).hasClass("active")) {
        currentIndex = index;
      }
    });
    var newIndex = 0;

    if (currentIndex >= allSlide.length - 1) {
      //현재 슬라이드 index가 마지막 순서면 0번째로 보냄(무한반복)
      newIndex = 0;
    } else {
      //현재 슬라이드의 index에서 한 칸 만큼 앞으로 간 index 지정
      newIndex = currentIndex + 1;
    }

    slideImg.removeClass("active");
    slideImg.eq(newIndex).addClass("active");
    slideImg.eq(newIndex).css({
      opacity: "1"
    }); //text

    slideText.removeClass("active");
    slideText.eq(newIndex).addClass("active");
    slideText.eq(newIndex).css({
      opacity: "1"
    }); //slide bar 

    slideBar();

    function slideBar() {
      if (newIndex === 0) {
        $('.main_02_bar_con').css({
          width: "33%"
        });
      } else if (newIndex === 1) {
        $('.main_02_bar_con').css({
          width: "66%"
        });
      } else {
        $('.main_02_bar_con').css({
          width: "100%"
        });
      }
    }
  }
});