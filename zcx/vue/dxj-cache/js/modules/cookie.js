//获取cookie、
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}
 
//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays, type) {
 var exdate = new Date();
 if(type == "MM"){
 	// 按分钟加减计算
 	exdate.setMinutes(exdate.getMinutes() + expiredays);
 }
 else
 {
 	// 按天加减计算
 	exdate.setDate(exdate.getDate() + expiredays);
 }
 // document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
 document.cookie = c_name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
 
//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};