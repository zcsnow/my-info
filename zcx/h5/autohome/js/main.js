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
	{src: 'images/end_img1.jpg', id: 'end_img1'},
	{src: 'images/end_img2.jpg', id: 'end_img2'},
	{src: 'images/end_img3.jpg', id: 'end_img3'},
	{src: 'images/end_btn1.jpg', id: 'end_btn1'},
	{src: 'images/end_btn2.jpg', id: 'end_btn2'},

	{src: 'images/loading_img1.png', id: 'loading_img1'},
	{src: 'images/loading_btn.png', id: 'loading_btn'},
	
	{src: 'images/css_sprites.png', id: 'css_sprites'},
	

	{src: 'mp4/video.mp4',id: 'video'},
	
	
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
	//init();
	
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
	  $('.load-img').hide();
	  $('.play-btn').show().addClass('playAin');
	  $('.play-btn').on('click', function () {
		  $('.loading-box').fadeOut();
		  $('.video-box').show();
		  video.play();
		  
		  
	  });
	}
	
	
	 var bar = 0;
	 var loadingTime;
	 function progress() {
		  bar = bar + 1;
		  $("#progressTxt").html(bar + "%");
		  if (bar <= 60) {
			  loadingTime = setTimeout(progress, 40);
		  }
		  else if (bar <= 90&bar > 60) {
			  loadingTime =setTimeout(progress, 50);
		  }
		  else if (bar <= 99&bar > 90) {
			  loadingTime = setTimeout(progress, 100);
		  }
	}
	progress();
	setTimeout(function(){
		$('.load-img').hide();
		$('#progressTxt').hide();
		$('.play-btn').show().addClass('playAin');
		$('.play-btn').on('click', function () {
			$('.loading-box').fadeOut();
			$('.video-box').show();
			video.play();
		});
		
	},5000);
	  
	

	var video = document.getElementById('movie');
	
	//跳过视频
	$(".skip").click(function (e) {
		video.pause();
		$('.page-last').fadeIn();
		$('.video-box').hide();
		video.pause();
	});
	
	
	
	
	//视频播放结束监听
	video.addEventListener("ended",function(){
		$('.video-box').hide();
		$('.page-last').show();
		
	});
	
	
	
	$('.js-share-btn').on('click', function () {
		$('.js-share-pop').show();
	});
	$('.js-share-pop').on('click', function () {
		$('.js-share-pop').hide();
	});
	
	$('.js-reselect-btn').on('click', function (e) {
		 e.stopImmediatePropagation();
		 window.location.href= "index.html?"+Math.random(); 
		
		
	});
	
	



});