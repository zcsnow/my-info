$(function(){
	
//举报须知是否同意选择
$('.check-box').click(function(){
	if($('.check-box i').hasClass('icon-check')){
		$('.check-box i').removeClass('icon-check').addClass('icon-check-empty');
	}else{
		$('.check-box i').removeClass('icon-check-empty').addClass('icon-check');
	};
});

//点击举报须知同意按钮
$('.agree-btn').click(function(){
	if($('.check-box i').hasClass('icon-check')){
		window.location = "report_fill.html";
	};
});

//选择select更改输入框提示文字
$('.select').change(function(){
	$(this).prev().html($(this).find("option:selected").text());
});

//选择证件号
$('#credentials_name').change(function(){
	if($('#credentials_name').val()==1){ 
		$('#credentials_val').attr('placeholder','请输入身份证号');
	}else if($('#credentials_name').val()==2){
		$('#credentials_val').attr('placeholder','请输入军官证号');
	}else if($('#credentials_name').val()==3){
		$('#credentials_val').attr('placeholder','请输入护照');
	};
	checkZjh();
});

//选择联系方式
$('#contact_method').change(function(){
	if($('#contact_method').val()==1){ 
		$('#contact_val').attr('placeholder','请输入手机号');
	}else if($('#contact_method').val()==2){
		$('#contact_val').attr('placeholder','请输入邮箱');
	};
	checkContact();
});

//填写姓名失去焦点
$('#user_name').blur(function(){
	checkName('user_name');
});
//填写证件号失去焦点
$('#credentials_val').blur(function(){
	checkZjh();
});
//填写联系方式失去焦点
$('#contact_val').blur(function(){
	checkContact();
});

//填写投诉单位失去焦点
$('#company_name').blur(function(){
	checkName('company_name');
});
//填写投诉产品名称失去焦点
$('#product_name').blur(function(){
	checkName('product_name');
});

//填写单号失去焦点
$('#odd_num').blur(function(){
	checkName('odd_num');
});
//填写验证码失去焦点
$('#validate_code').blur(function(){
	checkName('validate_code');
});

//填写地址失去焦点
//$('#address_name').blur(function(){
//	checkName('address_name');
//});
  
//举报人信息填写提交
$('.js-next-btn1').click(function(e){
	e.preventDefault();
	var flag1 = checkName('user_name');
	var flag2 = checkZjh();	
	var flag3 = checkContact();
	
	if(flag1&&flag2&&flag3) {
		window.location = "reported_fill.html";
	}
});


/*//判断手机输入框内容长度
$("#J_mobileNum").on("keyup", function(){
	var len = $(this).val().length;
	if(len == 11){
		$(this).blur();
	}
});*/	

//内容是否为空验证
function checkName(id){
	//var re = /^[\u4e00-\u9fa5]$/;
	var value = $("#"+id).val();
	var tipText = $("#"+id).attr('placeholder');
    if (value == ""){
		$("#"+id+"_tip").html(tipText);
		$("#"+id+"_tip").slideDown();
		return false;
	}else{
		$("#"+id+"_tip").slideUp();
		return true;
	};   
};
	
//证件号验证
function checkZjh(){
	//证件号
	var value = $('#credentials_val').val();
	//证件号类型
	var zjhType = $('#credentials_name').val();
	if(checkByZjtype(zjhType,value)){
		//验证通过
		$('#credentials_tip').slideUp();
		return true;
	}else{
		$('#credentials_tip').html('证件号格式错误');
		$('#credentials_tip').slideDown();
	};
        
};

//根据不同的证件号类型调用不同的验证函数
function checkByZjtype(zjhType,value){
	if(zjhType == '1'){
		//身份证、驾照
		return checkIdcard(value);
	}else if(zjhType == '2'){
		//军官证
		return checkJgz(value);
	}else if(zjhType == '3'){
		//护照
		return checkHz(value);
	}else{
		//其他
		return true;
	};
};

//身份证验证
function checkIdcard(idcard){
    var Errors = new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!");
    var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
    var idcard,Y,JYM;
    var S,M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    if(area[parseInt(idcard.substr(0,2))]==null){
    	//alert( Errors[4]);
    	return false;
    };
    switch(idcard.length){
    case 15:
    if((parseInt(idcard.substr(6,2))+1900) % 4 == 0 
    		|| ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 
    		&& (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
    }else{
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
    };
    if(ereg.test(idcard)){
        //alert( Errors[0]);
    	return true;
    }else{
    	//alert( Errors[2]);
    	return false;
    };
    break;
    case 18:
    if( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
    	ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
    }else{
    	ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
    };
    if(ereg.test(idcard)){
    	S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ;
      	Y = S % 11;
      	M = "F";
      	JYM = "10X98765432";
      	M = JYM.substr(Y,1);
      	if(M == idcard_array[17]){
      		//alert( Errors[0]);
      		return true;
      	}else{
      		//alert( Errors[3]);
      		return false;
      	};
    }else{
    	//alert( Errors[2]);
    	return false;
    }; 
    break;
    default:
    //alert( Errors[1]);
    return false;
    break;
  };
};

//军官证验证
function checkJgz(value){
	var regex = /^(南|北|沈|兰|成|济|广|参|政|后|装|海|空)字第\d{8}号$/;
	if(regex.test(value)){
		return true;
	}else{
		return false;
	};
};

//护照验证
function checkHz(value){
	var regex = /(^(14|15)\d{7}$)|(^G\d{8}$)|(^P\.\d{7}$)|(^S\.\d{7}$)|(^S\d{8}$)/;
	if(regex.test(value)){
		return true;
	}else{
		return false;
	};
};

//联系方式验证
function checkContact(){
	//联系方式
	var value= $('#contact_val').val();
	//联系方式类型
	var contactType = $('#contact_method').val();
	  if(checkContactType(contactType,value)){
		  //验证通过
		  $('#contact_tip').slideUp();
		  return true;
	  }else{
		  $('#contact_tip').html('联系方式格式错误');
		  $('#contact_tip').slideDown();
	  }
}

//根据不同的联系方式类型调用不同的验证函数
function checkContactType(contactType,value){
	if(contactType == '1'){
		//手机号
		return checkMobile(value);
	}else if(contactType == '2'){
		//邮箱
		return checkEmail(value);
	}else{
		//其他
		return true;
	};
};

//手机号验证
function checkMobile(value){
	var regex = /^1[3578]\d{9}$/;
	//var regex = /^[0-9]([0-9]|,){0,29}[0-9]{0,1}$/;
	if(value != '' && regex.test(value)){
		return true;
	}else{
		return false;
	};
};

//电子邮箱验证
function checkEmail(value){
	var regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(value != '' && regex.test(value)){
		return true;
	}else{
		return false;
	};
};


//选择投诉产品类别是否为空验证
function checkProductType(){
	var value = $("#product_type").val();
    if ($("#product_type").prev().html() == "请选择投诉产品类别"){
		$("#product_type_tip").html("请选择投诉产品类别");
		$("#product_type_tip").slideDown();
		return false;
	}else{
		$("#product_type_tip").slideUp();
		return true;
	};   
};

//选择投诉产品类别
$('#product_type').change(function(){
	checkProductType();
});

//被举报单位信息填写提交
$('.js-next-btn2').click(function(e){
	e.preventDefault();
	var flag1 = checkName('company_name');
	var flag2 = checkName('product_name');
	var flag3 = checkProductType();
	//var flag4 = checkName('address_name');
	if(flag1&&flag2&&flag3) {
		window.location = "report_content.html";
	}
});


//投诉举报主要内容填写提交
$('.js-next-btn3').click(function(e){
	e.preventDefault();
	var flag1 = checkName('report_content');
	if(flag1) {
		window.location = "report_form.html";
	}
});


//举报人信息填写提交
$('.js-query-btn').click(function(e){
	e.preventDefault();
	var flag1 = checkName('company_name');
	var flag2 = checkName('odd_num');
	var flag3 = checkName('validate_code');
	
	if(flag1&&flag2&&flag3) {
		window.location = "query_result.html";
	}
});






//匿名  判断回复方式
function zrar_chanegNm(){
	var sfnm = $("#replyway1")[0].checked;
	
	if(sfnm){
		//电话
		$("#emailyz")[0].style.display = "none";
		$("#lxdh")[0].style.display = "";
		 var value = $('#contactnumber')[0].value;
		//名称为空：提示无法查询处理结果
	//	zrar_shownm();
		if(value == '' || value == undefined){
    	result = false;
    	document.getElementById('contactnumbermes').innerHTML=' * 必填项';
    	document.getElementById('contactnumbermes').style.display = '';
    	document.getElementById('emailmes').style.display = 'none';
    	
		}else{
		    	document.getElementById('contactnumbermes').style.display = 'none';
		    }
	}else{
		//邮件
		$("#emailyz")[0].style.display = "";
		$("#lxdh")[0].style.display = "none";
		var value = $('#email')[0].value;
		
		if(value == '' || value == undefined){
	    	result = false;
	    	document.getElementById('emailmes').innerHTML=' * 必填项';
	    	document.getElementById('emailmes').style.display = '';
	    	document.getElementById('contactnumbermes').style.display = 'none';
    	
		 }else{
		    	document.getElementById('emailmes').style.display = 'none';
		    }
	}
}

//必填验证
function zrar_checkBt(id){
	
	var sfnm = $("#replyway1")[0].checked;
	//获取value值
	var value = '';
    if(id == "businessclassify"){
        var radios = document.getElementsByName(id);
		for(var i=0;i<radios.length;i++){
			if(radios[i].checked == true){
				value = radios[i].value.trim();
				break;
			}
	    }
    }else{
    	 value = document.getElementById(id).value.trim();
    }
    if(value == '' || value == undefined){
    	result = false;
    	document.getElementById(id+'mes').innerHTML=' * 必填项';
    	document.getElementById(id+'mes').style.display = '';
    	if(focusId == '' && id != "businessclassify"){
    		focusId = id;
    	}
    }else{
    	document.getElementById(id+'mes').style.display = 'none';
    }
    
    if(sfnm){
		//电话
		 var value = $('#contactnumber')[0].value;
		//名称为空：提示无法查询处理结果
		if(value == '' || value == undefined){
    	result = false;
    	document.getElementById('contactnumbermes').innerHTML=' * 必填项';
    	document.getElementById('contactnumbermes').style.display = '';
    	
		    }else{
		    	document.getElementById('contactnumbermes').style.display = 'none';
		    	
		    }
	}else{
		//邮件
		var value = $('#email')[0].value;
		
		if(value == '' || value == undefined){
	    	result = false;
	    	document.getElementById('emailmes').innerHTML=' * 必填项';
	    	document.getElementById('emailmes').style.display = '';
    	
		    }else{
		    	document.getElementById('emailmes').style.display = 'none';
		    }
	}

}

function zrar_check(id){
	var value = '';
	value = document.getElementById(id).value.trim();
		if(value == '' || value == undefined){
    	result = false;
    	document.getElementById(id+'mes').innerHTML=' * 必填项';
    	document.getElementById(id+'mes').style.display = '';
    	
    }else{
    	document.getElementById(id+'mes').style.display = 'none';
    }
}


//隐藏业务类型 必填提示
function zrar_hidden(){
	document.getElementById('businessclassifymes').style.display = 'none';
}




//改变投诉举报姓名类型
function changexmlx(obj){
	if(obj.value == '1' && !$("#ywsfnm1")[0].checked){
		//姓名类型选个人且非匿名，证件号必填
		$('#ywzjhxh')[0].style.display = '';
	}else if(obj.value == '2'){
		//姓名类型选单位，证件号不用必填
		$('#ywzjhxh')[0].style.display = 'none';
		$('#ywzjhmes')[0].style.display = 'none';
	}
}

//业务内容长度控制
function zrar_change(){
	var content = $('#content')[0].value;
	if(content.length > 1999){
			$('#content')[0].value = content.substring(0,1999);
			$('#contentspan')[0].innerHTML = "0";
	}else{
			var syzs = 1999-content.length;
			$('#contentspan')[0].innerHTML = syzs;
	}
}



var cpphmes = '请填写产品外包装的产品生成批次';
var pzwhmes = '如：国药准字Z45020797';
//打开页面时显示产品批号提示语
function zrar_showCpphmes(id){
	var obj = $('#'+id)[0];
	if(obj.value == '' || obj.value == null || obj.value==cpphmes){
  	//显示提示语：如有多个联系电话，联系电话间请用","隔开
		obj.style.color="rgb(189,189,189)";
		if(id == 'ywcpwh'){
			//产品批准文号
			obj.value = pzwhmes;
		}else if(id == 'ywcpph'){
			//产品批号
			obj.value = cpphmes;
		}
  }
}

//鼠标单击事件：清空提示语
function zrar_clearhm(obj){
	var color = zrar_getColor(obj.id);
	if(color == 'rgb(189,189,189)'){
		obj.value = '';
		obj.style.color="#666";
	}
}

//鼠标单击事件：清空产品批号、文号提示语
function zrar_clearCpph(id){
	var obj = $('#'+id)[0];
	var tsmes = null;
	if(id == 'ywcpwh'){
		tsmes = pzwhmes;
	}else if(id == 'ywcpph'){
		tsmes = cpphmes;
	}
	var value = obj.value;
	var color = zrar_getColor(id);
	if(color == 'rgb(189,189,189)' || value == tsmes){
		obj.value = '';
		obj.style.color="#666";
	}
}

//批准文号、产品批号必填验证、恢复产品批号提示语
function zrar_checkCpph(id){
	var obj = $('#'+id)[0];
	var value = obj.value;
	var tsmes = null;
	if(id == 'ywcpwh'){
		tsmes = pzwhmes;
	}else if(id == 'ywcpph'){
		tsmes = cpphmes;
	}
	var color = zrar_getColor(id);
	if( (value == '' || value == null 
			|| color == 'rgb(189,189,189)'
			|| value == tsmes)){
		//验证失败
		if(id == 'ywcpwh'){
			//产品批准文号
			obj.value = pzwhmes;
		}else if(id == 'ywcpph'){
			//产品批号
			obj.value = cpphmes;
		}
		obj.style.color="rgb(189,189,189)";
	}else{
		$('#'+id+'mes')[0].style.display = 'none';
	}
}

//提交前清空提示语
function zrar_clearhmTj(id){
	var obj = $('#'+id)[0];
	var color = zrar_getColor(id);
	if(color == 'rgb(189,189,189)'  || obj.value==dhhmmes){
		//电话号码为提示语，删除电话号码
		obj.value = '';
		obj.style.color="#666";
	}
}

function zrar_getRealUrl(url){
	var realUrl = url;
	realUrl = realUrl.substring(7,realUrl.length);
	var urlArr = realUrl.split('/');
	realUrl = "http://"+urlArr[0]+"/"+urlArr[1]+"/";
	return realUrl;
}

//获取color，不同浏览器返回值不同
function zrar_getColor(id){
	var color = $("#"+id)[0].style.color;
	while(color.indexOf(" ", 0) >= 0){
		color = color.replace(" ", "");
	}
	return color;
}

function zrar_showNowStep(step){
	$("#stepbt").removeClass();
	$("#stepbt").addClass("subnav" + step);
	$("span[id*=stpebt]").removeClass();
	$("#stpebt" + step).addClass("c_fff");
};

//提交   
function zrar_tj(){
		result = true;
		focusId = '';
		//邮编验证
		zrar_checkYb('postalcode');
		zrar_checkEmail('email');
		//身份证验证
		checkZjh();
		zrar_checkBt('businessclassify');
		zrar_checkBt('personname');
		//电话验证
		zrar_checkDhhm('contactnumber');
		if(!result){
			alert('提交失败，请修改格式错误提示处！');
		}
		return (result);
}

	


});