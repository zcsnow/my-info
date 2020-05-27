
//截取地址字符串	
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var arg=GetQueryString('id');  //获取地址上key=id的值

//把中文转换为	unicode方法
function unicode(str){
	var value='';
	for (var i = 0; i < str.length; i++) {
		value += '\\u' + left_zero(parseInt(str.charCodeAt(i)).toString(16));
	}
	return value;
}

function left_zero(str) {
	if (str != null && str != '' && str != 'undefined') {
		if (str.length == 2) {
			return '00' + str;
		}
	}
	return str;
}

//把unicode转换为	中文方法
function reconvert(str){ 
	str = str.replace(/(\\u)(\w{1,4})/gi,function($0){ 
		return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
	}); 
	str = str.replace(/(&#x)(\w{1,4});/gi,function($0){ 
		return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
	}); 
	str = str.replace(/(&#)(\d{1,6});/gi,function($0){ 
		return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
	}); 
	 
	return str; 
}


var name = unicode("小伙伴12312asdas_@#&*!%^)(-+}{?><|");
console.log(name);
console.log(reconvert(name));
	
