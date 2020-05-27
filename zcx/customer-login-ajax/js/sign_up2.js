$(function () {

	//弹出提示框begin
	if (!(!!window.ActiveXObject || "ActiveXObject" in window)) {
		
		var msg = $('.msg-hidden').text();
		if (msg != '') {
			clearInterval();
			var li = document.createElement('li');
			li.setAttribute('class', 'popup-inner');
			li.innerHTML = msg;
			$('.popup').append(li);
			$(".popup-inner").animate({right: 300}, "500", 'swing');
			$(".popup-inner").animate({opacity: 1}, "500", 'swing');
			setTimeout(function () {
				intervalHide();
			}, 2000);
		}
	} else {
		//IE浏览器下，弹出框的位置改变
		$('.popup').css('right', '30px');
		//阻止默认事件

		var msg = $('.msg-hidden').text();
		if (msg != '') {
			var li = document.createElement('li');
			li.setAttribute('class', 'popup-inner');
			li.innerHTML = msg;
			$('.popup').append(li);
			setTimeout(function () {
				intervalHide();
			}, 2000);
		}
	}

	function stopDefault(event) {
		var ev = event || window.event;
	    // 阻止默认浏览器动作(W3C)
	    if (ev && ev.preventDefault) {
	        ev.preventDefault();
	    } else {
	        // IE中阻止函数器默认动作的方式
	        window.event.returnValue = false;
	    }
	    return false;
	}
	function intervalHide () {
		clearTimeout(timer1);
		clearTimeout(timer2);
		var timer1 = setTimeout(function () {
			$('.popup-inner').eq(0).slideUp(500);
		}, 500);
		var timer2 = setTimeout(function () {
			$('.popup').find('.popup-inner').first().remove();
		}, 1000);
	}

	function popTip(msg){
		
		if (!(!!window.ActiveXObject || "ActiveXObject" in window)) {
			
			clearInterval();
			var li = document.createElement('li');
			li.setAttribute('class', 'popup-inner');
			li.innerHTML = msg;
			$('.popup').append(li);
			$(".popup-inner").animate({right: 300}, "500", 'swing');
			$(".popup-inner").animate({opacity: 1}, "500", 'swing');
			setTimeout(function () {
				intervalHide();
			}, 2000);
		} else {
			//IE浏览器下，弹出框的位置改变
			$('.popup').css('right', '30px');
			//阻止默认事件

			var li = document.createElement('li');
			li.setAttribute('class', 'popup-inner');
			li.innerHTML = msg;
			$('.popup').append(li);
			setTimeout(function () {
				intervalHide();
			}, 2000);
		}
		
	};
	
		/*
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
		 });*/

		 
		 $('#idcard-1').change(function () {
		 	var fileInfo = $('#idcard-1').val();
		 	if(fileInfo.length>0){
			  $('#file-list').html(fileInfo);
			}
		});

		 $('#idcard-2').change(function () {
		 	if(fileInfo.length>0){
			  $('#file-list2').html(fileInfo);
			}
		});



		var codeVerify = false;
		$('#mpanel1').codeVerify({
			//常规验证码type=1， 运算验证码type=2
			type : 1,
			width : '100px',
			height : '40px',
			fontSize : '16px',
			codeLength : 4,
			btnId : 'check-btn',
			ready : function() {
			},
			success : function() {
				console.log('验证匹配！');
				codeVerify = true;
			},
			error : function() {
				console.log('验证码不匹配！');
				codeVerify = false;
			}
		});
		
		
		//输入框提示文字
		$('.prompt-input').placeHolder({
			defStyle: {color: "#929292",fontSize:"13px", left: "10px", top: 0, display:"block"},
			focStyle: {color: "#666",display:"none"}
		});

		
		//change language
		$('.login-logo-lang').click (function () {
			$('.logo-lang-content').toggle();
			$('.login-logo-lang').toggleClass('active');
		});

		//获取验证码
		var RegExp = /^1\d{10}$/;
		$('.ipt-identify-code').click(function () {
			if ($('#phoneNum').val() === '') {
				popTip('请输入手机号码');
			} else if (!(RegExp.test($('#phoneNum').val()))) {
				popTip('手机号码格式有误');
			} else {
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
				$.ajax({
					type: "post", 
					url: 'srs', 
					data: {phone:$ ("#phoneNum").val(), name: $("#name").val()}
				})
				  .done(function (data) {
					  var dataObj = eval("(" + data + ")");
					  popTip(dataObj.msg);
				  })
				  .fail(function (data) {
					  popTip("error");
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
			  var emailRex = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9._-])+(.[a-zA-Z0-9_-])+/;  //邮箱正则
              var identifyRex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
			  var bankNumRex = /^\d{16}|\d{19}$/    //银行卡号
			  
			  var case1 = $('#name').val().length;
			  var case3 = $('#email').val().length;
			  var case5 = $('#area').val().length;
			  var case6 = $('#referee').val().length;
			  var case7 = $('#password').val().length;
			  var case8 = $('#passwordSure').val().length;
			  var case9 = $('#phoneNum').val().length;
			  var case10 = $('#phoneCode').val().length;

			  if(!codeVerify){
				popTip('请正确输入图形验证码');
				return false;
			  }
			  if(!case1){
				popTip('请输入姓名');
				return false;
			  }
			  if(!case5){
				popTip('请输入地区');
				return false;
			  }
			  if($.trim($('#email').val()) == ""){
				popTip('请输入邮箱');
				return false;
			  }else if(!emailRex.test($.trim($('#email').val()))){
				  popTip("邮箱格式错误");
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
				popTip('请输入手机验证码');
				return false;
			  }else if(!smsCodeRex.test($.trim($('#phoneCode').val()))){
				  popTip("手机验证码格式错误");
				  return false;
			  }

			  if(!case7){
				popTip('请输入密码');
				return false;
			  }

			  if(case7!= case8){
				popTip('两次密码不相同');
				return false;
			  }

			  if(!case6){
				popTip('请输入邀请码');
				return false;
			  }

			  if (!$(".privacy-policy-checkbox").is(":checked")) {
				  popTip('请同意用户协议书和风险协议书');
				  return false;
			  }
			  
				//用form提交信息
			//   $('#sign_form').submit();
			  $('.loading').show();
			  $.ajax({
				type: "GET",
				//async: false,
				url: "a.json",
				data: {
					username:$('#name').val(), 
					country:$('#area').val(),
					email:$('#email').val(),
					areaCode:$('#area-code').val(), 
					phoneNum:$('#phoneNum').val(),
					actType:$('#actType').val(),
					leveage:$('#leveage').val(),
					password:$('#password').val(),
					referee:$('#referee').val()
				},
				dataType: "json",
				success: function (data) {
					$('.loading').hide();
					popTip('注册成功');
				},
				error:function(){
					$('.loading').hide();
					popTip('注册失败');
				}
			});
				

		});
		
		// 全球主要国家城市联动
		var urlGlobal = 'js/globalData.min.json';
		$('#global_location').cxSelect({
			url: urlGlobal,
			//selects: ['country', 'state', 'city', 'region'],
			selects: ['country'],
			emptyStyle: 'none'
		});
		
		
		$(function () {
    		$('.country').on("change", function () {
    			if($(this).val() === "中国") {
    				$("#area-code").val("086");
    				$("#area-code").parent().find("label").hide();
    			}
    			
    			if($(".state").val() === "香港特别行政区") {
    				$("#area-code").val("852");
    				$("#area-code").parent().find("label").hide();
    			}

    			if($(this).val() === "英国") {
    				$("#area-code").val("044");
    				$("#area-code").parent().find("label").hide();
    			}
    		});
    		
    		$('.state').on("change", function () {
    			if($(this).val() === "香港特别行政区") {
    				$("#area-code").val("852");
    				$("#area-code").parent().find("label").hide();
    			}
    		});
    		$(".user-agreement").click(function () {
    			$('.privacy-policy-mask').hide();
    			$('.privacy-policy-pop').hide();
    			$(".privacy-policy-checkbox").prop("checked", "checked");
       		});
        });

			
});			
			
			
			
		