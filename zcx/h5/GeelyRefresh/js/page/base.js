$(document).ready(function(){
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
	audioAutoPlay('media');
	
	
	var bar = 0;
    var loadingTime;
    function progress() {
        bar = bar + 1;
        $("#loading_text").text("Loading " + bar + " %");
		$('#loading .brush-icon').fadeIn().css('top', bar + "%");
		$('#loading .brush-box').css('top', bar + "%");
		if (bar < 40) {
            loadingTime = setTimeout(progress, 10);
        }
		else if (bar == 40) {
            loadingTime = setTimeout(progress, 1000);
			
        }
		else if (bar < 70& bar > 40) {
			
            loadingTime = setTimeout(progress, 10);
        }
		else if (bar == 70) {
            loadingTime = setTimeout(progress, 1000);
			
        }
		else if (bar <= 99& bar > 70) {
			
            loadingTime = setTimeout(progress, 10);
        }else {
            $('#loading').hide();
			$('.page1').fadeIn();
        }

    }

    setTimeout(function(){
		$("#loading_text").show();
		progress();
	},1000);
	
	
	var loadFunction = function() {
		  var imgArr = [		
				  "images/bg.jpg", 
				  "images/2005.png", 
				  "images/2006.png",
				  "images/2007.png",
				  "images/2008.png", 
				  "images/2009.png",
				  "images/2010.png",
				  "images/2011.png", 
				  "images/2012.png",
				  "images/2013.png", 
				  "images/2014.png",
				  "images/2015.png", 
				  "images/2016.png",
				  "images/2017.png", 
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
						//$("#media")[0].play();
						
						/*setTimeout(function(){
							$('#loading').hide();
							$('.page1').fadeIn();
						},3000);*/
					  }
				  };
				  img.src = url;
			  };
		  for (var i = 0; i < imgArrLength; ++i) {
			  loadImage(imgArr[i]);
		  }
	  }();
	  


});






// 关闭弹层
$('.pop-box .close-btn').on('click',function(e){
	e.stopPropagation();
	$('.mask').hide();
	$('.pop-box').removeClass('show');
});



//分享
$('.js-share-btn').click(function(){
	$('.js-share-pop').show();	
});
$('.js-share-pop').click(function(e){
	e.stopPropagation();
	$('.js-share-pop').hide();	
});




function popTip(msg){
	$('.mask1').fadeIn(50);
	$('.pop-tip-msg').html(msg);
	$('.pop-tip-box').show();
	setTimeout(function(){
		$('.mask1').hide();
		$('.pop-tip-box').hide();
		flag = 1;
	},3000);
};





var randomNum = function(e, t) {
	return Math.floor(Math.random() * (t - e + 1)) + e
}

for (var i = 0, n = 40; i < n; i++){
	lineAni();
}
function lineAni() {
	var rotateDeg = randomNum(0, 360),
		delay = randomNum(1, 10) / 10, 
		duration = randomNum(5, 20) / 10 ,
		nameNum = randomNum(30, 100);
	var lineCtnDom = '<div class="lineCtn pa"><div class="line pa"></div></div>';
	$('.loading-ctn').find(".lineBg")
	.append(lineCtnDom)
	.children()
	.last()
	.css({"-webkit-transform": "rotateZ(" + rotateDeg + "deg)"})
	.children()
	.css({
		"-webkit-animation-name": "line_animation_" + nameNum,
		"-webkit-animation-duration": duration + "s",
		"-webkit-animation-delay": delay + "s",
		"-webkit-animation-timing-function": "ease-in-out",
		"-webkit-animation-fill-mode": "forwards"
	}).on("webkitAnimationEnd", function() {
		$(this).parent().remove(),
		lineAni();
	})
}
$('.loading-ctn').show(),
$('.loading-ctn').addClass("fadeIn animated").on("webkitAnimationEnd", function() {
	$(this).off("webkitAnimationEnd").removeClass("fadeIn").css({
		opacity: 1
	});
	yearAni();
});
  
var year = 2008, time = 600, duration = 1.5;  
function yearAni() {
	if(year > 2017){
		return false;
	}else if(year === 2017){
	   	$('.loading-ctn').find(".y" + year).addClass("active_2017").show();
		setTimeout(function() {
			$('.loading-ctn').find(".y2017-btn").addClass("fadeIn animated infinite");
		},1000);
		/*setTimeout(function() {
			$('.brush-icon').show().addClass('brushIcon');
			setTimeout(function(){
				$('.page1').hide();
				$('.brush-icon').hide().removeClass('brushIcon');
				$('.brush-box').removeClass('brushIcon');
				$('.brush-box').hide();
				page2();
			},1000);
		}, 1500);*/
	}else{
		$('.loading-ctn').find(".y" + year).addClass("active").css({"-webkit-animation-duration": duration + "s"}).show()
	};
	year++;
	time -= 40;
	duration -= .11;
	setTimeout(function() {
		yearAni();
	}, time);
	
}


$('.page1').on('click','.active_2017,.y2017-btn',function(){
	$('.brush-box').addClass('brushIcon');
	$('.brush-icon').show().addClass('brushIcon');
	setTimeout(function(){
		$('.page1').hide();
		$('.brush-icon').hide().removeClass('brushIcon');
		$('.brush-box').removeClass('brushIcon');
		$('.brush-box').hide();
		page2();
	},1000);
});


function page2(){
	$('.page2').show();
	$('.page2').find(".txt_0").addClass("active").show();
	setTimeout(function() {
		$('.page2').find(".txt_1").addClass("active").show();
		$('.page2').find(".txt_2").addClass("active").show();
		$('.page2').addClass("active");
		setTimeout(function() {
			$('.page2').removeClass("active");
			$('.page2').find(".btnCtn").addClass("active");
			setTimeout(function() {
				if ($('.page2').addClass("active_big")){
					$('.page2').find(".btnCtn").addClass("tada animated infinite");
					$('.bg2').addClass("fadeIn animated infinite");
				}
				setTimeout(function(){
					$('.brush-box').show().addClass('brushIcon');
					$('.brush-icon').show().addClass('brushIcon');
					setTimeout(function(){
						$('.page2').hide();
						$('.brush-icon').hide().removeClass('brushIcon');
						$('.brush-box').removeClass('brushIcon');
						$('.brush-box').hide();
						page3();
					},1000);
				},9000);
			}, 10)
		}, 500)
	}, 200)
}


function page3(){
	$('.page3').show();
	$('.page3 .ele1').fadeIn().addClass("slideInDown animated");
	setTimeout(function(){
		$('.page3 .ele2').addClass("fadeIn animated");
		
	},500);
	setTimeout(function(){
		$('.page3 .ele3').addClass("fadeIn animated");
		$('.page3').addClass("active_big")
	},1000);
	setTimeout(function(){
		$('.page3 .ele4').addClass("fadeIn animated");
	},1500);
	setTimeout(function(){
		$('.page3 .btn').fadeIn().addClass("bounce animated");
	},2000);
}


function page5(){
	$('.page5').show();
	$('.page5 .ele1').addClass("fadeIn animated");
	setTimeout(function(){
		$('.page5 .ele2').addClass("fadeIn animated infinite");
	},500);
	setTimeout(function(){
		$('.page5 .ele3').addClass("fadeIn animated infinite");
	},750);
	setTimeout(function(){
		$('.page5 .ele4').addClass("fadeIn animated infinite");
	},1000);
	setTimeout(function(){
		$('.page5 .ele5').fadeIn().addClass("leftRightMove1");
		$('.page5').addClass("active_big")
	},1500);
	setTimeout(function(){
		$('.page5 .ele6').addClass("fadeIn animated");
	},2000);
	setTimeout(function(){
		$('.page5 .ele7').addClass("fadeIn animated");
	},2500);
	setTimeout(function(){
		$('.page5 .ele-txt').addClass("fadeIn animated");
	},2700);
	setTimeout(function(){
		$('.page5 .btn1').fadeIn().addClass("bounce animated");
	},3000);
	setTimeout(function(){
		$('.page5 .btn2').fadeIn().addClass("bounce animated");
	},4000);
}

$('.page3 .btn,.page5 .btn2').on('click',function(){
	$('.brush-box').show().addClass('brushIcon');
	$('.brush-icon').show().addClass('brushIcon');
	setTimeout(function(){
		$('.page3').hide();
		$('.brush-icon').hide().removeClass('brushIcon');
		$('.brush-box').removeClass('brushIcon');
		$('.brush-box').hide();
		$("#media").attr('src','images/music02.mp3');
		$("#media")[0].play();
		clickNum = 1;
		flag = 1;
		$('.'+liName1).removeClass('widthZero');
		$('.'+liName2).removeClass('widthZero');
		$('.page4').show();
		
		
		$('.page4 .ele1').addClass("fadeIn animated");
		setTimeout(function(){
			$('.page4 .ele2').addClass("fadeIn animated");
			
		},500);
		setTimeout(function(){
			$('.page4 .ele3').addClass("fadeIn animated");
			//$('.page4').addClass("active_big")
		},1000);
		setTimeout(function(){
			$('.page4 .game-txt-list').fadeIn();;
		},1500);
		},1000);
	
	
});

/*$('.page5 .btn2').on('click',function(){
	 window.location.href= "index.html?"+Math.random(); 
	
});*/


var dataTxt;
var dataName;
var dataName1;
var dataName2;
var dataName3;
var userName = "小红";
var clickNum = 1;
var flag = 1;
var liName1,liName2;
$('.game-txt-list').on('touchend','li',function(e){
	if(flag == 1){
	flag = 0
	
	var dataTxt1 = $(this).attr('data-txt1');
	var dataTxt2 = $(this).attr('data-txt2');
	

	if(clickNum==1){
		dataName1 = $(this).attr('data-name');
		dataTxt=dataTxt2;
		popTip(dataTxt);
		liName1 = $(this).attr('class');
		$('.'+liName1).addClass('widthZero');
	}else if(clickNum==2){
		dataName2 = $(this).attr('data-name');
		var num = Math.ceil(Math.random()*2);
		if(num==1){
            userName=$("#weixinname").val();
			//dataName = "不是从“" + dataName1 + "”开始，而是从“"+ dataName2 + "“开始，还满意吗？少年~";
            dataName = "从"+ dataName1 + "、" + dataName2 + "开始"+ "<br>" + "还满意吗？少年~";
			dataNameShare = "给力2017！" + userName +"靠"+ dataName1 + "、" + dataName2 + "刷新自己！你呢？";
			//popTip(dataTxt);
			var sharLink = window.location.href; 
				var shareInfo = {
				title:'刷新自己，给力2017',     
				desc:dataNameShare,
				linetitle:dataNameShare,
				imgUrl:'http://h5.hyh6.com/CompanyProject/GeelyRefresh/images/share_icon.png', 
			}; 
			wxShare(sharLink,shareInfo);

			var showTxt = "2017你刷新自己的关键词是：" + "<br><strong style='color: #f00;font-size: 18px;'>" + dataName1 + "," + dataName2 +"</strong>" ;
			$('.ele-txt').html(showTxt);
			$('.mask1').fadeIn(100);
			$('.pop-msg').html(dataName);
			$('.pop-box2').addClass('show');
		}else if(num==2){
			dataTxt=dataTxt2;
			popTip(dataTxt);
			liName2 = $(this).attr('class');
			$('.'+liName2).addClass('widthZero');
			//$('.'+liName).css({'width':0}).hide();
		}
		
	}else if(clickNum>=3){
        userName=$("#weixinname").val();
		dataName3 = $(this).attr('data-name');
		dataTxt=dataTxt1;
		//dataName = "不是从“" + dataName1 + "”,“" + dataName2 + "”开始，而是从“"+ dataName3 + "“开始，还满意吗？少年~";
      
        dataName = "从"+ dataName1 + "、" + dataName2 + "、" + dataName3 + "开始"+ "<br>" + "还满意吗？少年~";
		dataNameShare = "给力2017！" + userName +"靠"+ dataName1 + "、" + dataName2 + "刷新自己！你呢？";
		//popTip(dataTxt);
		var sharLink = window.location.href; 
			var shareInfo = {
		    title:'刷新自己，给力2017',     
		    desc:dataNameShare,
            linetitle:dataNameShare,
		    imgUrl:'http://h5.hyh6.com/CompanyProject/GeelyRefresh/images/share_icon.png', 
	    }; 
		wxShare(sharLink,shareInfo);
		var showTxt = "2017你刷新自己的关键词是：" + "<br><strong style='color: #f00;font-size: 18px;'>" + dataName1 + "," + dataName2 + "," + dataName3 +"</strong>";
	    $('.ele-txt').html(showTxt);
		$('.mask1').fadeIn(100);
		$('.pop-msg').html(dataName);
		$('.pop-box2').addClass('show');
	
	}

	clickNum++;
	}
});

var num = Math.ceil(Math.random()*2);
		console.log(num);


$('.pop2-submit-btn').on('click',function(e){
	$('.mask1').hide();
	$('.pop-box2').removeClass('show');
	$('.brush-box').show().addClass('brushIcon');
	$('.brush-icon').show().addClass('brushIcon');
	setTimeout(function(){
		$('.page4').hide();
		$('.brush-icon').hide().removeClass('brushIcon');
		$('.brush-box').removeClass('brushIcon');
		$('.brush-box').hide();
		page5();
	},1000);
	
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


