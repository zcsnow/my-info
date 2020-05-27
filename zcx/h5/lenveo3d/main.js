/**
 * Created by ShiHongZi on 2017/2/26.
 */
$(document).ready(function(){
    var pageH,pageW;
    page= {
        init: function () {
            ////阻止body滑动
            $('body').on("touchmove", function (e) {
                e.preventDefault();
            });
            window.addEventListener("touchstart", function (e) {
                //e.preventDefault();
            });

            $(window).resize(function () {
                page.resize();
            });

            page.BGM = $('.bgm')[0];
            page.MV = document.getElementById("video1");


            page.imgW = 750;
            page.imgH = 1333;
            page._http = "./img/images/";
            page.mov = 0;
            page.time = 0;
            page.aniImgs = {'p0': [], 'p1': []}
            page.resize();
            page._p1_1.init();
            page.p2.init();
            page.loading.init();
            page._click.init();
        },

        resize: function () {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('canvas').attr('width', page.imgW).attr('height', page.imgH)
        },

        loading: {
            init: function () {
                page.loading._preload();
            },

            _preload: function () {
                page.stage = {};
                var manifest = [
                    './img/hp.png',
                    './img/p0/loading.gif',
                    './img/p1/panzi_small.png',
                    './img/p2/000_07.png',
                    './img/p2/001_07.png',
                    './img/p2/002_07.png',
                    './img/p2/003_07.png',
                    './img/p2/004_09.png',
                    './img/p2/005_09.png',
                    './img/p2/006_09.png',
                    './img/p2/007_09.png',
                    './img/p3/bg_top.png',
                    './img/p3/guita2.png',
                    './img/p3/m4.gif'


                ], str;
                for (var a = 1; a <= 8; a++) {
                    manifest[manifest.length] = './img/p2/' + a + '.png';
                }
                for (var b = 1; b <= 7; b++) {
                    manifest[manifest.length] = './img/p1/00' + b + '.png';
                }


                var queueBe = new createjs.LoadQueue(true);
                queueBe.setMaxConnections(1);//设置并发数
                queueBe.maintainScriptOrder = true;
                queueBe.on("progress", function () {
                     var progress = queueBe.progress * 100;
                     progress = Math.floor(progress);
                     $(".s").html(progress + "%");
                });
                queueBe.on("complete", function () {
                    setTimeout(function () {
                        $(".p0").hide();
                        $(".p1").show();
                    }, 500);

                });
                queueBe.loadManifest(manifest);
            }
        },

        _click: {
            init: function () {
                page._click._click1();
                page._click._click1_1();

            },
            _click1: function () {
                $(".tap_10086").on("touchstart", function (e) {
                    page.MV.play();
                    page._click._start_out();
                    page.MV.addEventListener("timeupdate",function(){
                        if(page.MV.currentTime>=123.1){
                            $(".p1_1").show();
                            page.MV.pause();
                            $(".tap_10086,.tap,.panzi_small").hide();
                            $(".tap_10086").unbind("touchend")
                        }
                    });
                    e.preventDefault();
                })
            },

            _click1_1: function () {
                $(".tap_10086").on("touchend", function (e) {
                    page._click._start_in();
                    page.MV.pause();
                    e.preventDefault();
                })
            },
            _start_out: function () {

                $(".p1_words_1,.p1_words_2,.p1_words_3").hide();
                $(".tap").removeClass("fadeIn").hide();
            },
            _start_in: function () {
                $(".p1_words_3,.tap").show();

            }

        },
        _p1_1: {
            init: function () {
                page._p1_1.swiper_down();
            },
            swiper_down: function () {
                var _el = $(".p1_1");
                var start_y, length_y = 0;
                _el.on("touchstart", function (e) {
                    start_y = e.touches[0].clientY;
                })
                _el.on("touchmove", function (e) {
                    length_y = e.touches[0].clientY - start_y;
                    if (length_y >= 100) {
                        _el.addClass("fadeOut");
                        $(".p1").addClass("fadeOut");
                        page.resize();
                        $(".p2").show();
                    }
                })
                _el.on("touchend",function(){
                    _el.addClass("fadeOut");
                    $(".p1").addClass("fadeOut");
                    page.resize();
                    $(".p2").show();
                })
            }
        },
        p2: {
            init: function () {
                page.p2._show();
                page.p2._hide();
                // page.p2._swiper();
                page.p2.video_btn();
                page.p2.video_play();
            },
            _show: function () {
                $(".p2_words_6").on("click", function () {
                    $(".top").show();
                })
            },
            _hide: function () {
                $(".top").on("click", function () {
                    $(this).hide();
                })
            },
            _swiper: function () {
                var mySwier = new Swiper(".swiper-container", {
                    effect: "fade",
                    autoplay: 2000,
                    speed: 2000,
                    autoplayDisableOnInteraction: false,
                    loop: true,
                    fade: {
                        crossFade: false,
                    },
                    onSlideChangeStart: function (swiper) {
                        page.slide = swiper.activeIndex;
                    }
                })
            },

            video_play: function () {
                $(".video_btn").on("touchstart", function () {
                    location.href = 'http://wechat.fotile.com/2017awe/demo.html'
                })

            },
            video_btn: function () {
                var a = 0;
                setInterval(function () {
                    $(".video_btn").find("img").eq(a).show().siblings().hide();
                    $(".p2_words_5").find("img").eq(a).show().siblings().hide();
                    $(".p2_words_6").find("img").eq(a).show().siblings().hide();
                    a++;
                    if (a >= 4) {
                        a = 0;
                    }
                }, 150)

            }
        }
    };
    page.init();
});