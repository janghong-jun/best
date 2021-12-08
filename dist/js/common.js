
;$(function(){
    /* Common UI */
    UI.tabInit(".tab-wrap"); //탭 접근성 초기화
    UI.toggleMore(); //열기 토글

    /* Slider */
    UI.sliderArrow("[data-slider=arrow],.column-list.column-list--half"); //좌우버튼 타입1 (4개)
    UI.sliderArrow2("[data-slider=arrow2]"); //좌우버튼 타입2 (3개)
    UI.sliderCardNews("[data-slider=cardNews]"); //좌우버튼 (1개)
    UI.mainSlider("[data-slider=mainSlider]"); //메인 비디오 (3개)
});

var UI = {
    /****************************
        Common UI
    *****************************/
    tabInit : function(obj){
        var $obj = null;
        var $tabList = null;
        function init(obj){
            $obj = $(obj);
            $tabList = $obj.children("ul");
            $tabList
            .attr("role", "tablist")
            .find(">li")
            .each(function(i,e){
                var tab = $(e).children();
                if(tab.is(".is-active")){
                    tab.attr({"role": "tab", "aria-selected": "true"});
                }else{
                    tab.attr({"role": "tab", "aria-selected": "false"});
                }
            });
        }
        //event(){
            //클릭 이벤트 제어 필요시 사용
        //}
        init(obj);
        //event();
    },

    toggleMore : function(){

        var $trigger = null;
        var $panel = null;

        function init(){
            $trigger = "[data-element=toggle-btn]";
            $panel = "[data-element=toggle-list]";

            for(var i=0; i<$($trigger).length; i++){
                $($trigger).eq(i).attr({"data-trigger-index" : i, "aria-expanded" : "false"});
                $($panel).eq(i).attr("data-panel-index", i).removeClass("is-active");
            }
        }

        function event(){
            $($trigger).on("click", function(e){
                var index = $(this).data("trigger-index");

                e.preventDefault();
                e.stopPropagation();

                if($(this).is(".is-active")){
                    if($.trim($(this).text()) == "내용 더 보기"){
                        if($(this).attr("data-origin-text")){
                            $(this).text($(this).data("origin-text")).removeAttr("data-origin-text");
                        }else{
                            $(this).text("내용 간략히");
                        }
                    }else if($.trim($(this).text()) == "내용 간략히"){
                        $(this).text("내용 더 보기");
                    }
                    $(this).attr("aria-expanded", "false").removeClass("is-active");
                    $("[data-panel-index=" + index + "]").removeClass("is-active");
                }else{
                    if($.trim($(this).text()) == "내용 더 보기"){
                        $(this).text("내용 간략히");
                    }
                    $(this).attr("aria-expanded", "true").addClass("is-active");
                    $("[data-panel-index=" + index + "]").addClass("is-active");
                }
            });
        }

        init();
        event();
    },
    /****************************
        Slider
    *****************************/
    //Main Slider
    mainSlider : function(obj){
        $(obj).slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            touchMove: true,
            dots: false,
            arrows: true,
            adaptiveHeight : true,
            infinite: false,
            responsive: [
                { 
                    breakpoint: 768,
                    settings: {	
                        slidesToShow: 1 ,
                        variableWidth: true,
                        arrows: false,
                    } 
                }
            ]
        });
        setTimeout(function(){
            $(obj).slick("slickGoTo",0)
        },0)
    },
    //Arrow type
    sliderArrow : function(obj){
        $(obj).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            touchMove: true,
            dots: false,
            arrows: true,
            adaptiveHeight : true,
            infinite: false,
            responsive: [
                { 
                    breakpoint: 1025,
                    settings: {	
                        slidesToShow: 4,
                    } 
                },
                { 
                    breakpoint: 768,
                    settings: {	
                        slidesToShow: 1 ,
                        variableWidth: true,
                        arrows: false,
                    } 
                }
            ]
        });
        setTimeout(function(){
            $(obj).slick("slickGoTo",0);
        },0)
    },
    sliderArrow2 : function(obj){
        $(obj).slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            touchMove: true,
            dots: false,
            arrows: true,
            adaptiveHeight : true,
            infinite: false,
            responsive: [
                { 
                    breakpoint: 768,
                    settings: {	
                        slidesToShow: 1 ,
                        variableWidth: true,
                        arrows: false,
                    } 
                }
            ]
        });
        setTimeout(function(){
            $(obj).slick("slickGoTo",0)
        },0)
    },
    sliderCardNews : function(obj){
        $(obj).slick({
            slidesToShow: 1, 
            slidesToScroll: 1,
            touchMove: true,
            dots: false,
            arrows: true,
            adaptiveHeight : false,
            infinite: false,
        });
        setTimeout(function(){
            $(obj).slick("slickGoTo",0)
        },0)
    },
};
$(function(){
    // OS 구분
    function isMobileYn(){
        var filter = "win16|win32|win64|mac|macintel";
        if (navigator.platform ) {
            if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                return true;
            } else {
                return false;
            }
        } 
        return false; 
    }
    if(isMobileYn()){ 
        // CASE 모바일 브라우저인 경우 
        $("body").removeClass("is-desktop");
        $("body").addClass("is-mobile");
    } else { 
        // CASE PC 브라우저인 경우 
        $("body").removeClass("is-mobile");
        $("body").addClass("is-desktop");
    }

    // 유틸리티바메뉴
    $(".rightMenu .tlogDrop").hover(function(){
        $(this).parents().find(".tlogSub").show();
    }, function(){
        $(this).parents().find(".tlogSub").hide();
    });

    // pc gnb
    $(".gnb__item--2depth").hover(function(){
        $(this).addClass("is-active");
    }, function(){
        $(this).removeClass("is-active");
    });
    $(".gnb__item--2depth .gnb__anchor").focus(function(){
        $(".gnb__item").removeClass("is-active");
        $(this).parent().addClass("is-active");
    })
    $(".gnb__item--2depth .gnb__anchor").blur(function(){
        $(this).parent().removeClass("is-active");
    })
    $(".gnb__2depth").focusin(function(){
        $(".gnb__item").removeClass("is-active");
        $(this).parent().addClass("is-active")
    });
    $(".gnb__2depth").focusout(function(){
        $(this).parent().removeClass("is-active")
    });
    
    // mobile gnb
    $(".total-menu").on("click", function(){ 
        $(this).hide();
        $(".m-header").addClass("is-active");
        $("body").addClass("hidden");
    });
    $(".m-header__close,.m-header__mask").on("click", function(){
        $(".total-menu").show();
        $(".m-header,.m-nav__item").removeClass("is-active");
        $("body").removeClass("hidden");
    });
    $(".m-nav__anchor").click(function(){
        if ($(this).next(".m-nav__sub").length) {
            $(this).parent().toggleClass("is-active");
            $(this).parent().siblings(".m-nav__item").removeClass("is-active");
            return false;
        }
    });

    // 인체도 이미지 프리로드
    var images = [];
    function preload() {
        for (var i = 0; i < arguments.length; i++) {
            images[i] = new Image();
            images[i].src = preload.arguments[i];
        }
    }
    preload(
        "../images/common/bg_anatomy.png",
        "../images/common/img_anatomy1.png",
        "../images/common/img_anatomy2.png",
        "../images/common/img_anatomy3.png",
        "../images/common/img_anatomy4.png",
        "../images/common/img_anatomy5.png",
        "../images/common/img_anatomy6.png",
        "../images/common/img_anatomy7.png",
        "../images/common/img_anatomy8.png",
        "../images/common/img_anatomy9.png",
        "../images/common/img_anatomy10.png",
        "../images/common/img_anatomy11.png",
        "../images/common/img_anatomy12.png"
    )

    // 통합검색 & 인체도 검색
    $(".total-search__close,.total-search__dim,.search__anatomy").on("click", function(){ 
        $(".search__total").removeClass("is-active");
        $(".total-search").removeClass("is-active");
        $(".anatomy-search__image").attr("src","../images/common/bg_anatomy.png");
        $(".anatomy-search__image").parent().attr("class","anatomy-search__images");
        $(".anatomy-search__item").removeClass("is-active");
        $("body").removeClass("hidden");
    });
    $(".anatomy-search__close,.anatomy-search__dim,.search__text").on("click", function(){ 
        $(".anatomy-search").removeClass("is-active");
        $(".anatomy-search__image").attr("src","../images/common/bg_anatomy.png");
        $(".anatomy-search__image").parent().attr("class","anatomy-search__images");
        $(".anatomy-search__item").removeClass("is-active");
        $("body").removeClass("hidden");
    });
    $(".search__text").on("click", function(){ 
        $(".total-search").addClass("is-active");
        $("body").addClass("hidden");
    });
    $(".search__anatomy").on("click", function(){ 
        $(".anatomy-search").addClass("is-active");
        $("body").addClass("hidden");
    });
    $(".anatomy-search__anchor").click(function(){
        var index = $(this).parent(".anatomy-search__item").index() + 1;
        $(".anatomy-search__item").removeClass("is-active");
        $(this).parent(".anatomy-search__item").addClass("is-active");
        $(".anatomy-search__image").attr("src","../images/common/img_anatomy"+index+".png");
        $(".anatomy-search__images").attr("class","anatomy-search__images anatomy-search__images--state anatomy-search__images--state"+index);
        $(".anatomy-search__images").addClass("is-active");
        setTimeout(function() {
            $(".anatomy-search__images").removeClass("is-active");
        }, 1000);
    });

    // 코멘트 입력시 버튼 활성화
    $("textarea.comment__textarea").on("change keyup paste", function(){
        if($(this).val()!==""){
            $(".comment__submit").addClass("is-active");
        } else {
            $(".comment__submit").removeClass("is-active");
        }
    })

    // 명의 상세 프로필 레이어
    $(".doctor-profile__anchor").click(function(){
        $("body").toggleClass("layer");
        $(".doctor-profile__popup").toggleClass("is-active");
    });
    $(".doctor-profile__close").click(function(){
        $("body").removeClass("layer");
        $(".doctor-profile__popup").removeClass("is-active");
    });

    // 컬러피커
    $(".textColor").each( function() {
        $(this).minicolors({
            control: $(this).attr("data-control") || "hue",
            defaultValue: $(this).attr("data-defaultValue") || "",
            format: $(this).attr("data-format") || "hex",
            keywords: $(this).attr("data-keywords") || "",
            inline: $(this).attr("data-inline") === "true",
            letterCase: $(this).attr("data-letterCase") || "lowercase",
            opacity: $(this).attr("data-opacity"),
            position: $(this).attr("data-position") || "bottom",
            swatches: $(this).attr("data-swatches") ? $(this).attr("data-swatches").split("|") : [],
            change: function(value, opacity) {
                if( !value ) return;
                if( opacity ) value += ", " + opacity;
                if( typeof console === "object" ) {
                }
            }
        });
    });

    // 명의정보 슬라이드
    function doctorSlick(){
        var slider = $(".doctor-card--box");
        var slider2 = $("[data-slider='arrow2']");
        var slickOptions = {
            slidesToScroll: 1,
            slidesToShow: 1 ,
            touchMove: true,
            dots: false,
            adaptiveHeight : true,
            infinite: false,
            variableWidth: true,
            arrows: false,
        };
        if($(window).width() < 768 && !slider.hasClass("doctor-card--info")) {
            setTimeout(function(){
                slider.not(".slick-initialized").slick(slickOptions,"slickGoTo",0);
            },0)
        } else {
          slider.filter(".slick-initialized").slick("unslick");
          slider2.filter(".slick-initialized").slick(UI.sliderArrow2("[data-slider=arrow2]"));
        }
    };

    // 플로팅 비디오
    function flotingVideo(){
        var headerHeight = $(".header").height();
        var videoArea = $(".detail-page__contents").height();
        var scrollHeight = headerHeight + videoArea * 1.3;
        var closeButton = $(".detail-page__video-close");
        $(window).scroll(function(){
            if($(this).scrollTop() >= scrollHeight && !closeButton.hasClass("is-active")){
                $(".detail-page.is-active .detail-page__video-wrap").addClass("is-active");
            } else if ($(this).scrollTop() < scrollHeight) {
                $(".detail-page.is-active .detail-page__video-wrap").removeClass("is-active");
                closeButton.removeClass("is-active")
            }
        });
        closeButton.on("click",function(){
          $(this).addClass("is-active");
          $(".detail-page__video-wrap").removeClass("is-active");
        });
    }

    // 명의 상세 인디케이터
    function doctorDetail(){
        $(window).scroll(function() {
            var scroll = getCurrentScroll();
            var headerHeight = $(".header").height();
            var doctorHeight = $(".doctor-profile__box").height();
            var doctorNav = headerHeight + doctorHeight;
            if ( scroll >= doctorNav ) {
                $(".page-indicator").addClass("is-active");
            } else {
                $(".page-indicator").removeClass("is-active");
                $(".page-indicator__item").removeClass("is-active");
            }
        });
        function getCurrentScroll() {
            return window.pageYOffset || document.documentElement.scrollTop;
        }
        function Page__updateIndicatorActive() {
            var scrollTop = $(window).scrollTop();
            var headerHeight = $(".header").height();
            var indicator = $(".page-indicator.is-active").height();
            $($(".page").get().reverse()).each(function(index, node) {
                var $node = $(this);
                var offsetTop = parseInt($node.attr("data-offset-top"));
                if ( scrollTop >= offsetTop - headerHeight - indicator) {
                    $(".page-indicator > ul > li.is-active").removeClass("is-active");
                    var currentPageIndex = $node.index();
                    $(".page-indicator > ul > li").eq(currentPageIndex).addClass("is-active");
                    $("html").attr("data-current-page-index", currentPageIndex);
                    return false;
                }
            });
        }
        function Page__updateOffsetTop() {
            var indicator = $(".page-indicator").height()/10;
            $(".page").each(function(index, node) {
                var $page = $(node);
                var offsetTop = $page.offset().top;
                $page.attr("data-offset-top", offsetTop - indicator);
            });
            Page__updateIndicatorActive();
        }
        function Page__init() {
            Page__updateOffsetTop();
        }
        Page__init();

        $(window).resize(Page__updateOffsetTop,Page__updateIndicatorActive,getCurrentScroll);
        $(window).scroll(Page__updateOffsetTop,Page__updateIndicatorActive,getCurrentScroll);
        $(window).load(Page__updateOffsetTop,Page__updateIndicatorActive,getCurrentScroll);
        $(".page-indicator > ul > li > a").click(function(e) {
            var headerHeight = $(".header").height();
            var indicator = $(".page-indicator.is-active").height();
            var href = $(this).attr("href");
            var $this = $(this);
            var targetTop = $(href).offset().top - headerHeight - indicator;
            /*
            // 한번에 가도록 하는 방법
            $(window).scrollTop(targetTop);
            */
            $("html").stop().animate({scrollTop:targetTop}, 500);
            setTimeout(function() {
                $(".page-indicator__item").removeClass("is-active");
                $this.parent().addClass("is-active");
            }, 501);
            e.preventDefault();
        });
    }

    // 메인 모바일 슬라이더
    function mainSlide(){
        var mainSlider = $(".latest-broadcast__list,.ai-recommend__list");
        var slickOptions = {
            slidesToScroll: 1,
            slidesToShow: 1 ,
            touchMove: true,
            dots: false,
            adaptiveHeight : true,
            infinite: false,
            variableWidth: true,
            arrows: false,
        };
        if($(window).width() < 768) {
            setTimeout(function(){
                mainSlider.not(".slick-initialized").slick(slickOptions,"slickGoTo",0);
            },0)
        } else {
            mainSlider.filter(".slick-initialized").slick("unslick");
        }
    }

    // 게시글 이동
    $(".button-wrap--right .button-wrap__left .button__gray-square").click(function(){
        $(".board-move").addClass("is-active");
    })

    // 디바이스 사이즈 스크립트 분기
    function deviceSize(){
        var winSize= $(window).width();
        if(winSize >= 1025) { 
            var videoHeight = $(".detail-page__video-wrap").height();
            $(".detail-page__video").css({"height": videoHeight}); 
        } else if (767 < winSize && winSize <= 1024) {
        } else if (767 >= winSize ) {
            $(".search__toggle-button").on("click", function(){ 
                $(".total-search").addClass("is-active");
                $("body").addClass("hidden");
            });
            $(".doctor-profile__anchor").on("click", function(){ 
                $("body").addClass("layer");
            });
        }
        doctorDetail();
        flotingVideo();
        mainSlide();
        doctorSlick();
        mainSlide();
    }

    deviceSize();
    $(window).resize(function() {
        deviceSize();
    });
});