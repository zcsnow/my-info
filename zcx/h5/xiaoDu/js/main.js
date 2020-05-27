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
	{src: 'images/loading.gif', id: 'loading'},
	{src: 'images/p1_bg1.jpg', id: 'p1_bg1'},
	//{src: 'mp4/video1.mp4',id: 'video1'},
	{src: 'images/p1_bg2.png', id: 'p1_bg2'},
	//{src: 'http://qiniu.smart08.com/YHD/video/video001.mp4',id: 'video1'},
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
		$('.page-last').fadeIn();
		$('.video-box').hide();
		video.pause();
	});
	
	
	var timeline0 = [2.580305];
	video.addEventListener("timeupdate", function(){
		if (timeline0[0] && video.currentTime >= timeline0[0]) {
			video.pause();
			$('.video-box').hide();
		    $('.select-box').show();
			timeline0.shift();
			
		}
            
	}, false);
	
	//视频播放结束监听
	video.addEventListener("ended",function(){
		video.pause();
		$('.video-box').hide();
		$('.select-box').show();

	});
	
	
	$('.write-btn').on('click', function () {
		$('.bg-img1').addClass('fadeInLeftBig1');
		setTimeout(function(){
			$('.page-name').show();
		    $('.select-box').fadeOut();
		},1000)
		
		
	});
	
	$('.again-look-btn').on('click', function () {
		$('.select-box').hide();
		video.currentTime = 0;
		timeline0 = [2.580305];
		$('.video-box').show();
		video.play();
	});
	
	var newCanvas = document.getElementById('reusltCanvas');
		newCanvas.width = 1448;
		newCanvas.height = 750;
		newxCtx = newCanvas.getContext("2d");
	// 合成图片
	function makeImg(text){
		var img = new Image();
		var textX = 0,textY = 0;
		if(randomImgNum==1){
			textX = 216;
			textY = 179;
		}
		if(randomImgNum==2){
			textX = 768;
			textY = 132;
		}
		if(randomImgNum==3){
			textX = 214;
			textY = 172;
		}
		if(randomImgNum==4){
			textX = 790;
			textY = 132;
		}
		img.src = 'images/result'+randomImgNum+'_'+randomTxtNum+'.jpg';
		//img.src = 'images/result'+2+'_'+2+'.jpg';
		img.onload = function(){
			newxCtx.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);  
			newxCtx.font = 26+"px 微软雅黑";
			newxCtx.fillStyle="rgba(255,255,255,1)";
			newxCtx.fillText(text, textX, textY); 
			$('.page-last .bg').find('img').attr('src',convertCanvasToImage(newCanvas, false));
			setTimeout(function(){
				$('.pop-tip').hide();
				$('.page-name').fadeOut();
				$('.page-last').show();
			},1000);
			
		}
	};
	
	//canvas生成img
	 function convertCanvasToImage(canvas, is_data) {
		var image = new Image();
		var data_url = canvas.toDataURL("image/jpg");
		var baseUrl;
		var sup_Blob = Boolean(window.Blob);
		var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
    
		function get_blob(base64) {
			var dataURI = base64; //base64 字符串
			var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
			var byteString = atob(dataURI.split(',')[1]); //base64 解码
			var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
			var intArray = new Uint8Array(arrayBuffer); //创建视图
			baseUrl = dataURI.slice(dataURI.indexOf(',')+1);
			for (i = 0; i < byteString.length; i += 1) {
				intArray[i] = byteString.charCodeAt(i);
			}
			var blob = new Blob([intArray], {
				type: mimeString
			}); //转成blob
			return URL.createObjectURL(blob);
		}

		if (sup_Blob && !BlobBuilder) {
			var blob_url = get_blob(data_url);
		}else{
			var blob_url = data_url;
		}
		if (is_data) {
			return baseUrl;
		}else{
			//image.src = blob_url;
			//return image;
			return blob_url;
		}

	};
	
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
		$('.page-last .bg').find('img').attr('src','images/result'+randomImgNum+'_'+randomTxtNum+'.jpg');
		$('.pop-tip .msg').html('图片生成中...');
		$('.pop-tip').show();
		var nameVal = $('#name-val').val();//合成图片中填写的名字
		var composeImgNum = randomImgNum;   //合成图片中场景图片的序列号
		var composeImgTxtNum =randomTxtNum; //合成图片中文字内容的图片序列号
		//console.log(nameVal,composeImgNum, composeImgTxtNum);
		
		//本地测试，线上环境请注释
		//$('.pop-tip').hide();
		makeImg(nameVal);
		//请求图片合成
		/*var url = "CreateImages.ashx?composeImgNum=" + composeImgNum + "&composeImgTxtNum=" + composeImgTxtNum + "&nameVal=" + nameVal;
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

		});*/

		
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
		newxCtx.clearRect(0,0,newCanvas.width, newCanvas.height);  
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