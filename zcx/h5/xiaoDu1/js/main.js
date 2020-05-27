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
	{src: 'images/share_img.png', id: 'share_img'},
	{src: 'images/p1_img1.png', id: 'p1_img1'},
	{src: 'images/play_btn.png', id: 'play_btn'},
	{src: 'images/tip2.png', id: 'tip2.png'},
	{src: 'images/p1_btn1.png', id: 'p1_btn1'},
	{src: 'images/p1_btn2.png', id: 'p1_btn2'},
	{src: 'images/save_img.png', id: 'save_img'},
	

	
	
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
		$('.video-box').hide();
		$('.select-box').show();
		setTimeout(function(){
		  $('.bg-img1').addClass('fadeInLeftBig1');
		},500)
	});


	
	
	/*var timeline0 = [2.580305];
	video.addEventListener("timeupdate", function(){
		if (timeline0[0] && video.currentTime >= timeline0[0]) {
			video.pause();
			$('.video-box').hide();
		    $('.select-box').show();
			setTimeout(function(){
			  $('.bg-img1').addClass('fadeInLeftBig1');
			},500)
			timeline0.shift();
			
		}
            
	}, false);*/
	
	//视频播放结束监听
	video.addEventListener("ended",function(){
		video.pause();
		$('.video-box').hide();
		$('.select-box').show();
		setTimeout(function(){
		  $('.bg-img1').addClass('fadeInLeftBig1');
		},500)

	});
	
	
	$('.write-btn').on('click', function () {
			$('.page-name').show();
		    $('.select-box').fadeOut();
		
	});
	
	$('.again-look-btn').on('click', function () {
		$('.select-box').hide();
		video.currentTime = 0;
		//timeline0 = [2.580305];
		$('.video-box').show();
		video.play();
		setTimeout(function(){
			$(".skip").fadeIn();
		},1000);
	});

	var bind_name = 'input';
	if(navigator.userAgent.match(/android/i) == "android")
	{
	 bind_name = "keyup";
	}
	var keywords=["李彦宏","李颜宏","李彦洪","李颜洪","血友","莆田","蒲田","浦田","医院","百度","空鼻","今日头条","搜狗","阿里巴巴","腾讯","360","快播","乐视","蚂蚁金服","支付宝","三轮奶粉","谷歌","百毒","低端人口","魏则xi","wei则西","魏ze西","魏则西","魏则希","魏则习","魏则溪","baidu","liyanhong","robin","brenda","Headline","TouTiao","Sogou","Alibaba","Ali","Tencent","Qihoo 360","Qvod","letv","ant financial","payment treasure","Sanlu milk powder","sanlunaifen","Google","Amanita","Low end population","魏则吸","魏则惜","魏则熙","魏则栖","魏则稀","魏则锡","魏则息","魏则夕","魏则膝","魏则昔","魏则曦","魏则犀","魏则熄","魏则奚","魏则兮","魏则嘻","魏则悉","魏则晰","魏则唏","魏则硒","魏则汐","魏则嬉","魏则樨","巍则xi","巍ze西","巍则西","巍则希","巍则习","巍则溪","巍则习","巍则吸","巍则惜","巍则熙","巍则栖","巍则稀","巍则栖","巍则锡","巍则息","巍则夕","巍则膝","巍则昔","巍则曦","巍则犀","巍则熄","巍则奚","巍则兮","巍则嘻","巍则悉","巍则晰","巍则唏","巍则硒","巍则汐","巍则嬉","巍则樨","卫则xi","卫ze西","卫则西","卫则希","卫则习","卫则溪","卫则习","卫则吸","卫则惜","卫则熙","卫则栖","卫则稀","卫则栖","卫则锡","卫则息","卫则夕","卫则膝","卫则昔","卫则曦","卫则犀","卫则熄","卫则奚","卫则兮","卫则嘻","卫则悉","卫则晰","卫则唏","卫则硒","卫则汐","卫则嬉","卫则樨","魏泽xi","wei泽西","魏泽西","魏泽希","魏泽习","魏泽溪","魏泽习","魏泽习","魏泽吸","魏泽惜","魏泽熙","魏泽栖","魏泽稀","魏泽栖",]; 
	$("#name-val").on(bind_name,function(){  
		_filter_method($(this));  
	});
	
	function _filter_method(obj){  
		//获取文本输入框中的内容  
		var value = $(obj).val();  
		//遍历敏感词数组  
		for(var i=0;i<keywords.length;i++){  
			//全局替换  
			var reg = new RegExp(keywords[i],"g");  
			//判断内容中是否包括敏感词  
			if(value.indexOf(keywords[i])!=-1){  
				var result = value.replace(reg,"");  
				value = result;  
				$(obj).val(result);  
			}  
		}  
	}  
	
	var imgNum = 4;
	var txtNum = 3;
	var randomImgNum,randomTxtNum;
	$('.ok-btn').on('click', function () {
		if($('#name-val').val()==''){
			popTip('请输入名字');
			return false;
		}
		randomImgNum = Math.ceil(Math.random() * imgNum);
		randomTxtNum = Math.ceil(Math.random() * txtNum);
		//$('.page-last .bg').find('img').attr('src','images/result'+randomImgNum+'_'+randomTxtNum+'.jpg');
		$('.pop-tip .msg').html('图片生成中...');
		$('.pop-tip').show();
		var nameVal = $('#name-val').val();//合成图片中填写的名字
		var composeImgNum = randomImgNum;   //合成图片中场景图片的序列号
		var composeImgTxtNum =randomTxtNum; //合成图片中文字内容的图片序列号
		//console.log(nameVal,composeImgNum, composeImgTxtNum);
		
		//本地测试，线上环境请注释
	
		//请求图片合成
		var url = "CreateImages.ashx?bgtype=" + composeImgNum + "&bgindex=" + composeImgTxtNum + "&nick=" + nameVal;
		var res_reslut = $.ajax({ 
			url: url, 
			async: false ,
			success: function (data) {
					$('.page-last .bg').find('img').attr('src',data);
					$('.pop-tip').hide();
					$('.page-name').hide();
					$('.page-last').show();
			},
			error: function (data) {
				popTip('图片生成失败');
			}

		});

		
	});
	
	

	$('.js-share-btn').on('click', function () {
		$('.js-share-pop').fadeIn();
	});
	$('.js-share-pop').on('click', function () {
		$('.js-share-pop').fadeOut();
	});
	
	$('.js-reFill-btn').on('click', function () {
		$('.page-last').hide();
		$('#name-val').val('');
		$('.page-name').fadeIn();
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