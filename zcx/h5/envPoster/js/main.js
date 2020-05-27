$(function(){
	  var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

	  var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);},
		  sys:{
			  ua:{"str":navigator.userAgent},
			  ios:function(){return !!this.ua.str.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);},
			  adr:function(){return !!this.ua.str.toLowerCase().match('android') || !!this.ua.str.toLowerCase().match('Linux');},
			  wip:function(){return !!this.ua.str.toLowerCase().match("windows phone")},
			  wxB:function(){return !!this.ua.str.toLowerCase().match('micromessenger');},
			  qqB:function(){return !!this.ua.str.toLowerCase().match('mqqbrowser');},
			  ucB:function(){return !!this.ua.str.toLowerCase().match('ucbrowser');},
			  sfB:function(){return !!this.ua.str.toLowerCase().match('safari');}	
		  },
		  bro:{
			  ua:{"str":navigator.userAgent},
			  wxB:function(){return !!this.ua.str.toLowerCase().match('micromessenger');},
			  qqB:function(){return !!this.ua.str.toLowerCase().match('mqqbrowser');},
			  ucB:function(){return !!this.ua.str.toLowerCase().match('ucbrowser');},
			  sfB:function(){return !!this.ua.str.toLowerCase().match('safari');}	
		  },
	
		  
	  }

		
	  
	  
	  
	  //音乐控制
	  function audioAutoPlay(id){
		  var audio = document.getElementById(id),
			  play = function(){
			  audio.play();
			  /*if(tool.sys.qqB()){
				audio.pause();
			  }*/
			  //document.removeEventListener("touchstart",play, false);
		  };
		  audio.play();
		  document.addEventListener("WeixinJSBridgeReady", function () {//微信
			 play();
		  }, false);
		 
		  document.addEventListener('YixinJSBridgeReady', function() {//易信
			 play();
		  }, false);
		 // document.addEventListener("touchstart",play, false);
	  }
	  
	  //audioAutoPlay('bgMusic');
	
	  //滚动条不可滚动、高度100%
	  tool.disabledScroll();
	
	  
	  setTimeout(function(){
		  //隐藏loading页面
		  $('.loading-box').fadeOut()
		  $('.page1').show();
		  
		  //$('#pictureUpload').css('visibility','hidden');
		  //$("#pictureUpload-bg").css({'backgroundImage':'url()','left':0,'top':0,'transform':'scale(1,1)'});
		  
		  options = {
			  containerId: "#pictureUpload",
			  uploadBgId: "#pictureUpload-bg",
			  fileId: "#fileElem",
			  canvasId: "#canvas",
			  container: {
				  width: $("#pictureUpload").width(),
				  height: $("#pictureUpload").height()
			  },
			  clip:{
				  width: $("#pictureUpload-mask").width(),
				  height: $("#pictureUpload-mask").height()
			  },
			  imgQuality:1
		  };
		  txUpload = avatarUpload(options);
		  
		  //文件 onchange事件
		  $("#fileElem").on("change",  function(){
			  $(".upload-icon").hide();
			  $('#pictureUpload').css('visibility','visible');
			  txUpload.handleFiles(function(){
    		  })
			  
		  });
		  
		  $("#pictureUpload").click(function(e){
			  $("#fileElem").click();
			  
		  });
		  
	
	  },5000);
	  
	  
	
	  var isCompose = false;
	  $('.js-public-btn').click(function(e){
		   if($('#fileElem').val()==""){
			  $(".errowDom .errow span").html('请上传图片');
		  	  $(".errowDom").fadeIn("fast");
			  return false;
		  }
		  if($('#userName').val()==""){
			  $(".errowDom .errow span").html('请填写名字');
		  	  $(".errowDom").fadeIn("fast");
			  return false;
		  }
		  if($('#userDesc').val()==""){
			  $(".errowDom .errow span").html('请填写环保宣言');
		  	  $(".errowDom").fadeIn("fast");
			  return false;
		  }
		  
		  var dataImgSrc,uploadUrl,start,dataUserName,dataUserDesc;
		  txUpload.createImg(function(){
			  base64 = canvas.toDataURL("image/png", 1);
			  $(".upload-icon>img").attr("src",base64);
    	  	  dataImgSrc = $(".upload-icon>img").attr("src");
			  start = dataImgSrc.indexOf(',')+1;
			  uploadUrl = dataImgSrc.slice(start);
			  dataUserName = $("#userName").val();
			  dataUserDesc = $("#userDesc").val();
	
			  //请求合成图片
			  if(isCompose==false){
					popTip('图片正在生成中...'); 
					isCompose = true;	
					
					//测试生成代码
					/*$('.pop-tip-box').hide();
					$('.page1').hide();
					$('.page2 .result-box').find('img').attr('src',dataImgSrc);
					$('.page2').show(); 
					*/
					
					//后台合成代码
					var result = $.ajax({ 
						type:"post",
						url: "CreateImage.ashx?NameStr="+dataUserName+"&descStr="+dataUserDesc, 
						data:{ImagsBase64: encodeURI(uploadUrl)},
						async: true, 
						success: function(data){
							isCompose = false;	
							//alert(data);
							var result_img = data;
							if(result_img==""||result_img=='undefined')
							{
								 $('.pop-tip-box').hide();
								  $(".errowDom .errow span").html('生成失败<br>请重新生成');
								  $(".errowDom").fadeIn("fast");
							}else{
							   
								usercon = '/CompanyProject/postcard/UserImage/'+result_img; 
								$('.pop-tip-box').hide();
								$('.page1').hide();
								$('.page2 .result-box').find('img').attr('src',usercon);
								$('.page2').show(); 
							} 
						},
						error:function(){
						  $('.pop-tip-box').hide();
						  $(".errowDom .errow span").html('生成失败<br>请稍后重新生成');
						  $(".errowDom").fadeIn("fast");
						  isCompose = false;	
						}
					});
			   } 
		  })

		  
		  
	  });
	  
	  

	  
	  function descCheck() { 
		  var regC = /[^ -~]+/g; 
		  var regE = /\D+/g; 
		  var str = userDesc.value; 
		  
		  if (regC.test(str)){ 
			  userDesc.value = userDesc.value.substr(0,25); 
		  } 
		  
		  if(regE.test(str)){ 
			  userDesc.value = userDesc.value.substr(0,50); 
		  } 
	  } 
  
	  $("#userDesc").keyup(function(){
		 descCheck();
	  });
	  
	  function nameCheck() { 
		  var regC = /[^ -~]+/g; 
		  var regE = /\D+/g; 
		  var str = userName.value; 
		  
		  if (regC.test(str)){ 
			  userName.value = userName.value.substr(0,5); 
		  } 
		  
		  if(regE.test(str)){ 
			  userName.value = userName.value.substr(0,10); 
		  } 
	  } 
  
	  $("#userName").keyup(function(){
		 nameCheck();
	  });
	  
	
	  
	  $(".errowDom,.waitingDom").click(function(e){
			$(this).fadeOut("fast");
	  })
	  
  
	  function popTip(msg){
		  $('.pop-tip-msg').html(msg);
		  $('.pop-tip-box').show();
		 
	  };


	  $('.music').on('click', function () {
		if ($('.music').hasClass('on')) {
			$('.music').removeClass('on');
			$('.music img').attr('src', 'img/music1.png');
			   $('#bgMusic')[0].pause();
			   
		} else {
			$('.music').addClass('on');
			$('.music img').attr('src', 'img/music0.png');
			   $('#bgMusic')[0].play();
			   
		}
	  });
	 

});