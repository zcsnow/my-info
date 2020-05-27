$(function(){
	
	$('.js-get-invoice').click(function(){
		$(this).find('a').toggleClass('cur');
	});
	

	$('#yes').click(function(){
		$('.invoice').show();
		$('#no').removeClass("cur");	
		$(this).addClass("cur");
	});
	
	$('#no').click(function(){
		$('.invoice').hide();
		$('#yes').removeClass("cur");	
		$(this).addClass("cur");
	});


	//点击支付按钮时验证输入内容
	$(".js-payment-btn").click(function(e){
		//e.preventDefault();
		
		//地址
		/*if ($.trim($("#J_userName").val()) == ""){
			return jShare('请填写正确中文名称',"",""),
			$("#J_userName").addClass("error"),
        	!1;
		}else{
			$("#J_userName").removeClass("error");
		}*/
		
		$('.card-overlay').show();
		$('.card-pay-tip').show();
		

		
	});
	
	
	$('.js-order-delete-btn').click(function(e){
	 e.preventDefault();
	 var $this = $(this);
	 jShare("确定删除吗？","",function(result){
			if(result===true){
				window.location.href = "my_order.html";
			}
		});
    });
  


	$('.js-shop-card').on('click',function(){
		window.location.href = "card_select.html";
	});
	
	$('.js-card-ok-btn').on('click',function(){
		if ($.trim($("#J_yzm").val()) == ""){
			alert('验证码不能为空');
			return;
		};
		$('.card-overlay').hide();
		$('.card-pay-tip').hide();
		//window.location.href = "";
		alert('支付成功');
	});
	
	$('.js-card-close-btn').on('click',function(){
		$('.card-overlay').hide();
		$('.card-pay-tip').hide();
	});
	
	//获取验证码
	var flag = 0;
	$("#passwordGetCode").click(function() {
		if(flag!=0){
			return false;
		}
		flag = 1;
		var delay = 2, trigger = this, revert = $(trigger).text();

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

		
	
	
});