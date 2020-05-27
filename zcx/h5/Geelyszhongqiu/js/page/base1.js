;$(function () {

    //loading
    var bar = 0;
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
			//$(".feichuan").addClass('animated fadeZoomInLeft');
			$('.sports_2').fadeIn(2000);
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
			
			/*setTimeout(function(){
				
				//$(".feichuan").removeClass('animated fadeZoomInLeft').addClass('animated fadeInRightOut');
				
			},6000);*/
			setTimeout(function(){
				$(".page1 .p1").fadeOut(1000);
				$(".page1 .p2").fadeOut(1000);
				$(".page1 .p3").fadeOut(1000);
			},8000);
			setTimeout(function(){
				//$(".page1 .p4").addClass('animated fadeInDown');
				$(".page1 .p4").fadeIn(1000);
			},9000);
			setTimeout(function(){
				//$(".page1 .p5").addClass('animated fadeInDown');
				$(".page1 .p5").fadeIn(1000);
			},10000);
			setTimeout(function(){
				$(".page1 .p4").fadeOut(1000);
				$(".page1 .p5").fadeOut(1000);
				$(".yueliang").fadeOut(1000);
				
			},14000);
			setTimeout(function(){
				$('.canvas-box').fadeIn(2000);
			},14500); 
        }

    }

    setTimeout(function(){
		$('.loading-img').addClass('zoomInOut');
		$(".loading_wrp").show();
		progress();
	},500);
    
});

$('.js-selected-btn').on('click', function (e) {
    $('.tip').show();
    var img = document.getElementById("imgDiv").childNodes;
    var data = img[0].src;
    var number = $("#baifenbi").val();
    $.ajax({
        url: "/CompanyProject/Geelyszhongqiu/CreateHtml.ashx?baifen=" + number,
        type: "POST",
        data: data,
        success: function (result) {
            window.location.href = result;
        }
    })
});
