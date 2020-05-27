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
	{src: 'images/loading_bg.jpg', id: 'loading_bg'},
	{src: 'images/p2_bg.jpg', id: 'p2_bg'},

	{src: 'images/loading_img1.png', id: 'loading_img1'},
	{src: 'images/loading_img2.png', id: 'loading_img2'},
	{src: 'images/loading_img3.png', id: 'loading_img3'},
	{src: 'images/loading_img4.png', id: 'loading_img4'},
	{src: 'images/loading_img5.png', id: 'loading_img5'},
	{src: 'images/loading_img6.png', id: 'loading_img6'},
	{src: 'images/p1_fo.png', id: 'p1_fo'},
	{src: 'images/p1_mo.png', id: 'p1_mo'},
	{src: 'images/p1_hand1.png', id: 'p1_hand1'},
	{src: 'images/p1_hand2.png', id: 'p1_hand2'},
	{src: 'images/p2_btn1.png', id: 'p2_btn1'},
	{src: 'images/p2_btn2.png', id: 'p2_btn2'},
	{src: 'images/p2_btn3.png', id: 'p2_btn3'},

	{src: 'mp4/video1.mp4',id: 'video1'},
	{src: 'mp4/video2.mp4',id: 'video2'},
	{src: 'mp4/video3.mp4',id: 'video3'},
	
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

		$('.load-img1').addClass('fadeInLeftBig fastAnimated');
		$('.load-img2').addClass('fadeInRightBig fastAnimated');
		setTimeout(function(){
			$('.load-img4').addClass('fadeInDown fastAnimated');
			$('.load-img5').addClass('fadeInUp fastAnimated');
		},500);
		setTimeout(function(){
			$('.load-img6').addClass('fadeIn fastAnimated');
		},1000);
		setTimeout(function(){
			$('.load-img3').addClass('fadeIn fastAnimated');
		},1500);
		
		
	}
	
	function handleFileComplete(event) {
	  //document.body.appendChild(event.result);
	  console.log("已加载完毕全部资源");
	  $('.play-btn').addClass('playAin');
	  $('.play-btn img').attr('src','images/loading_btn.png');
	  $('.play-btn').on('click', function () {
		  $('.loading-box').fadeOut();
		  $('.video-box').show();
		  //$('#movie1').show();
		  $('#movie1').css('visibility','visible');
		  video1.play();
		  /*video2.play();
		  video3.play();
		  video2.pause();
		  video3.pause();*/
		  
	  });
	}
	

	var video1 = document.getElementById('movie1');
	var video2 = document.getElementById('movie2');
	var video3 = document.getElementById('movie3');

	
	//跳过视频
	$(".skip").click(function (e) {
		video.pause();
		$('.page-last').fadeIn();
		$('.video-box').hide();
		video1.pause();
	});
	
	
	$('.select-box .ele1,.select-box .hand-tip1').on('click', function () {
		$('.select-box').hide();
		//$('#movie2').show();
		$('#movie2').css('visibility','visible');
		video2.play();
	});
	$('.select-box .ele2,.select-box .hand-tip2').on('click', function () {
		$('.select-box').hide();
		//$('#movie3').show();
		$('#movie3').css('visibility','visible');
		video3.play();
	});
	
	
	
	//视频播放结束监听
	video1.addEventListener("ended",function(){
		//$('#movie1').hide();
		$('#movie1').css('visibility','hidden');
		selectShow();

	});
	
	function selectShow(){
		$('.select-box').show();
		$('.select-box .ele1').removeClass('fadeInLeftBig1 fastAnimated');
		$('.select-box .ele2').removeClass('fadeInRightBig1 fastAnimated');
		$('.select-box .hand-tip1').removeClass('handMove');
		$('.select-box .hand-tip2').removeClass('handMove');
		setTimeout(function(){
			$('.select-box .ele1').addClass('fadeInLeftBig1 fastAnimated');
		},500);
		setTimeout(function(){
			$('.select-box .ele2').addClass('fadeInRightBig1 fastAnimated');
		},1000);
		setTimeout(function(){
			$('.select-box .hand-tip1').addClass('handMove');
			$('.select-box .hand-tip2').addClass('handMove');
		},1500);
	}
	
	video2.addEventListener("ended",function(){
		video2.pause();
		$('#movie2').css('visibility','hidden');
		$('.video-box').hide();
		$('.page-last').show();
	});
	
	video3.addEventListener("ended",function(){
		video3.pause();
		$('#movie3').css('visibility','hidden');
		$('.video-box').hide();
		$('.page-last').show();
	});
	
	
	$('.js-share-btn').on('click', function () {
		$('.js-share-pop').show();
	});
	$('.js-share-pop').on('click', function () {
		$('.js-share-pop').hide();
	});
	
	$('.js-reselect-btn').on('click', function () {
		$('.page-last').hide();
		$('.video-box').show();
		selectShow();
		
	});
	
	



});