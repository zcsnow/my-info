$(function(){
	
	
	var second_message,k=false;
	var loginStatus = 1; //判断登录状态
	var animateing = 1;	//转动时定时器


	$("#turntable_btn").click(function(){
		if(animateing===1){
			spRotate();
		}
			
	});	

	var spRotate = function(){		
		$.ajax({
			type: "GET",
			url: "data/lottery.txt?5",
			data: "",
			success: function(data){
				animateing = 0;
				var data = $.parseJSON(data);
				
				console.log(data);
				if(data.times === 0){
					animateing = 1;
					var html = '<h3>今天的抽奖机会用光了，</h3><p class="win-info">分享至朋友圈可增加一次抽奖机会呦</p>';
					jShare(html,"","");
					return;
				}
				var turntable = (function(){
					var turntable = {
						range : function(start, end) {  
							var choose = end - start + 1;  
							return Math.floor(Math.random() * choose + start); 
						},
						/*中奖角度算法：
							奖品块数等分360°，奖品分割线左右预留自定义的度数，防止中奖指针指到分割线上。
							逆时针由0-360°递增，算出每个奖品所处位置的角度。
						*/
						probability : {
							1: [325,350,325,350],		//苹果笔记本电脑
							2: [280,305,280,305],		//Apple Watch
							3: [235,260,235,260],		//京东礼品卡
							4: [190,215,190,215],		//索尼音响
							5: [145,170,145,170],		//无线鼠标套盘
							6: [100,125,100,125],		//16GU盘
							7: [55,80,55,80],		//无线鼠标
							8: [10,35,10,35],		//10元话费充值
						},
						offset : 10,
						result : function(){
							var randnum = this.range(0,1),
								probability = this.probability[data.message],
								offset = this.offset;
								
							return this.range(probability[randnum * 2] + offset,probability[randnum * 2 + 1] - offset);
						}
					}
					return turntable.result();
				})();

				switch(data.message)
				  {
				  	case 1:
					  second_message="20元手机流量充值卷";
					  break;
					case 2:
					  second_message="30元手机流量充值卷";
					  break;
					case 3:
					  second_message="40元手机流量充值卷";
					  break;
					case 4:
					  second_message="50元手机流量充值卷";
					  break;
					case 5:
					  second_message="60元手机流量充值卷";
					  break;
					case 6:
						second_message="70元手机流量充值卷";
						break;
					case 7:
						second_message="80元手机流量充值卷";
						break;
					case 8:
					  second_message="90元手机流量充值卷";
					  break;
					default:
					  break;
				  }
				
				//判断几等奖显示什么
				function thePrize(prize){
					var prompt= "";
					switch(prize) {
						case 4:
						case 8:
				            prompt = '<h3>很遗憾，你未中奖</h3><p class="win-info">分享至朋友圈可增加一次抽奖机会呦</p>';
				            break;
						case 1:
						    prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">奖励已存入<a style="color:#f00" href="my_coupon.html">我的奖品</a><br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
				        case 2:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">奖励已存入<a style="color:#f00" href="my_coupon.html">我的奖品</a><br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 3:
							prompt = '<h3>恭喜您获得<br>'+second_message+'</h3><p class="win-info">奖励已存入<a style="color:#f00" href="my_coupon.html">我的奖品</a><br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 5:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">奖励已存入<a style="color:#f00" href="my_coupon.html">我的奖品</a><br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 6:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">奖励已存入<a style="color:#f00" href="my_coupon.html">我的奖品</a><br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 7:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">奖励已存入<a style="color:#f00" href="my_coupon.html">我的奖品</a><br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						
				    }
				    
				    return prompt;
				}

				$('#turntable_img').rotate({
						duration : 3000,
						angle : 0, 
						animateTo :1440 + turntable,
						easing : $.easing.easeOutSine,
						callback : function(){
			
							if(data.times === 0){
								var thisMsg = thePrize(data.message); //调用公共方法，返回文字提示
								var html = thisMsg;
								setTimeout(function(){
									jShare(html,"");
									var url="http://www.baidu.com";
									var exchange = '<a id="exchange_btn">不了，谢谢</a>';
									$('#popup_panel').append(exchange)
									$('#popup_ok').html('分享多一次');
									animateing = 1;
								},500);
								
								$('div#popup_container').addClass('success');
								
							}
							
						}
						
				 });
			}
		});
	};
	
	
	$('.share-btn').click(function(){
		$('.rule-box').show();
	});
	
	$('.close-btn').click(function(){
		$('.mask').hide();
	});
	
	
	$('body').delegate('#exchange_btn','click',function(){
		console.log(1);
		$('#share2').show();
		
	});

	
});