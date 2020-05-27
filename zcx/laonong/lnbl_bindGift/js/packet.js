$(function(){
	
	
	function MobileErrorTip() {
		$(".prompt").css({height:'20px',marginTop:'10px'});
		$(".prompt").html("请输入正确手机号");
		$("#J_yzm").removeClass('error');
		//$("#J_graphicsCode").removeClass('error');
		$("#J_mobileNum").addClass('error');
	};
	
	function yzmErrorTip() {
	  $(".prompt").html("验证码输入不正确");
	 $(".prompt").css({height:'20px',marginTop:'10px'});
	  $("#J_mobileNum").removeClass('error');
	  //$("#J_graphicsCode").removeClass('error');
	  $("#J_yzm").addClass('error');
	 
	};
	
	
	function removeErrorTip(){
	  $(".prompt").html("");
	  $(".prompt").css({height:'0',marginTop:'0'});
	  $("#J_mobileNum").removeClass('error');
	  $("#J_yzm").removeClass('error');
	  //$("#J_graphicsCode").removeClass('error');
	}
	//点击领取按钮时验证输入内容是否正确
	var isMobile=/^1\d{10}$/; //手机号码验证规则
	$(".js-start-btn").click(function(){
		if ($.trim($("#J_mobileNum").val()) == "" || !isMobile.test($("#J_mobileNum").val())){
			MobileErrorTip();
			return;
		};	
		if ($.trim($("#J_yzm").val()) == ""){
			yzmErrorTip();
			return;
		};
		/*if($('.graphics-code').height()==40){
		  if ($.trim($("#J_graphicsCode").val()) == ""){
			  graphicsCodeErrorTip();
			  return;
		  };
		};*/
		removeErrorTip();
		window.location.href = "sucess.html";
		return;		
	});	
	
	
	//判断手机输入框内容长度
	$("#J_mobileNum").on("keyup", function(){
		var len = $(this).val().length;
		if(len == 11){
			$(this).blur();
		}
	});
	$("#J_yzm").on("keyup", function(){
		var len = $(this).val().length;
		if(len == 6){
			$(this).blur();
		}
	});
	/*$("#J_graphicsCode").on("keyup", function(){
		var len = $(this).val().length;
		if(len == 4){
			$(this).blur();
		}
	});*/
	
		
	//获取验证码
	var flag = 0;
	var isS = 0;//true; //是否领过
	$("#passwordGetCode").click(function() {
		
		if(isS){
			popBox();
			return;	
		}
	
		if ($.trim($("#J_mobileNum").val()) == "" || !isMobile.test($("#J_mobileNum").val())){
			MobileErrorTip();
			return;
		}else{			
			removeErrorTip();
		}
		
		if(flag!=0){
			return false;
		}
		
		flag = 1;
		var delay = 2, trigger = this, revert = $(trigger).text();
		//obtainCode();
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
	
	//领过弹出层
	function popBox(){
		$('#popup_message').html("您已经领过了");
		//$('#popup_overlay').show();
		$('#popup_container').show();
		setTimeout(function(){
			//$('#popup_overlay').hide();
			$('#popup_container').hide();
		},2000);
	}
	
	
	$("#popup_overlay").click(function(){
		$('#popup_overlay').hide();
		return false;
	});
	
	
	
	
});