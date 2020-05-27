var startTime = (new Date()).getTime();
var delTime = 1000;
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
var timeType,timeType2,timeType3;
$(function(){
function audioAutoPlay(id){
	  var audio = document.getElementById(id),
		  play = function(){
		  audio.play();
		  document.removeEventListener("touchstart",play, false);
	  };
	  audio.play();
	  document.addEventListener("WeixinJSBridgeReady", function () {//微信
		 play();
	  }, false);
	  document.addEventListener('YixinJSBridgeReady', function() {//易信
		 play();
	  }, false);
	  document.addEventListener("touchstart",play, false);
  }
  
  $('.music').on('click', function () {
	  if ($('.music').hasClass('on')) {
		  $('.music').removeClass('on');
		  $('.music img').attr('src', 'images/music1.png?2');
		  $("#media")[0].pause();
	  } else {
		  $('.music').addClass('on');
		  $('.music img').attr('src', 'images/music0.png?2');
		  $("#media")[0].play();
	  }
  }); 
  audioAutoPlay("media");
  
  $('.showWord1').fadeIn();
  setTimeout(function(){
	  $('.showWord2').fadeIn();
  },1000);
  setTimeout(function(){
	  $('.showWord3').fadeIn();
  },2000);
  setTimeout(function(){
	  $('.showWord4').fadeIn();
  },3000);
  setTimeout(function(){
	  $('.showWord5').fadeIn();
  },4000);
  setTimeout(function(){
	  $('.showWord6').fadeIn();
  },5000);
  setTimeout(function(){
	  $('.showWord7').fadeIn();
  },6000);
  setTimeout(function(){
	  $('.showWord8').fadeIn();
  },7000);
  setTimeout(function(){
	  $('.showWord9').fadeIn();
  },8000);
  setTimeout(function(){
	  $('#loading').hide();
	  hengshuping();
  },10000)

  
  //hengshuping();
  /*setTimeout(function(){
	 $('#loading').hide();
	 $(".page1").show();
  },3000);*/


	$('.js-share-btn').click(function(){
		$('.js-share-pop').show();	
		$('.mask').show();
	});
	$('.js-share-pop').click(function(){
		$('.js-share-pop').hide();	
		$('.mask').hide();
	});

$('.page1').on('click','.js-xs-btn',function () {
    $('.page1').hide();
	$('.page2').show();
});

$('.page2').on('click','.back-btn',function () {
    $('.page1').show();
	$('.page2').hide();
});

/*if(!isAndroid){
	$('.fill-word').addClass('iphone');
}*/

var homeSwiper;
$('.word_box').on('click','li',function () {
	$(this).addClass('cur').siblings('li').removeClass('cur');
	var curVal = $(this).text();
	
	
	$('.fill-word').removeClass('imgFlash').addClass('cur').text(curVal);

	
	if(curVal=='a'){
		setTimeout(function(){
			  $('.page1').hide();
			  $('#homeSlider').show();
			  homeSwiper = new Swiper('#homeSlider', {
				  paginationClickable: true,
				  noSwiping : true,
				  onInit: function (swiper) {
						  swiperAnimateCache(swiper);
						  swiperAnimate(swiper);
				  },
				  onSlideChangeEnd: function (swiper) {
					  swiperAnimate(swiper);
					  if(swiper.activeIndex<=1){
						  $('.back-home-btn .txt').hide();
						  $('.back-home-btn').addClass('logomove').removeClass('back-home-cur');
						  homeSwiper.lockSwipeToPrev();
					  }else{
						  if(swiper.activeIndex>=2){
							  $('.back-home-btn').removeClass('logomove').addClass('back-home-cur');
							  $('.back-home-btn .txt').show();
						  }else{
						      $('.back-home-btn .txt').hide();
							  $('.back-home-btn').addClass('logomove').removeClass('back-home-cur');
						  }
						  
						  
						  homeSwiper.unlockSwipeToPrev()
					  }
					  
					  
				  }
			
			  });
		},500)
	}
    
});


    
 $('.js-click-btn').on('click',function() {
	  $('.page15').show();
	  homeSwiper.lockSwipes();
 });  
 
 $('.js-restart').on('click',function() {
 	homeSwiper.slideTo(1);
 });
 
 $('.page4-btn1').on('click',function() {
 	homeSwiper.slideTo(2);
 });
 
 $('.page4-btn2').on('click',function() {
 	homeSwiper.slideTo(8);
 });
 
 $('.page4-btn3').on('click',function() {
 	homeSwiper.slideTo(13);
 });
 
 $('.page4-btn4').on('click',function() {
 	homeSwiper.slideTo(13);
 }); 
 
 $('.container').on('click','.back-home-cur',function() {
 	homeSwiper.slideTo(1);
 }); 
 
 
 
 
 
  


});


	    



//判断手机横竖屏状态： 
function hengshuping(){ 
	if(window.orientation==180||window.orientation==0){ 
         $('.tipzd').show(); 
		 //$('.tipzd').hide(); 
		 
	 } 
	if(window.orientation==90||window.orientation==-90){ 
		 $('.tipzd').hide(); 


 
	 } 
 } 

window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping , false);

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {
	var CANVAS = document.getElementById("canvas");
	var CTX = CANVAS.getContext("2d");
	var CHARS = [];
	var MAX_CHARS = 50;
	var SEPARATION = 1.5;

	var ww = void 0,
	    wh = void 0,
	    camera = void 0;

	var Vector = function () {
		function Vector(x, y, z) {
			_classCallCheck(this, Vector);

			this.x = x;
			this.y = y;
			this.z = z;
		}

		_createClass(Vector, [{
			key: "rotate",
			value: function rotate(dir, ang) {
				var X = this.x;
				var Y = this.y;
				var Z = this.z;

				var SIN = Math.sin(ang);
				var COS = Math.cos(ang);

				if (dir === "x") {
					this.y = Y * COS - Z * SIN;
					this.z = Y * SIN + Z * COS;
				} else if (dir === "y") {
					this.x = X * COS - Z * SIN;
					this.z = X * SIN + Z * COS;
				}
			}
		}, {
			key: "project",
			value: function project() {
				var ZP = this.z + camera.z;
				var DIV = ZP / 600;
				var XP = (this.x + camera.x) / DIV;
				var YP = (this.y + camera.y) / DIV;
				var CENTER = getCenter();
				return [XP + CENTER[0], YP + CENTER[1], ZP];
			}
		}]);

		return Vector;
	}();

	var Char = function () {
		function Char(letter, pos) {
			_classCallCheck(this, Char);

			this.letter = letter;
			this.pos = pos;
		}

		_createClass(Char, [{
			key: "rotate",
			value: function rotate(dir, ang) {
				this.pos.rotate(dir, ang);
			}
		}, {
			key: "render",
			value: function render() {
				var PIXEL = this.pos.project();
				var XP = PIXEL[0];
				var YP = PIXEL[1];
				var MAX_SIZE = 30;
				var SIZE = 1 / PIXEL[2] * MAX_SIZE | 0;
				var BRIGHTNESS = SIZE / MAX_SIZE;
				var COL = "rgba(255, 255, " + (100 * BRIGHTNESS | 0 + 150) + ", " + BRIGHTNESS + ")";

				CTX.beginPath();
				CTX.fillStyle = COL;
				CTX.font = SIZE + "px monospace";
				CTX.fillText(this.letter, XP, YP);
				CTX.fill();
				CTX.closePath();
			}
		}]);

		return Char;
	}();

	function getCenter() {
		return [ww / 2, wh / 2];
	}

	function signedRandom() {
		return Math.random() - Math.random();
	}

	function render() {
		for (var i = 0; i < CHARS.length; i++) {
			CHARS[i].render();
		}
	}

	var time = 0;
	function update() {
		CTX.clearRect(0, 0, ww, wh);
		for (var i = 0; i < CHARS.length; i++) {
			var DX = 0.005 * Math.sin(time * 0.001);
			var DY = 0.005 * Math.cos(time * 0.001);
			CHARS[i].rotate("x", DX);
			CHARS[i].rotate("y", DY);
		}
		++time;
	}

	function loop() {
		window.requestAnimationFrame(loop);
		update();
		render();
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	function createChars() {
		for (var i = 0; i < MAX_CHARS; i++) {
			var CHARACTER = String.fromCharCode(Math.random() * 93 + 34 | 0);
			var X = signedRandom() * SEPARATION;
			var Y = signedRandom() * SEPARATION;
			var Z = signedRandom() * SEPARATION;
			var POS = new Vector(X, Y, Z);
			var CHAR = new Char(CHARACTER, POS);
			CHARS.push(CHAR);
		}
	}

	function setDim() {
		ww = window.innerWidth;
		wh = window.innerHeight;
		CANVAS.width = ww;
		CANVAS.height = wh;
	}

	function initCamera() {
		camera = new Vector(0, 0, SEPARATION + 1);
	}

	window.onresize = setDim;

	(function () {
		setDim();
		initCamera();
		createChars();
		loop();
	})();
};