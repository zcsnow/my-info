$(function(){
	
	$(".tab_info").find("li").click(function(){
		var $thisIndex = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".content_info").find(".content_list").eq($thisIndex).show().siblings().hide();
	});
	
	
	var second_message;
	var animateing = 1;	//转动时定时器
	$("#turntable_btn").click(function(){
		if(animateing===1){
			spRotate();
		}
			
	});	

	var spRotate = function(){		
		$.ajax({
			type: "GET",
			url: "data/lottery.txt?4",
			data: "",
			success: function(data){
				animateing = 0;
				var data = $.parseJSON(data);

				if(data.times === 0){
					var html = '<h3>很遗憾，你未中奖！</h3><p class="win-info">您的抽奖机会已经使用完了</p>';
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
					  second_message="苹果笔记本电脑";
					  break;
					case 2:
					  second_message="Apple Watch";
					  break;
					case 3:
					  second_message="京东礼品卡";
					  break;
					case 4:
					  second_message="索尼音响";
					  break;
					case 5:
					  second_message="无线鼠标套盘";
					  break;
					case 6:
						second_message="16GU盘";
						break;
					case 7:
						second_message="无线鼠标";
						break;
					case 8:
					  second_message="10元话费充值";
					  break;
					default:
					  break;
				  }
				
				//判断几等奖显示什么
				function thePrize(prize){
					var prompt= "";
					switch(prize) {
						case 1:
						    prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">只需用K码支付一分钱可兑换奖品哦！<br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
				        case 2:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">只需用K码支付一分钱可兑换奖品哦！<br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 3:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">只需用K码支付一分钱可兑换奖品哦！<br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 4:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">只需用K码支付一分钱可兑换奖品哦！<br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 5:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">只需用K码支付一分钱可兑换奖品哦！<br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 6:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">只需用K码支付一分钱可兑换奖品哦！<br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 7:
							prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">只需用K码支付一分钱可兑换奖品哦！<br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
				        	break;
						case 8:
				            prompt = '<h3>恭喜您获得'+second_message+'</h3><p class="win-info">只需用K码支付一分钱可兑换奖品哦！<br /></p><p class="remainder-times">今日你还有'+ data.times +'次抽奖机会</p>';
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
			
							if(data.status === 2){
								var thisMsg = thePrize(data.message); //调用公共方法，返回文字提示
								var html = thisMsg;
								setTimeout(function(){
									jShare(html,"");
									var url="http://www.baidu.com";
									var exchange = '<a href='+url +' id="exchange_btn">立即兑换</a>';
									$('#popup_panel').append(exchange)
									$('#popup_ok').html('稍后兑换');
									animateing = 1;
								},500);
								
							}
							
						}
						
				 });
			}
		});
	};
	
	
	$('.share-btn').click(function(){
		$('.rule-box').show();
	});
	$('.rule-box').click(function(){
		$('.rule-box').hide();
	});
	
	$('.coupons-box li').click(function(){
		var msg = $(this).attr('data-msg');
		var couponNum = $(this).attr('data-num');
		$(".coupon-msg").html(msg);
		$(".coupon-num").html(couponNum);
		$('.mask').show();
	});
	
	$('.close-btn').click(function(){
		$('.mask').hide();
	});

	
});