require('../../css/order.scss');
require('../../css/messagebox.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import {getN,apiHost,dataHost,isCeair,isNative,isGround,getHash,resTimeout,getQueryString,checkLogin,eventLog} from 'nativeA';
import {isIos} from "../modules/method.js";
import loading from 'loading';
import headerNav from 'headerNav';
import popLayer from 'pop-layer';
import {Alert, Confirm, Toast, Loading} from 'wc-messagebox';
import {setCookie, getCookie} from '../modules/cookie.js';
import FastClick from 'fastclick';

Vue.use(Resource);
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Toast)
Vue.use(Loading)
//接口超时方法
Vue.http.interceptors.push((request, next) => {
    let timeout;
    // 如果某个请求设置了_timeout,那么超过该时间，会终端该（abort）请求,并执行请求设置的钩子函数onTimeout方法，不会执行then方法。
    if (request._timeout) {
      timeout = setTimeout(() => {
          if(request.onTimeout) {
            request.onTimeout(request);
            request.abort();
          }
      }, request._timeout);
    }
    next((response) => {
      clearTimeout(timeout);
      return response;
    });
  });

window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');
    //强制修改app最新版本
    NATIVEPARAM.version = "4.2.0";

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            show_msg: "",
            apiHost: apiHost,
            isNative: isNative,
            showNav: NATIVEPARAM.showNav,
            dataToken:"",
            timeout:resTimeout,//请求超时时间
            uuid:"",   //用户id
            access_token:"", // 用户登录token
            orderID:"",  //电影订单id
            movieUrl:"", //电影机上路径
            movieID:"",  //电影id
            movieMD5:"",
            moviePoster:"",
            movieName:"",
            moviePrice:"",//电影价格
            cardList:[],//卡列表
            payWayList:[],//支付方式
            selectPayWay:'',
            current: -1,  // 默认不选择支付方式
            flightInfo:{},//航班信息
            cardSelected: '已绑卡用户无密支付', //绑卡支付默认值
            tokenSeq:'',//绑卡支付tokenSeq值
            redirectInfo: '', //银行卡支付提交到东航的地址
            alipayForm:'',//支付宝回调form
            paymentOrderID:'', //支付订单id
            orderCountdown:'15:00', //订单倒计时 默认15:00
            orderMinutes: 14, //倒计时分钟
            orderSeconds:59,  //倒计时秒 
            payCountDown:0,
            orderIntervel:'', //倒计时定时器
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted(){
            var _this = this;
            checkLogin();
            _this.uuid = getQueryString("uuid"); //用户id
            _this.orderID = getQueryString("orderID"); //电影订单id
            _this.movieUrl = getQueryString("movieUrl"); //电影机上路径
            _this.movieID = getQueryString("tag"); //电影id
            _this.movieMD5 = getQueryString("movieMD5"); //机上电影MD5
            _this.movieName = getQueryString("movieName"); //机上电影名字
            
            _this.moviePoster = getQueryString("moviePoster"); //机上电影封面
            _this.access_token = getCookie('access_token');
            _this.getFlightInfo();
            getHash().then(res => {
                _this.dataToken = res.token;
                _this.getPayWayData(_this.uuid,_this.orderID,_this.dataToken,_this.access_token);
            }).catch(e => {
                console.log('获取token失败，错误信息:', e);
            });


            var visChangeStartTime,visChangeEndTime,visChangeStopTime,curCountDownTime;
            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState == 'hidden') {
                    visChangeStartTime = new Date().getTime();
                    curCountDownTime = _this.payCountDown
                }else{
                    visChangeEndTime = new Date().getTime(); 
                    visChangeStopTime = parseInt((visChangeEndTime-visChangeStartTime)/1000);    //为秒 
                    if(parseInt(curCountDownTime-_this.payCountDown)+2 < visChangeStopTime){
                        _this.payCountDown = _this.payCountDown - visChangeStopTime
                        if(_this.payCountDown<=0){
                            _this.payCountDown=0;
                        };
                        _this.orderMinutes = parseInt(_this.payCountDown/60);
                        if(_this.orderMinutes<10){
                            _this.orderMinutes = '0'+_this.orderMinutes
                        }
                        _this.orderSeconds = _this.payCountDown%60;
                        if(_this.orderSeconds<10){
                            _this.orderSeconds = '0'+_this.orderSeconds
                        }
                        _this.orderCountdown = _this.orderMinutes +':'+ _this.orderSeconds;
                        _this.getCountdown();
                    } 
                    console.log(visChangeStopTime);   
                }
            });
 
        },
        watch:{
            dataToken: function (curVal,oldValue) {
                var _this = this;
                _this.dataToken = curVal;
                //console.log(_this.dataToken);
            },
            payCountDown: function (curVal,oldValue) {
                var _this = this;
                _this.payCountDown = curVal;
                //console.log(_this.orderCountdown);
            },
            orderCountdown: function (curVal,oldValue) {
                var _this = this;
                _this.orderCountdown = curVal;
                //console.log(_this.orderCountdown);
            }
            
        },
        methods:{
            //获取支付方式信息
            getPayWayData:function (uuid,orderID,token,access_token){
                var _this = this;
                let payWayApiUrl = dataHost +'/eastopay/order/getPayWay?' + querystring.stringify({
                    param: JSON.stringify({
                        "uuid": uuid,    //用户id
                        "orderID": orderID,      //订单id
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "time": new Date().getTime()
                    })
                });
                _this.isWaiting = true;
                //let payWayApiUrl = "/images/tmp/get_pay_way.json";
                _this.$http.get(
                    payWayApiUrl,
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            _this.isWaiting = false;
                            _this.showLayer("showMsg", "请求超时");
                        }
                    }
                ).then((res) => {
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        
                        var payWayData = res.body;
                        var msg = payWayData.msg;
                        var status = payWayData.status; //"200"成功,"101"表示参数错误，"102"找不到订单"
                        if(status=='200'){

                            _this.payCountDown = payWayData.data.payCountDown;

                            

                            if(_this.payCountDown<=0){
                                _this.payCountDown=0;
                            };
                            _this.orderMinutes = parseInt(_this.payCountDown/60);
                            if(_this.orderMinutes<10){
                                _this.orderMinutes = '0'+_this.orderMinutes
                            }
                            _this.orderSeconds = _this.payCountDown%60;
                            if(_this.orderSeconds<10){
                                _this.orderSeconds = '0'+_this.orderSeconds
                            }
                            _this.orderCountdown = _this.orderMinutes +':'+ _this.orderSeconds;
                            _this.getCountdown();
                            _this.orderIntervel = setInterval(function(){ 
                                _this.payCountDown--;
                                _this.getCountdown() 
                            },1000);
                            _this.moviePrice = payWayData.data.orderAmount;
                            payWayData.data.payWayList.forEach(function(item,index,arr){
                                // item:循环结果 index:下标 arr:原数组
                                // "airPay":"机上跳转页面支付",
                                // "tokenConsume":"机上token支付",
                                // "ifePay":"IFE—POST支付",
                                // "register":"用户绑定",
                                // "stdTokenConsume":"地面token支付",
                                // "groundPay":"地面跳转页面支付",
                                if(item.serviceName == 'airPay'){
                                    _this.payWayList.push("银行卡支付");
                                    //_this.redirectInfo = item.redirectInfo;
                                }
                                if(item.serviceName == 'tokenConsume'){
                                    if(item.bankCardList.length>0){
                                        _this.payWayList.unshift("已绑卡快捷支付");
                                        _this.cardList = item.bankCardList;
                                    }
                                }
                                if(item.serviceName == 'alipay'){
                                    _this.payWayList.push("支付宝支付");
                                }
                                if(item.serviceName == 'wechatpay'){
                                    _this.payWayList.push("微信支付");
                                     
                                }
                            });
                            if(_this.payWayList.length==1){
                                _this.current=0; 
                                _this.selectPayWay = _this.payWayList[0];
                                if(_this.payWayList[0]=="已绑卡快捷支付"){
                                    _this.cardSelected = _this.cardList[0].cardNum;
                                    _this.current=0;
                                }
                            };
                            
                            console.log(_this.payWayList);
                            return false;
                        }
                        if(status=='101'){
                            console.log('参数错误'); 
                            _this.$alert({
                                title: '参数错误',
                                btnText: '知道了',
                            })
                            return false;
                        }
                        if(status=='102'){
                            console.log('找不到此订单');                   
                            _this.$alert({
                                title: '找不到此订单',
                                btnText: '知道了',
                            })
                            
                            return false;
                        }
                    }else{
                        _this.showLayer("showMsg", res.body.msg);
                    }
                },() => {
                    _this.isWaiting = false;
                    _this.showLayer("showMsg", "网络请求错误");
                })
            },
            //该航班信息
            getFlightInfo:function () {
                var _this = this;
                $.get(apiHost +"/api/flight"+"?time="+ ((new Date()).getTime()), function(data){
                    _this.flightInfo = data;
                });
            },
            //执行toast弹出层
            showLayer(type,v,auto){    
                var _this = this;
                if(type == "show"){
                    _this.isShow = v;
                }else if(type == "showMsg"){
                    _this.show_msg = v;
                }
                if(!auto){
                    if(_this.timeId){clearTimeout(_this.timeId);}
                    _this.timeId = setTimeout(()=>{
                        _this.isShow = false;
                        _this.show_msg = "";
                    },2000);
                }
            },
            //点击同意支付
            payStart(){
                var _this = this;
                
                //未选支付方式
                if(_this.selectPayWay==""){
                    _this.$alert({
                        title: "请选择支付方式",
                        btnText: '知道了',
                    })
                    return false;
                }
                //选银行卡支付
                if(_this.selectPayWay=='银行卡支付'){
                    //提交信息到东航
                    //$("#airpayForm").submit();
                    //提交支付宝信息
                    _this.airPay(_this.uuid,_this.orderID,_this.dataToken,_this.access_token);
                    return false;
                }
                //已绑卡支付
                if(_this.selectPayWay=='已绑卡快捷支付'){
                    console.log(_this.cardList);
                    _this.cardList.forEach(function(item,index,arr){
                        if(item.cardNum == _this.cardSelected){
                            _this.tokenSeq = item.tokenSeq;
                        }
                    });

                    //提交绑卡支付信息
                    _this.tokenConsume(_this.uuid,_this.orderID,_this.tokenSeq,_this.cardSelected,_this.dataToken,_this.access_token);
                    return false;
                }
                //支付宝支付
                if(_this.selectPayWay=='支付宝支付'){
                    _this.checkPay(_this.uuid,_this.orderID,_this.dataToken,_this.access_token,'alipay')
                    //提交支付宝信息
                    //_this.alipay(_this.uuid,_this.orderID,_this.dataToken,_this.access_token);
                    return false;
                }
                //微信支付
                if(_this.selectPayWay=='微信支付'){
                    //提交微信支付信息
                    _this.checkPay(_this.uuid,_this.orderID,_this.dataToken,_this.access_token,'wechatpay')
                    //_this.wechatpay(_this.uuid,_this.orderID,_this.dataToken,_this.access_token);
                    return false;
                }

            },
            //选择支付方式
            payWaySelect(index,payWay){
                this.current=index;
                this.selectPayWay = payWay;
            },
            //已绑卡支付发送数据
            tokenConsume(uuid,orderID,tokenSeq,cardNum,token,access_token){
                var _this = this;
                _this.isWaiting = true;
                var tokenConsumeUrl = dataHost + `/eastopay/eastopay/tokenConsume?` + querystring.stringify({
                    param: JSON.stringify({
                        "uuid": uuid,
                        "orderID": orderID,
                        "tokenSeq":tokenSeq,
                        "cardNum": cardNum,
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "time": new Date().getTime()
                    })
                });
                _this.$http.get(
                    tokenConsumeUrl, 
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            _this.isWaiting = false;
                            _this.showLayer("showMsg", "请求超时");
                        }
                    }
                ).then((res)=>{
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        var data = res.body.data;
                        var status = res.body.status
                        if (status === 200) {
                            //支付成功
                            let paymentOrderID = data.paymentOrderID;
                            let payCallBackUrl = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&paymentOrderID="+paymentOrderID+"&referrer=pay"+"&rotate=true";

                            window.location.href = payCallBackUrl;
                        }else if(status === 1020){
                            //找不到订单
                            this.$alert({
                                title: '找不到订单',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 1050){
                            //第三方接口错误
                            this.$alert({
                                title: '第三方接口错误',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2000){
                            //支付已完成
                            let paymentOrderID = data.paymentOrderID;
                            let payCallBackUrl = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&paymentOrderID="+paymentOrderID+"&rotate=true";

                            this.$alert({
                                title: '支付已完成, 请返回观看影片',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = payCallBackUrl;
                            })
                            return false
                            
                        }else if(status === 2650){
                            //航班信息无效
                            this.$alert({
                                title: '本次航班暂不支持售票',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2740){
                            //订单已过期
                            this.$alert({
                                title: '订单已过期, 请重新下单',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = "movie-detail.html?tag="+_this.movieID;
                            })
                            return false
                        }
                        else{
                            //支付失败
                            this.$confirm({
                                title: '支付失败',
                                content: "",
                                yesStyle: {}, // 设置左边按钮样式
                                yesText: '取消',  // 左边按钮文本,
                                noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                                noText: '重新支付'   // 设置右边按钮文本
                            }).then(res => {
                                // 点取消时触发
                                
                            }).catch(e => {
                                // 点确认时触发
                                _this.tokenConsume(_this.uuid,_this.orderID,_this.tokenSeq,_this.cardSelected,_this.dataToken,_this.access_token);
                            })
                            
                        }
                        //window.location.href = payCallBackUrl;
                    }else{
                        _this.showLayer("showMsg", res.body.msg);
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.showLayer("showMsg", "网络请求错误");
                });
            },
            //银行卡支付
            airPay(uuid,orderID,token,access_token){
                var _this = this;
                _this.isWaiting = true;
                var payUrl = dataHost + `/eastopay/eastopay/airPay?` + querystring.stringify({
                    param: JSON.stringify({
                        "uuid": uuid,
                        "orderID": orderID,
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        //"time": new Date().getTime()
                    })
                });
                _this.$http.get(
                    payUrl, 
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            _this.isWaiting = false;
                            _this.showLayer("showMsg", "请求超时");
                        }
                    }
                ).then((res)=>{
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        var data = res.body.data;
                        var status = res.body.status
                        if (status === 200) {
                            //支付成功
                            let paymentOrderID = data.paymentOrderID;
                            let payCallBackUrl = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&paymentOrderID="+paymentOrderID+"&referrer=pay"+"&rotate=true";
                            _this.redirectInfo = data.redirectInfo;
                            _this.$nextTick(()=>{
                                $("#airpayForm").submit();
                            });
                        }else if(status === 1020){
                            //找不到订单
                            this.$alert({
                                title: '找不到订单',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 1050){
                            //第三方接口错误
                            this.$alert({
                                title: '第三方接口错误',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2000){
                            //支付已完成
                            let paymentOrderID = data.paymentOrderID;
                            let payCallBackUrl = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&paymentOrderID="+paymentOrderID+"&rotate=true";

                            this.$alert({
                                title: '支付已完成, 请返回观看影片',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = payCallBackUrl;
                            })
                            return false
                            
                        }else if(status === 2650){
                            //航班信息无效
                            this.$alert({
                                title: '本次航班暂不支持售票',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2740){
                            //订单已过期
                            this.$alert({
                                title: '订单已过期, 请重新下单',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = "movie-detail.html?tag="+_this.movieID;
                            })
                            return false
                        }else{
                            //支付失败
                            this.$confirm({
                                title: '支付失败',
                                content: "",
                                yesStyle: {}, // 设置左边按钮样式
                                yesText: '取消',  // 左边按钮文本,
                                noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                                noText: '重新支付'   // 设置右边按钮文本
                            }).then(res => {
                                // 点取消时触发
                                
                            }).catch(e => {
                                // 点确认时触发
                                _this.airPay(_this.uuid,_this.orderID,_this.dataToken,_this.access_token);
                            })
                            
                        }
                        //window.location.href = payCallBackUrl;
                    }else{
                        _this.showLayer("showMsg", res.body.msg);
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.showLayer("showMsg", "网络请求错误");
                });
            },
            //支付宝支付
            alipay(uuid,orderID,token,access_token){
                var _this = this;
                _this.isWaiting = true;
                var payUrl = dataHost + `/eastopay/alipay/pay?` + querystring.stringify({
                    param: JSON.stringify({
                        "uuid": uuid,
                        "orderID": orderID,
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "time": new Date().getTime()
                    })
                });
                _this.$http.get(
                    payUrl, 
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            _this.isWaiting = false;
                            _this.showLayer("showMsg", "请求超时");
                        }
                    }
                ).then((res)=>{
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        var data = res.body.data;
                        var status = res.body.status
                        if (status === 200) {
                            //支付成功
                            _this.alipayForm = data.form;
                            _this.$nextTick(()=>{
                                document.forms[0].submit();
                            });
    
                        }else if(status === 1020){
                            //找不到订单
                            this.$alert({
                                title: '找不到订单',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 1050){
                            //第三方接口错误
                            this.$alert({
                                title: '第三方接口错误',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2000){
                            let paymentOrderID = data.paymentOrderID;
                            let payCallBackUrl = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&paymentOrderID="+paymentOrderID+"&rotate=true";
                            //支付已完成
                            this.$alert({
                                title: '支付已完成, 请返回观看影片',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = payCallBackUrl;
                            })
                            return false
                            
                        }else if(status === 2650){
                            //航班信息无效
                            this.$alert({
                                title: '本次航班暂不支持售票',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2740){
                            //订单已过期
                            this.$alert({
                                title: '订单已过期, 请重新下单',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = "movie-detail.html?tag="+_this.movieID;
                            })
                            return false
                        }
                        else{
                            //支付失败
                            this.$confirm({
                                title: '支付失败',
                                content: "",
                                yesStyle: {}, // 设置左边按钮样式
                                yesText: '取消',  // 左边按钮文本,
                                noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                                noText: '重新支付'   // 设置右边按钮文本
                            }).then(res => {
                                // 点取消时触发
                                
                            }).catch(e => {
                                // 点确认时触发
                                _this.alipay(_this.uuid,_this.orderID,_this.dataToken,_this.access_token);
                            })
                            
                        }
                        //window.location.href = payCallBackUrl;
                    }else{
                        _this.showLayer("showMsg", res.body.msg);
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.showLayer("showMsg", "网络请求错误");
                });
            },
            //微信支付
            wechatpay(uuid,orderID,token,access_token){
                var _this = this;
                _this.isWaiting = true;
                var payUrl = dataHost + `/eastopay/wechatpay/pay?` + querystring.stringify({
                    param: JSON.stringify({
                        "uuid": uuid,
                        "orderID": orderID,
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "time": new Date().getTime()
                    })
                });
                _this.$http.get(
                    payUrl, 
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            _this.isWaiting = false;
                            _this.showLayer("showMsg", "请求超时");
                        }
                    }
                ).then((res)=>{
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        var data = res.body.data;
                        var status = res.body.status
                        if (status === 200) {
                            //支付成功
                            let redirectInfo = data.redirectInfo;
                            let paymentOrderID = data.paymentOrderID;
                            let payCallBackUrl = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&paymentOrderID="+paymentOrderID+"&referrer=pay"+"&rotate=true";
 
                            window.location.href = redirectInfo;
                        }else if(status === 1020){
                            //找不到订单
                            this.$alert({
                                title: '找不到订单',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 1050){
                            //第三方接口错误
                            this.$alert({
                                title: '第三方接口错误',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2000){
                            //支付已完成
                            let paymentOrderID = data.paymentOrderID;
                            let payCallBackUrl = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&paymentOrderID="+paymentOrderID+"&rotate=true";
                            this.$alert({
                                title: '支付已完成, 请返回观看影片',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = payCallBackUrl;
                            })
                            return false
                            
                        }else if(status === 2650){
                            //航班信息无效
                            this.$alert({
                                title: '本次航班暂不支持售票',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2740){
                            //订单已过期
                            this.$alert({
                                title: '订单已过期, 请重新下单',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = "movie-detail.html?tag="+_this.movieID;
                            })
                            return false
                        }
                        else{
                            //支付失败
                            this.$confirm({
                                title: '支付失败',
                                content: "",
                                yesStyle: {}, // 设置左边按钮样式
                                yesText: '取消',  // 左边按钮文本,
                                noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                                noText: '重新支付'   // 设置右边按钮文本
                            }).then(res => {
                                // 点取消时触发
                                
                            }).catch(e => {
                                // 点确认时触发
                                _this.wechatpay(_this.uuid,_this.orderID,_this.dataToken,_this.access_token);
                            })
                            
                        }
                        //window.location.href = payCallBackUrl;
                    }else{
                        _this.showLayer("showMsg", res.body.msg);
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.showLayer("showMsg", "网络请求错误");
                });
            },
            //订单倒计时
            getCountdown (){
                var _this = this;
                _this.orderCountdown = _this.orderMinutes +':'+ _this.orderSeconds
                 if( parseInt(_this.orderMinutes) == 0 && parseInt(_this.orderSeconds) == 0 ){
                    console.log("倒计时结束");
                    clearInterval(_this.orderIntervel);
                 }else if( parseInt(_this.orderMinutes) >= 0 ){
                     if( parseInt(_this.orderSeconds) > 0 ){
                        _this.orderSeconds--;
                        //console.log(_this.orderSeconds);
                        if( _this.orderSeconds < 10){
                            _this.orderSeconds = '0'+ _this.orderSeconds;
                        }
                     }else if( parseInt(_this.orderSeconds) == 0 ){
                        _this.orderMinutes--;
                        if( parseInt(_this.orderMinutes) < 10){
                            _this.orderMinutes = '0'+ _this.orderMinutes;
                        }
                        _this.orderSeconds = 59;
                     }
                 }            
            },
            //校验点击微信或支付宝时订单是否支付过
            checkPay(uuid,orderID,token,access_token,payMethod){
                var _this = this;
                _this.isWaiting = true;
                var payUrl = dataHost + `/eastopay/eastopay/checkPay?` + querystring.stringify({
                    param: JSON.stringify({
                        "uuid": uuid,
                        "orderID": orderID,
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "time": new Date().getTime()
                    })
                });
                _this.$http.get(
                    payUrl, 
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            _this.isWaiting = false;
                            _this.showLayer("showMsg", "请求超时");
                        }
                    }
                ).then((res)=>{
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        var data = res.body.data;
                        var status = res.body.status
                        if (status === 200) {
                            //判断用户是否连接互联网
                            var host = window.location.host;
                            var hostname = window.location.hostname;
                            var deviceType = "h5";
                            //判断是否是app环境
                            if(isNative){
                                //判断是否是安卓环境
                                if(!isIos){
                                    deviceType = "android";
                                }else{
                                    deviceType = "ios";
                                }
                            }else{
                                deviceType = "h5";
                            }
                            
                            _this.payOnline(host,hostname,payMethod,deviceType)
                        }else if(status === 1020){
                            //找不到订单
                            this.$alert({
                                title: '找不到订单',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 1050){
                            //第三方接口错误
                            this.$alert({
                                title: '第三方接口错误',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2000){
                            //支付已完成
                            let paymentOrderID = data.paymentOrderID;
                            let payCallBackUrl = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&paymentOrderID="+paymentOrderID+"&rotate=true";
                            this.$alert({
                                title: '支付已完成, 请返回观看影片',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = payCallBackUrl;
                            })
                            return false
                            
                        }else if(status === 2650){
                            //航班信息无效
                            this.$alert({
                                title: '本次航班暂不支持售票',
                                btnText: '确定'   
                            })
                            return false
                        }else if(status === 2740){
                            //订单已过期
                            this.$alert({
                                title: '订单已过期, 请重新下单',
                                btnText: '确定'   
                            }).then(res => {
                                window.location.href = "movie-detail.html?tag="+_this.movieID;
                            })
                            return false
                        }
                        else{
                            this.$alert({
                                title: '网络请求错误',
                                btnText: '刷新重试'   
                            }).then(res => {
                                window.location.href = location.href;
                            })
                            
                        }
                        //window.location.href = payCallBackUrl;
                    }else{
                        _this.showLayer("showMsg", "网络请求错误");
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.showLayer("showMsg", "网络请求错误");
                });
            },
             //判断用户是否连接互联网
            payOnline(host,hostname,payMethod,deviceType){
                var _this = this;
                
                var hostname = window.location.hostname;
                var host = window.location.host;
                //var isCeair = /^www.ce-air.com|^ce-air.com|^agcs.ceair.com/.test(hostname); // 是否为机上环境
                //var isGround = /^10\.10\.55\.60|^paytest.dongxingji.cn/.test(hostname); // 是否为本地模拟环境或微信支付环境
                var dxjBaseUrl="";
                 if (isGround) {
                    console.log("本地模拟环境");
                    dxjBaseUrl =  'http://paytest.dongxingji.cn/';
                }else {
                    if(isCeair){
                        console.log("东航模拟环境、飞机正式环境");
                        dxjBaseUrl =  'http://pay.dongxingji.cn/';
                    }else{
                        console.log("本地localhost环境");
                        dxjBaseUrl =  'http://paytest.dongxingji.cn/';
                    }
                }

                $.ajax({
                    type: "GET",
                    url: dxjBaseUrl+"net",
                    success: function(data){
                        console.log('已联网');
                        let dxjPayBefore = "http://dongxingji.cn/dxj/topic/pay/before.html";
                        //let dxjPayBefore = "http://10.10.33.145:8090/pay/before.html";
                        var ip = data.data.ip;
                        console.log(ip);
                        window.location.href = dxjPayBefore+"?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(decodeURI(escape(_this.movieName)))+"&moviePoster="+_this.moviePoster+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&referrer=pay"+"&rotate=true"+"&hostname="+hostname+"&host="+host+"&clientIP="+ip+"&payMethod="+payMethod+"&deviceType="+deviceType+'&browse=hmouter&HMappPay=true';
                    },
                    error: function(e){
                        console.log('未联网');
                        //支付失败
                        _this.$confirm({
                            title: '未连接互联网',
                            content: "",
                            yesStyle: {}, // 设置左边按钮样式
                            yesText: '取消',  // 左边按钮文本,
                            noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                            noText: '去连网'   // 设置右边按钮文本
                        }).then(res => {
                            // 点取消时触发
                            
                        }).catch(e => {
                            // 点确认时触发
                            window.location.href = "http://www.ce-air.com/?inet=1&browse=hmouter"
                        })
                    }
                });
                
            },

            
        },
        components: {
            loading,
            headerNav,
            popLayer
        }
    });

});