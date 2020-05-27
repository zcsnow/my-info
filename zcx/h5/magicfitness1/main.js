$(function(){
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
		  imgPreLoad:function(){
			  var i=0,loaded=0,handle,imgList=arguments[0],len=imgList.length,fun1=arguments[1],fun2=arguments[2],fun3=arguments[3];
			  //百分比补充
			  if(fun3!=undefined){if(len<100){for(var a=0;a<(100-len);a++){imgList.push('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');}len=100;}}
			  handle = setInterval(function(){
				  var img = new Image();
					  img.crossorigin="anonymous";
					  img.src = imgList[i];
					  if(img.complete){
						  loaded++;
						  var per = loaded/len;
						  if(fun1!==undefined){fun1(Math.round(per.toFixed(2) * 100));}
						  if(per >= 1){if(fun2!==undefined){fun2();}}
					  }else {
						  img.onload =function(){
							  loaded++;
							  var per = loaded/len;
							  if(fun1!==undefined){fun1(Math.round(per.toFixed(2) * 100));}
							  if(per >= 1){if(fun2!==undefined){fun2();}}
						  };
					  }
					  img.onerror = function(){
						  console.log(this.src+"不存在");
						  loaded++;
						  var per = loaded/len;
						  if(fun1!==undefined){fun1(Math.round(per.toFixed(2) * 100));}
						  if(per >= 1){if(fun2!==undefined){fun2();}}
					  };
					  i++;
				  if(i>imgList.length-1){clearInterval(handle);}
			  },10);
		  },
		  
	  }
	  var root={"route":"img/"};
			
		
	  audioAutoPlay('bgMusic');
	  
	  
	  //音乐控制
	  function audioAutoPlay(id){
		  var audio = document.getElementById(id),
			  play = function(){
			  audio.play();
			  /*if(tool.sys.qqB()){
				audio.pause();
			  }*/
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
	  
	  
	  
	  //滚动条不可滚动、高度100%
	  tool.disabledScroll();
	  
	  //预加载图片
	  /*tool.imgPreLoad(
		  [root.route+'logo.png'],
		  function(o){$('.percent').html(o+" %");},
		  function(){
			  tool.imgPreLoad(
				  [
				  root.route+'page1_img1.png',
				  root.route+'page1_img2.png',
				  root.route+'page1_img3.png',
				  ],
				  function(o){
					  $('.percent').html(o+" %");
				  },
				  function(){
					  //隐藏loading页面
					  $('.loading-box').hide()
					  $('.gold').removeClass('gold-anim');
					  //显示播放页面
					  $('.page1').show();
				  },true
			  )
			  
		  }
	  )*/
	  
	  

		  var uploadimgUrl="";
		  var sharePicUrl="";
		  var shareIcon="";
		  var sex;
	      var isCorror = false;
		  var sid = "";       //素材模板的ID(可以选用已有的id，或者提出需求新增ID)
		  var maskid = "10";       //蒙板id，1-3之间整数
		  var alphablend = "0.2";  //融合程度，0-1之间浮点数
		  var alphaposition = "0.52"; //形变程度，0-1之间浮点数
		  var retcode;  //返回码
		  
	
		  // 请求次数
		  var requestTimes = 1;
		  //点击次数
		  var clickTimes = 1;
	
		  
		  /*$('.page1').on('change','#fileInput',function (e) {
			    var file = this.files[0]; 
			    if(file.size>3145728){
				  //alert('图片不能大于3M,请重新上传');
				  $('#bigImgTip').show();
				  return false;
			    }
				var r = new FileReader(); 
				r.readAsDataURL(file); 
				var that = $(this);
				$(r).load(function() { 
					  //console.log(this.result);
					  var imagedate = this.result;
					  that.parent().find('.show-img').show().find('img').attr('src',this.result);
					  that.next('.upload-icon').css('background-image','none').find('img').hide();
					  
					  var imagedate = this.result;
					  $.ajax({ url: "/HtmlDate/Inputimage.ashx", type: "POST", data: imagedate, async: true,processData:false,contentType: false ,
						  success: function (result) {
	
						   },
						   error:function(){
								$(".errowDom .errow span").html('打印机排队中...<br>请稍后再来');
		  	  					$(".errowDom").fadeIn("fast");
						   }
					  });
			
				});
            
        });*/
	
	
	   var bar = 0;
	   var loadingTime;
	   function progress() {
			bar = bar + 1;
			$("#progressbar").width(bar + "%");
			if (bar <= 60) {
				loadingTime = setTimeout(progress, 40);
			}
			else if (bar <= 90&bar > 60) {
				loadingTime =setTimeout(progress, 50);
			}
			else if (bar <= 96&bar > 90) {
				loadingTime = setTimeout(progress, 100);
			}
	  }
	  progress();
	  setTimeout(function(){
		  //隐藏loading页面
		  $('.loading-box').addClass('zoomOut0');
		  setTimeout(function(){
	      	  $('.loading-box').hide()
			  startPage();
		  },700);
		  
		  
		  //$('#slider').show();
		  //add('.page1 .bubble1','tada animated',1.5);
		  
	  },5000);
	  
	  function startPage(){
	  	//显示播放页面
		$('.page1').show().addClass('fadeIn');
		$('.page1 .p1-1').addClass('headMove');
		$('.page1 .star1').addClass('bgFlash1');
		$('.page1 .star2').addClass('bgFlash2');
		$('.page1 .star3').addClass('bgFlash3');
		$('.page1 .star4').addClass('bgFlash4');
		$('.page1 .star5').addClass('bgFlash5');
		$('.page1 .star6').addClass('bgFlash6');
	  }
	  
	  
	  $('.upload-btn-txt').click(function(e){
		  $("#fileInput").click();
	  });
	  
	 
	  $('.sexDom').on('click','span',function(e){
		  
		  if($('#fileInput').val()!=""){
			  if(isCorror){ //图片上传是否合格 需从接口获取值来判断
				  $(".errowDom .errow span").html('照片无法识别<br>请上传清晰头像照');
		  	  	  $(".errowDom").fadeIn("fast");
				  return false;
			  }
			  
			  
		  $(this).addClass('cur');
		  $('.page1-box').css('margin-top','-62%');
		  $('.page1-box .p3').hide();
		  $('.page1 .p1-1').removeClass('headMove');
		  $('.page1 .star1').removeClass('bgFlash1');
		  $('.page1 .star2').removeClass('bgFlash2');
		  $('.page1 .star3').removeClass('bgFlash3');
		  $('.page1 .star4').removeClass('bgFlash4');
		  $('.page1 .star5').removeClass('bgFlash5');
		  $('.page1 .star6').removeClass('bgFlash6')
		  $('.swiper-box').fadeIn();
		  //轮播图
		  var mySwiper = new Swiper('#slider',{
			  loop:true,       //循环切换
			  effect: 'flip',
			  grabCursor: true,
			  nextButton: '.swiper-button-next',
			  prevButton: '.swiper-button-prev',
  
		  });
		  }else{
			  $(".errowDom .errow span").html('请上传个人照片');
		  	  $(".errowDom").fadeIn("fast");
			  
		  }
		  sex = $(this).index();
		  
	  });
	  
	  
	  function ajaxData(){
		   uploadimgUrl=ImageFile[0];
		   var start = uploadimgUrl.indexOf(',')+1;
		   var uploadUrl = uploadimgUrl.slice(start);
		   console.log(start,uploadUrl);
		   $.ajax({
				  url: 'https://tu.qq.com/cgi-bin/do_face_merge.fcg',
				  type: 'post',
				  async:true,
				  data: JSON.stringify({
					  // raw_base64:uploadUrl,
					  // sid:"shennong",
					  // project:"bayi"
					  "maskid": maskid, 
					  "alphablend":alphablend, 
					  "alphaposition": alphaposition, 
					  "raw_base64": uploadUrl, 
					  "sid": sid, 
					  "type": 0, 
					  "project": "bayi"
				  }),
				  contentType: 'application/x-www-form-urlencoded',
				  dataType: "jsonp", //数据类型为jsonp  
				  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
				  jsonpCallback: "info",
				  processData:false,
				  success: function (data) {
                      retcode = data.retcode;  //返回状态码
					  if(data.retcode==0){
						  sharePicUrl = data.raw_url;  //合成后的大图
						  shareIcon = data.raw_url_thumb; //合成后的缩略图
						  
						  //判断模板显示
						  //resultFun(sex,selectTime)
						  

					  }else if(retcode=="1000"||retcode=="-1000"||retcode=="-1001"){
						  $(".errowDom .errow span").html('照片无法识别<br>请上传清晰头像照');
						  $(".errowDom").fadeIn("fast");
					  }else{
						  $(".errowDom .errow span").html('打印机排队中...<br>请稍后再来');
						  $(".errowDom").fadeIn("fast");
					  }
					  setTimeout(function(){
						  clickTimes = 1;
					   },500);
					  
				  },
				  error: function (xhr, errorType, error) {
					  console.log(error);
					  $(".errowDom .errow span").html('图片上传失败<br>请稍后再传');
					  $(".errowDom").fadeIn("fast");
					  clickTimes = 1;
				  }
			  });
	  
	  }
	  
	  
	  $(".errowDom,.waitingDom").click(function(e){
			$(this).fadeOut("fast");
	  })
	  
	  $('#slider').on('click','.swiper-slide',function(e){
		  var selectTime = parseInt($(".swiper-slide-active").attr('data-swiper-slide-index'))+1;
		  //请求合成图片
		  //ajaxData();
		  popTip('照片正在合成中...');
		  
          var headurl=$("#phono").val();
          var username=$("#UserName").val();
		  
          var res_reslut = $.ajax({
			  async: true, 
			  type:"post",
			  url: "PsImags.ashx?sex="+sex+"&model="+selectTime+"&phone="+headurl+"&username="+username, 
			  data:{images: encodeURI(ImageFile[0].split('base64,')[1])},
			  success: function(){
			  	var usercon=res_reslut.responseText;//获取合成图片
				if (usercon=="") {
				  $(".errowDom .errow span").html('照片无法识别<br>请上传清晰头像照');
				  $(".errowDom").fadeIn("fast");
				  return;
				}else{
			        $('.pop-tip-box').hide();
					resultFun(sex, selectTime);
					var imgid = "";
					if (sex == 0)
						imgid = "modelman" + selectTime;
					else
						imgid = "modelwoman"+selectTime;
					$("#" + imgid).attr("src", "/" + usercon);
				}
			  }
		  });
          
	  });
	  
	  
	  function popTip(msg){
		  $('.pop-tip-msg').html(msg);
		  $('.pop-tip-box').show();
		  /*setTimeout(function(){
			  $('.pop-tip-box').hide();
		  },2000);*/
	  };

	  
	  
	  
	  
	  function resultFun(sex,time){
		$('.page1').hide();
		if(sex==0){
			//$('.page2 .p1 .head img').attr('src','img/mask_man0_head.png');
			if(time==1||time==2){
				//$('.page2 .p1 .body').attr('src','img/mask_man0.gif');
				//$('.page2 .p1 .head').addClass('headMove1');
				$('.page2 .p1 .body').addClass('body-man2 man2Animate');
			}
			if(time==3||time==4){
				//$('.page2 .p1 .body').attr('src','img/mask_man00.gif');
				//$('.page2 .p1 .head').addClass('headMove');
				$('.page2 .p1 .body').addClass('body-man1 man1Animate');
			}
			
			$('.page2').show().addClass('fadeIn');
			setTimeout(function(){
				$('.page2').hide();
				$('.page2 .p1 .body').removeClass('body-man1 man1Animate');
				$('.page2 .p1 .body').removeClass('body-man2 man2Animate');
				//$('.page2 .p1 .head').removeClass('headMove');
				maskid = time;
				console.log(maskid);
				$('.man'+time).show().addClass('fadeIn');
			},3000);
			
		}else if(sex==1){
			$('.page2').addClass('woman');
			//$('.page2 .p1 .head img').attr('src','img/mask_woman0_head.png');
			if(time==1||time==2){
				//$('.page2 .p1 .body').attr('src','img/mask_woman0.gif');
				//$('.page2 .p1 .head').addClass('headMove');
				$('.page2 .p1 .body').addClass('body-woman2 woman2Animate');
			}
			if(time==3||time==4){
				//$('.page2 .p1 .body').attr('src','img/mask_woman00.gif');
				//$('.page2 .p1 .head').addClass('headMove');
				$('.page2 .p1 .body').addClass('body-woman1 woman1Animate');
			}
			
			$('.page2').show().addClass('fadeIn');
			setTimeout(function(){
				$('.page2').hide();
				$('.page2 .p1 .body').removeClass('body-woman1 woman1Animate');
				$('.page2 .p1 .body').removeClass('body-woman2 woman2Animate');
				//$('.page2 .p1 .head').removeClass('headMove');
				maskid = time;
				console.log(maskid);
				$('.woman'+time).show().addClass('fadeIn');
			},3000);
		}
		
		
	  }
	  
	  $('.restart-btn,.restart-btn2').click(function(){
	  	 //window.location.href = "index.html?time=" + new Date().getTime();
		 $('.page-result').hide();
		 startPage();
	  });
	  
	  
	  
	  //开始按钮
	  
	  
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
	  
	  
	  
	  function initAmiate(initTime,intervalTime){
		
		setTimeout(function(){
			$('#media').attr('src','sound/ready.mp3');
	    },1000);
		add('.countdown-box .ready','show fadeIn',0.1*intervalTime);
		remove('.countdown-box .ready','show fadeIn',4*intervalTime);
		add('.countdown-box .num4','zoomOut1',4*intervalTime);
		remove('.countdown-box .num4','zoomOut1',4.5*intervalTime);
		add('.countdown-box .num3','show zoomOut1',4.5*intervalTime);
		remove('.countdown-box .num3','show zoomOut1',5.5*intervalTime);
		add('.countdown-box .num2','show zoomOut1',5.5*intervalTime);
		remove('.countdown-box .num2','show zoomOut1',6.5*intervalTime);
		add('.countdown-box .num1','show zoomOut1',6.5*intervalTime);
		remove('.countdown-box .num1','show zoomOut1',7.5*intervalTime);
		setTimeout(function(){
			$('.countdown-box').hide();
			$('.page-live .head').addClass('headMove');
			txtScrollTime = setInterval(function(){autoScroll(".live-txt")}, 1000);
	    },7.5*intervalTime*1000);
	
	}

	  

	  
	  $('.js-share-btn').on('click', function () {
		  $('.js-share-pop').show();	
		  $('.mask').show();
	  });
	  $('.js-share-pop').on('click', function () {
		  $('.js-share-pop').hide();	
		  $('.mask').hide();
	  });
	  
	  
	  
	  $('.music').on('click', function () {
	  if ($('.music').hasClass('on')) {
		  $('.music').removeClass('on');
		  $('.music img').attr('src', 'img/music1.png');
		     $('#bgMusic')[0].pause();
			 //player1.volume=0;
			 //player1.muted = true; 
		  
	  } else {
		  $('.music').addClass('on');
		  $('.music img').attr('src', 'img/music0.png');
		     $('#bgMusic')[0].play();
			 //player1.volume=1;
			 
			 //player1.muted = false;
	  }
	});
	 

});