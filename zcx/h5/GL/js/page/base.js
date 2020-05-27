var startTime = (new Date()).getTime();
var delTime = 1000;
;$(function(){ 
  var $scene = $('#scene').parallax({
	  /*limitY: 0*/
	  scalarX: 8,
 	  scalarY: 8,
	  originX: 0,
  });
  //hengshuping();
  setTimeout(function(){
  $("#loading_text").show();
	  progress();
  },100);
  
  $('#loading').show();
  var loadFunction = function() {
		  var imgArr = [		
				  "images/page1-bg.jpg", 
				  "images/page1-bg2.png", 
				  "images/page1-img1.png",
				  "images/page2-bg.jpg",
				  "images/page2-img2.png",
				  "images/circle1.png",
				  "images/circle2.png",
				  "images/circle3.png",
				  "images/circle4.png",
				  "images/circle5.png",
				  "images/circle6.png",
				  "images/page3-bg.jpg", 
				  "images/page3-img2.png",
				  "images/page3-img3.png",
				  "images/page4-bg.jpg", 
				  "images/page4-img2.png",
				  "images/page4-img3.png",
				  "images/page4-img4.png",
				  "images/page4-img5.png", 
				  "images/page5-bg.jpg",
				  "images/page5-bo1.png",
				  "images/page5-img2.png",
				  "images/page5-img3.png",
				  "images/page6-bg.jpg",
				  "images/page6-img2.png",
				  "images/page6-img3.png",
				  "images/page6-img4.png",
				  "images/page7-img2.png",
				  "images/page7-img3.png",
				  "images/page8-img2.png",
				  "images/page8-img3.png",
				  "images/page9-img2.png",
				  "images/page9-img3.png",
				  "images/page10-bg.jpg",
				  "images/page10-img8.png",
				  "images/page11-bg.png",
				  "images/8.png",
				  "images/page13-img2.png",
				  "images/page14-bg.jpg",
				  "images/page15-bg.jpg",
	
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
						  delTime = parseInt((newTime-startTime)/4);
						  
						  
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
            age: $("#age").val(),
            ContentInfo: $("#carType").val(),
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
	console.log(delTime);
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
					//homeSwiper.lockSwipes();
					
			},
			onSlideChangeEnd: function (swiper) {
				swiperAnimate(swiper);
				
				if(swiper.activeIndex==3){
					setTimeout(function(){
					  $('.car-box').show();
					  setInterval(function(){
						  $('.car-box').hide();
						  setTimeout(function(){$('.car-box').show();},100)
					  },4000);
					},100);
					
				}
				if(swiper.activeIndex==4){
					setTimeout(function(){
					  $('.bo-box').show();
					  setInterval(function(){
						  $('.bo-box').hide();
						  setTimeout(function(){$('.bo-box').show();},100)
					  },1700);
					},1500);
					
				}
				if(swiper.activeIndex==13){
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

