$(function(){	



	var screenWidth = window.innerWidth;  //获取屏幕宽度

	var halfWidth = Math.round(screenWidth/2);

	$('.slider-outer').width(halfWidth);

	$('.slider-wrap').find('li').width(halfWidth);

	

	//自动滑动事件

	var has3d = css3.has3d(),

		gv1 = has3d ? 'translate3d(' : 'translate(',

		gv2 = has3d ? ',0)' : ')',

		initLeft = 0;

	

	$(".slider-wrap").css({'-webkit-transform':gv1+initLeft+'px,0'+gv2, 'width':3*halfWidth});

	

	var $hammer = $('#hammer');

	$hammer.css('left',halfWidth/2+30);

	

	//砸蛋延时

	var mesgFn = function(message,title,callback,time){

		var setFn = function(){

			jShare(message,title,callback); 

			

		}

		setTimeout(setFn,time);

	}

	

	//新增自动滑动

	var sliderFn = function(){

		initLeft-= halfWidth;

		if(initLeft > -3*halfWidth){

			$(".slider-wrap").animate({'-webkit-transform':gv1+initLeft+'px,0'+gv2, 'width':3*halfWidth}, 600, function(){});

		}

	}

	

	var locked = 1; //加锁-防止连点

	$('#J_m-slider li a').bind('click',function(){

		

		var $this = $(this);

		

		if(locked && $this.attr('smashed')=="true"){

			locked = 0;

		}else{

			return false;

		}

		

		//获取数据

			$.ajax({

				type: "GET",

				url: "data/lottery.txt?" + new Date().getTime(),

				data: "",

				success: function(data){

					//数据处理

					

					/*var awards = data.awards || false,

						times = data.times;

					

					//如果有剩余次数

					if(times >= 0){

					*/

						mesgFn("弹出内容","弹出标题","",600);

					/*	

						

					}else{

						

						return false;

					}*/

					

					//新增自动滑动

					setTimeout(sliderFn,600);

					

					//砸动作动画

					var num = 1,

						setInterfun = setInterval(function(){

							$hammer.css('background-position',-80*num);

							num++;

							

							if(num == 4){

								clearInterval(setInterfun);

								$hammer.css('background-position','0 center');

								$this.find('img').css({

									'margin-top':'-180px'

								});

							}

					},100);

					

					//表示已砸

					$this.attr('smashed','false');

					

					//解锁

					locked = 1;

				}

			});

		/*砸蛋动画*/		

		

	});

	

	//提示层

	

	$(".setting_btn").click(function(){

		jShare("<p><em>奖项设置为</em><br>一等奖500元现金券<br>二等奖200元现金券<br>三等奖50元现金券<br>四等奖100元优惠券（满1000元可用）</p>","奖项设置","");

		return false;

	});

	

	$(".rule_btn").click(function(){

		jShare("<ul><li>1.每个会员每天砸蛋机会为3次；</li><li>2.抽中的现金券或优惠券会自动冲到您的个人账户中；</li><li>3.现金券或优惠券限2月9日前使用。</li></ul>","活动规则","");

		return false;

	});

	

	

});