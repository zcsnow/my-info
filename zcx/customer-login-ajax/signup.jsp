<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.fx.global.UserGlobData" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.*" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>sign-up</title>
		<link rel="stylesheet" href="<%=basePath %>member/css/ie-layout.css" />
		<style type="text/css">
			html, body, ul, p {
				margin: 0;
				padding: 0;
				font-family: "微软雅黑", "宋体", "arial, helvetica, sans-serif";
			}
			a {
				text-decoration: none;
			}
			.popup {
				color: #fff;
				list-style: none;
				position: fixed;
				right: -270px;
				/*left: 100%;*/
				top: 20px;
				z-index: 8;
			}
			.popup-inner {
				position: relative;
				right: 0;
				font-size: 18px;
				font-weight: 700;
				width: 260px;
				height: 50px;
				line-height: 50px;
				padding-left: 30px;
				box-shadow: 0 0 5px #000;
				background-color: rgba(0, 0, 0, .7);
				border: 1px solid transparent;
				cursor: pointer;
				margin-bottom: 20px;
				opacity: .5;
				z-index: 2;
			}
			.popup-inner:hover {
				border: 1px solid #fff;
			}
			.sign-up-all {
				position: absolute;
				height: 100%;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: url(<%=basePath %>member/img/sign-up-bg.png) no-repeat scroll top left;
				background-size: cover;
			}
			.sign-up-wrap {
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -426px;
				margin-left: -376px;
				/*transform: translate(-50%, -50%);*/
				width: 754px;
				height: 852px;
				padding-top: 26px;
				background-color: rgba(4, 4, 4, .8);
			}
			.logo {
				width: 670px;
				padding-left: 60px;
				overflow: hidden;
				position: relative;
			}
			.logo-a {
				float: left;
			}
			.logo-p {
				position: absolute;
				right: 0;
				bottom: 0;
				color: #fff;
				font-size: 16px;
			}
			.logo-p-a {
				color: #007ac0;
			}
			.logo-p-img {
				vertical-align: middle;
			}
			.sign-up-inner {
				width: 634px;
				margin: 0 auto;
				color: #fff;
			}
			.sign-up {
				position: relative;
				margin-top: 34px;
				margin-bottom: 26px;
				height: 32px;
				font-size: 22px;
			}
			.sign-up-p {
				float: left;
			}
			.login-logo-lang {
				position: absolute;
				right: 0;
				bottom: 0;
				height: 32px;
				width: 70px;
				color: #f7f7f7;
				background-color: transparent;
				outline: none;
				border: none;
				cursor: pointer;
				border-top: 1px solid transparent;
				border-right: 1px solid transparent;
				border-left: 1px solid transparent;
			}
			.login-logo-lang.active {
				background-color: rgba(30, 30, 36, .6);
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				border-top: 1px solid #2899da;
				border-right: 1px solid #2899da;
				border-left: 1px solid #2899da;
			}
			.logo-lang-content {
				display: none;
				height: 64px;
				position: absolute;
				right: 0;
				top: 100%;
				z-index: 1;
				border-bottom-left-radius: 4px;
				border-bottom-right-radius: 4px;
				border-right: 1px solid #2899da;
				border-bottom: 1px solid #2899da;
				border-left: 1px solid #2899da;
			}
			.logo-lang-content a {
				display: block;
				height: 32px;
				line-height: 32px;
				width: 68px;
				color: #fff;
				font-size: 14px;
				text-align: center;
				text-decoration: none;
				background-color: rgba(30, 30, 36, .6);
			}
			.button-caret {
				display: inline-table;
				vertical-align: baseline;
				width: 10px;
				height: 6px;
				background: url(<%=basePath %>member/img/login-caret.png) no-repeat scroll top left;
			}
			.ipt-name, .ipt-mail, .ipt-area, .ipt-bank, .ipt-phone, .references {
				position: relative;
				margin-bottom: 22px;
			}
			.ipt-name:after,
			.ipt-mail:after,
			.ipt-area:after,
			.ipt-bank:after,
			.ipt-phone:after,
			.references:after {
				content: '';
				display: block;
				height: 0;
				clear: both;
				visibility: hidden;
			}
			.ipt-section {
				float: left;
				width: 274px;
				height: 20px;
				padding: 10px 12px;
				background-color: #2f2f33;
				color: #fff;
				border: none;
			}
			.ipt-section2 {
				float: right;
				width: 274px;
				height: 20px;
				padding: 10px 12px;
				background-color: #2f2f33;
				color: #fff;
				border: none;
			}
			.ipt-section-select {
				float: right;
				width: 298px;
				height: 40px;
				padding: 10px 12px;
				background-color: #2f2f33;
				color: #fff;
				border: none;
			}
			.ipt-identify {
				position: relative;
			}
			.ipt-identify-input {
				float: right;
				width: 274px;
				height: 20px;
				padding: 10px 12px;
				background-color: #2f2f33;
				color: #fff;
				border: none;
			}
			.ipt-identify-code {
				position: absolute;
				top: 14px;
				height: 12px;
				line-height: 12px;
				right: 10px;
				color: #007ac0;
				background-color: transparent;
				border: none;
				border-left: 1px solid #007ac0;
				outline: none;
				cursor: pointer;
			}
			.upload {
				font-size: 18px;
				margin-top: 30px;
				margin-bottom: 20px;
			}
			.idcard {
				overflow: hidden;
			}
			.idcard-positive, .idcard-opposite {
				position: relative;
				height: 156px;
				width: 50%;
				float: left;
				font-size: 14px;
				color: #f1f1f1;
				overflow: hidden;
			}
			.idcard-spinner {
				position: absolute;	
				top: 26px;
				left: 0;
				width: 180px;
				height: 130px;
				line-height: 130px;
				background-color: #fff;
				text-align: center;
				font-size: 50px;
				z-index: 1;	
				display: none;	
			}
			.idcard-file {
				position: absolute;	
				margin-left: -100px;
				top: 26px;
				left: 0;
				width: 280px;
				height: 130px;
				opacity: 0;
				z-index: 2;		
				cursor: pointer;
				font-size: 180px;	
				overflow: hidden;
			}
			.idcard-img {
				position: absolute;
				top: 26px;
				left: 0;
				width: 180px;
				height: 130px;
			}
			.sign-up-submit {
				display: block;
				margin: 50px auto 0;
				width: 294px;
				height: 36px;
				border-radius: 2px;
				border: none;
				outline: none;
				font-size: 18px;
				color: #fff;
				background-color: rgba(40, 153, 218, .8);
				opacity: 0.8;
	            /* older safari/Chrome browsers */  
	            -webkit-opacity: 0.8;  
	            /* Netscape and Older than Firefox 0.9 */  
	            -moz-opacity: 0.8;  
	            /* Safari 1.x (pre WebKit!) 老式khtml内核的Safari浏览器*/  
	            -khtml-opacity: 0.8;  
	            /* IE9 + etc...modern browsers */  
	            opacity: .8;  
	            /* IE 4-9 */  
	            filter:alpha(opacity=80);  
	            /*This works in IE 8 & 9 too*/  
	            -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";  
	            /*IE4-IE9*/  
	            filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
			}
			/*兼容IE*/
			img {
				border: none;
			}
			/*等待时旋转图片*/
			/*@keyframes spinnerImg{
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
			.idcard-spinner-img {
			    -moz-animation: spinnerImg 2s infinite linear;
			    -o-animation: spinnerImg 2s infinite linear;
			    -webkit-animation: spinnerImg 2s infinite linear;
			    animation: spinnerImg 2s infinite linear;
			}*/
		</style>
	</head>
	<body>
		<div class="login-bg">
			<ul class="popup">
				<!--<li class="popup-inner">请输入账户信息1</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请输入账户信息</li>
				<li class="popup-inner">请上传jpg或png格式的图片</li>-->
			</ul>
		</div>
		<div class="sign-up-all">
			<div class="sign-up-wrap">
				<div class="logo">
					<a class="logo-a" href="#">
						<img class="logo-img" src="<%=basePath %>member/img/logo.png" alt="logo" />
					</a>
					<p class="logo-p">
						已有账号
						<a class="logo-p-a" href="<%=basePath %>member/login.jsp">
							返回登录
							<img class="logo-p-img" src="<%=basePath %>member/img/back-to.png"/>
						</a>
					</p>
				</div>
				<form class="sign-up-inner" action="<%=basePath %>regis" method="post">
					<div class="sign-up">
						<p class="sign-up-p">注册</p>
						<button class="login-logo-lang" type="button">
							中文
							<span class="button-caret"></span>
						</button>
						<div class="logo-lang-content">
							<a href="#">English</a>
							<a href="#">中文</a>
						</div>
					</div>
					<div class="ipt-name">
						<input class="ipt-section" type="text" placeholder="姓名" required name="name"/>
						<input class="placeholder-hidden1" type="text" value="姓名" tabindex="-1" />
						<select class="ipt-section-select" name="sex" required>
							<option value="性别">性别</option>
							<option value="1">男</option>
							<option value="0">女</option>
						</select>
					</div>
					<div class="ipt-area">
						<input class="ipt-section" type="text" placeholder="地区" required />
						<input class="placeholder-hidden1" type="text" value="地区" tabindex="-1" />
						<input class="ipt-section2" type="text" placeholder="身份证号码" required />
						<input class="placeholder-hidden2" type="text" value="身份证号码" tabindex="-1" />
					</div>
					<div class="ipt-bank">
						<input class="ipt-section" type="text" placeholder="银行卡号" required />
						<input class="placeholder-hidden1" type="text" value="银行卡号" tabindex="-1" />
						<input class="ipt-section2" type="text" placeholder="银行名称" required />
						<input class="placeholder-hidden2" type="text" value="银行名称" tabindex="-1" />
					</div>
					<div class="ipt-phone">
						<input id="phonenum" class="ipt-section" type="tel" placeholder="请输入手机号" required />
						<input class="placeholder-hidden1" type="text" value="请输入手机号" tabindex="-1" />
						<div class="ipt-identify">
							<input class="ipt-identify-input" type="text" placeholder="验证码" required />
							<input class="placeholder-hidden-identify" type="text" value="验证码" tabindex="-1" />
							<button class="ipt-identify-code" type="button" tabindex="-1">获取验证码</button>
						</div>
					</div>
					<div class="ipt-mail">
						<input class="ipt-section" type="email" placeholder="邮箱" required name="email"/>
						<input class="placeholder-hidden1" type="text" value="邮箱" tabindex="-1" />
						<input class="ipt-section2" type="text" placeholder="推荐人" />
						<input class="placeholder-hidden2" type="text" value="推荐人" tabindex="-1" />
					</div>
					<div class="references">

					</div>
					<div class="upload">上传身份证件</div>
					<div class="idcard">
						<div class="idcard-positive">
							<p>正面</p>
							<input id="idcard-1" class="idcard-file" type="file" accept="image/jpeg, image/png" />
							<img class="idcard-img" src="img/idcard.png" alt="idcard" />
							<div class="idcard-spinner"><img class="idcard-spinner-img" src="img/wait.gif"/></div>
						</div>
						<div class="idcard-opposite">
							<p>反面</p>
							<input id="idcard-2" class="idcard-file" type="file" accept="image/jpeg, image/png" />
							<img class="idcard-img"src="img/idcard.png" alt="idcard" />
							<div class="idcard-spinner"><img class="idcard-spinner-img" src="img/wait.gif"/></div>
						</div>
					</div>
					<input class="sign-up-submit" type="submit" value="注册" />
				</form>
			</div>
		</div>
		<script src="<%=basePath %>member/js/jquery-1.11.3.min.js"></script>
		<script src="<%=basePath %>member/js/ie-sign-up.js"></script>
		<script>
			$(function () {
				if (!(!!window.ActiveXObject || 'ActiveXObject' in window)) {
					//小屏幕背景控制
					if ($(window).height() < $('.sign-up-wrap').outerHeight()) {
						$('.sign-up-all').css({height: $('.sign-up-wrap').outerHeight()});
						$('.sign-up-wrap').css({top: 0, 'margin-top': '0'});
					}
					//change language
					$('.login-logo-lang').click (function () {
						$('.logo-lang-content').toggle();
						$('.login-logo-lang').toggleClass('active');
					});
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
					//判断图片类型
					var AllImgExt=".jpg|.jpeg|.png|";  
		            var extName1 = $('#idcard-1')[0].value.substring($('#idcard-1')[0].value.lastIndexOf(".")).toLowerCase();         
		            var extName2 = $('#idcard-2')[0].value.substring($('#idcard-2')[0].value.lastIndexOf(".")).toLowerCase();      
		            //上传图片显示到本地
		            $("#idcard-1").on("change", function() {
		            	$(this).parent().find('.idcard-spinner').css('display', 'block');
		            	//序列化表单   
						var serializeData = $('this').serialize();
					  	$.ajax({
					  		url: '',
					       	type:'POST',
					   		dataType: 'json', 
					   		data: serializeData,            
						   	contentType: false,      
						   	cache: false,             
						   	processData:false,
						   	success:function(data){
						      $("#idcard-1").parent().find('.idcard-img').attr('src', data);
		            		  $("#idcard-1").parent().find('.idcard-spinner').css('display', 'none');
						   	},
						   	error:function(data){
						       	alert('error');
						    }
						});
			        });
		            $("#idcard-2").on("change", function() {
						$(this).parent().find('.idcard-spinner').css('display', 'block');
		            	//序列化表单   
						var serializeData = $('this').serialize();
					  	$.ajax({
					  		url: '',
					       	type:'POST',
					   		dataType: 'json', 
					   		data: serializeData,            
						   	contentType: false,      
						   	cache: false,             
						   	processData:false,
						   	success:function(data){
						      $("#idcard-2").parent().find('.idcard-img').attr('src', data);
		            		  $("#idcard-2").parent().find('.idcard-spinner').css('display', 'none');
						   	},
						   	error:function(data){
						       	alert('error');
						    }
						});
			        });
			        //获取验证码
			        var RegExp = /^1\d{10}$/;
					$('.ipt-identify-code').click(function () {
						if ($('#phonenum').val() == '') {
							clearInterval();
							var li = document.createElement('li');
							li.setAttribute('class', 'popup-inner');
							li.innerHTML = '请输入手机号码';
							$('.popup').append(li);
							$(".popup-inner").animate({right: 300}, "500", 'swing');
							$(".popup-inner").animate({opacity: 1}, "500", 'swing');
							setTimeout(function () {
								intervalHide();
							}, 2000);
						} else if (!(RegExp.test($('#phonenum').val()))) {
							clearInterval();
							var li = document.createElement('li');
							li.setAttribute('class', 'popup-inner');
							li.innerHTML = '手机号码格式有误';
							$('.popup').append(li);
							$(".popup-inner").animate({right: 300}, "500", 'swing');
							$(".popup-inner").animate({opacity: 1}, "500", 'swing');
							setTimeout(function () {
								intervalHide();
							}, 2000);
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
					$('.sign-up-submit').click(function () {
						if ($('.ipt-section').val() == '' || $('.ipt-section-select').val() == '性别' || $('.ipt-section2').val() == '' || $('.ipt-identify-input' == '')) {
							clearInterval();
							var li = document.createElement('li');
							li.setAttribute('class', 'popup-inner');
							li.innerHTML = '请完整输入信息';
							$('.popup').append(li);
							$(".popup-inner").animate({right: 300}, "500", 'swing');
							$(".popup-inner").animate({opacity: 1}, "500", 'swing');
							setTimeout(function () {
								intervalHide();
							}, 2000);
							return false;
						} else if ($('#idcard-1').val() == null || $('#idcard-1').val() == '' || $('#idcard-2').val() == null || $('#idcard-2').val() == '') {
							clearInterval();
							var li = document.createElement('li');
							li.setAttribute('class', 'popup-inner');
							li.innerHTML = '请上传身份证信息';
							$('.popup').append(li);
							$(".popup-inner").animate({right: 300}, "500", 'swing');
							$(".popup-inner").animate({opacity: 1}, "500", 'swing');
							setTimeout(function () {
								intervalHide();
							}, 2000);
							return false;
						} else if(AllImgExt.indexOf(extName1+"|")==-1 || AllImgExt.indexOf(extName2+"|")==-1) {  
			                ErrMsg="该文件类型不允许上传。请上传 "+AllImgExt+" 类型的文件，当前文件类型为"+extName;  
			               	clearInterval();
							var li = document.createElement('li');
							li.setAttribute('class', 'popup-inner');
							//li.innerHTML = ErrMsg;
							li.innerHTML = "请上传jpg或png格式的图片";
							$('.popup').append(li);
							$(".popup-inner").animate({right: 300}, "500", 'swing');
							$(".popup-inner").animate({opacity: 1}, "500", 'swing');
							setTimeout(function () {
								intervalHide();
							}, 2000);
							return false;
			            }
					});
				}
			});
		</script>
	</body>
</html>
