$(document).ready(function(){
	var isLogin;
	function initInfo(){
		 $.ajax({
			type: "GET",
			async:true,
			url: "data/member.txt?4",
			data: "",
			success: function (data) {
				var data = $.parseJSON(data);
				isLogin = data.IS_LOGIN; //是否登录
				var carno = data.CARNO;      //会员id
				var isOwner = data.ISOWNER;  //是否是车主
				var userName = data.USERNAME;//用户名
				var custName = data.CUSTNAME;//姓名
				var mobile = data.MOBILE;    //手机号
				var userTimes = data.Times;  //抽奖次数
				 console.log(isLogin);
				if(!isLogin){//未登录
				  $('.popp-msg').html("注册并登录会员平台后<br>进入抽奖页面");
				  $('.mask').show();
				  $('.pop-box').show();
				  return false;
				}
				
				$('.user-name').html(userName);
				$('.times-num').html(userTimes);
				
			   
			}
		  });
	
	}
	initInfo();
	
	
	//二维码
    $('.js-ewm').on('click', function (e) {
		 e.stopPropagation();
        $('.ewm').show();
    });
	
	// 关闭二维码
    $('body').on('click', function (e) {
        e.stopPropagation();
        $('.ewm').hide();
		
    });

    
	// 关闭弹层
    $('.pop-submit-btn').on('click', function (e) {
        e.stopPropagation();
        $('.mask').hide();
        $('.pop-box').hide();
		if(!isLogin){
		   window.location.href="http://www.baidu.com";
		}
    });
	
    // 关闭弹层
    /*$('.info-pop-box .close-btn,.mask').on('click', function (e) {
        e.stopPropagation();
        $('.mask').hide();
        $('.info-pop-box').hide();
    });*/
	
	//奖品轮播图
	var winList1 = new Swiper('#winList1',{
	  autoplay : 3000,
	  loop : true,
	  mode: 'vertical',
	  slidesPerView: 3
	})
	//奖品轮播图
	var winList2 = new Swiper('#winList2',{
	  autoplay : 3000,
	  loop : true,
	  mode: 'vertical',
	  slidesPerView: 3
	})
	
	//中奖人员滚动列表
	var AutoRoll = function(){
		$(".lottery_list").animate({
			marginTop:"-24px"
		},500,function(){
			$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
		});
	};
    var startRoll = setInterval(AutoRoll,3000);
	
	
	//老虎机抽奖流程
	var initNum1=2,initNum2=3,initNum3=0;
	var stopNum1=1,stopNum2=1,stopNum3=2;
	var isClick = true;
	var machine1 = $("#machine1").slotMachine({
		active	: initNum1,
		delay: 500,
		randomize: function(){
			return stopNum1;
		}
	});
	
	var machine2 = $("#machine2").slotMachine({
		active	: initNum2,
		delay: 500,
		randomize: function(){
			return stopNum2;
		}
	});
	
	var machine3 = $("#machine3").slotMachine({
		active	: initNum3,
		delay: 500,
		randomize: function(){
			return stopNum3;
		}
	});
	
	
    function onComplete(active){
		switch(this.element[0].id){
			case 'machine1':
				//$("#machine1Result").text("Index: "+this.active);
				break;
			case 'machine2':
				//$("#machine2Result").text("Index: "+this.active);
				break;
			case 'machine3':
				//$("#machine3Result").text("Index: "+this.active);
				break;
		}
	}
	
	var winTxtArr=['雷诺运动水壶','云伴远程视频车','手提行李包','运动手环','iPhone6s','2000元旅游基金','雷诺泰迪熊','雷诺车型U盘'];
	var userTimes = 2;
	//点击抽奖按钮
	$("#slotMachineButton").click(function(){
		if(isClick){
		$.ajax({
			type: "GET",
			url: "data/lottery.txt?5",
			data: "",
			success: function(data){
				var data = $.parseJSON(data);
				//var userTimes = data.times;  //抽奖次数
				  //抽奖次数
				if(userTimes<1){
					$('.popp-msg').html("您的抽奖机会已用完");
					$('.mask').show();
					$('.pop-box').show();
					return false;
				}
				userTimes --;
				$('.times-num').html(userTimes);
				$('.win-box').removeClass('visible').addClass('hidden');
				stopNum1 = data.stopNum1;
				stopNum2 = data.stopNum2;
				stopNum3 = data.stopNum3;
				//stopNum1 = Math.floor(Math.random()*8);

				isClick=false;
				

				machine1.shuffle(2);
				setTimeout(function(){
					machine2.shuffle(2);
				}, 2000);						
				setTimeout(function(){
					machine3.shuffle(2);									
				}, 4000);
				setTimeout(function(){
					if((machine1._active==machine2._active)&&(machine1._active==machine3._active)){
						$('.win-box').html("");
						console.log();
						 var winHtml = '<p class="win-img"><img src="img/img'+(machine1._active+1)+'.png"></p>';
							 winHtml +='<div class="win-txt">';
							 winHtml +='<h3>恭喜您获得</h3>';
							 winHtml +='<p>'+winTxtArr[machine1._active]+'</p>';
							 winHtml +='</div>';
						 $('.win-box').html(winHtml);
						 $('.win-box').removeClass('hidden').addClass('visible');
						 
						 setTimeout(function(){
							 $('.mask').show();
							 $('.info-pop-box').show();
							 isClick=true;
						 },1500);
					}else{
						$('.win-box').html("");
						var noWinHtml = '<div class="no-win-txt">';
							noWinHtml +='<h3>很遗憾此次未中奖</h3>';
							noWinHtml +='<a href="">前往积分商城，缤纷好礼积分换取<i><img src="img/hand_icon.png" ></i></a>';
							noWinHtml +='</div>';
						$('.win-box').html(noWinHtml);
						$('.win-box').removeClass('hidden').addClass('visible');
						isClick=true;
						
					}
				},6000);
			}
		});
		
		}
	
	});
	
	
	$("#form").validate({
		  //自定义验证规则
		  rules:{
			  name: {required: true},
			  phone: {required: true,}, 
			  address: {required: true,}, 
		  },
		  messages : {
			 name : {required : "请填写姓名"},
			 phone : {required : "请输入正确手机号"},
			 address : {required : "请填写地址"},
		  },
		  //错误信息提示
		  errorPlacement:function(error,element){
			  error.appendTo(element.parent().next(".error_tip"));
		  } 
	  }); 
     
	  $(".btn-submit").click(function (e) {
		  e.preventDefault();
		  if ($("#form").valid()) { 
		  console.log(1);
			  var userinfo =
			  {
				  username: encodeURI($("#name").val()),
				  phone: $("#phone").val(),
				  address: $("#address").val(),
			  };
			  var con="username="+userinfo.username+"&phone="+userinfo.phone+"&address="+userinfo.address;
			  //var reslt = $.ajax({ url: "Common/MemberRegister.ashx?"+con, async: false });
			  //var jieguo = JSON.parse(reslt.responseText); 
              //if(jieguo.code==1){
			      popTip('提交成功');
				  $('.mask').hide();
                  $('.info-pop-box').hide();
              //}else
              //{
                   // popTip(jieguo.msg);
              //}
		  }
	  });
	
	
	 function popTip(msg){
		  $('.pop-tip-msg').html(msg);
		  $('.pop-tip-box').show();
		  setTimeout(function(){
			  $('.pop-tip-box').hide();
		  },2000);
	  }; 
	
	
	
});