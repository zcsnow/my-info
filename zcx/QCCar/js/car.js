$(function(){
	var startTime = new Date().getTime();
	var endTime = new Date().getTime()+8000;
	var newDate = new Date();
	newDate.setTime(endTime);
	var time = newDate.toString();
	
	var timeTxt = $('.total-time strong').text();
	var setIntervalTime = setInterval(function(){
		if(timeTxt<=0){
			clearInterval(setIntervalTime);
			return false;
		}
		timeTxt--;
		$('.total-time strong').text(timeTxt);
	},1000)
	$('.total-time strong').text();
	console.log(time);
	var isClick=true;
	var meter=0;

	$('.dowebok').flipTimer({
		seconds: true,
		direction: 'down', 
		date:  time,
		callback: function() { 
			isClick = false;
			var distance = meter;
			popTip('您拉动了汽车距离'+meter+'米');
			setTimeout(function(){
			  window.location.href="rank.html?time=" + new Date().getTime();
			},3000); 
		}
	});
	
	//点击开始按钮
	$('.play-btn').click(function(e){
		if(isClick==true){
			var carLeft = parseInt($('.car').css('left'));
			if(carLeft>-10){
				popTip('您已拉动到最大距离了');
				return false;
			}
			meter++;
			carLeft +=3;
			$('.car').css('left',carLeft)
		}
		
	});
	
});

