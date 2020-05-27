;$(function(){

//点击导航按钮
$('.js-bar-btn').click(function(e){
	$('.js-nav-box').stop().slideToggle();
	$(document).one("click", function(){
        $('.js-nav-box').slideUp();
    });
    e.stopPropagation();
});


//tab切换
$(".js-tab-menu").find("li").click(function(){
	var $this = $(this);
	var $thisIndex = $this.index();
	$(this).addClass("curr").siblings().removeClass("curr");
	$(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
});



$('.js-download-btn').on('click',function(){
	var downUrl = $(this).parent().attr('data-url');
    $("#emailurl").val(downUrl);
	$('.download-pop').show();
});
$('.js-close-btn').on('click',function(){
	$('.download-pop').hide();
});


	if($(".sign-box").length>0){
		$("#form").validate({
		  //自定义验证规则
			rules:{
				phone: {
					required: true,
					isMobile : true
				},
				psw: {
					required: true,
					minlength: 6
				},
			},
			errorPlacement:function(error,element){
				error.appendTo(element.parent().next(".error_tip"));
			} 
		}); 
		var PhoneMessage = '请输入正确手机号';
		// 手机号码验证
		$.validator.addMethod('isMobile', function( value, element ){
			var length = value.length;
			var mobile = /\d{11}$/; 
			if(this.optional(element) || (mobile.test(value))){
				  return true;
			}else{
			  PhoneMessage="请输入正确手机号";
			}
		}, PhoneMessage);
		
		$.validator.addMethod("isEng", function(value, element) {
			var eng = /^[A-Za-z]+$/;
			return this.optional(element) || (eng.test(value));
		}, "请正确填写内容");
	 }
	 
	  //登录提交按钮
	  $(".sign-btn-submit").click(function (e) {
		  e.preventDefault();
		  if ($("#form").valid()) { 
			  var userinfo =
			  {
				  phone: $("#phone").val(),
				  pwd: $("#psw").val(),
			  };
			  setTimeout(function(){
				  window.location.href="index.html?time=" + new Date().getTime();
			  },2000); 

		  }
	  }); 
	  
	  //注册提交按钮
	  $(".register-btn-submit").click(function (e) {
		  e.preventDefault();
		  if ($("#form").valid()) { 
			  var userinfo =
			  {
				  phone: $("#phone").val(),
				  pwd: $("#psw").val(),
			  };
			  popTip('注册成功');
			  setTimeout(function(){
				  window.location.href="index.html?time=" + new Date().getTime();
			  },2000); 
		  }
	  }); 
	  
	  //忘记密码提交按钮
	  $(".forget-btn-submit").click(function (e) {
		  e.preventDefault();
		  if ($("#form").valid()) { 
			  var userinfo =
			  {
				  phone: $("#phone").val(),
				  pwd: $("#psw").val(),
                  yzm:$('#J_yzm').val(),
			  };
			  popTip('修改成功');
			  setTimeout(function(){
				  window.location.href="index.html?time=" + new Date().getTime();
			  },2000); 
              
		  }
	  }); 
	  
	  
	  
	//获取验证码
	var flag = 0;
	var isS = 0;//true; //是否领过
	$("#passwordGetCode").click(function() { 
		if(flag==0){
          var phone=$("#phone").val();   
		  var mobile = /\d{11}$/; 
		  if((mobile.test(phone))){
               /*var result = $.ajax({
			        type: "GET",
				    async: false,
				    url: baseUrl+"Member.aspx?op=smscode&codetype=0&phone="+phone,
				    dataType: "jsonp", //数据类型为jsonp  
				    jsonp: "callback", //服务端用于接收callback调用的function名的参数  
				    jsonpCallback: "info",
				    success: function (data) { 
			        }
		        }); */
            }else{
                 popTip("请输入正确手机号");
                 return;
             } 	
		} 
		if(flag!=0){
			return false;
		} 
		flag = 1;
		var delay = 60, trigger = this, revert = $(trigger).text();
		$("#passwordGetCode").addClass('btn_gradient_gray');
		$(trigger).attr({'disabled': true }).text(delay + $(trigger).attr("data-waiting")).parents("label").addClass("waiting");
		var counter = setInterval(function() {
			$(trigger).text($(trigger).text().replace(delay, --delay));
			if(delay == 0) {
				flag = 0;
				window.clearInterval(counter);
				$(trigger).text(revert).removeAttr("disabled").parents("label").removeClass("waiting");
				$("#passwordGetCode").removeClass('btn_gradient_gray');
				$("#passwordGetCode").html("重新获取");
				$("#passwordGetCode").addClass('recode');
			}
		}, 1000);
	});
	
	//点亮启辰
	var isStartLight = true;
	$(".star-light-btn").click(function (e) {
		if(isStartLight) { 
			window.location.href="star.html?time=" + new Date().getTime();
		}else{
			popTip('点亮启辰还没开启');
		}
	}); 
	
	
	$(".star-tip").click(function (e) {
		  $(this).hide();
		  $(".textarea").focus(); 
	});
	

	$(".light-btn").click(function (e) {
		$.ajax({
			type: "POST",
			url: "",         
			success: function(e){

			}
		});
		window.location.href="starList.html?time=" + new Date().getTime();

	});  
	
	
	$('.member-box').on('click','.delete-btn',function(e){
	  e.stopPropagation();
	  $(this).parent().remove();
	});

	
	
	
	

});

function popTip(msg){
	$('.pop-tip-msg').html(msg);
	$('.pop-tip-box').show();
	setTimeout(function(){
		$('.pop-tip-box').hide();
	},2000);
};

function check() { 
	var regC = /[^ -~]+/g; 
	var regE = /\D+/g; 
	var str = t1.value; 
	
	if (regC.test(str)){ 
		t1.value = t1.value.substr(0,30); 
	} 
	
	if(regE.test(str)){ 
		t1.value = t1.value.substr(0,60); 
	} 
} 

$(".textarea").keyup(function(){
   check();
});



