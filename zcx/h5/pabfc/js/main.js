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
			
			var video = document.getElementById("movie");
			
			//判断手机横竖屏状态
			function detectOtt(){
					var clientW=document.documentElement.clientWidth,clientH=document.documentElement.clientHeight;
					//竖屏
				if(clientW<clientH){
					var wrapLeft=(clientW-clientH)*0.5+"px",
					wrapTop=(clientH-clientW)*0.5+"px";
					$("#container").css({"-webkit-transform":"rotate(90deg)","width":clientH,"height":clientW,"left":wrapLeft,"top":wrapTop})
					//resizeVideo();
					$('.share-img').css({'left':'0','right':'auto'});
					$('.js-share-pop').find('img').attr('src','img/share_img1.png?2')


				}else{
					//横屏
					$("#container").css({"-webkit-transform":"rotate(0deg)","width":clientW,"height":clientH,"left":0,"top":0});
					//resizeVideo();
					//$('.book').css('right','10%');
					$('.share-img').css({'left':'auto','right':'0'});
					$('.js-share-pop').find('img').attr('src','img/share_img2.png?2')

				}
			}
			function resizeVideo(){
				var cw=document.documentElement.clientWidth,ch=document.documentElement.clientHeight;
				if(cw/ch>100/56){
					cw<ch ? $("#movie").css({"width":ch,"height":"auto"}):$("#movie").css({"width":cw,"height":ch}).addClass("fill");
					$("#movie").css({"margin-top":"0","margin-left":"0"});
					
				}else{
					cw<ch?$("#movie").css({"width":"100%","height":cw}).removeClass("fill") : $("#movie").css({"width":"auto","height":ch}).removeClass("fill");
					var marginT=ch-cw*.56,
					marginL=0;
					cw<ch?marginL=ch-cw/.56:marginL=cw-ch/.56;

					if(marginT<0){$("#movie").css("margin-top",marginT+"px");}
					else $("#movie").css("margin-top","0");
					if(marginL<0)$("#movie").css("margin-left",marginL/2+"px");
					else $("#movie").css("margin-left","0");
				}
				
				
			}
			detectOtt();
			window.addEventListener("resize",detectOtt,false);

			//audioAutoPlay('media');
			/*var media0 = document.getElementById("media");
			var media1 = document.getElementById("media1");
			var media2 = document.getElementById("media2");
			media0.volume=0.1;
			media1.volume=1;
			media2.volume=1;*/
			audioAutoPlay('media01');
			
			var media02 = document.getElementById("media02");

	
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
				document.addEventListener("MQQBrowserJSBridgeReady", function () {//QQ浏览器
				   play();
				}, false);
				document.addEventListener('YixinJSBridgeReady', function() {//易信
				   play();
				}, false);
				//document.addEventListener("touchstart",play, false);
			}

			 var bar = 0;
			 var loadingTime;
			 function progress() {
				  bar = bar + 1;
				  $(".percent").text(bar + " %");
				  loadingTime = setTimeout(progress, 92);
				  if (bar >= 99) {
					 clearTimeout(loadingTime);
					 $('.start-box').show();
					 //$('#media')[0].pause();
					 
					 /*setTimeout(function(){
						 //$('#media1')[0].pause();
						 //$('#media1').remove();
						 $('#media01')[0].pause();
						 $('#media01').remove();
					 },3000);*/
					 $('.loading-box').hide();
					 return false; 
				  }
					
			}
			progress();
			

			//滚动条不可滚动、高度100%
			tool.disabledScroll();
			
			var video = document.getElementById('movie');
			 //video.currentTime = 15;
			 video.volume=0;
			 video.muted = true; 
			$('.play-btn').on('touchstart', function (event) {
				event.stopImmediatePropagation();
				$('#media01')[0].pause();
				$('#media01').remove();
				$('#media')[0].play();
				 $('.start-box').hide();
				 // video.currentTime = 15;
				 $('.video-box').show();
				 $('#media04')[0].play();
				 video.play();
				
		
			});
			
			var flag = 0;
			var timeline01 = [12.880305];
			var timeline02 = [21.368376];
			var timeline03 = [29.519877];
			var timeline4 = [38.819877];
			
			function videoTimeLine() {
				if (timeline01[0] && video.currentTime >= timeline01[0]) {
					$('.tap').fadeIn();
					flag=1;
					video.pause();
					timeline01.shift();
                }else if (timeline02[0] && video.currentTime >= timeline02[0]) {
                    $('.tap').css('left','38%').fadeIn();
					flag=2;
					video.pause();
					timeline02.shift();
                }else if (timeline03[0] && video.currentTime >= timeline03[0]) {
                    $('.tap').css('left','38%').fadeIn();
					flag=3;
					video.pause();
					timeline03.shift();
                }else if (timeline4[0] && video.currentTime >= timeline4[0]) {
					flag=5;
					$('#media04')[0].pause();
					$('#media04').remove();
                    $('.tap').fadeIn();
					video.pause();
					timeline4.shift();
                } else if (video.currentTime >= 41.5) {
                    video.removeEventListener('timeupdate', videoTimeLine, false);
                }else {
                    return;
                };
            }
			
			
			/*var timeline01 = [14.880305];
			var timeline1 = [21.440305];
			var timeline02 = [24.368376];
			var timeline2 = [30.368376];
			var timeline03 = [34.519877];
			var timeline3 = [38.319877];
			var timeline4 = [44.319877];
			function videoTimeLine() {
				if (timeline01[0] && video.currentTime >= timeline01[0]) {
					$('.tap').fadeIn();
					flag=1;
					video.pause();
					timeline01.shift();
                }else if (timeline1[0] && video.currentTime >= timeline1[0]) {
					$('.tap').css('left','6%').fadeIn();
					$('#media02')[0].pause();
					flag=0;
					video.pause();
					timeline1.shift();
                }else if (timeline02[0] && video.currentTime >= timeline02[0]) {
                    $('.tap').css('left','38%').fadeIn();
					flag=2;
					video.pause();
					timeline02.shift();
                }else if (timeline2[0] && video.currentTime >= timeline2[0]) {
                    $('.tap').css('left','6%').fadeIn();
					$('#media02')[0].pause();
					flag=0;
					video.pause();
					timeline2.shift();
                }else if (timeline03[0] && video.currentTime >= timeline03[0]) {
                    $('.tap').css('left','38%').fadeIn();
					flag=3;
					video.pause();
					timeline03.shift();
                }else if (timeline3[0] && video.currentTime >= timeline3[0]) {
					$('#media02')[0].pause();
                    $('.video-btn2').fadeIn();
					flag=4;
					video.pause();
					timeline3.shift();
                }else if (timeline4[0] && video.currentTime >= timeline4[0]) {
					flag=5;
					$('#media04')[0].pause();
					$('#media04').remove();
                    $('.tap').fadeIn();
					video.pause();
					timeline4.shift();
                } else if (video.currentTime >= 46.5) {
                    video.removeEventListener('timeupdate', videoTimeLine, false);
                }else {
                    return;
                };
            }*/
			
			video.addEventListener("timeupdate", videoTimeLine, false);
			/*video.addEventListener("timeupdate",function(){
				//
				var time = this.currentTime;
				console.log(this.currentTime);
					if(parseFloat(time.toFixed(1))>=35.0&&parseFloat(time.toFixed(1))<35.5){
						
						flag=1;
						$('.video-btn').fadeIn();
						video.pause();
					}
					if(parseFloat(time.toFixed(1))>=45.0&&parseFloat(time.toFixed(1))<45.5){
						flag=2
						$('.video-btn').fadeIn();
						video.pause();
					}
					if(parseFloat(time.toFixed(1))>=53.0&&parseFloat(time.toFixed(1))<53.5){
						flag=3
						$('.video-btn').fadeIn();
						video.pause();
					}
				});		*/

			
			//跳过视频
			$(".skip").click(function (e) {
				video.pause();
				$('.page-last').fadeIn();
				$('.video-box').hide();
				video.pause();
			});
			
			//跳过视频
			$(".video-box").on('touchstart', function (event) {
				if(flag==1){
					media02.currentTime = 0;
					//setTimeout(function(){
					$('#media02')[0].play();
					//},1000)
				}
				if(flag==2){
					media02.currentTime = 0;
					//setTimeout(function(){
					$('#media02')[0].play();
					//},1000)
				}
				if(flag==3){
					media02.currentTime = 0;
					//setTimeout(function(){
					$('#media02')[0].play();
					//},1000)
				}
				if(flag==4){
					$('#media03')[0].play();
				}
				
				$('.tap').hide();
				$('.video-btn2').hide();
				video.play();
			});

			//视频播放结束监听
			video.addEventListener("ended",function(){
				video.pause();
				$('.page-last').fadeIn();
				$('.video-box').hide();
			});
			
			
			  $('.js-share-btn').on('click', function () {
				  $('.js-share-pop').show();
			  });
			  $('.js-share-pop').on('click', function () {
				  $('.js-share-pop').hide();
			  });



 
 
  
  
  


});