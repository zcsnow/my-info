;$(function () {
	var loadFunction = function() {
		  var imgArr = [		
				  "images/loading_img1.png", 
				  "images/loading_img2.png", 
				  "images/loading_img3.png",
				  "images/loading_img4.png",
				  "images/loading_img5.png", 
				  "images/loading_img6.png",
			  ],
			  imgArrLength = imgArr.length,
			  count=0,//loading百分比
			  bar = 0,
			  loadImage = function(url) {
				  var img = new Image;
				  img.onload = function() {
					  count++;

					  //loadingText.text(parseInt(count / imgArrLength * 100) + "%");
					  if(count>=imgArrLength){
						 
						var loadingImg = imgArr[0];
						var num = 0;
						var loadingTime = setInterval(function(){
						   num++;
						   if(num>=imgArrLength){
							  num = 0;
						   }
						   loadingImg = imgArr[num];
						   $('.loading').css({'background-image':'url('+ loadingImg +')'});
						},1000);
						
						setTimeout(function(){
							$('.loading').removeClass('up-down-move');
							clearInterval(loadingTime);
							
							
						},6000);
						
						setTimeout(function(){
							$('.loading').addClass('leftRightMove');
							
						},6500);
						
						setTimeout(function(){
							$('.loading').removeClass('leftRightMove');
							
							
						},7000);
						
						setTimeout(function(){
							$('.loading').addClass('loadingZoomIn');
						},7500);
					
						setTimeout(function(){
							$('.loading_wrp').hide();
							
							$(".left-bg").css({'left':'-300%'});
							$(".right-bg").css({'right':'-300%'});
						},8000);
						setTimeout(function(){
							$('#loading').hide();
							
						},9500);
						  
					  }
				  };
				  img.src = url;
			  };
		  for (var i = 0; i < imgArrLength; ++i) {
			  loadImage(imgArr[i]);
		  }
	  }();
	
	

    //loading
   /* var bar = 0;
    var loadingTime;
    function progress() {
        bar = bar + 1;
        $("#loading_text").text(bar + " %");
		if (bar < 40) {
            loadingTime = setTimeout(progress, 50);
        }
		else if (bar == 40) {
            loadingTime = setTimeout(progress, 1000);
        }
		else if (bar < 70& bar > 40) {
            loadingTime = setTimeout(progress, 50);
        }
		else if (bar == 70) {
            loadingTime = setTimeout(progress, 1000);
        }
		else if (bar <= 99& bar > 70) {
            loadingTime = setTimeout(progress, 50);
        }
        else {
            $('#loading').fadeOut(2000);
            $("#media")[0].play();
			$('.loading-img').removeClass('zoomInOut');
			$(".feichuan").addClass('animated fadeZoomInLeft');
			$(".yueliang").addClass('animated fadeZoomInLeft1');

            $(".page1").show();
			setTimeout(function(){
				$(".page1 .p1").fadeIn(1000);
			},2000);
			setTimeout(function(){
				$(".page1 .p2").fadeIn(1000);
			},3000);
			setTimeout(function(){
				$(".page1 .p3").fadeIn(1000);
			},4000);

			setTimeout(function(){
				$(".page1 .p1").fadeOut(1000);
				$(".page1 .p2").fadeOut(1000);
				$(".page1 .p3").fadeOut(1000);
			},8000);
			

			
        }

    }

    setTimeout(function(){
		$('.loading-img').addClass('zoomInOut');
		$(".loading_wrp").show();
		progress();
	},500);
    */
});

$('.js-selected-btn').on('click', function (e) {
    $('.tip').show();
    var img = document.getElementById("imgDiv").childNodes;
    var data = img[0].src;
    var number = $("#baifenbi").val();
    /*$.ajax({
        url: "/CompanyProject/Geelyszhongqiu/CreateHtml.ashx?baifen=" + number,
        type: "POST",
        data: data,
        success: function (result) {
            window.location.href = result;
        }
    })*/
});

 //内容弹层
  $('.date-list li').on('click',function(e){
	var contextHtml = "";
	//$('.news-pop-box').html(contextHtml);
  	$('.mask').show();
	$('.pop-box').show();
  });


// 关闭弹层
$('.pop-box .close-btn').on('click',function(e){
	e.stopPropagation();
	$('.mask').hide();
	$('.pop-box').hide();
	//$('.news-pop-box').html("");
});
