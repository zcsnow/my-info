function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setHours(exp.getHours() + 5*24);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() + (  24 * 60 * 60 * 10));
    var cval = setCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function AjaxTool(ajaxJson) {
    var companytype = $.ajax({
        type: "post",
        contentType: "application/json",
        url: ajaxJson.Url,
        data: ajaxJson.data,
        dataType: "json",
        async: false
    });
    return JSON.parse(companytype.responseText).d;
}