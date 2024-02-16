"use strict";

$(function () {
  //scroll시 헤더 사이즈 조절
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll > 50) {
      $('.header_box').css({
        height: "6rem",
        background: "#fff"
      });
      $('.page_all').css({
        top: "6rem"
      });
    } else {
      $('.header_box').css({
        height: "8rem",
        background: "rgba(255, 255, 255, 0)"
      });
      $('.page_all').css({
        top: "8rem"
      });
    }
  });
  /**헤더 메뉴별로 호버시 나오는 내용 ------------------------------------*/
  //호버시

  var shopPage = $(".header_menu_01 > li");
  var pageAll = $(".page_all");
  shopPage.hover(function () {
    pageAll.css({
      opacity: "1",
      "box-shadow": "0px 10px 20px rgba(0, 0, 0, 0.04)"
    });
    var maxHeight = 0;
    var headerHeight = $(".header_box").height();
    var pagePadding = 100; //반응형 최적화 필요

    $(this).children(pageAll).children("div").each(function () {
      var currentHeight = $(this).height();
      maxHeight = Math.max(maxHeight, currentHeight);
    });
    var autoHeight = maxHeight + headerHeight + pagePadding;
    console.log(autoHeight);
    $(this).find(".page_all").css({
      height: autoHeight,
      padding: "4rem 0 10rem 0"
    });
    $(".header_box").css({
      "border-bottom": "1px solid #d9d9d9"
    });
  }, function () {
    // 마우스가 벗어났을 때의 동작
    pageAll.css({
      height: "0",
      padding: "0"
    });
    pageAll.css({
      opacity: "0"
    });
    $(".header_box").css({
      "border-bottom": "1px solid #fff"
    });
  }); //호버 이후 페이지 내용들(공통)

  pageAll.hover(function () {
    pageAll.css({
      opacity: "1"
    });
    $(this).find(".page_all").css({
      height: "auto",
      padding: "4rem 0 10rem 0"
    });
  }, function () {
    // 마우스가 벗어났을 때의 동작
    $(this).css({
      height: "0",
      padding: "0"
    });
    pageAll.css({
      opacity: "0"
    });
  });
  /**2단 호버 메뉴 내용----------------------------------------- */

  var shopEach = $(".menu_left li a, .menu_right li a");
  var shopListEach = $(".list_left ul, .list_right ul");
  var $shopListPage = $(".list_left, .list_right");
  var lastHovered; //헤더 애니메이션 제작

  var $line = $("<div class='menu-line'></div>"); // 새로운 div 요소 생성

  $(shopEach).parent().append($line); // 현재 호버된 링크에 추가

  var $lineEach = $(".menu-line"); //화살표

  var arrowLine = $(shopEach).find("img");
  arrowLine.css({
    opacity: "0"
  }); // 호버 이벤트 설정

  shopEach.on("mouseenter", function () {
    // 호버 시작: 서브 메뉴 등장 및 라인 효과 시작
    var shopIndex = shopEach.index(this);
    var shopLi = shopListEach.eq(shopIndex); //animation var

    var shopLine = $lineEach.eq(shopIndex);
    var arrowAni = arrowLine.eq(shopIndex);
    shopListEach.siblings().css({
      opacity: "0"
    });
    shopLi.css({
      opacity: "1"
    }); //animation 중간 스톱

    shopLine.stop(true).css({
      width: "0%"
    });
    arrowAni.stop(true).css({
      opacity: "0"
    }); //animation line

    shopLine.animate({
      width: "100%"
    }, 200, "swing", function () {
      arrowAni.stop(true).animate({
        display: "block",
        opacity: "1"
      }, 100);
    }); //이 요소를 변수로 지정

    lastHovered = $(this);
  });
  shopEach.on("mouseleave", function () {
    // 호버 종료: 서브 메뉴 사라지고 라인 효과 초기화
    var shopIndex = shopEach.index(this);
    var shopLi = shopListEach.eq(shopIndex); //animation var

    var shopLine = $lineEach.eq(shopIndex);
    var arrowAni = arrowLine.eq(shopIndex);
    shopLi.css({
      opacity: "0"
    });
    shopLine.stop(true).css({
      width: "0%"
    });
    arrowAni.stop(true).css({
      opacity: "0"
    }); //animation line

    arrowAni.animate({
      opacity: "0"
    }, 100, function () {
      shopLine.animate({
        width: "0%"
      }, 200, "swing");
    });
  }); // 서브 메뉴 등장

  $shopListPage.hover(function () {
    //이전에 호버된 shopeach값 불러오기
    var shopIndex = shopEach.index(lastHovered);
    console.log(shopLi);
    var shopLi = shopListEach.eq(shopIndex);
    shopLi.css({
      opacity: "1"
    });
  }, function () {
    //이전에 호버된 shopeach값 불러오기
    var shopIndex = shopEach.index(lastHovered);
    console.log(shopLi);
    var shopLi = shopListEach.eq(shopIndex);
    shopLi.css({
      opacity: "0"
    });
  });
});