;$(function(){ 

  hengshuping();
  $('.btn-tipzd').one('click', function() {
	  $(this).parent().hide();
  });
  
  /*var bar = 0;
	var loadingTime;
	function progress() {
		bar = bar + 1;
		$("#loading_text").text("Loading " + bar + " %");
		$(".loading_bar").width(bar + "%");
		$(".loading_car").css('left', bar*1.3 + "%");
		if (bar <= 45) {
			loadingTime = setTimeout(progress, 30);
		}
		
		else if (bar <= 85&bar > 45) {
			loadingTime =setTimeout(progress, 60);	
		}
		else if (bar <= 99&bar > 85) {
			loadingTime = setTimeout(progress, 100);
		}
		else{
			$('#loading').hide();
			$(".page1").show();
		}
		
    }
	
	progress();*/
  
  
  
var loading = $("#loading"),
	loadingText = $("#loading_text"),
	loadFunction = function() {
		  var imgArr = [		
				  "images/loading-bg.png", 
				  "images/loading-car.png", 
				  "images/page1-bg.jpg",
				  "images/geely-logo.png",
				  "images/loading-bg.png", 
				  "images/loading-car.png", 
				  "images/page1-bg.jpg",
				  "images/geely-logo.png",
				  "images/loading-bg.png", 
				  "images/loading-car.png", 
				  "images/page2-bg.jpg",
				  "images/geely-logo.png",
				   
				   
			  ],
			  imgArrLength = imgArr.length,
			  count=0,//loading百分比
			  bar = 0,
			  loadImage = function(url) {
				  var img = new Image;
				  img.onload = function() {
					  count++;
					  bar = parseInt(count / imgArrLength * 100);
					 
					  $("#loading_text").text("Loading " + bar + " %");
					  $(".loading_bar").width(bar + "%");
					  $(".loading_car").css('left', bar*1.3 + "%");
					  //loadingText.text(parseInt(count / imgArrLength * 100) + "%");
					  if(count==imgArrLength){
						  
						  loadSound();
						  //pageStart(); //载完图片，直接进入首页，
						  
					  }
				  };
				  img.src = url;
			  };
		  for (var i = 0; i < imgArrLength; ++i) {
			  loadImage(imgArr[i]);
		  }
	  }();
  

  

});


	
	
	function loadSound(){
		var audio_address_list =[];
		audio_address_list.push("media/sound1.mp3");
		audio_address_list.push("media/sound2.mp3");
		
		for(var i=0;i<audio_address_list.length;i++){
			var audio = document.createElement("audio");
			audio.src=audio_address_list[i];
			$(".audio_wrap").append(audio);
		}
		
		var audio_array=$("audio");
		for(var i=0;i<audio_array.length;i++){
			audio_array[i].load();
			audio_array[i].addEventListener("canplaythrough", function(){
				//pageStart();
				setTimeout(function(){$("#loading").hide();},20000)
			});
		}
	}
	
	function pageStart(){
		$(".page_1 .txt").html("Page Start");
	}


//判断手机横竖屏状态： 
function hengshuping(){ 
  if(window.orientation==180||window.orientation==0){ 
        $('.tipzd').show();         
   } 
  if(window.orientation==90||window.orientation==-90){ 
        $('.tipzd').hide(); 
		$('#loading').show();        
   } 
 } 
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize",hengshuping,false);
