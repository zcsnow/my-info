import MobileDetect from "../libs/mobile-detect.min.js";
import {isCeair,isNative,dataHost,apiHost,getHash} from 'nativeA';
function sendData(_maq,flighInfo,eventArgs) {
    var params = {};
    //Document对象数据
    if (document) {
        params.domain = document.domain || '';      //获取域名
        params.url = document.URL || '';            //当前Url地址
        params.title = document.title || '';
        params.referrer = document.referrer || '';  //上一跳路径
    }
    //Window对象数据,获取显示屏信息
    if (window && window.screen) {
        params.height = window.screen.height || 0;  
        params.width = window.screen.width || 0;
        params.colorDepth = window.screen.colorDepth || 0;  //色彩数
    }
    //navigator对象数据 
    var userAgent = navigator.userAgent;//获取userAgent信息 
    params.language = navigator.language || '';     //获取所用语言种类

    //用于生成uuid
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    var curDate = new Date().getTime();
    params.messageId = "msgId-"+guid()+"-"+curDate;
    //alert(userAgent);
    //判断访问终端
    var browser={
        versions:function(){
            var u = navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                Safari: u.indexOf('Safari') > -1, //是否Safari
                Chrome: u.indexOf('Chrome') > -1, //是否Safari
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                UC: u.indexOf('UCBrowser') > -1, //是否uc
                xiaomi: u.indexOf('MiuiBrowser') > -1, //是否小米
                QQbrw : u.indexOf('MQQBrowser') > -1, //是否QQ
                baidu : u.indexOf('baiduboxapp') > -1, //是否手机百度	
                
                
            };
        }(),
    }
    if(browser.versions.xiaomi){
        params.bowserSystem = "小米浏览器";
    }else if(browser.versions.baidu){
        params.bowserSystem = "手机百度浏览器";
    }else if(browser.versions.UC){
        params.bowserSystem = "UC浏览器";
    }else if(browser.versions.weixin){
        params.bowserSystem = "微信浏览器";
    }else if (browser.versions.QQbrw){
        params.bowserSystem = "QQ浏览器";
    }else if(browser.versions.android && browser.versions.Chrome){
        params.bowserSystem = "Chrome浏览器";
    }else if((browser.versions.iPhone||browser.versions.iPad)&&browser.versions.Safari){
        params.bowserSystem = "Safari浏览器";
    }else{
        params.bowserSystem = "其它浏览器";
    }

     //判断数组中是否包含某字符串  
     Array.prototype.contains = function(needle) {  
        for (i in this) {  
            if (this[i].indexOf(needle) > 0)  
                return i;  
        }  
        return -1;  
    } 
    
    var md = new MobileDetect(userAgent);//初始化mobile-detect  
    var mobileOs = md.os();//获取系统
    var osVersion = '';//获取系统版本  
    var mobileName = "";  
    if (mobileOs == "iOS") {//ios系统的处理  
        mobileOs = md.os(); 
        osVersion =  md.version("iPhone"); 
        mobileName = md.mobile();  
    } else if (mobileOs == "AndroidOS") {//Android系统的处理  
        mobileOs = "Android";  
        osVersion =  md.version("Android"); 
        var sss = userAgent.split(";"); //分隔userAgent
        var i = sss.contains("Build/"); //判断是否包含 Build/
        if (i > -1) {  
            mobileName = sss[i].substring(0, sss[i].indexOf("Build/"));  //截取 Build/  前的字符 
        }  
    }else{
        mobileOs = md.os();
    }
    params.mobileName =  mobileName;
    params.mobileOs = mobileOs;
    params.mobileOsVersion = osVersion;
    //alert(mobileName + "---" +  mobileOs + "---" + osVersion)//打印系统版本和手机型号 
     

    //var flighInfo = {"flightNum":"MU583","flightDate":"20180703","tailNum":"B-9999","flightID":"mca1ntvnwkdz8ugkunn8zbw82g","origin":"PVG","arrival":"LAX","takeoff":"201806030000","estimated":"201807030913","utcTime":"201807030913","longitude":0,"latitude":0,"altitude":0,"flightTag":""}

    params.flightID = flighInfo.flightID;  //航节号
    params.tailNum = flighInfo.tailNum;    //飞机编号
    params.flightNum = flighInfo.flightNum; //航班日期
    params.flightDate = flighInfo.flightDate; //航班ID
    params.deptcode = flighInfo.origin;   //出发地三字码
    params.arrcode = flighInfo.arrival; //到达地三字码 
    params.longitude = flighInfo.longitude; //经度
    params.latitude = flighInfo.latitude; //纬度
    params.altitude = flighInfo.altitude; //海拔
    params.takeoff = flighInfo.takeoff; //起飞时间 
    params.estimated = flighInfo.estimated; //计划降落时间
    params.eastUtcTime = flighInfo.utcTime; // 当前时间 （UTC时间非北京时间）



    /*******************    代码发布时要修改        ********************************************************************************************************************************/
    /*******************    代码发布时要修改        ********************************************************************************************************************************/
    if(flighInfo.tailNum === 'B-9999'){
        params.appid="simulatePlane";  // 模拟飞机环境ce-air
        params.version="simulate-4.3.9";          // 真实飞机环境
    }else{
        params.appid="plane";          // 真实飞机环境
        params.version="4.3.9";          // 真实飞机环境
    }

    /*********************************************************************************************************************************************************************************/
    /*********************************************************************************************************************************************************************************/





    //解析_maq配置
    if (_maq) {
        for (var i in _maq) {      //获取埋点阶段，传递过来的用户行为
            //console.log(_maq[i][0]);
            switch (_maq[i][0]) {
                case '_setAccount':
                    params.browserId = _maq[i][1];
                    break;
                case '_terminalType':
                    params.terminalType = _maq[i][1];
                    break;
                case '_detentionTime':
                    params.detentionTime = _maq[i][1];
                    break;
                default:
                    break;
            }
        }

    }
    //console.log(_maq);
    //params.trackEvent = eventDataArgs;

    var times = function(){
        var timing = performance.timing; //获取页面加载时间
        var loadTime = timing.loadEventEnd - timing.navigationStart;//过早获取时,loadEventEnd有时会是0
        if(loadTime <= 0) {
        // 未加载完，延迟200ms后继续times方法，直到成功
            setTimeout(function(){
                times();
            }, 200);
            return;
        }
        params.loadTime = loadTime;   //从开始至load总耗时 时间(ms)   过早获取时,loadEventEnd有时会是0  
        params.readyStart = timing.fetchStart - timing.navigationStart;   //准备新页面时间耗时 时间(ms)
        params.redirectTime = timing.redirectEnd  - timing.redirectStart; //redirect 重定向耗时 时间(ms)
        params.appcacheTime = timing.domainLookupStart  - timing.fetchStart;  //Appcache 耗时 时间(ms)
        params.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;  //unload 前文档耗时 时间(ms)
        params.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;  //DNS 查询耗时 时间(ms)
        params.connectTime = timing.connectEnd - timing.connectStart;  //TCP连接耗时 时间(ms)
        params.requestTime = timing.responseEnd - timing.requestStart; //request请求耗时 时间(ms)
        params.initDomTreeTime = timing.domInteractive - timing.responseEnd;  //请求完毕至DOM加载 时间(ms)
        params.domReadyTime = timing.domComplete - timing.domInteractive; //解释dom树耗时 时间(ms)  过早获取时,domComplete有时会是0
        params.loadEventTime = timing.loadEventEnd - timing.loadEventStart; //load事件耗时 时间(ms)


        

        //拼接参数串
        var args = '';
        for (var i in params) {
            //console.log(i);
            if (args != '') {
                args += '&';
            }
            //args += i + '=' + params[i];   //将所有获取到的信息进行拼接
            args += i + '=' + encodeURIComponent(encodeURIComponent(params[i]));
        }

        //接收事件触发传值并拼接
        if(eventArgs != ''&& eventArgs != undefined ){
            args += '&';
            args += eventArgs;
            
        }
        // console.log(params);
        // console.log(args);

        //通过Image对象请求后端脚本
        // var img = new Image(1, 1);
        // var hostname = window.location.hostname; //当前域名
        // var isFlghtEnvironment = /^www.ce-air.com/.test(hostname); //是否为机上环境
        // if (isFlghtEnvironment) {
        //     var maBaseUrl = 'http://10.10.20.23'; //正式服务器地址
        // }else {
        //     var maBaseUrl = 'http://139.217.24.107:8088'; //测试服务器地址
        // }

        getHash().then(res => {
            $.ajax({
                type: "GET",
                url: dataHost + '/trace/log?' + args,
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                    "token": res.token,
                    "cache-control": "no-cache"
                },
                dataType: "json",
                success: function(data){
                    //console.log(data)
                },
                error: function(e){
                    //console.log(e);
                }
            });
        }).catch(e => {
            //console.log('获取token失败，错误信息:', e);
        });



        //var src = maBaseUrl + '/log.gif?' + args;
        //var src = maBaseUrl +'/api/go'+ '/log.gif?' + args;
        //img.src = src;
    }
    times();


};
//sendData(flighInfo);

//事件触发函数
function sendEventLog(_maq,flighInfo,eventData) {
    //拼接参数串
    var eventDataArgs = '';
    for (var i in eventData) {
        if (eventDataArgs != '') {
            eventDataArgs += '&';
        }
        //eventDataArgs += i + '=' + eventData[i];   //将所获取到的传参信息进行拼接
        eventDataArgs += i + '=' + encodeURIComponent(encodeURIComponent(eventData[i]));
    }
    sendData(_maq,flighInfo,eventDataArgs); 
}  


export {
    sendData,
    sendEventLog
};