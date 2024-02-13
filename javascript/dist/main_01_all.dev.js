"use strict";

function animate() {
  // 마우스 좌표 계산 및 이미지 위치 업데이트 코드
  requestAnimationFrame(animate);
}

function throttle(fn, delay) {
  var lastCall = 0;
  return function (e) {
    var now = Date.now();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    fn(e); // e 객체를 콜백 함수에 전달
  };
}

$(document).ready(function () {
  var mainImg = $('.main_01_wrapper li');
  mainImg.each(function (index, element) {
    var imgWidth = $(element).width(); // 각 li 엘리먼트의 너비

    var imgHeight = $(element).height();
    var mainImgs = $(this).find('.main_01_img');
    var mainBgs = $(this).find('.main_01_bg'); // 각 li 엘리먼트의 높이

    var throttledMouseMove = throttle(function (e) {
      var mouseX = e.offsetX;
      var mouseY = e.offsetY; // 화면 중심 좌표 계산

      var centerX = imgWidth / 2;
      var centerY = imgHeight / 2; // 마우스 좌표에 따라 움직이는 그림자의 위치 계산

      var XX = mouseX - centerX;
      var YY = mouseY - centerY;
      mainBgs.css({
        "transform": "translate(".concat(XX / 2, "px, ").concat(YY / 2, "px)")
      });
      mainImgs.css({
        "transform": "translate(".concat(XX / 10, "px, ").concat(YY / 10, "px)")
      });
    }, 10);
    mainImgs.on("mousemove", throttledMouseMove);
  }); //넘기기 버튼 활성화

  var slide01 = $('.main_01_slide01');
  var slide02 = $('.main_01_slide02');
  var slide03 = $('.main_01_slide03');
  var currentIdx = 0;
  var slideWidth = 0;
  var prevBtn = $('#main_01_prev');
  var nextBtn = $('#main_01_next'); // 버튼 클릭 시 슬라이드 애니메이션 실행

  nextBtn.on('click', function () {
    moveSlide(currentIdx + 1);
  });
  prevBtn.on('click', function () {
    moveSlide(currentIdx - 1);
  });

  function moveSlide(num) {
    var idxAll = Math.abs(currentIdx % 3);
    currentIdx = num; //양수로 변환

    console.log(idxAll);

    if (idxAll === 0) {
      //2page
      slide01.css({
        left: '-100%'
      });
      slide03.css({
        left: "100%",
        display: "none"
      });
      slide02.css({
        display: "block"
      });
      setTimeout(function () {
        slide02.css({
          left: "0%"
        });
        slide01.css({
          display: "none"
        });
      }, 200);
    } else if (idxAll === 1) {
      //3page
      slide02.css({
        left: '-100%'
      });
      slide01.css({
        left: "100%",
        display: "none"
      });
      slide03.css({
        display: "block"
      });
      setTimeout(function () {
        slide03.css({
          left: "0%"
        });
        slide02.css({
          display: "none"
        });
      }, 200);
    } else {
      //1page
      slide03.css({
        left: '-100%'
      });
      slide02.css({
        left: "100%",
        display: "none"
      });
      slide01.css({
        display: "block"
      });
      setTimeout(function () {
        slide01.css({
          left: "0%"
        });
        slide03.css({
          display: "none"
        });
      }, 200);
    }
  }
});
requestAnimationFrame(animate);