$(function(){
	
	//选择收货地址
	var addrTxt,thisCon,content,that,obj,title,prev,thatDl;
	$("#select_area").click(function(){
		$("#area_overlay").height($(document).height());
		$("#area_overlay, #area_layer").show();
		addrTxt = [];
		return false;
	});
	
	$("#area_layer dd a").click(function(){
		
		that = $(this);			
		prev = $(".prev_btn");
		obj = $("#area_layer dd  a");			
		title = $("#area_layer h3")
		content = $("#area_layer dl");
		thisCon = that.closest("dl");
		
		obj.removeClass("cur");	
		that.addClass("cur");
		thatDl = thisCon
			
		//选择结果
		addrTxt.push(that.text());
		setTimeout(function(){
			
			if(thisCon.next("dl").length > 0){
				prev.show(); // 返回上一级
				content.hide();
				thisCon.next("dl").show();
				title.html(thisCon.next("dl").attr("title"));
				
			}else{
				//返回初始状态
				content.hide();
				$("#area_overlay, #area_layer,.prev_btn").hide();
				$("#area_layer dl:first").show();
				title.html($("#area_layer dl:first").attr("title"));
								
				$("#select_area").text(addrTxt.join(" "));				
			}
			
		}, 300);
		return false;
		
	});
	
	//返回上一级	
	$(".prev_btn").click(function(){		
		setTimeout(function(){				
			addrTxt.pop();
			content.hide();
			thatDl.show();
			thatDl.find("a").removeClass("cur");
			title.html(thatDl.attr("title"));
			thatDl = thatDl.prev("dl");
			if(title.html() == "省份"){	
				$(".prev_btn").hide();
			}	
		}, 300);
		return false;
		
	});

	//收货地址的弹层关闭
	$(".close_btn, #area_overlay").click(function(){
		$("#area_layer, #area_overlay").hide();
		$("#area_layer h3").show().html("省份");
		$("#area_layer").find("dl").eq(0).show().siblings("dl").hide();
		$("#area_layer dd a").removeClass("cur");
	});

	//点击保存按钮时验证输入内容是否正确
	$(".address-submit-btn").click(function(){
		var re = /^[\u4e00-\u9fa5]$/,
			mre = /^1\d{10}$/;
	
		//收货人姓名
		//if ($.trim($("#J_userName").val()) == "" || !re.test($("#J_userName").val())){
		if ($.trim($("#J_userName").val()) == ""){
			return jShare('请填写正确中文名称',"",""),
			$("#J_userName").addClass("error"),
        	!1;
		}else{
			$("#J_userName").removeClass("error");
		}
		
		//收货人电话
        if ($.trim($("#J_mobileNum").val()) == "" || !mre.test($("#J_mobileNum").val())){
			return jShare('请输入正确手机号码',"",""),
			$("#J_mobileNum").addClass("error"),
        	!1;
		}else{
			$("#J_mobileNum").removeClass("error");
		}
		
		//收货人地址
		if ($.trim($("#J_addr").val()) == ""){
			return jShare('请输入详细地址',"",""),
			$("#J_addr").addClass("error"),
        	!1;
		}else{
			$("#J_addr").removeClass("error");
		}

		//location.href="ordered.html"
		$('.js-add-address-box').hide();
		$('.js-my-address-box').hide();
		$('.order-box').show();

	});

	//删除商品
	$(".js-delete-ads-btn").click(function(){
		var $this = $(this);
		$.getScript('js/plugin/j.appDialogs.js',function(){
			
			jShare("确定要删除此地址吗？","",function(result){
				if(result===true){
					$this.parents(".my-address-list").remove();
				}
			});
			return false;
		});
		
		
		
	});
	
	$('.select-sex span').click(function(){
		$(this).addClass("cur").siblings().removeClass("cur");	
	});
	
	$('.agreement').click(function(){
		$(this).find('em').toggleClass('cur');
	});
	
	
	//订单页面点击地址处触发相应方法
	$('.js-addr-btn').click(function(e){
		e.preventDefault();
		$('.order-box').hide();
		if($(this).hasClass('selected')){
		  $('.js-add-address-box').hide();
		  $('.js-my-address-box').show();
		}else{
		  $('.js-my-address-box').hide();
		  $('.js-add-address-box').show();
		}
	});
	
	//点击地址列表用户名和地址信息时触发的方法
	$('.my-address-list>.user-info,.my-address-list>p').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var user_name = $(this).parent().find('.user-info span').text();
		var user_phone = $(this).parent().find('.user-info em').text();
		var user_address = $(this).parent().find('p').text();
		$('.selected.js-addr-btn em').text(user_name);
		$('.selected.js-addr-btn .phone').text(user_phone);
		$('.selected.js-addr-btn small').text(user_address);
		
		$('.js-my-address-box').hide();
		$('.js-add-address-box').hide();
		$('.order-box').show();
	});
	
	//点击地址列表编辑按钮和新增地址按钮
	$('.js-change-ads-btn,.js-add-ads-btn').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.order-box').hide();
		$('.js-my-address-box').hide();
		$('.js-add-address-box').show();
		$.getScript('js/plugin/j.dialogs.js');
	});
	
	
	
	
	//设置默认地址
	$('.my-address-box').on('click','.set-ads-btn',function(e){
		
		e.preventDefault();
		e.stopPropagation();
		$(this).addClass('cur').parents('.my-address-list').siblings().find('.cur').removeClass("cur").html('设置成默认地址');
		$(this).html('默认地址');
	});

	

});