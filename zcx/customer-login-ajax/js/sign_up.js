$(function () {
	    
		
		//上传身份证正面
		new uploadPreview({ 
			UpBtn: "idcard-1", 
			DivShow: "file-list", 
			ImgShow: "imgShow1",
			Width:180, 
			Height:130,
			callback: function() {
		       $('#file-list').show();
		 	}
		 });
		 
		 //上传身份证反面
		new uploadPreview({ 
			UpBtn: "idcard-2", 
			DivShow: "file-list2", 
			ImgShow: "imgShow2",
			Width:180, 
			Height:130,
			callback: function() {
		       $('#file-list2').show();
		 	}
		 });
		
		
		//输入框提示文字
		$('.prompt-input').placeHolder({
			defStyle: {color: "#fff",fontSize:"13px", left: "10px", top: 0, display:"block"},
			focStyle: {color: "#fff",display:"none"}
		});

		
		//change language
		$('.login-logo-lang').click (function () {
			$('.logo-lang-content').toggle();
			$('.login-logo-lang').toggleClass('active');
		});

		//获取验证码
		var RegExp = /^1\d{10}$/;
		$('.ipt-identify-code').click(function () {
			if ($('#phoneNum').val() == '') {
				popTip('请输入手机号码');
			} else if (!(RegExp.test($('#phoneNum').val()))) {
				popTip('手机号码格式有误');
			} else {
				$.ajax({
					type: "post", 
					url: '', 
					data: {phone:$("#account").val()},
					dataType: "json",
					cache:false, 
					async:false, 
					success: function(data){
						if(data.code == 0){
							var timestamp = 60;;
							var timeSet = setInterval(function () {
								timestamp--;
								$('.ipt-identify-code').html('剩余时间'+timestamp+'s');
								$('.ipt-identify-code')[0].disabled = true;
								if (timestamp <= 0) {
									$('.ipt-identify-code').html('发送验证码');
									$('.ipt-identify-code')[0].disabled = false;
									clearInterval(timeSet);
								}
							},1000)
						}
					},
					error: function (data) {
						alert('error');
					}
				});
			}
		});
		
		//注册提交验证
		$('.sign-up-submit').click(function (e) {
			  e.preventDefault();
			  //var mobileRex = /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;  //手机号正则
			  var mobileRex = /^1\d{10}$/  //手机号正则
			  var passwordRex = /^.{5,25}$/;  //密码正则
			  var smsCodeRex = /^\d{4,6}$/;     //验证码
			  var cnCodeRex = /^[\u4e00-\u9fa5]{0,}$/;  //输入内容为中文
			  var emailRex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;  //邮箱正则
              var identifyRex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
			  var bankNumRex = /^\d{16}|\d{19}$/    //银行卡号
			  
			  var case1 = $('#name').val().length;
			  var case2 = $('#sex').val().length;
			  var case3 = $('#email').val().length;
			  var case4 = $('#identify').val().length;
			  var case5 = $('#area').val().length;
			  var case6 = $('#referee').val().length;
			  var case7 = $('#bankNum').val().length;
			  var case8 = $('#bankName').val().length;
			  var case9 = $('#phoneNum').val().length;
			  var case10 = $('#phoneCode').val().length;
			  var case11 = $('#idcard-1').val().length;
			  var case12 = $('#idcard-2').val().length;
			
			  if(!case1){
				popTip('请输入姓名');
				return false;
			  }
			  if(!case2){
				popTip('请输入性别');
				return false;
			  }
			  if($.trim($('#email').val()) == ""){
				popTip('请输入邮箱');
				return false;
			  }else if(!emailRex.test($.trim($('#email').val()))){
				  popTip("邮箱格式错误");
				  return false;
			  }
			  if($.trim($('#identify').val()) == ""){
				popTip('请输入身份证号码');
				return false;
			  }else if(!identifyRex.test($.trim($('#identify').val()))){
				  popTip("身份证格式错误");
				  return false;
			  }
			  if(!case5){
				popTip('请输入地区');
				return false;
			  }
			  /*if(!case6){
				popTip('请输入推荐人');
				return false;
			  }*/
			  if($.trim($('#bankNum').val()) == ""){
				popTip('请输入银行卡号');
				return false;
			  }else if(!bankNumRex.test($.trim($('#bankNum').val()))){
				  popTip("银行卡号格式错误");
				  return false;
			  }
			  if(!case8){
				popTip('请完整输入银行名称');
				return false;
			  }
			  if($.trim($('#phoneNum').val()) == ""){
				popTip('请输入手机号');
				return false;
			  }else if(!mobileRex.test($.trim($('#phoneNum').val()))){
				  popTip("手机号码格式错误");
				  return false;
			  }
			  if($.trim($('#phoneCode').val()) == ""){
				popTip('请输入验证码');
				return false;
			  }else if(!smsCodeRex.test($.trim($('#phoneCode').val()))){
				  popTip("验证码格式错误");
				  return false;
			  }
			  if(!case11){
				popTip('请上传正面身份证');
				return false;
			  }
			  if(!case12){
				popTip('请上传反面身份证');
				return false;
			  }

			  popTip('提交成功');
			  setTimeout(function(){
				//用form提交信息
			  	$('#sign_form').submit();
				
			  },3000);

		});
		
		
		//错误提示
		function popTip(msg){
			$('.popup-inner').html(msg);
			$(".popup").animate({right: 20,opacity: 1}, "500", 'swing');
			setTimeout(function(){
				$(".popup").animate({right:-300,opacity:0.5}, "500", 'swing');
			},2000);
		}; 


		// 全球主要国家城市联动
		var urlGlobal = 'js/globalData.min.json';
		$('#global_location').cxSelect({
			url: urlGlobal,
			selects: ['country', 'state', 'city', 'region'],
			emptyStyle: 'none'
		});

			
			
});			
			
			
			
		