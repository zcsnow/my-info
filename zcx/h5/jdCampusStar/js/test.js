var flag=false;

var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}
	
//滚动条不可滚动、高度100%
tool.disabledScroll();

$.fn.longPress = function(fn) {
    var timeout = undefined;
    var $this = this;
    for(var i = 0;i<$this.length;i++){
        $this[i].addEventListener('touchstart', function(event) {
            timeout = setTimeout(fn, 800);
            }, false);
        $this[i].addEventListener('touchend', function(event) {
            clearTimeout(timeout);
            }, false);
    }
}
	  
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
	//document.addEventListener("touchstart",play, false);
}
//audioAutoPlay('bgMusic');

function add(name,className, time)  {
  setTimeout(function(){
	  $(name).addClass(className);
  },time*1000);
};
function remove(name, className, time)  {
  setTimeout(function(){
	  $(name).removeClass(className);
  },time*1000);
}; 


var preload = new createjs.LoadQueue();
var manifest = [
{src: 'images/load_bg.jpg', id: 'load_bg'},
{src: 'images/loading_img3.png', id: 'loading_img3'},
{src: 'images/p1_bg.jpg', id: 'p1_bg'},
{src: 'images/p2_bg1.jpg', id: 'p2_bg1'},
{src: 'images/p2_bg2.jpg', id: 'p2_bg2'},
{src: 'images/p2_bg3.jpg', id: 'p2_bg3'},
{src: 'images/p2_bg4.jpg', id: 'p2_bg4'},
{src: 'images/p2_bg5.jpg', id: 'p2_bg5'},
{src: 'images/p2_bg6.jpg', id: 'p2_bg6'},
{src: 'images/p2_bg7.jpg', id: 'p2_bg7'},
{src: 'images/load_bg.jpg', id: 'load_bg'},
{src: 'images/bgmusic.mp3?6',id: 'bgm'},
{src: 'images/1.wav?2',id: 'sound2_1'},


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
	//$('#progressText').html((preload.progress*100|0) + " %");
	$("#progressbar").width((preload.progress*100|1) + "%");
}

function handleFileComplete(event) {
  //document.body.appendChild(event.result);
  console.log("已加载完毕全部资源");
  $('.loading-box').fadeOut();
  page3Ani();
}

var soundID = "Thunder";

function loadSound () {
  createjs.Sound.registerSound("assets/thunder.ogg", soundID);
}

function playSound () {
  createjs.Sound.play(soundID);
}
 

var homeSwiper;
var flag = false;
var initFlag = false;
/*setTimeout(function(){
      //隐藏loading页面
	  $('.loading-box').hide()
	  $('.page1').fadeIn();
},500);*/
function page1Ani(){
	$('.page1').show();
	$('.music').show();
	
}
function page2Ani(){
	$('.page1').hide();
	$('.page2').show();
	homeSwiper = new Swiper('#homeSlider', {
		//loop:true,       //循环切换
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		//noSwiping : true,
		/*effect : 'flip',
		flip: {
            slideShadows : true,
            limitRotation : true,
        },*/
		onInit: function (swiper) {
			if(initFlag==false){
				initFlag=true;
				swiperAnimateCache(swiper);
				swiperAnimate(swiper);
			}
		},
		onSlideChangeEnd: function (swiper) {
			flag = true;
			
			//swiperAnimate(swiper);
			if(swiper.activeIndex==0){
				  $('.slide1 .p1').css({'animation-duration': '2s','-webkit-animation-duration': '2s','animation-delay': '0s','-webkit-animation-delay': '0s'}).addClass('pMove1');
				  $('.slide1 .p2').css({'animation-duration': '2s','-webkit-animation-duration': '2s','animation-delay': '0s','-webkit-animation-delay': '0s'}).addClass('pMove2');
			}
			
		}
	
	});
	
}



$('.page1 .btn').longPress(function(){
	page2Ani()
});



$('.swiper-slide').on('click','.btn',function(e){
	page3Ani()
});

function page3Ani(){
	$('.page2').hide();
	$('.page3').show();
	//play()
	
}







var p01 = document.getElementById('p01');
var p02 = document.getElementById('p02');
var p03 = document.getElementById('p03');
var p04 = document.getElementById('p04');

var container = document.getElementById('container');
var start = document.getElementById('start');
// var gamePause = document.getElementById('gamePause');
var gameRestart = document.getElementById('gameRestart');

var ul = container.getElementsByTagName('ul');
var p = container.getElementsByTagName('div');
var li = container.getElementsByTagName('li');
var score = document.getElementById('score');
var status = document.getElementById('status');
var timeSet = document.getElementById('time');

var music = document.getElementById('music');
var musicWelcome = document.getElementById('musicWelcome');
var musicWin = document.getElementById('musicWin');
var musicPause = document.getElementById('musicPause');
var musicBtn01 = document.getElementById('musicBtn01');
var musicBtn02 = document.getElementById('musicBtn02');
var musicBtn03 = document.getElementById('musicBtn03');
var musicBtn04 = document.getElementById('musicBtn04');		

var music4 =  document.getElementById('music4');
var musictime = document.getElementById('musictime');
var unbelieve = document.getElementById('unbelieve');

var scoreChange = 0;
var speed = 7;
var timer = null;
var timer02 = null;
var flag = 0;


// 生成4个UL
for (var i=0; i<4; i++){
	var ulChange=document.createElement('ul');
	container.appendChild(ulChange);
}
$('.start_inner').on('click',function(e){
	play()
});


// 开始游戏
function play(){	
	window.setInterval(timeCheck, 1000);
	start.style.display="none";
	status.innerHTML="";
	function generate()
	{
		var num=numRandom(0, 4);
		var liChange=document.createElement('li');
		liChange.style.background="-webkit-linear-gradient( top,transparent," + colorRandom() + ")";
		ul[num].appendChild(liChange);
		move(liChange, function ()
		{
			if (li.length>=20)
			{
				gotoEnd();
				alert('德玛西亚！， 得分'+scoreChange);
			}
		});
		// timer02=setInterval(cut, 3000);
	}
	generate();
	timer=setInterval(generate, 500);
}

// 暂停游戏
function pasue (){
	//music.pause();
	//musicPause.play();
	clearInterval(timer);
	for (var i=0; i<li.length; i++)
	{
		clearTimeout(li[i].timeout);
	}
	status.innerHTML="暂停" + '<br />' + "得分：" + scoreChange;
	for (i=0; i<ul.length; i++)
	{
		ul[i].innerHTML='';
	}
}

// 结束游戏
function gotoEnd (){
	//music.pause();
	//musicWin.play();
	clearInterval(timer);
	for (var i=0; i<li.length; i++)
	{
		clearTimeout(li[i].timeout);
	}
	
	for (i=0; i<ul.length; i++)
	{
		ul[i].innerHTML='';
	}
	
	scoreChange=0;
	speed=7;
}

// 生成随机颜色
function colorRandom(){
	return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
}

// 生成随机数字
function numRandom(m, n){
	return parseInt(Math.random()*(n-m)+m);
}

// 倒数计时
function timeCheck(){
	if(timeSet.innerHTML == 0){
		timeSet.innerHTML="时间到了";
		if(scoreChange<100){
			//musictime.play();
			status.innerHTML="青铜小学生!" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}
		if(scoreChange>100){
			//musictime.play();
			status.innerHTML="你是猪吗?" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}
		if(scoreChange>200){
			//musictime.play();
			status.innerHTML="666!" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}				
		if(scoreChange>500){
			//music4.play();
			status.innerHTML="超凡大师!" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}	
		if(scoreChange>1000){
			//music4.play();
			status.innerHTML="最强王者!" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}	
		gotoEnd ();
		return false;
	}
	timeSet.innerHTML = timeSet.innerHTML * 1 - 1;
}

// 游戏速度加快/提示音
function testScoreChange(){
	switch(scoreChange) {
		case 100:
			//unbelieve.play();
			speed = 8;
			break;
		case 150:
			//unbelieve.play();
			break;
		case 200:
			//unbelieve.play();
			speed = 10;
			break;
		case 250:
			//unbelieve.play();
			break;
		case 300:
			//unbelieve.play();
			break;
		case 350:
			//unbelieve.play();
			break;
		case 400:
			//unbelieve.play();
			break;												
		case 500:
			//unbelieve.play();
			speed = 12;
			break;
		case 1000:
			//unbelieve.play();
			speed = 16;
			break;
	}		
}

// 核心判断函数
function lazy(n){
	if (!ul[n].children.length)
	{
		if(scoreChange<100){
			status.innerHTML="青铜小学生!" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}
		if(scoreChange>100){
			status.innerHTML="你是猪吗?" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}
		if(scoreChange>200){
			status.innerHTML="666!" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}				
		if(scoreChange>500){
			//music4.play();
			status.innerHTML="超凡大师!" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}	
		if(scoreChange>1000){
			//music4.play();
			status.innerHTML="最强王者!" + '<br />' + " 得分: " + scoreChange + '<br />' + "按F重新开始";
		}	
		
		gotoEnd();
		return;
	}
	var height = coll(ul[n].children[0], p[n]);
	console.log(typeof(height));
	console.log(height);

	if (height){
		// ul[n].children[0].style.background="#000";
		ul[n].removeChild(ul[n].children[0]);
		// p[n].style.background="rgba(255,255,255,1.0)";
		score.innerHTML=scoreChange;
		return;
	}else{
		status.innerHTML="MISS";
		ul[n].removeChild(ul[n].children[0]);
		return;
	}
}

function reload(){
	document.location.reload();
}
// 点击事件
// gamePause.onclick=pasue;
gameRestart.onclick=reload;
 p01.onclick = function(){
	testScoreChange()
	lazy(0);
 }
 p02.onclick = function(){
	testScoreChange()
	lazy(1);
 }
 p03.onclick = function(){
	testScoreChange()
	lazy(2);
 }
 p04.onclick = function(){
	testScoreChange()
	lazy(3);
 } 	 

// 键盘事件
document.onkeydown=function (ev){
	var ev=ev||event;
	// 当分数超过一定数目加速
	testScoreChange();

	// 判断键盘位置
	switch(ev.keyCode)
	{
		case 81:
			//musicBtn01.play();
			lazy(0);
			break;
		case 87:
			//musicBtn02.play();
			lazy(1);
			break;
		case 79:
			//musicBtn03.play();
			lazy(2);
			break;
		case 80:
			//musicBtn04.play();
			lazy(3);
			break;
		case 13:
			if(flag == 0){
				play();
				//设置为1的状态，停止改变
				flag =1;
			}else{
				pasue();
				flag=0;
			}
			break;
		case 70:
			reload();
			break;
	}
};


// 方块向下移动
function move (obj){
	clearInterval(obj.timer);
	obj.timer=setInterval(function ()
	{
		obj.style.top=obj.offsetTop+speed+'px';
		// fnDuring && fnDuring.call(obj);
	}, 30);	
}

// 获得位置
function getPos (obj){
	var left=0;
	var top=0;
	while(obj)
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		obj=obj.offsetParent
	}
	return {'left': left, 'top': top};
}	

// 判断是否得分
function coll (obj1, obj2){
	var l1=getPos(obj1).left;
	var r1=getPos(obj1).left+obj1.offsetWidth;
	var t1=getPos(obj1).top;
	var b1=getPos(obj1).top+obj1.offsetHeight;
	// console.log("方块距离上部的高度:" + t1);
	var l2=getPos(obj2).left;
	var r2=getPos(obj2).left+obj2.offsetWidth;
	var t2=getPos(obj2).top;
	var b2=getPos(obj2).top+obj2.offsetHeight;
	if (l1>r2 || r1<l2){
		// status.innerHTML="WRONG!";
		return false;
	}
	console.log("距离左侧距离:" + l1);
	console.log("离上部的高度:" + b1);
	if(b1>460 && b1<560){
		status.innerHTML="Good!";
		if(b1>=485 && b1<=528){
			status.innerHTML="Perfect!";
			// unbelieve.play();
			scoreChange+=10;
			return true;	
		}
		scoreChange+=5;
		return true;	
	}

}



//分享
$('.js-share-btn').click(function(){
	$('.js-share-pop').show();	
});
$('.js-share-pop').click(function(e){
	e.stopPropagation();
	$('.js-share-pop').hide();	
});



function popTip(msg){
	$('.pop-tip-msg').html(msg);
	$('.pop-tip-box').show();
	setTimeout(function(){
		$('.pop-tip-box').hide();
	},2000);
};

$('.music').on('click', function () {
  if ($('.music').hasClass('on')) {
	  $('.music').removeClass('on');
	  $('.music img').attr('src', 'images/music1.png');
		 $('#media')[0].pause();
	  
  } else {
	  $('.music').addClass('on');
	  $('.music img').attr('src', 'images/music0.png');
		 $('#media')[0].play();
		
  }
});



	  
	 