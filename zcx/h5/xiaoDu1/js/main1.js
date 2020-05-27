$(function(){
	var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}
		
	//滚动条不可滚动、高度100%
	tool.disabledScroll();
	
	$('.load-img6').addClass('fadeIn fastAnimated');

	
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

	
	var preload = new createjs.LoadQueue();
	var manifest = [
	{src: 'http://qiniu.smart08.com/xiaodu/images/loading.gif', id: 'loading'},
	{src: 'http://qiniu.smart08.com/xiaodu/images/p1_bg1.jpg', id: 'p1_bg1'},
	//{src: 'mp4/video1.mp4',id: 'video1'},
	//{src: 'http://qiniu.smart08.com/xiaodu/video/video.mp4',id: 'video1'},
	{src: 'images/play_btn3.png', id: 'play_btn3'},
	

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
		$("#progressbar").width((preload.progress*100|0) + "%");

	}
	
	function handleFileComplete(event) {
	  //document.body.appendChild(event.result);
	  console.log("已加载完毕全部资源");
	  $('.play-btn').show().addClass('playAin');
	  $('.loading-box').on('click', function () {
		  $('.loading-box').fadeOut();
		  $('.video-box').show();
		  video.play();
		  
		  
	  });
	}
	

	var video = document.getElementById('movie');

	//跳过视频
	$(".skip").click(function (e) {
		video.pause();
		$('.page-last').fadeIn();
		$('.video-box').hide();
		video.pause();
	});
	
	
	/*var timeline0 = [2.580305];
	video.addEventListener("timeupdate", function(){
		if (timeline0[0] && video.currentTime >= timeline0[0]) {
			video.pause();
		    $('.js-replay-btn').show();
			timeline0.shift();
			
		}
            
	}, false);*/
	
	//视频播放结束监听
	video.addEventListener("ended",function(){
		video.pause();
		$('.js-replay-btn').show();

	});
	

	
	$('.js-replay-btn').on('click', function () {
		$('.js-replay-btn').hide();
		video.currentTime = 0;
		//timeline0 = [2.580305];
		video.play();
	});
	
	
	
	function popTip(msg){
		$('.pop-tip .msg').html(msg);
		$('.pop-tip').show();
		setTimeout(function(){
			$('.pop-tip').hide();
		},2000);
	
	};

	//判断手机横竖屏状态： 
	function hengshuping(){ 
		if(window.orientation==180||window.orientation==0){ 
			 $('.screen-tip').hide(); 
			 
		 } 
		if(window.orientation==90||window.orientation==-90){ 
			  $('.screen-tip').show();
	
	
	 
		 } 
	 } 
	
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping , false);


	
	



});