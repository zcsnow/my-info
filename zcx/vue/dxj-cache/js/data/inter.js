// JavaScript Document
import {isIos,isAndroid} from "../modules/method.js";
import $ from "jquery";
import Fingerprint2 from "../libs/fingerprint2.min.js";

import {sendData,sendEventLog} from "../modules/analytics.js";
import {getCookie} from '../modules/cookie.js';
const Promise = require('promise-polyfill');
const Base64 = require('../libs/base64.min.js').Base64;   //加密
const md5 = require('md5');   //MD5

var terminalType = '';  //统计用户终端类型
var _maq = _maq || [];  //统计用户数据初始设置

var hostname = window.location.hostname;
var host = window.location.host;
var isTest = /^localhost|^10\.10\.*\.*/.test(hostname);
var isNative = /(iOS|Android)\/dongxingji\s+(\d\.?)+/i.test(window.navigator.userAgent);
var isCeair = /^www.ce-air.com|^agcs.ceair.com/.test(hostname); // 是否为机上环境
var isGround = /^10\.10\.56\.45|^paytest.dongxingji.cn/.test(hostname); // 是否为本地模拟环境或微信支付环境
var isWarn = true; // 是否开启测试警告
var dataVersion = "data413"; // 缓存目录
var resTimeout = 15000; //请求超时时间
var dataHost = '',      //航美数据接口host
    apiHost = '',       //飞机API访问host
    dataToken = '',     //机上资源接口toke
    planeData = '';     //航班信息

//console.log("hostname:"+hostname+", host:"+host);

if (isTest) {
    //console.log("本地开发环境");
    apiHost = 'http://10.10.56.45';
    //apiHost = 'http://10.10.56.45:8070';
    dataHost = 'http://10.10.56.45/api/go';
}else {
    //console.log("东航模拟环境、飞机正式环境");
    apiHost = window.location.protocol + '//' + host;
    dataHost = window.location.protocol + '//' + host +'/api/go';
}

var pageSecond = 0;
window.setInterval(function () {
    pageSecond ++;
}, 1000);

/*    =======  航班信息处理start  ======== */
// console.log(isCeair);

//获取飞机各项参数
var ts = new Date();
var utcTime=".json?timer="+ts.getUTCFullYear()+''+(ts.getUTCMonth()+1)+''+ts.getUTCDate();//+ts.getUTCHours();

if (!isNative) {
    terminalType = "H5";
}else{
    if(isIos==true){
        terminalType = "IOS";
    }else if(isAndroid==true){
        terminalType = "Android";
    }else{
        terminalType = "其他";
    }
}
_maq.push(['_terminalType', terminalType]);
//获取航班信息
$.get(apiHost +"/api/flight", function(data){
    planeData = data;

    //获取浏览器指纹id
    new Fingerprint2().get(function(result, components) {
        //console.log(result) // a hash, representing your device fingerprint
        //console.log(components) // an array of FP components
        _maq.push(['_setAccount', result]); //设置用户id ，此id为browserId
        //console.log(isNative);
        //console.log(isEmpty(planeData.tailNum))
        //如果机尾号为空，
        if(isEmpty(planeData.tailNum)){
            /*//GCS模拟环境测试
            GCS.reset();
            GCS.check( function(state){
                console.log(state)
            },{test:true});*/
            GCS.check( function(state){
                planeData.tailNum = state.stat.tail
                // state:
                // device: "off" // 设备是否被允许互联网
                // done: false  // state是否更新
                // gcs: "off" // GCS是否打开
                // router: "off" // 互联网路由是否打开
                // tail: ""  //飞机尾号
                //sendData(_maq,planeData);
                if(isAndroid==true){
                    window.onbeforeunload = function() {
                        var dataArr = {
                            'url' : location.href,
                            'time' : pageSecond,
                            'timeIn' : Date.parse(new Date()),
                            'timeOut' : Date.parse(new Date()) + (pageSecond * 1000),
                        };
                        var detentionTime = dataArr.timeOut-dataArr.timeIn
                        _maq.push(['_detentionTime', detentionTime]); 
                        sendData(_maq,planeData);
                    }
                }else{
                    sendData(_maq,planeData);
                }

            })
        }else{
            //sendData(_maq,planeData);
            if(isAndroid==true){
                window.onbeforeunload = function() {
                    var dataArr = {
                        'url' : location.href,
                        'time' : pageSecond,
                        'timeIn' : Date.parse(new Date()),
                        'timeOut' : Date.parse(new Date()) + (pageSecond * 1000),
                    };
                    var detentionTime = dataArr.timeOut-dataArr.timeIn
                    _maq.push(['_detentionTime', detentionTime]); 
                    sendData(_maq,planeData);
                }
            }else{
                sendData(_maq,planeData);
            }

        }
        
    });
    //console.log(planeData);

});
//本地默认赋值

//触发事件时发送相应参数
function eventLog(eventData) {
    $.get(apiHost +"/api/flight"+'?timer='+new Date().getTime(), function(data){
        //console.log("logData:"+JSON.stringify(data));
        new Fingerprint2().get(function(result, components) {
            //console.log(result) // a hash, representing your device fingerprint
            //console.log(components) // an array of FP components
            _maq.push(['_setAccount', result]); //设置用户id ，此id为browserId
            sendEventLog(_maq,data,eventData);
        });
    });
}

/*    =======  航班信息处理end  ======== */
const USERID = 'asdfsf'; // 测试userID
const userName = '小明'; // 用户名字
const phoneNumber = '13800138000'; // 用户电话
const couponBalance = '0'; // 用户电话
const TOKEN = 'vshyQsTf9Pe7XrNxIa0wpUJBjkTXRN0h';  // 测试token
const VERSION = "4.2.5";                           // 版本号
const PLATFORM = isNative?isAndroid?'2':'1':'4';   // 测试型号1:ios,2:Android,4:portal

if(!isNative){
    window.App = {
        getNativeParam(flag){
            switch(flag){
                case "getBase":
                    isWarn && console.warn('获取用户基本信息');
                    return {
                        "host": dataHost,       //接口地址
                        "userID": USERID,       //userID
                        "userName": userName,   // 用户名字
                        "phoneNumber":phoneNumber,
                        "couponBalance":couponBalance,
                        "version": VERSION,     //版本号
                        "token": TOKEN,         //token
                        "platform": PLATFORM,   //平台
                        "environment": 'plan', //网络环境
                        "showNav" : true        //app加载机上portal变量
                    }
                default:
                    isWarn && console.warn('没有找到对应flag,请确保'+ flag +'存在并正确');
                    break;
            }
        },
        callNative(flag,param){
            switch(flag){
                case "shareInfo":
                    isWarn && console.warn('获取native分享事件，参数为:', param);
                    break;
                case "copyWechat":
                    isWarn && console.warn('长按复制客服微信, 参数为:',param);
                    // alert('长按复制客服微信');
                    break;
                case "copyQQ":
                    isWarn && console.warn('长按复制客服QQ, 参数为:',param);
                    break;
                case "dot":
                case 99:
                    isWarn && console.warn('打点,参数为:',param);
                    break;
                case "close":
                    console.log('关闭当前页面,参数为',param);
                    break;
                case "link":
                    isWarn && console.warn('开网页面,参数为:',param);
                    break;
                case "playVideo":
                    isWarn && console.warn('视频播放,参数为:',param);
                    break;
                case "toolbar":
                    isWarn && console.warn('非东行记页面加返回头部参数');
                    break;
                case "movePlay":
                    isWarn && console.warn('电影播放,参数为:',param);
                    break;
                case "userinfo_to_native":
                    isWarn && console.warn('登录注册同步信息:',param);
                    break;
                case "loginOut":
                    isWarn && console.warn('退出登录:',param);
                    break;
                case "enterShoppingCard":
                    isWarn && console.warn('点击我的购物卡:',param);
                    break;
                case "ceairToken":
                    isWarn && console.warn('发送每架飞机的token:',param);
                    break;
                case "inner_chain_to_native":
                    isWarn && console.warn('配置app原生页面跳转地址:',param);
                    //callN("inner_chain_to_native", {"url": data.more.travel});
                    break;
                default:
                    isWarn && console.warn('没有找到对应flag,请确保'+ flag +'存在并正确');
                    break;
            }
        }
    }
}

//获取token
function getToken() {
    if (!dataToken) {
        dataToken = new Promise((resolve,reject) => {
                $.getScript(apiHost +"/api/token?partnerid=com.ceairmedia")
                .done(function() {
                    CocoaToken(function(token){
                        //console.log(token);
                        resolve(token);
                    });
                })
                .fail(function (e){
                    dataToken = null;
                    reject(e);
                });
        });
    }
    return dataToken;
}

//获取资源Hash
let dataHash;   //机上资源路径hash
function getHash() {

    if (!dataHash) {
        dataHash = new Promise((resolve,reject) => {
            getToken().then(res => {
                //console.log('hash的token是：'+res);
                $.ajax({
                    type: "GET",
                    url: apiHost + "/api/apps/contents/dxj_v3",
                    headers:{"Content-Type": "application/x-www-form-urlencoded","token": res},
                    dataType: "json",
                    success: function(data){
                        //console.log(data)
                        if(data.dxj_v3==null){
                            $.ajax({
                                type: "GET",
                                url: apiHost + "/api/apps/contents/dxj_contents",
                                headers:{"Content-Type": "application/x-www-form-urlencoded","token": res},
                                dataType: "json",
                                success: function(data){
                                    //console.log(data)
                                    if(data.dxj_contents==null){
                                        
                                        $.ajax({
                                            type: "GET",
                                            url: apiHost + "/api/apps/contents/dxj",
                                            headers:{"Content-Type": "application/x-www-form-urlencoded","token": res},
                                            dataType: "json",
                                            success: function(data){
                                                resolve({
                                                    hash: data.dxj,
                                                    token: res,
                                                    planeType: "0"
                                                });
                                            },
                                            error: function(e){
                                                dataHash = null;
                                                reject(e);
                                            }
                                        });
            
                                    }else{
                                        resolve({
                                            hash: data.dxj_contents,
                                            token: res,
                                            planeType: "bc03"
                                        });
                                    }
                                },
                                error: function(e){
                                    dataHash = null;
                                    reject(e);
                                }
                            });
                        }else{
                            resolve({
                                hash: data.dxj_v3,
                                token: res,
                                planeType: "00"
                            });
                        }
                    },
                    error: function(e){
                        dataHash = null;
                        reject(e);
                    }
                });

            
              

            }).catch(e => {
                console.log('获取token失败，错误信息:', e);
            });
        });
    }
    return dataHash;
}

function getN(flag){
    if (isIos || !isNative) {
        return window.App.getNativeParam(flag);
    }else{
        var a = window.App.getNativeParam(flag);
        return a?JSON.parse(a):'';
    }
}

function callN(flag,param){
    param = param?param:{};
    param.callbackId = flag;
    if(isIos || !isNative){
        return window.App.callNative(flag,param);
    }else{
        return window.App.callNative(flag,JSON.stringify(param));
    }
}


//判断用户是否登录公共方法
function checkLogin(page) {
    if(getCookie('uuid') == null || getCookie('access_token') == null){
        if(page){
            window.location.href = "login.html?pageUrl=" + page + ".html";
        }else{
            window.location.href = "login.html";
        }
    }
}

//获取url里的参数值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//判断版本大小
function versionContrast(ver1,ver2) {
    var version1Num = ver1.replace(/\./g,'');
    var version2Num = ver2.replace(/\./g,'');
    if(version1Num.length<4){
        version1Num += '0'
    }
    if(version1Num.length>4){
        version1Num = version1Num.substring(0, 4);

    }
    
    if(version2Num.length<4){
        version2Num += '0'
    }
    if(version2Num.length>4){
        version2Num = version2Num.substring(0, 4);
    }

    if(parseInt(version1Num) >= parseInt(version2Num)){
        return true;
    }else{
        return false;
    }
}

/**
* 加密方法
* @param $data 要加密的字符串
* @param $key  加密密钥
* @param int $expire 过期时间
* @return mixed
*/
function encrypt(data,key,expire=0){
    key = md5(key);
    data = Base64.encode(data);
    var x = 0;
    var len = data.length;
    var l = key.length;
    var char = '';
    for(var i = 0; i<len; i++){
        if(x==l) x = 0;
        char += key.substr(x, 1);
        x++;
    }
    var str = expire? expire + Date.parse(new Date()) / 1000 : 0;
    str = ('000000000'+str).slice(-10);

    for(var i = 0; i<len; i++){
        str += String.fromCharCode(data.substr(i,1).charCodeAt() + char.substr(i,1).charCodeAt()%2);
    }
    str = Base64.encode(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    return str;
}

/**
* 系统解密方法
* @param $data 要解密的字符串
* @param $key 加密密钥
* @return string
*/
function decrypt(data,key){
    key = md5(key);
    var x = 0;
    data = data.replace(/\-/g, "+").replace(/_/g, "/");
    var mod4 = data.length % 4;
    if(mod4) {
        data += '===='.substr(mod4);
    }
    data = Base64.decode(data);
    var expire = data.substr(0, 10);
    data = data.substr(10);
    if(expire > 0 && expire < Date.parse(new Date()) / 1000){
        // 此处代码与后台时间不一致可能导致问题，暂时不用
        return "";
    }
    var len = data.length;
    var l = key.length;
    var char = '';
    var str = '';

    for(var i = 0; i<len; i++){
        if(x==l) x=0;
        char += key.substr(x, 1);
        x++;
    }
    for(var i = 0; i < len; i++){
        str += String.fromCharCode(data.substr(i,1).charCodeAt() - char.substr(i,1).charCodeAt()%2);
    }
    str = Base64.decode(str);
    return str;
}

//判断字符串是否为空
function isEmpty(obj) {
    if (obj === null) return true;
    if (typeof obj === 'undefined') {
      return true;
    }
    if (typeof obj === 'string') {
      if (obj === "") {
        return true;
      }
      var reg = new RegExp("^([ ]+)|([　]+)$");
      return reg.test(obj);
    }
    return false;
}


export {
    isTest,
    isCeair,
    isNative,
    isGround,
    dataHost,
    apiHost,
    utcTime,
    getN,
    callN,
    getHash,
    encrypt,
    decrypt,
    eventLog,
    dataVersion,
    checkLogin,
    resTimeout,
    getQueryString,
    Fingerprint2,
    versionContrast,
    isEmpty
}