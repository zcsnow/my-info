var startTime = (new Date()).getTime();
var delTime = 1000;
;$(function(){ 
  var $scene = $('#scene').parallax({
	  limitY: 0,
	  scalarX: 8,
 	  scalarY: 8,
	  originX: 0,
  });
  
  
  $('.music').on('click', function () {
	  if ($('.music').hasClass('on')) {
		  $('.music').removeClass('on');
		  $('.music img').attr('src', 'images/music1.png');
		  $("#media")[0].pause();
	  } else {
		  $('.music').addClass('on');
		  $('.music img').attr('src', 'images/music0.png');
		  $("#media")[0].play();
	  }
  }); 
  
  //hengshuping();
  setTimeout(function(){
  $("#loading_text").show();
	  progress();
  },100);
  
  $('#loading').show();
  var loadFunction = function() {
		  var imgArr = [		
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page1-bg.jpg", 
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page1-bg2.png", 
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page1-img1.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page1-T1.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page1-T2.png", 
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page1-T3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page1-T4.png", 
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-bg.jpg",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-img2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/circle1.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/circle2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/circle3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/circle4.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/circle5.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/circle6.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-text1.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-text2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-text3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-text4.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-text5.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-text6.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-T1.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page2-T2.png",
				  
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page3-bg.jpg", 
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page3-img2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page3-img3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page4-bg.jpg", 
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page4-img2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page4-img3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page4-img4.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page4-img5.png", 
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-bg.jpg",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-B1.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-B2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-B3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-B4.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-B5.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-B6.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-B7.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-img2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page5-img3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page6-bg.jpg",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page6-img2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page6-img3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page6-img4.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page7-img1.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page8-img1.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page10-bg.jpg",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page11-bg.jpg?2",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/9.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page12-bg.jpg",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page12-img3.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page12-img4.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page12-img5.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page12-img6.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page12-img7.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page12-img8.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page13-img2.png",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page14-bg.jpg",
				  "http://kss.ksyun.com/kcloud2/cloud/video/201602/240/images/page15-bg.jpg",
	
			  ],
			  imgArrLength = imgArr.length,
			  count=0,//loading百分比
			  bar = 0,
			  loadImage = function(url) {
				  var img = new Image;
				  img.onload = function() {
					  count++;

					  //loadingText.text(parseInt(count / imgArrLength * 100) + "%");
					  if(count>=imgArrLength){
						  newTime = (new Date()).getTime();
						  delTime = parseInt((newTime-startTime));
						  
						  
						  //progress(delTime);
						  
					  }
				  };
				  img.src = url;
			  };
		  for (var i = 0; i < imgArrLength; ++i) {
			  loadImage(imgArr[i]);
		  }
	  }();
  
  
  
  $('.js-share-btn').on('click', function () {
    $('.js-share-pop').show();
});
$('.js-share-pop').on('click', function () {
    $('.js-share-pop').hide();
});

$('.tip-pop').on('click', function () {
    $('.tip-pop').hide();
});
    
 $('.js-click-btn').on('click',function() {
	  $('.page15').show();
	  homeSwiper.lockSwipes();
 });  
  


});
var homeSwiper;


//内容提交
$(".btn-submit").click(function (e) {
    e.preventDefault();
    if ($("#form").valid()) {

        var userinfo =
        {
            username: $("#last-name").val(),
            sex: $("#sex").val(),
            zhiye: $("#careers").val(),
            phone: $("#phone").val(),
            //age: $("#age").val(),
            //ContentInfo: $("#carType").val(),
            Province: $("#selectPro").val(),
            city: $("#selectCity").val(),
            infotype:2
        };
        var reslt = $.ajax({ url: "/CompanyProject/Geelysjyg/GeelyUserinfo.ashx", data: userinfo, type: "post", async: false });
        var jieguo = reslt.responseText;

        $('.tip-pop').show();
       /* setTimeout(function () {
            $('.tip-pop').hide();
            $('.info-box').show();
            $('.form-box').hide();
        }, 2000);*/
    }
});

$("#form").validate({
    //错误信息提示
    errorPlacement: function (error, element) {
        error.appendTo(element.siblings(".error_tip"));
    }
});
	
//loading
var bar = 0;
var loadingTime;
function progress() {
	bar = bar + 1;
	$("#loading_num").text(bar + " %");
	$(".loading_bar").width(bar* 1.1 + "%");
	$(".loading_car").css('left', bar * 1.3 + "%");
	//console.log(delTime);
	if (bar < 25) {
		loadingTime = setTimeout(progress, 30);
	}
	else if (bar == 25) {
		loadingTime = setTimeout(progress, delTime);
		$('.tyre').removeClass('tyre-rotate');
	}
	else if (bar < 50& bar > 25) {
		$('.tyre').addClass('tyre-rotate');
		loadingTime = setTimeout(progress, 30);
	}
	else if (bar == 50) {
		loadingTime = setTimeout(progress, delTime);
		$('.tyre').removeClass('tyre-rotate');
	}
	else if (bar < 70& bar > 50) {
		$('.tyre').addClass('tyre-rotate');
		loadingTime = setTimeout(progress, 30);
	}else if (bar == 70) {
		loadingTime = setTimeout(progress, delTime);
		$('.tyre').removeClass('tyre-rotate');
	}
	else if (bar < 90& bar > 70) {
		$('.tyre').addClass('tyre-rotate');
		loadingTime = setTimeout(progress, 30);
	}
	else if (bar == 90) {
		loadingTime = setTimeout(progress, delTime);
		$('.tyre').removeClass('tyre-rotate');
	}
	else if (bar <= 99& bar > 90) {
		$('.tyre').addClass('tyre-rotate');
		loadingTime = setTimeout(progress, 30);
	}
	else {
		$('#loading').hide();
		$("#media")[0].play();
		
		//轮播图
		//var flag = true;
		    homeSwiper = new Swiper('#homeSlider', {
			pagination:'.swiper-pagination', //分页
			paginationClickable: true,
	  		noSwiping : true,
			//allowSwipeToPrev : false,
			//allowSwipeToNext : flag,
			onInit: function (swiper) {
					swiperAnimateCache(swiper);
				
					swiperAnimate(swiper);
					//$('.bo-box').hide();
			},
			onSlideChangeEnd: function (swiper) {
				//$('.bo-box').hide();
				swiperAnimate(swiper);
				/*if(swiper.activeIndex==3){
					$('.car-box').show();
					setTimeout(function(){
					  $('.car-box').show();
					  setInterval(function(){
						  $('.car-box').hide();
						  setTimeout(function(){$('.car-box').show();},100)
					  },3500);
					},100);
					
				}*/
				//$('.bo-box').hide();
				/*if(swiper.activeIndex==4){
					setTimeout(function(){
					  $('.bo-box').show();
					  var time = setInterval(function(){
						  $('.bo-box').hide();
						  clearInterval(time);
						  setTimeout(function(){
							  $('.bo-box').show();
							  time;
						  },200)
					  },3000);
					},1500);
					
				}*/
				if(swiper.activeIndex==11){
				  $('#array').hide();
				}
				
			}
	  
		});
	}

}

	



//判断手机横竖屏状态： 
function hengshuping(){ 
  if(window.orientation==180||window.orientation==0){ 
        $('.tipzd').show();         
   } 
  if(window.orientation==90||window.orientation==-90){ 
        $('.tipzd').hide(); 
		 setTimeout(function(){
		  $("#loading_text").show();
			  progress();
			  
		  },100);
	
		 
   } 
 } 

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping , false);

