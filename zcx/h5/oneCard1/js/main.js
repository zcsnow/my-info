$(function(){
	function show(eid, t) {
    	setTimeout(function(){
			//$("#media")[0].play();
			$("."+eid).show();
			$('html,body').css('height','auto');
			window.scroll(0,$('#page3').height());
		}, t*1000);
		
	};
	
	function add(name,className,time)  {
	  setTimeout(function(){
		  $(name).addClass(className);
	  },time*1000);
	};
	function remove(name, className, time)  {
	  setTimeout(function(){
		  $(name).removeClass(className);
	  },time*1000);
	};
  
	function hide(eid) {
	  $("."+eid).hide();
	};
	
	var my_video = document.getElementById("myVideo");
	
	//setTimeout(function(){
		//$('#loading').hide();
		$('#wxMsg').show();
		//$('.unlock-mask').addClass('leftright');
	//},3000);
	
	//音乐控制
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
		  document.addEventListener("touchstart",play, false);
	  }
	  
	
	
	//index.show();
	var is_f_page = false;
	var is_f_page_video = false;
	var video_play = false;
	$('#time').on('touchy-drag', function (event, phase, $target, data) {
		if(!$(this).hasClass('cur')){ return false;}
		var f_page = $('#f-page');
		var movePoint = data.movePoint,
			startPoint = data.startPoint;
		var y =  startPoint.y - movePoint.y;
		switch (phase) {
			case 'start':
			break;
			case 'move':
				if(!is_f_page){
					if(y > 0){
						$target.get(0).style.cssText = 'z-index:99;-webkit-transform:translate(0,' + (movePoint.y - startPoint.y) + 'px);';
							if(y > 200){
								$('#page1').hide();
								audioAutoPlay('media');
								$('.music').show();
								$('#page2').show();
								setTimeout(function(){
								  //$('.machine-box').show();
								  //$('.machine-box').addClass('machineMoveIn');
								  $('.pet').addClass('petAnimate');
								  add('.p2-icon10','p2-icon10-move',0.2);
								  add('.p2-icon5','p2-icon5-move',0.25);
								  add('.p2-icon6','p2-icon6-move',0.35)
								  add('.p2-icon1','p2-icon1-move',0.40);
								  add('.p2-icon2','p2-icon2-move',0.4);
								  add('.p2-icon7','p2-icon7-move',0.85);
								  add('.p2-icon8','p2-icon8-move',1.0);
								  add('.p2-icon3','p2-icon3-move',1.1);
								  add('.p2-icon4','p2-icon4-move',1.7);
								  add('.pet','petHidden',2);
								  //$('.pet').addClass('petHidden');
								  setTimeout(function(){
									  
									  $('.p2-icon1').css('visibility','hidden');
									  $('.p2-icon2').css('visibility','hidden');
									  $('.p2-icon3').css('visibility','hidden');
									  $('.p2-icon4').css('visibility','hidden');
									  $('.p2-icon5').css('visibility','hidden');
									  $('.p2-icon6').css('visibility','hidden');
									  $('.p2-icon7').css('visibility','hidden');
									  $('.p2-icon8').css('visibility','hidden');
									  $('.p2-icon10').css('visibility','hidden');
								  },1800);
								  add('.machine-box','machineMoveIn',1.8);
								},500);
								
									
									/* $('.p2-icon5').addClass('p2-icon5-move');
								    $('.p2-icon1').addClass('p2-icon1-move');
								    $('.p2-icon2').addClass('p2-icon2-move');
								    $('.p2-icon3').addClass('p2-icon3-move');
								    $('.p2-icon4').addClass('p2-icon4-move');
								    $('.p2-icon7').addClass('p2-icon7-move');
								    $('.p2-icon8').addClass('p2-icon8-move');
									$('.p2-icon10').addClass('p2-icon10-move');
								    $('.p2-icon6').addClass('p2-icon6-move');*/

								
								
								setTimeout(function(){
								  //$('.machine-box').show();
								  //('.machine1').addClass('machine1Move');
								  //$('.machine2').addClass('machine2Move');
								  //$('.machine5').addClass('machine5Move');
								  //$('.machine6').addClass('machine6Move');
								  
								  $('.machine1').addClass('mac1-move');
								  $('.machine2').addClass('mac2-move');
								  $('.machine5').addClass('mac5-move');
								  $('.machine6').addClass('mac6-move');
								},3500);

								
								setTimeout(function(){
								  $('#page3').show();
								  $('.machine-box').addClass('move');
								  $('#page2').addClass('move');
								},4300);
								setTimeout(function(){
								   $('.machine1').addClass('mac01-move');
								   $('.machine2').addClass('mac02-move');
								   $('.machine3').addClass('mac03-move');
								   $('.machine4').addClass('mac04-move');
								   $('.machine5').addClass('mac05-move');
								   $('.machine6').addClass('mac06-move');
								},4500);
								
								setTimeout(function(){
								  $('#page2').hide();
								  $('.machine-box').hide();
								  $('.NFC-card').addClass('sizeChange');
								  $('.pet1').addClass('petMoveOut');
								},6200);
								setTimeout(function(){
								  $('.text-tip').fadeIn();
								},9000);
								
								
								
								
								
							}
					}
				}
				break;
			case 'end':
				if(!is_f_page){
					$target.get(0).style.cssText = 'z-index:99;-webkit-transform:translate(0,0);-webkit-transition: -webkit-transform .4s;';
				}
				break;
		}
	});

	
	$('.NFC-card').on('click', function(){
		$('#page3').hide();
		$('#page4').show();
		setTimeout(function(){
			$('#page4').fadeOut();
			$('#page5').show();
			$('.p5-1').addClass('moveIn');
			setTimeout(function(){
				$('.p5-icon').fadeIn();
			},1000);
			/**/setTimeout(function(){
				$('.p5-icon1').addClass('iconEnter1');
				$('.p5-icon11').addClass('iconEnter11');
			},1300);
			setTimeout(function(){
				$('.p5-icon2').addClass('iconEnter3');
				$('.p5-icon12').addClass('iconEnter13');
			},1600);
			setTimeout(function(){
				$('.p5-icon3').addClass('iconEnter2');
				$('.p5-icon13').addClass('iconEnter12');
			},1900);
			setTimeout(function(){
				$('.p5-icon4').addClass('iconEnter4');
				$('.p5-icon14').addClass('iconEnter14');
			},2200);
			setTimeout(function(){
				$('.p5-icon5').addClass('iconEnter5');
				$('.p5-icon15').addClass('iconEnter15');
			},2500);
			setTimeout(function(){
				$('.p5-icon6').addClass('iconEnter6');
				$('.p5-icon16').addClass('iconEnter16');
			},2700);
			setTimeout(function(){
				$('.p5-icon7').addClass('iconEnter7');
				$('.p5-icon17').addClass('iconEnter17');
			},3100);
			setTimeout(function(){
				$('.p5-icon8').addClass('iconEnter8');
				$('.p5-icon18').addClass('iconEnter18');
			},3400);
			setTimeout(function(){
				$('.p5-icon9').addClass('iconEnter9');
				$('.p5-icon19').addClass('iconEnter19');
			},3700);
			setTimeout(function(){
				$('.p5-icon10').addClass('iconEnter10');
				$('.p5-icon20').addClass('iconEnter20');
			},4000);
			
			setTimeout(function(){
				$('#page5').fadeOut();
				$('#page6').show();
			},5000);/**/
		},4300);
	});
	
	$('.p6-pop-btn').click(function(){
		   $('.pop-box').show();
		   //$('.mask').show();
	});
	
	$('.pop-box .close-btn').on('click',function() {
		 $('.pop-box').hide();
		 //$('.mask').hide();
	});  

	
	
	
	$('.js-share-btn').click(function(){
		$('.js-share-pop').show();	
		$('.mask').show();
	});
	$('.js-share-pop').click(function(){
		$('.js-share-pop').hide();	
		$('.mask').hide();
	});
	
	$('.music').on('click', function () {
	  if ($('.music').hasClass('on')) {
		  $('.music').removeClass('on');
		  $('.music img').attr('src', 'img/music1.png');
		  $("#media")[0].pause();
	  } else {
		  $('.music').addClass('on');
		  $('.music img').attr('src', 'img/music0.png');
		  $("#media")[0].play();
	  }
  });	
  
  $('.video-content').on('click', function () {
	  if ($('.music').hasClass('on')) {
		  $('.music').removeClass('on');
		  $('.music img').attr('src', 'img/music1.png');
		  $("#media")[0].pause();
	  } 
  });	

});