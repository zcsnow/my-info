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



//绘图	
var canvas = document.getElementById('canvas');
canvas.addEventListener('touchstart', onTouchStart, false);
canvas.addEventListener('touchmove', onTouchMove, false);
canvas.addEventListener('touchend', onTouchEnd, false)
canvas.height = 180;
canvas.width = 180;
var ctx = canvas.getContext('2d');
var flag = false;
function Draw(x, y) {
	    
        //ctx.strokeStyle = $('#selColor').val();
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 1.0;
        //ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
		ctx.shadowBlur = 0;
        ctx.lineTo(x, y);
		ctx.fillStyle='#fff';
        ctx.stroke();

}

function onTouchMove(evt) {
	evt.preventDefault();
	if (flag) {
		var p = pos(evt);
		Draw(p.x, p.y);

	}
}

function onTouchStart(evt) {
	evt.preventDefault();
	ctx.beginPath();
	var p = pos(evt);
	ctx.moveTo(p.x, p.y);
	
	flag = true;
}


function onTouchEnd(evt) {
	evt.preventDefault();
	flag = false;
}

function pos(event) {
	var x, y;
	if (isTouch(event)) {
		x = event.touches[0].pageX-90;
		y = event.touches[0].pageY-50;
	} 
	return {
		x: x,
		y: y
	};
}

function isTouch(event) {
	var type = event.type;
	if (type.indexOf('touch') >= 0) {
		return true;
	} else {
		return false;
	}
}

//点击画笔绘画
$('#canvasBrush').on('click',function(e){
	$('.tip-box').hide().removeClass('tip-show');
});

//显示填充颜色列表
$('#canvasColor').on('click',function(e){
	e.stopPropagation();
	$('.color-list').slideToggle();
});
//选择填充颜色
$('.color-list li').on('click',function(e){
	e.stopPropagation();
	var color = $(this).css('background-color');
	$('.color-brush').css('background-color',color);
	$('.color-list').hide();
	ctx.closePath();
	ctx.fillStyle=color;
	ctx.fill();
	ctx.stroke();
});

//清除画布
$('#clearControl').on('click',function(e){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});


var textArr = [
	'亲，你确定你画的是圆？不到50%的圆度，跟80年代国内企业和消费者对品牌理解的一知半解有一拼。',
	'亲，你的几何是体育老师教的么？你画的圆圆度才60%，有点像90年代的中国企业较以前发展壮大了，但品牌还不成气候。',
	'不用说，你的几何肯定是数学老师教的咯。你画的圆圆度达到85%，是2000年后的中国品牌在国内外开始产生一定的影响力',
	'行走的圆规！你画的圆圆度达到95%,就像2016年吉利品牌成立30年，高质感中级车吉利帝豪GL即将以自胜者脚步迈向世界舞台，中国的月亮才更圆。'
	];



//生成图像
$('#saveImage').on('click', function (e) {
    if ($('.tip-box').hasClass('tip-show')) {
        alert('请在圆圈中画圆');
        return false;
    }
    var number = parseInt(Math.floor(Math.random() * 4));
    var resultText = textArr[number];
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "rgba(255,255,255,1)";
    ctx.shadowBlur = 15;
    ctx.fill();
    console.log(ctx);
    var url = canvas.toDataURL('image/png'),
	img = new Image();
    img.src = url;
    $('#imgDiv').html("");
    $('.canvas-box').hide();
    $('#imgDiv').append(img);
    $('.js-result-text').text(resultText);
    $('.result-box').show();
    $("#baifenbi").val(number)
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
$('.js-again-btn').on('click', function (e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    $('.result-box').hide();
    $('.canvas-box').fadeIn(1000);
});

