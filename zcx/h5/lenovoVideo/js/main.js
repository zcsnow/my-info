$(function(){
	
	$('body').on('touchmove touchstart', function (event) {
		event.preventDefault();
	});
    
	var player ;
	player = document.getElementById('movie');
	//player.play();
    player.pause();

   /* $('#loading').hide();
	$('#page5').fadeIn();*/
    setTimeout(function(){
	  //player.addEventListener('canplaythrough',function(){
		$('#loading').hide();
		$('#page2').fadeIn();
	  //});
	},3000);
	

	
	var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	
	player.onended = function(){
		$('#page5').fadeIn();
		$('#page2').hide();
		
	}
        
	var i=0;

	$('.play-btn-box').on('touchstart', function (event) {
		event.stopImmediatePropagation();
		 $('.play-btn-box').hide();
		 player.play();
		 var video = $('#movie').get(0);
		 window.makeVideoPlayableInline(video);

	});

	$('.js-share-btn').on('touchstart', function (event) {
		event.stopImmediatePropagation();
		$('.js-share-pop').show();	
	});
	$('.js-share-pop').on('touchstart', function (event) {
		event.stopImmediatePropagation();
		$('.js-share-pop').hide();	
	});;
	
	$('.restart').on('touchstart', function (event) {
		 event.stopImmediatePropagation();
		 window.location.href= "index.html?"+Math.random(); 
		
	});
	
	
	
	
	function finishDrag0()
    {
        //dragAutoMove = false;
        //currentPage.removeEventListener("pressmove", onDragMove0);
        //currentPage.removeEventListener("pressup", onScenePressUp);
        setTimeout(function()
        {
            isMoviePlaying = true;
            mp4Video.style.display ="block";
            if ((!isAndroid() && !canVideoAutoPlay))
            {
                //alert("canVideoAutoPlay");
                if(iosVer() == "ios10s")
                {
                    makeVideoPlayableInline(mp4Video, /* hasAudio */ true);
                }
                else
                {
                    makeVideoPlayableInline(mp4Video, /* hasAudio */ true);
                    mp4Video.play();
                    mp4Video.pause();
                }
            }
            else if(isSafari())
            {
                makeVideoPlayableInline(mp4Video, /* hasAudio */ false);
            }
            mp4Video.play();
        }, 500);
        setTimeout(function()
        {
            changeUI(8);
        }, 1000);
        sendAnalytics("_ENTER_SUCCESS");
    }
	
	
	
	/** 初始视频 */
    function initMovie()
    {
        checkVideoAutoPlay = true;
        if(!mp4Video)
        {
            mp4Video = document.getElementById("mp4Video");
            mp4Video.setAttribute('x-webkit-airplay','true');
            mp4Video.setAttribute('airplay', 'allow');
            mp4Video.setAttribute('webkit-playsinline', 'true');
            mp4Video.setAttribute("playsinline", "");
            mp4Video.addEventListener("ended", function()
            {
                //console.log("onVideoPlayComplete");
                changeUI(8);
            });
  
            mp4Video.addEventListener("play", function()
            {
                if(checkVideoAutoPlay && !stopVideoManual)
                {
                    //console.log("checkVideoAutoPlay");
                    mp4Video.pause();
                    canVideoAutoPlay = true;
                    stopVideoManual = true;
                }
            });
        }
        setTimeout(function()
        {
            checkVideoAutoPlay = false;
        }, 500);
        mp4Video.src = "movies/movie.mp4";
        mp4Video.play();

    }
	
	/** 设备是否是安卓系统 */
    function isAndroid()
    {
        if(/android/i.test(navigator.userAgent))
            return true;
        else
            return false;
    }
	
	
	function iosVer()
    {
        var ua = window.navigator.userAgent.toLowerCase();
        var str = "";
        if(ua.indexOf("iphone") >= 0)//iphone
        {
            if(ua.indexOf("os 10") >= 0)
            {
                str = "ios10s";
            }
            else if(ua.indexOf("os 9") >= 0)
            {
                str = "ios9";
            }
            else if(ua.indexOf("os 8") >= 0)
            {
                str = "ios8";
            }
            else
            {
                str = "iosOther";
            }
            return str;
        }
    }
	
	 /** 播放视频 */
    function onPlayVideo(e)
    {
        e.stopImmediatePropagation();
        playVideo();
        sendAnalytics("_PLAY_VIDEO");
    }






	
	
});