$(document).ready(function(){
	
	var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
	};
	//滚动条不可滚动、高度100%
	tool.disabledScroll();
    $('body').on("touchmove", function (e) {
		e.preventDefault();
	});
	
	window.addEventListener("touchstart", function (e) {
		//e.preventDefault();
	});
	
	
	var bar = 0;
    var loadingTime;
    function progress() {
		bar = bar + 1;
	    $(".percent").text(bar + " %");
		if (bar <= 60) {
			loadingTime = setTimeout(progress, 65);
		}
		else if (bar <= 90&bar > 60) {
			loadingTime =setTimeout(progress, 100);
		}
		else if (bar <= 99&bar > 90) {
			loadingTime = setTimeout(progress, 300);
		}
    }
    progress();
	
	var Android = navigator.userAgent.match(/Android/i);
	var isStart = false;
    setTimeout(function(){
	  //隐藏loading页面
	  video.pause();
	  video.currentTime=0;
	  video.muted = false;
	  video.volume=1;
	  $('.loading-box').fadeOut();
	  
	  setTimeout(function(){
		  $('.video-box').css('visibility','visible');
		  
		  $(".start-btn").on("touchstart", function (e) {
			  
			  e.preventDefault();
			  $(".tip-text").hide();
			  
		      if(Android){
				  if(isStart){
					  $(".start-btn").removeClass('play-btn playAnimate').addClass('pause-btn pauseAnimate');
			          video.play(); 
					  $('.skip').show();
				  }else{
					  $(".start-btn").hide();
					  video.play();  
					  isStart = true; 
					  setTimeout(function(){
						video.pause();
						$(".start-btn").css('bottom','6%').show(10); 
						$(".tip-text").css('bottom','6%').show(10);
						$('.skip').show();
						$(".start-btn").removeClass('pause-btn pauseAnimate').addClass('play-btn playAnimate');
					  },10);
					  
				  }

				 
			  }else{
				$(".start-btn").removeClass('play-btn playAnimate').addClass('pause-btn pauseAnimate');
			    video.play(); 
				$('.skip').show();  	
			  }
			  
		  })  
	  },500)
	  
    },10000);
	
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

	//跳过视频
	$('.skip').click(function(e){
		lastPage();
	});

	
	video = document.getElementById("video");
	video.play();
	video.volume=0;
	video.muted = true; 
	
	function lastPage(){
		video.pause();
		$(".start-btn").hide();
		$(".start-btn").unbind("touchend");
		$('.last-page').fadeIn();
		$('.video-box').hide();
		add('.finish-animate .ele1','animated rollIn',1);
		add('.finish-animate .ele2','animated fadeIn',1.3);
		add('.finish-animate .ele3','animated fadeIn',1.6);
		add('.finish-animate .ele1','ele1Ani',2);
		add('.finish-animate .ele2','ele2Ani',2);
		add('.finish-animate .ele3','ele3Ani',2);
		add('.list-li1','animated fadeInUp',2.5);
		add('.list-li2','animated fadeInUp',2.8);
		add('.list-li3','animated fadeInUp',3.2);
		add('.finish-animate .ele5','animated fadeIn',4.5);
		add('.finish-animate .logo','animated fadeIn',3.5);
		add('.finish-animate .ele41','animated fadeInDown',4);
		add('.finish-animate .ele42','animated fadeInUp',4.3);
		add('.finish-animate .ele43','animated fadeIn',5);
		add('.finish-animate .ele44','animated fadeIn',5.3);
	}
	
		
	video.addEventListener("timeupdate",function(){
		if(video.currentTime>=20){
			lastPage();
			
		}
	});
	
	
	$(".start-btn").on("touchend", function (e) {
		$(".tip-text").show();
		$(".start-btn").removeClass('pause-btn pauseAnimate').addClass('play-btn playAnimate');
		video.pause();
		e.preventDefault();
	});
	
	
	function popTip(msg){
		$('.pop-tip-msg').html(msg);
		$('.pop-tip-box').show();
		setTimeout(function(){
			$('.pop-tip-box').hide();
		},2000);
	};
	
	
	
	
	
});