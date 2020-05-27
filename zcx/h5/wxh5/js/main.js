$(function(){
	
	loadFunction = function() {
		var imgArr = [		
				"img/frame/30001.png", 
				"img/frame/30002.png", 
				"img/frame/30003.png", 
				"img/frame/30004.png", 
				"img/frame/30005.png", 
				"img/frame/30006.png", 
				"img/frame/30007.png", 
				"img/frame/30008.png", 
				"img/frame/30009.png", 
				"img/frame/30010.png", 
				"img/frame/30011.png", 
				"img/frame/30012.png",  
				"img/frame/30013.png", 
				"img/frame/30014.png", 
				"img/frame/30015.png", 
				"img/frame/30016.png", 
				"img/frame/30017.png", 
				"img/frame/30018.png", 
				"img/frame/30019.png",
				"img/frame/30020.png", 
				"img/frame/30021.png", 
				"img/frame/30022.png",  
				"img/frame/30023.png", 
				"img/frame/30024.png", 
				"img/frame/30025.png", 
				"img/frame/30026.png", 
				"img/frame/30027.png", 
				"img/frame/30028.png", 
				"img/frame/30029.png", 
				"img/frame/30030.png", 
				"img/frame/30031.png", 
				"img/frame/30032.png",  
				"img/frame/30033.png", 
				"img/frame/30034.png", 
				"img/frame/30035.png", 
				"img/frame/30036.png", 
				"img/frame/30037.png", 
				"img/frame/30038.png", 
				"img/frame/30039.png",
				"img/frame/30040.png", 
				"img/frame/30041.png", 
				"img/frame/30042.png",  
				"img/frame/30043.png", 
				"img/frame/30044.png", 
				"img/frame/30045.png", 
				"img/frame/30046.png", 
				"img/frame/30047.png", 
				"img/frame/30048.png", 
				"img/frame/30049.png",
				"img/frame/30050.png",
	
			],
			imgArrLength = imgArr.length,
			count=0,//loading百分比
			loadImage = function(url) {
				var img = new Image;
				img.onload = function() {
					count++;
					/*loadingText.text(parseInt(count / imgArrLength * 100) + "%");
					if(count>=imgArrLength){
						setTimeout(function(){$("#loading").hide();},200)
					}*/
				};
				img.src = url;
			};
		for (var i = 0; i < imgArrLength; ++i) {
			loadImage(imgArr[i]);
		}
	}();
	
	
	function show(eid, t) {
    	setTimeout(function(){
			//$("#media")[0].play();
			$("."+eid).show();
			$('html,body').css('height','auto');
			window.scroll(0,$('#page3').height());
		}, t*1000);
		
	};
  
	function hide(eid) {
	  $("."+eid).hide();
	};
	
	var my_video = document.getElementById("myVideo");
	
	setTimeout(function(){
		$('#loading').hide();
		$('#wxMsg').fadeIn();
		//$('.unlock-mask').addClass('leftright');
		setTimeout(function(){
			$("#media")[0].play();
			$('#wxMsg .msg').addClass('slideInDown');
		},500);
	},1000);
	
	
	//
	var is_open = false;
	var is_f_page = false;
	var is_f_page_video = false;
	var video_play = false;
	$('#open').on('touchy-drag', function (event, phase, $target, data) {
		if(!$(this).hasClass('cur')){ return false;}
		var movePoint = data.movePoint,
			startPoint = data.startPoint;
		var x =  movePoint.x - startPoint.x;
		switch (phase) {
			case 'start':
				
				break;
			case 'move':
				if(!is_open){
					if(x > 0){
						$target.get(0).style.cssText = 'z-index:5;-webkit-transform:translate(' + (movePoint.x - startPoint.x) + 'px,0);';
							if(x > 150){
								$('#page1').hide();
								$('#page2').show();
								changeTitle("发现");

								is_open = true;
							}
					}
				}
				break;
			case 'end':
				if(!is_open){
					$target.get(0).style.cssText = '-webkit-transform:translate(0,0);-webkit-transition: -webkit-transform .4s;';
				}else{
					$('#page1').hide();
					$('#page2').show();
				}
				break;
		}
	});
	
	
	$('#open2').on('touchy-drag', function (event, phase, $target, data) {
		if(!$(this).hasClass('cur')){ return false;}
		var movePoint = data.movePoint,
			startPoint = data.startPoint;
		var x =  movePoint.x - startPoint.x;
		switch (phase) {
			case 'move':
				if(!is_f_page){
					if(x > 0){
						$target.get(0).style.cssText = 'z-index:5;-webkit-transform:translate(' + (movePoint.x - startPoint.x) + 'px,0);';
							if(x > 150){
								changeTitle("朋友圈");
								
								$('#page5').hide();
								$('#page3').show();
								
								show("dialogue1",0.5);
								show("dialogue2",1);
								show("dialogue3",1.5);
								show("dialogue4",2);
								setTimeout(function(){
									$('.hand-btn1').addClass('sizeChange');
									$('.hand-btn1').on('click', function(){
										$(this).hide();
										$('#myVideo').show();
										if(!video_play){
											video_play = true;
											requestFullScreen();
											my_video.play();//播放视屏
											
											
										}
									});
								},2500);

								is_f_page = true;
							}
					}
				}
				break;
			case 'end':
				if(!is_f_page){
					$target.get(0).style.cssText = '-webkit-transform:translate(0,0);-webkit-transition: -webkit-transform .4s;';
				}else{
					if(!video_play){
						//video_play = true;
						//requestFullScreen();
						//my_video.play();//播放视屏
						$('#page5').hide();
						$('#page3').show();
						
						show("dialogue1",0.5);
						show("dialogue2",1);
						show("dialogue3",1.5);
						show("dialogue4",2);
						setTimeout(function(){
							$('.hand-btn1').addClass('sizeChange');
							$('.hand-btn1').on('click', function(){
								$(this).hide();
								$('#myVideo').show();
								if(!video_play){
									video_play = true;
									my_video.play();//播放视屏
									
									
								}
							});
						},2500);
						
					}
				}
				break;
		}
	});
	
	function requestFullScreen() {
		var de = my_video;
		if (de.requestFullscreen) {
			de.requestFullscreen();
		} else if (de.mozRequestFullScreen) {
			de.mozRequestFullScreen();
		} else if (de.webkitRequestFullScreen) {
			de.webkitRequestFullScreen();
		}
	};
	
	// 改变标题
	function changeTitle(title) {
		document.title=title;
		var $body = $('body');
		// hack在微信等webview中无法修改document.title的情况
		var $iframe = $('<iframe src=""></iframe>').on('load', function() {
		setTimeout(function() {
		$iframe.off('load').remove()
		}, 0)
		}).appendTo($body);
	};
	
	
	$('#page2').on('touchend', function(){
		$('#page2').hide();
		$('html,body').css('height','100%');
		$('#page4').show();
		$('.frame').addClass('frameAnimate');
		setTimeout(function() {
			$('.note').show();
			$('.flash').addClass('flashAnimate');
			setTimeout(function() {
				$('.note img').fadeIn();
				setTimeout(function() {
					$('#page5').show();
					$('#page4').hide();
					
					setTimeout(function(){
						$("#media")[0].play();
						$('#page5 .msg').addClass('slideInDown');
					},500);
				}, 1200);
			}, 1200);
		}, 4000);
		/*setTimeout(function() {
		$('.frame1').addClass('frameAnimate1');
		}, 2000)*/
		

	});
	
	
	
	$('#myVideo')[0].addEventListener("ended",function(evt) {
		$('#myVideo').remove();
		show("dialogue5",0.5);
		show("dialogue6",1);
		show("dialogue7",1.5);
		show("dialogue8",2);
		show("dialogue9",2.5);
		show("dialogue10",3);
		show("dialogue11",3.5);
		show("dialogue12",4);
		show("dialogue13",4.5);
		setTimeout(function(){
		  $('.hand-btn2').addClass('sizeChange');
		},5000);
	});
	
	
	
});