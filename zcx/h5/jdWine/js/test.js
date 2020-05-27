var flag=false;
var shareTitleArr = [
	'致敬2017 敬我的……', 
	'致敬2017 敬最亲爱的你',
	'致敬2017 敬我的爸妈', 
	'致敬2017 敬我的好友',
	'致敬2017 敬我的最佳搭档'
];
var shareDescArr = [
	'来听我的酒后真言……', 
	'你能陪我长大，我敢陪你变老……',
	'这是我藏的最深的小秘密……', 
	'这次我的酒后“胡言”，你一定也懂……',
	'吵过架、撕过脸，但我还是想对你说……'
];
var shareLineArr = [
	'致敬2017 敬我的……\n来听我的酒后真言……', 
	'致敬2017 敬最亲爱的你\n你能陪我长大，我敢陪你变老……',
	'致敬2017 敬我的爸妈\n这是我藏的最深的小秘密……', 
	'致敬2017 敬我的好友\n这次我的酒后“胡言”，你一定也懂……',
	'致敬2017 敬我的最佳搭档\n吵过架、撕过脸，但我还是想对你说……'
];

var shareTitle = shareTitleArr[0];
var shareDesc = shareDescArr[0];
var shareLine = shareLineArr[0];
var sharLink = window.location.href; 
var shareInfo = {
	title: shareTitle,     
	desc:shareDesc,
	linetitle: shareLine,
	imgUrl:'http://h5.hyh6.com/CompanyProject/jdWine/images/fenxiang.jpg', 
}; 
//wxShare(sharLink,shareInfo);



var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}
	
//滚动条不可滚动、高度100%
tool.disabledScroll();

var preload = new createjs.LoadQueue();
var manifest = [
{src: 'images/loading_bg.jpg', id: 'loading_bg'},
{src: 'images/p1_bg.jpg', id: 'p1_bg'},
{src: 'images/p2_bg.jpg', id: 'p2_bg'},
{src: 'images/p2_bg1.jpg', id: 'p2_bg1'},
{src: 'images/p3_friend.jpg', id: 'p3_friend'},
{src: 'images/p3_lovers.jpg', id: 'p3_lovers'},
{src: 'images/p3_family.jpg', id: 'p3_family'},
{src: 'images/p3_boss.jpg', id: 'p3_boss'},
{src: 'images/p4_bg.jpg', id: 'p4_bg'},


{src: 'images/loading_img1.png', id: 'loading_img1'},
{src: 'images/p1_img0.png', id: 'p1_img0'},
{src: 'images/p3_boss_sprites.png', id: 'p3_boss_sprites'},
{src: 'images/p3_family_sprites.png', id: 'p3_family_sprites'},
{src: 'images/p3_friend_sprites.png', id: 'p3_friend_sprites'},
{src: 'images/p3_lovers_sprites.png', id: 'p3_lovers_sprites'},

{src: 'images/bgmusic.mp3?6',id: 'bgm'},

];
function init() {
  preload.installPlugin(createjs.Sound);//注意加载音频文件需要调用如下代码行
  preload.addEventListener("fileload", handleFileLoad);
  preload.addEventListener("progress", handleFileProgress);
  preload.addEventListener("complete", handleFileComplete);
  preload.addEventListener("error", loadError);
  //preload.loadFile("assets/preloadjs-bg-center.png");
  preload.loadManifest(manifest);
}
init();

//处理单个文件加载
function handleFileLoad(event) {
	console.log("文件类型: " + event.item.type);
	if(event.item.id == "logo"){
		console.log("logo图片已成功加载");
	}
}

//处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
function loadError(evt) {
	console.log("加载出错！",evt.text);
}

//已加载完毕进度 
function handleFileProgress(event) {
	//console.log("已加载 " + (preload.progress*100|0) + " %");
	$('#progressText em').text((preload.progress*100|0));
	
}

function handleFileComplete(event) {
  //document.body.appendChild(event.result);
  console.log("已加载完毕全部资源");
  $('.loading-box').fadeOut();
  page1Ani();
}

var soundID = "Thunder";

function loadSound () {
  createjs.Sound.registerSound("assets/thunder.ogg", soundID);
}

function playSound () {
  createjs.Sound.play(soundID);
}


  
function audioAutoPlay(id){
	var audio = document.getElementById(id),
		play = function(){
		audio.play();
		audio.volume=0.8;
		document.removeEventListener("touchstart",play, false);
	};
	audio.play();
	document.addEventListener("WeixinJSBridgeReady", function () {//微信
	   play();
	
	}, false);
	document.addEventListener('YixinJSBridgeReady', function() {//易信
			  play();
		}, false);
	//document.addEventListener("touchstart",play, false);
}

audioAutoPlay('bgMusic');


function page1Ani(){
	$('.page1').show();
	$('.music').show();
	
	setTimeout(function(){
	  $('.calendar1').addClass('calendarAni');
	  $('.calendar2').addClass('calendarAni');
	  $('.calendar3').addClass('calendarAni');
	  $('.calendar4').addClass('calendarAni');
	  $('.calendar5').addClass('calendarAni');
	  
    },1000);
	setTimeout(function(){
	  $('.page2').show();
	  $('.page2').addClass('page2ToAni');
	  setTimeout(function(){
		  $("#snow").websnowjq({ snowFlakes: 50 });//snowFlakes雪花的数量 
		},5000);
	  
	},6000);
	
	$('.page2bgTo').on('click',function(e){
		e.stopPropagation();

		$('.page2bgTo').addClass('page2bgToAni');
		$('.page2').show();
		setTimeout(function(){
		  $('.page1').hide();	
		},2000);
		//$('.page1').addClass('page1Scale');
		
		setTimeout(function(){
		  //$('.page1').fadeOut();	
		  //$('.page2').show();
		  $("#snow").websnowjq({ snowFlakes: 50 });//snowFlakes雪花的数量 
		},4000);
	
	});



}


var index;
var dataTxtNum;
var dataNick;
var randomNickNum,randomDescNum;
$('.page2').on('click','.ele',function(e){
	e.stopPropagation();
	index = parseInt($(".page2 .ele").index($(this)))+1; 
	dataTxtNum = parseInt($(this).attr('data-txt-num')); 
	dataNick = $(this).attr('data-nick');
	
	shareTitle = shareTitleArr[index];
    shareDesc = shareDescArr[index];
    shareLine = shareLineArr[index];
	console.log(shareTitle,shareDesc,shareLine);
	var sharLink = window.location.href; 
	var shareInfo = {
		title: shareTitle,     
		desc:shareDesc,
		linetitle: shareLine,
		imgUrl:'http://h5.hyh6.com/CompanyProject/jdWine/images/fenxiang.jpg', 
	};
	wxShare(sharLink,shareInfo);

	$('.page3').show();
	$('.page2').addClass('page2Scale'+index);
	$('#waterMusic')[0].play();
	setTimeout(function(){
	  $('.page3 .ele'+index).fadeIn()//.addClass('initEleScale');
	  $('.page3 .hand'+index).fadeIn()//.addClass('initEleScale');
	},1100)
	setTimeout(function(){
	$('.shake-tip').fadeIn();
	$('.shake-icon').addClass('shakeAni')
	$('.page2').hide();
	window.addEventListener('deviceorientation', setDeviceorientation, true);
	
	function setDeviceorientation(e){
		//初始状态 手机水平放置，屏幕朝上
		//e.alpha属性，表示在沿着Z轴的旋转（手机水平左右晃动）。它的取值范围是[0, 360)
		//e.beta属性，表示在沿着X轴的旋转（手机前后翻转），它的取值范围是[-180, 180)
		//e.gamma属性，表示在沿着Y轴的旋转（手机左右翻转），它的取值范围是[-90, 90)
		/*var speed = 10;
		var x = t = z = lastX = lastY = lastZ = 0;
		if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {}
		lastX = x;
		lastY = y; */
		if(e.beta>45){
			$('.page2').removeClass('page2Scale1 page2Scale2 page2Scale3 page2Scale4');
			$('.page3 .hand'+index).removeClass('initEleScale').addClass('raiseAnimate');
			$('.shake-tip').hide();
			$('.shake-icon').removeClass('shakeAni')
			setTimeout(function(){
				$('.page3 .hand'+index).removeClass('raiseAnimate').addClass('eleScale');
			},2000);
			setTimeout(function(){
				$('.js-page4').fadeIn();
				$('.page3').hide();
				$('.page3 .hand').removeClass('eleScale');
				$('.page3 .hand').hide();
				$('.page3 .ele').hide();
				$('.music').hide();
				var toTxtArr = 3;
				randomNickNum = Math.ceil(Math.random() * toTxtArr);
				randomDescNum = Math.ceil(Math.random() * dataTxtNum);
				var shareTitle = shareTitleArr[randomKey];
				$('.to-txt').find('img').attr('src','images/'+dataNick+'_nick'+randomNickNum+'.png');
				$('.to-desc').find('img').attr('src','images/'+dataNick+'_txt'+randomDescNum+'.png');
			},3500);
			window.removeEventListener('deviceorientation', setDeviceorientation, true);
		}
	
	};
	
	},1100);
	
	$('.shake-tip').on('click',function(e){
		console.log(index);
		$('.page2').removeClass('page2Scale1 page2Scale2 page2Scale3 page2Scale4');
		$('.page3 .hand'+index).removeClass('initEleScale').addClass('raiseAnimate');
		$('.shake-tip').hide();
		$('.shake-icon').removeClass('shakeAni')
		setTimeout(function(){
			$('.page3 .hand'+index).removeClass('raiseAnimate').addClass('eleScale');
		},2000);
		setTimeout(function(){
			$('.js-page4').fadeIn();
			$('.page3').hide();
			$('.page3 .hand').removeClass('eleScale');
			$('.page3 .hand').hide();
			$('.page3 .ele').hide();
			$('.music').hide();
			var toTxtArr = 3;
		    randomNickNum = Math.ceil(Math.random() * toTxtArr);
			randomDescNum = Math.ceil(Math.random() * dataTxtNum);
			var shareTitle = shareTitleArr[randomKey];
			$('.to-txt').find('img').attr('src','images/'+dataNick+'_nick'+randomNickNum+'.png');
			$('.to-desc').find('img').attr('src','images/'+dataNick+'_txt'+randomDescNum+'.png');
		},3500);
		
	});
	

});





$('.public-btn').on('click',function(e){
	    popTip('海报生成中...'); 
		var userNick;  //微信昵称
		var userAvatar;//微信头像
		var composeImgName = dataNick;        //合成图片中场景图片的名字
		var composeImgNickNum = randomNickNum;//合成图片中昵称文字的图片序列号
		var composeImgDescNum =randomDescNum; //合成图片中文字内容的图片序列号
		console.log(composeImgName,randomNickNum,randomDescNum);
		$.ajax({
		      type: "GET",
		      async: false,
		      url: "http://services.hyh6.com/Customer.aspx?userNick=" + userNick + "&userAvatar=" + userAvatar + "&composeImgName=" + composeImgName + "&composeImgNickNum=" + composeImgNickNum + "&composeImgDescNum=" + composeImgDescNum,
		      dataType: "jsonp",
		      jsonCallback: "info",
		      success: function (data) {
		          if (data.result == 1) {
		              popTip('生成完成'); 
					  $('.js-page5').show();
					  $('.js-page4').hide();
		          } 
		      } 
	    });
		
	
});

$('.js-restart-btn').on('click',function(e){
		$('.page2').show();
		$('.js-page4').hide();
	
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
	$('.pop-tip .msg').html(msg);
	$('.pop-tip').show();
	setTimeout(function(){
		$('.pop-tip').hide();
	},2000);
};

$('.music').on('click', function () {

  if ($('.music').hasClass('on')) {
	  $('.music').removeClass('on');
	  $('.music img').attr('src', 'images/music1.png');
		 $('#bgMusic')[0].pause();
		 $('#bgMusic')[0].volume=0.8;
		 
		
	  
  } else {
	  $('.music').addClass('on');
	  $('.music img').attr('src', 'images/music0.png');
		 $('#bgMusic')[0].play();
		 $('#bgMusic')[0].volume=0.8;
		
  }
});




	 