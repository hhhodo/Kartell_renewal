$(function(){
    var shopEach = $(".shop_menu_left li a, .shop_menu_right li a");
    var shopListEach = $(".shop_list_left ul, .shop_list_right ul");
    var shopList = $(".shop_list_left, .shop_list_right");
    //헤더 애니메이션 제작
    var $line = $("<div class='menu-line'></div>"); // 새로운 div 요소 생성
    $(shopEach).parent().append($line); // 현재 호버된 링크에 추가
    var $lineEach = $(".menu-line");
    //화살표
    var arrowLine = $(shopEach).find("img");
    

    // 호버 이벤트 설정
    shopEach.on("mouseover",
        function() {
            // 호버 시작: 서브 메뉴 등장 및 라인 효과 시작
            var shopIndex = shopEach.index(this);
            var shopLi = shopListEach.eq(shopIndex);
            var shopLine = $lineEach.eq(shopIndex);
            var arrowAni = arrowLine.eq(shopIndex);
            
            // 서브 메뉴 등장
            shopListEach.siblings().css({opacity:"0",display:"none"});
            shopLi.css({opacity:"1", display:"block"});
            
            shopLine.stop(true).css({width:"0%"})
            arrowAni.stop(true).css({opacity:"0"})
            //animation line
            shopLine.animate({
                width:"100%"
            }, 200, "swing",()=>{
                console.log($line);
                arrowAni.stop(true).animate({
                    display:"block",
                    opacity:"1"
                },100)
            })
        });
    shopEach.on("mouseout", function() {
            // 호버 종료: 서브 메뉴 사라지고 라인 효과 초기화
            var shopIndex = shopEach.index(this);
            var shopLi = shopListEach.eq(shopIndex);
            var shopLine = $lineEach.eq(shopIndex);
            var arrowAni = arrowLine.eq(shopIndex);
            
            // 서브 메뉴 사라지기
            shopListEach.siblings().css({opacity:"0"});
            shopLi.css({opacity:"0"});

            shopLine.stop(true).css({width:"0%"})
            arrowAni.stop(true).css({opacity:"0"})
            //animation line
            arrowAni.animate({
                opacity:"0"
            }, 100, ()=>{
                shopLine.animate({
                    width:"0%"
                }, 200, "swing")
            })
        }
    );
});