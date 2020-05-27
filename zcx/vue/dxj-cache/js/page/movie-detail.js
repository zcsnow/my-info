require('../../css/movie-detail.scss');
require('../../css/messagebox.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axiosServer from 'axiosServer';
import {getN,apiHost,dataHost,isCeair,isNative,utcTime,dataVersion,isGround,getHash,resTimeout,getQueryString,eventLog,Fingerprint2} from 'nativeA';
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
            baseUrl: '',
            isNative: isNative,
            showNav: NATIVEPARAM.showNav,
            dataToken: "",
            movieData:[],
            fold:true,
            toggle_btn_text:'展开',
            buyNavShow: false, //底部购买电影导航
            playBtnShow: true, //播放按钮
            btnTipShow: true, //按钮底部提示文字
            flightBuyMovieInfo: {}, //该航班电影是否可买信息
            isLogined: false,  //是否登录了
            initStatusCode: "200", //状态码 "200"表示可以购买，"101"表示参数错误，"103"表示已经有一个支付过能看的的电影了，"104"表示库存已满，"110"表示可以直接观看
            btn_disabled:false,
            btn_text:"播放", //按钮文字
            btn_tip:"", 
            tip_msg: "", //提示信息
            uuid:"",   //用户id
            phone:"",  //用户手机号
            access_token:"", // 用户登录token
            orderID:"",  //电影订单id
            movieUrl:"", //电影机上路径
            movieMD5:"", //电影机上MD5 id
            movieID:"",  //电影id
            movieLength:3,//电影时长
            dxjResourceDir:"",//获取机上静态资源目录
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            dxjFilmDir:"",//机上电影目录
            timeout:resTimeout, //请求超时时间
            fingerprint:"", //浏览器指纹
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted(){
            var _this = this;    
                //机上电影信息
                _this.movieID = getQueryString("tag"); //电影id
                //_this.movieUrl = getQueryString("movieUrl"); //机上电影路径
                _this.isWaiting = true;
                getHash().then(res => {
                    _this.dataToken = res.token;

                    //飞机机型是否是BC03
                    var planeType = res.planeType;
                    if(planeType=="00"){
                        _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
                    }else if(planeType=="bc03"){
                        _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
                    }else{
                        _this.dxjResourceDir = res.hash;//获取机上静态资源目录
                    }

                    //_this.dxjFilmDir = res.hash;
                    //获取电影详情
                    _this.getDxjJsonData()  //获取飞机本地资源
                    //setTimeout(function(){
                        _this.getMovieDetailcacheData(utcTime,_this.movieID,_this.dataToken);//获取cache资源
                    //},5000)
                    //_this.getMovieDetailData(_this.movieID,_this.dataToken);

                }).catch(e => {
                    console.log('获取token失败，错误信息:', e);
                });
        },

        methods:{
            getDxjJsonData:function (){
                //获取机上静态资源数据
                var _this = this;
                let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/movie/' + _this.movieID.substring(6)+'.json';
                axiosServer(jsonSrc,"get",{},'').then((res) => {
                    if(_this.isCacheDataLoad){
                        return false
                    }
                    _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
                    _this.movieDetailShow(res,_this.dataToken);
                },(err) => {
                    console.log(err)
                });
            },
            getMovieDetailcacheData(planeData,movieID,dataToken) {
                var _this = this;
                var movieCahcheUrl = apiHost + '/app/dxj/cache/' + dataVersion + '/movie/' + movieID.substring(6)  + planeData;
                //请求本地缓存数据
                _this.isWaiting = true;
                _this.getMovieDetailFun(movieCahcheUrl,{},'',function(){
                    //请求服务器数据
                    _this.$nextTick(()=>{
                        let movieApiUrl = dataHost +'/v1/detail/index';
                        let param = {
                                param: JSON.stringify({
                                    "version": NATIVEPARAM.version,
                                    "environment":'plan',
                                    "platform": '4',
                                    "tag":movieID      //电影id
                                })
                            };
                        
                        _this.getMovieDetailFun(movieApiUrl,param,dataToken)

                    });
                })

            },
            //获取电影详情数据
            getMovieDetailData:function (movieID,token){
                var _this = this;

                let movieApiUrl = dataHost +'/v1/detail/index';
                let param = {
                        param: JSON.stringify({
                            "version": NATIVEPARAM.version,
                            "environment":'plan',
                            "platform": '4',
                            "tag":movieID      //电影id
                        })
                    };
                
                this.getMovieDetailFun(movieApiUrl,param,token)

            },
            getMovieDetailFun:function (url,param,token,callback){
                var _this = this;
                _this.isWaiting = true;
                axiosServer(url,"get",param,token).then((res) => {
                    _this.isWaiting = false;
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    //console.log(res)
                    _this.movieDetailShow(res,_this.dataToken);
                },(err) => {
                    //_this.isWaiting = false;
                    console.log(err)
                    callback();
                    
                });
            },
            movieDetailShow:function(res,token){
                var _this = this;
                if (res.status === 200) {
                    _this.movieData = res.data;
                    _this.movieData.row_image = _this.baseUrl+_this.movieData.row_image;
                    if(_this.movieData.status==1){
                        _this.buyNavShow = true;
                        _this.tip_msg = "该电影已下架";
                        _this.btn_disabled = true;
                        _this.btn_text = _this.tip_msg;
                        _this.playBtnShow = true;
                        _this.btnTipShow = false;
                        console.log('该电影已下架');
                        return false;
                        
                    }
                    _this.btn_text = "购买￥"+ _this.movieData.price;
                    _this.playBtnShow = false;     
                    _this.movieMD5 = encodeURI(_this.movieData.url);  

                    let movie_length = parseInt(_this.movieData.length) + 30;
                    if(movie_length <= 60){
                        _this.movieLength = 1;
                    }else if(movie_length <= 90){
                        _this.movieLength = 1.5;
                    }else if(movie_length <= 120){
                        _this.movieLength = 2;
                    }else if(movie_length <= 150){
                        _this.movieLength = 2.5;
                    }else if(movie_length <= 180){
                        _this.movieLength = 3;
                    }else {
                        _this.movieLength = 3.5;
                    }
                    _this.btn_tip = "本次航班中" + _this.movieLength + "小时观影，限时特惠"

                    if(_this.movieData.name){
                        _this.title = _this.movieData.name;
                        document.title = _this.movieData.name;
                    }               
                    //如果机上电影不存在
                    if(typeof(_this.movieMD5)=="undfined" || _this.movieMD5 == "" || _this.movieMD5 == null){
                        _this.buyNavShow = true;
                        _this.tip_msg = "本次航班暂未上映，敬请期待";
                        _this.btn_disabled = true;
                        _this.btn_text = _this.tip_msg;
                        _this.playBtnShow = true;
                        _this.btnTipShow = false;
                        console.log('本次航班暂未上映，敬请期待');
                        //_this.buyNavShow = false;
                        return false;
                    }else{
                        
                        _this.getDxjfilmDir(token);
                        if(_this.dxjFilmDir == ""|| _this.dxjFilmDir == null){
                            _this.buyNavShow = true;
                            _this.tip_msg = "本次航班暂未上映，敬请期待";
                            _this.btn_disabled = true;
                            _this.btn_text = _this.tip_msg;
                            _this.playBtnShow = true;
                            _this.btnTipShow = false;
                            console.log('本次航班暂未上映，敬请期待');
                            return false;
                        }

                        if(_this.dxjFilmDir==_this.dxjResourceDir){
                            var filmPath = _this.apiHost + _this.dxjFilmDir + '/movies/page1.json';
                        }else{
                            var filmPath = _this.apiHost + _this.dxjFilmDir + '/page1.json';
                        }
                        //let filmPath = _this.apiHost + _this.dxjFilmDir + '/movies/page1.json';
                        //console.log(_this.dxjResourceDir);
                        //let filmPath = _this.apiHost + _this.dxjFilmDir + '/page1.json';
                        _this.getDxjfilmList(filmPath,_this.movieMD5)
                    }
                    
                }
            },
            //该航班飞行时间内电影是否可卖信息
            getFlightBuyMovieTimeInfo:function () {
                var _this = this;
                var flghtInfo = {};
                //航班信息接口
                $.ajax({  
                    type:"get",  
                    url: apiHost +"/api/flight"+"?time="+ ((new Date()).getTime()),
                    async: false,
                    success: function(data){  
                        let planeData = data;
                        if(data.flightNum==""){
                            planeData.flightNum = data.tailNum
                        }
                        if(data.takeoff == 'Invalid date'){
                            planeData.takeoff = data.utcTime;
                        }
                        if(data.estimated == '197001010000'){
                            planeData.estimated = planeData.takeoff;
                        }
                        planeData.flightDate=data.flightDate+'_' + data.origin +'_' + data.arrival
                        // "flightNum": "MU583",
                        // "flightDate": "20180807",
                        // "tailNum": "B-9999",
                        // "flightID": "yyqdqhe18feqjy2cd5523zrqxr",
                        // "origin": "PVG",
                        // "arrival": "LAX",
                        // "originUTCOffset": 480,
                        // "arrivalUTCOffset": -420,
                        // "takeoff": "201807070742",
                        // "estimated": "201808070742",
                        // "utcTime": "201808070742",
                        // "longitude": 0,
                        // "latitude": 0,
                        // "altitude": 0,
                        // "flightTag": "",
                        // "gcsEnabled": true

                        let utcTime = planeData.utcTime;
                        let takeoff = planeData.takeoff;
                        let estimated = planeData.estimated;

                        let DValueTime = Math.abs((_this.utcChangeTime(estimated) - _this.utcChangeTime(takeoff))/1000/3600); 
                        let landValueTime = Math.abs((_this.utcChangeTime(estimated) - _this.utcChangeTime(utcTime))/1000/3600);
                        //航班时长要大于等于3.5小时
                        /* if(DValueTime<1){
                            flghtInfo = {
                                flight:planeData,
                                flightBuyMovieTime: false,
                                flightMsg:'本次航班暂未上映，敬请期待'
                            }
                            return false;
                        }
                        //航班当前时间距离计划到达目的地时长要大于2.5小时
                        if(landValueTime<0.5){
                            flghtInfo = {
                                flight:planeData,
                                flightBuyMovieTime: false,
                                flightMsg:'本次航班已停止售票'

                            }
                            return false;
                        } */
                        flghtInfo = {
                            flight:planeData,
                            flightBuyMovieTime: true,
                            flightMsg:'电影可播放'
                        }
                    }
                });
                return flghtInfo;
            },
            //判断此用户此电影按钮状态
            getUserPayInfo:function (uuid,movieID,flightID,flightNum,flightDate,token,access_token) {
                var _this = this;
                //订单信息接口
                let orderApiUrl = dataHost +'/eastopay/order/checkMovie?' + querystring.stringify({
                    param: JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "uuid": uuid,      //用户id
                        "movieID":movieID,         //电影id
                        "legSn":flightID,          //航节号
                        "flightID":flightNum,     //航班号 
                        "flightDate":flightDate,   //航班日期 
                        //"time": new Date().getTime()
                    })
                });
                //可以直接观看
                _this.isWaiting = true;
                //let orderApiUrl = "/images/tmp/order.json";
                _this.$http.get(
                    orderApiUrl,
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token,
                            "cache-control": "no-cache"
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            // _this.isWaiting = false;
                            // _this.alertPop("网络请求错误",'刷新重试',function(){
                            //     //location.reload()
                            //     window.location.href = location.href;
                            // })
                        }
                    }
                ).then((res) => {
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        let data = res.body;
                        var msg = data.msg;
                        var status = data.status; //"200"表示可以购买，"101"表示参数错误，"103"表示已经有一个支付过能看的的电影了，"104"表示库存已满，"110"表示可以直接观看
                        _this.initStatusCode = status;
                        _this.buyNavShow = true;
                        if(status=='200'){
                            var movieStock = data.data.stock;   //库存
                            _this.btn_text = "购买￥"+ _this.movieData.price;
                            _this.playBtnShow = false;
                            //_this.isBought = data.data.isBought;
                            
                            return false;
                        }
                        if(status=='101'){
                            console.log('参数错误'); 
                            _this.tip_msg = "参数错误";
                            _this.playBtnShow = false;
                            _this.btn_text = "购买￥"+ _this.movieData.price;
                            return false;
                        }
                        if(status=='103'){
                            let watchLength = data.data.watchLength;
                            console.log('为保证全体旅客观影体验，自购买上部电影n小时后，可购买新电影'); // 买过其他电影且未超3小时
                            _this.tip_msg = "为保证全体旅客观影体验，自购买上部电影"+watchLength+"小时后，可购买新电影";
                            _this.btn_text = "购买￥"+ _this.movieData.price;
                            _this.playBtnShow = false;
                            
                            return false;
                        }
                        if(status=='104'){
                            console.log('本次航班空中院线当前暂无座位，请稍后重试'); // 库存不足提示
                            _this.tip_msg = "本次航班空中院线当前暂无座位，请稍后重试";
                            _this.btn_text = "购买￥"+ _this.movieData.price;
                            _this.playBtnShow = false;
                            
                            return false;
                        }
                        
                        if(status=='110'){
                            _this.btn_text = "播放";
                            _this.playBtnShow = true;
                            _this.orderID = data.data.orderID;
                            return false;
                        }
                        if(status=='100'){
                            _this.btn_text = "服务器异常，请稍后重试";
                            _this.playBtnShow = false;
                            
                            return false;
                        }
                        _this.alertPop("网络请求错误",'刷新重试',function(){
                            //location.reload()
                            window.location.href = location.href;
                        })
                    }else{
                        _this.alertPop("网络请求错误",'刷新重试',function(){
                            //location.reload()
                            window.location.href = location.href;
                        })
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.alertPop("网络请求错误",'刷新重试',function(){
                        //location.reload()
                        window.location.href = location.href;
                    })
                    
                });

            },

            //判断此用户此电影是否能买或者播放
            getUserPayCheckMovie:function (uuid,movieID,flightID,flightNum,flightDate,token,access_token) {
                var _this = this;
                //订单信息接口
                let orderApiUrl = dataHost +'/eastopay/order/checkMovie?' + querystring.stringify({
                    param: JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "uuid": uuid,      //用户id
                        "movieID":movieID,         //电影id
                        "legSn":flightID,          //航节号
                        "flightID":flightNum,     //航班号 
                        "flightDate":flightDate   //航班日期 
                    })
                });
                //可以直接观看
                _this.isWaiting = true;
                //let orderApiUrl = "/images/tmp/order.json";
                _this.$http.get(
                    orderApiUrl,
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token,
                            "cache-control": "no-cache"
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            // _this.isWaiting = false;
                            // _this.alertPop("网络不稳定请点击重试",'重试',function(){
                            //     window.location.href = location.href;
                            // })
                            //_this.showLayer("showMsg", "请求超时");
                        }
                    }
                ).then((res) => {
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        let data = res.body;
                        var msg = data.msg;
                        var status = data.status; //"200"表示可以购买，"101"表示参数错误，"103"表示已经有一个支付过能看的的电影了，"104"表示库存已满，"110"表示可以直接观看
                        _this.initStatusCode = status;
                        if(status=='200'){
                            _this.isBought = data.data.isBought;
                            if(_this.isBought==1){
                                _this.tip_msg = "本次观影结束,继续观看,请重新购买";
                                _this.$confirm({
                                    title: _this.tip_msg,
                                    content: "",
                                    yesStyle: {}, // 设置左边按钮样式
                                    yesText: '取消',  // 左边按钮文本,
                                    noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                                    noText: '重新购买'   // 设置右边按钮文本
                                }).then(res => {
                                    // 点yesText时触发
                                }).catch(e => {
                                    // 点noText时触发
                                    //跳转到支付页面
                                    _this.payMovieFormInfo(_this.uuid,_this.phone,_this.movieID,_this.movieUrl,_this.movieMD5,_this.movieData.name,_this.movieData.price,_this.movieData.length,_this.movieData.image,_this.dataToken,_this.access_token);
                                })
                            }
                            return false;
                        }
                        if(status=='101'){
                            _this.tip_msg = "参数错误";
                            _this.alertPop(_this.tip_msg,'知道了',function(){
                                window.location.href = location.href;
                            })
                            return false;
                        }
                        if(status=='103'){
                            let watchLength = data.data.watchLength;
                            _this.tip_msg = "为保证全体旅客观影体验，自购买上部电影"+watchLength+"小时后，可购买新电影";
                            _this.alertPop(_this.tip_msg,'知道了',function(){
                                window.location.href = location.href;
                            })
                            return false;
                        }
                        if(status=='104'){
                            _this.tip_msg = "本次航班空中院线当前暂无座位，请稍后重试";// 库存不足提示
                            _this.alertPop(_this.tip_msg,'知道了',function(){
                                window.location.href = location.href;
                            })
                            return false;
                        }
                        if(status=='110'){
                            window.location.href = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(_this.movieData.name)+"&moviePoster="+_this.movieData.row_image+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&rotate=true";
                            return false;
                        }
                        
                    }else{
                        //_this.showLayer("showMsg", res.body.msg);
                        _this.alertPop("网络请求错误",'刷新重试',function(){
                            window.location.href = location.href;
                        })
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.alertPop("网络请求错误",'刷新重试',function(){
                        window.location.href = location.href;
                    })
                    //_this.showLayer("showMsg", "网络请求错误");
                });

            },

            //获取机上电影目录或静态资源目录
            getDxjfilmDir:function (token){
                var _this = this;
                $.ajax({
                    type: "GET",
                    async:false,
                    url: apiHost + "/api/apps/contents/ces_ad",
                    headers:{"Content-Type": "application/x-www-form-urlencoded","token": token},
                    dataType: "json",
                    success: function(data){
                        //if(data.ces_ad==null){
                            _this.dxjFilmDir = _this.dxjResourceDir;
                        //}else{
                            //_this.dxjFilmDir = data.ces_ad;
                        //}
                    },
                    error: function(e){
                        console.log(e);
                        _this.dxjFilmDir = _this.dxjResourceDir;
                        
                    }
                });
            },
           
            //获取机上电影列表
            getDxjfilmList:function (url,movieMD5){
                var _this = this;
                //_this.isWaiting = true;
                axiosServer(url,"get",{},'').then((res) => {
                //$.get(url, function(res){
                    _this.isWaiting = false;
                    //console.log(res)
                    
                        let data = res.data;
                        //遍历机上电影列表
                        var isHasMovieMatch = false;
                        
                        data.list.forEach(function(item,index,arr){
                            if(item.vidoeId==decodeURI(movieMD5)){
                                isHasMovieMatch = true;
                                console.log(item.video)
                                if(_this.dxjFilmDir == _this.dxjResourceDir){
                                    _this.movieUrl = item.video;
                                }else{
                                    _this.movieUrl = _this.dxjFilmDir+item.video;
                                }
                                _this.flightBuyMovieInfo = _this.getFlightBuyMovieTimeInfo();
                                //console.log(_this.flightBuyMovieInfo)
                                //该航班时间内电影是否可卖信息
                                if(!_this.flightBuyMovieInfo.flightBuyMovieTime){
                                    console.log(_this.flightBuyMovieInfo.flightMsg);
                                    //_this.showLayer("showMsg", _this.flightBuyMovieInfo.flightMsg);
                                    //_this.buyNavShow = false;
                                    _this.btn_text = _this.flightBuyMovieInfo.flightMsg;
                                    _this.btn_disabled = true;
                                    _this.playBtnShow = true;
                                    _this.buyNavShow = true;
                                    return false;
                                    
                                }
                                if(parseFloat(_this.movieData.price)==parseFloat(0)){
                                    console.log('免费电影');
                                    if((_this.movieData.ad_sponsor!=undefined)&&Object.keys(_this.movieData.ad_sponsor).length!=0){
                                        _this.btn_text = '<span>￥'+_this.movieData.ad_sponsor.price + "</span>免费观影";
                                        _this.btn_tip = _this.movieData.ad_sponsor.title;
                                        _this.btnTipShow = true;
                                    }else{
                                        _this.btn_text = "播放";
                                        _this.btnTipShow = false;
                                       
                                    }
                                    _this.playBtnShow = true;
                                    _this.buyNavShow = true;
                                    _this.btn_disabled = false;
                                    return false;
                                }
                                //判断用户是否登录
                                if((getCookie('uuid') !== "undfined") && (getCookie('uuid') !=="") && (getCookie('uuid') !== null)){
                                    //setCookie('uuid',"dxj_01",1);
                                    _this.uuid = getCookie('uuid');
                                    _this.access_token = getCookie('access_token');
                                    _this.phone = getCookie('phone');
                                    _this.isLogined = true;
                                    let flightID =  _this.flightBuyMovieInfo.flight.flightID;
                                    let flightNum =  _this.flightBuyMovieInfo.flight.flightNum;
                                    let flightDate = _this.flightBuyMovieInfo.flight.flightDate;
                                    _this.getUserPayInfo(_this.uuid,_this.movieID,flightID,flightNum,flightDate,_this.dataToken,_this.access_token);
                                    
                                }else{
                                    //setCookie('uuid',"dxj_01",1);
                                    //setCookie('access_token',"1111",1);
                                    //_this.playBtnShow = false;
                                    _this.buyNavShow = true;
                                    _this.isLogined = false;
                                    
                                }
                                
                                
                            }
                        })
                        if(!isHasMovieMatch){
                            _this.tip_msg = "本次航班暂未上映，敬请期待";
                            _this.btn_disabled = true;
                            _this.btn_text = _this.tip_msg;
                            _this.playBtnShow = true;
                            _this.buyNavShow = true;
                            _this.btnTipShow = false;
                            console.log('本次航班暂未上映，敬请期待');
                        }
                      
                        
                    
                  
                },(err) => {
                    //_this.isWaiting = false;
                    //console.log(err)
                    //callback();
                    
                });

            },
            //航班时间转换为时间戳
            utcChangeTime:function (time) { 
                let utfYear = time.substring(0,4);
                let utfMonth = time.substring(4,6);
                let utfDate = time.substring(6,8);
                let utfhour = time.substring(8,10);
                let utfMinute = time.substring(10,12);

                let utf_time = new Date(utfYear,utfMonth-1,utfDate,utfhour,utfMinute,'00');
                let utimestamp = utf_time.getTime();
                return utimestamp;
            },
            playStart:function () {
                var _this = this;
                if(!_this.btn_disabled){
                    //跳到播放页
                    if(parseFloat(_this.movieData.price)==0){
                        if((getCookie('uuid') !== "undfined") && (getCookie('uuid') !=="") && (getCookie('uuid') !== null)){
                            _this.uuid = getCookie('uuid');
                            _this.access_token = getCookie('access_token');
                            _this.phone = getCookie('phone');
                        }
                        let flightNum =  _this.flightBuyMovieInfo.flight.flightNum;
                        let flightDate = _this.flightBuyMovieInfo.flight.flightDate;
                        new Fingerprint2().get(function(result, components) {
                            _this.fingerprint = result;
                            window.location.href = "movie-free-play.html?&fingerprint="+_this.fingerprint+"&uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(_this.movieData.name)+"&moviePoster="+_this.movieData.row_image+"&tag="+_this.movieID+"&rotate=true";

                            //_this.checkFreeMoiveInfo(_this.fingerprint,_this.uuid,_this.movieID,flightNum,flightDate,_this.dataToken,_this.dataToken);
                        });
                        
                    }else{
                        let flightID =  _this.flightBuyMovieInfo.flight.flightID;
                        let flightNum =  _this.flightBuyMovieInfo.flight.flightNum;
                        let flightDate = _this.flightBuyMovieInfo.flight.flightDate;
                        _this.getUserPayCheckMovie(_this.uuid,_this.movieID,flightID,flightNum,flightDate,_this.dataToken,_this.access_token);
                        //window.location.href = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&moviePoster="+_this.movieData.row_image+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&rotate=true";
                    }
                    
                }
            },
            //免费电影是否能播放
            checkFreeMoiveInfo:function (fingerprint,uuid,movieID,flightNum,flightDate,token,access_token){
                var _this = this;
                //免费电影观看查看接口
                let freeMovieApi = dataHost +'/eastopay/freeMovie/checkPlay?' + querystring.stringify({
                    param: JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "fingerprint": fingerprint,   //浏览器指纹
                        "uuid": uuid,      //用户id
                        "movieID":movieID,         //电影id
                        "flightID":flightNum,     //航班号 
                        "flightDate":flightDate,   //航班日期 
                        //"time": new Date().getTime()
                    })
                });
               
                _this.isWaiting = true;
                // var freeMovieApi = "/images/tmp/freeMovie.json";
                // var hostname = window.location.hostname;
                // var isGround = /^10\.10\.55\.60/.test(hostname); // 是否为本地模拟环境
                //  if (isGround) {
                //     freeMovieApi = "/dxj/images/tmp/freeMovie.json";
                // }else{
                //     freeMovieApi = "/images/tmp/freeMovie.json";
                // }
                
                _this.$http.get(
                    freeMovieApi,
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token,
                            "cache-control": "no-cache"
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            // _this.isWaiting = false;
                            // _this.alertPop("网络请求错误",'刷新重试',function(){
                            //     //location.reload()
                            //     window.location.href = location.href;
                            // })
                        }
                    }
                ).then((res) => {
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        let data = res.body;
                        var status = data.status; //
                        if(status=='200'){
                             window.location.href = "movie-free-play.html?&fingerprint="+fingerprint+"&uuid="+uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(_this.movieData.name)+"&moviePoster="+_this.movieData.row_image+"&tag="+_this.movieID+"&rotate=true";
                             
                            return false;
                        }else if(status=='101'){
                            _this.$alert({
                                title: "参数错误",
                                btnText: '知道了',
                            })
                            return false;
                        }else if(status=='104'){
                            _this.$alert({
                                title: "本次航班空中院线当前暂无座位，请稍后重试",
                                btnText: '知道了',
                            })
                            return false;
                            
                        }
                        else if(status=='105'){
                            _this.$alert({
                                title: "系统错误,请稍后重试",
                                btnText: '知道了',
                            })
                            return false;
                        }            
                        else{                    
                            _this.$alert({
                                title: "网络请求错误",
                                btnText: '重新查询',
                            }).then(res => {
                                window.location.href = location.href;
                            })
                            
                        }
                    }else{
                        //_this.showLayer("showMsg", "网络请求错误");
                        _this.$alert({
                            title: "网络请求错误",
                            btnText: '重新查询',
                        }).then(res => {
                            window.location.href = location.href;
                        })
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.$alert({
                        title: "网络请求错误",
                        btnText: '重新查询',
                    }).then(res => {
                        window.location.href = location.href;
                    })
                    //_this.showLayer("showMsg", "网络请求错误");
                });
            }, 
            payMovie:function () {
                var _this = this;
                if(_this.isLogined == false){
                    //未登录跳转到登录
                    window.location.href = "login.html?pageUrl=" + window.location.href;
                }else{
                    if(!_this.isWaiting){
                        if(_this.initStatusCode=='200'){
                            _this.payMovieFormInfo(_this.uuid,_this.phone,_this.movieID,_this.movieUrl,_this.movieMD5,_this.movieData.name,_this.movieData.price,_this.movieData.length,_this.movieData.image,_this.dataToken,_this.access_token);
                            return false;
                        }
                        if(_this.initStatusCode=='101'){
                            //_this.showLayer("showMsg", _this.tip_msg);
                            _this.$alert({
                                title: _this.tip_msg,
                                btnText: '知道了',
                            })
                            return false;
                        }
                        if(_this.initStatusCode=='103'){
                            _this.$alert({
                                title: _this.tip_msg,
                                btnText: '知道了',
                            })
                            return false;
                        }
                        if(_this.initStatusCode=='104'){
                            _this.$alert({
                                title: _this.tip_msg,
                                btnText: '知道了',
                            })
                            return false;
                        }
                    }
                    
                    
                }
                
            },
            payMovieFormInfo:function (uuid,phone,movieID,movieUrl,movieMD5,movieName,moviePrice,movieLength,moviePic,token,access_token) {
                var _this = this;
                _this.flightBuyMovieInfo = _this.getFlightBuyMovieTimeInfo();
                //该航班时间内电影是否可卖信息
                if(!_this.flightBuyMovieInfo.flightBuyMovieTime){
                    // 本次航班空中院线 已停止售票
                    _this.$alert({
                        title: _this.flightBuyMovieInfo.flightMsg,
                        btnText: '知道了',
                    })
                    _this.btn_text = _this.flightBuyMovieInfo.flightMsg;
                    _this.btn_disabled = true;
                    _this.playBtnShow = true;
                    return false;
                }
                //去支付电影信息接口
                //var hostname = window.location.hostname;
                var host = window.location.host;
                //var isCeair = /^www.ce-air.com|^ce-air.com|^agcs.ceair.com/.test(hostname); // 是否为机上环境
                //var isGround = /^10\.10\.55\.60|^paytest.dongxingji.cn/.test(hostname); // 是否为本地模拟环境或微信支付环境
                var payCallBackBaseUrl="";
                 if (isGround) {
                    console.log("本地模拟环境");
                    payCallBackBaseUrl =  window.location.protocol + '//' + host + '/dxj/html/'
                }else {
                    if(isCeair){
                        console.log("东航模拟环境、飞机正式环境");
                        payCallBackBaseUrl = window.location.protocol + '//' + host + '/app/dxj/html/'
                    }else{
                        console.log("本地localhost环境");
                        payCallBackBaseUrl = window.location.protocol + '//' + host + '/html/'
                    }
                }
                let payCallBackUrl = encodeURIComponent(payCallBackBaseUrl+"movie-play.html?uuid="+uuid+"&movieUrl="+movieUrl+"&movieMD5="+movieMD5+"&movieName="+encodeURI(_this.movieData.name)+"&tag="+movieID+"&referrer=pay"+"&rotate=true");
                let goPayApiUrl = dataHost +'/eastopay/order/goToPayMovie';
                
                 let data = {
                     param : JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "orderType": 1001,         //订单类型，电影类型：1001
                        "orderAmount":moviePrice,       //支付金额(#####.##),最多两位小数
                        "callBackInfo":payCallBackUrl,  //支付结束后的回调地址（支付成败与否都会回调该地址），后台会在此链接后追加 &orderID=12312312 
                        "receiptMerchantInfo":"",  //商户需要在支付页面或支付凭证中额外显示的信息(可不填)
                        "uuid": uuid,      //用户id
                        "phone":phone,     //用户手机号
                        "movieID":movieID,         //电影id
                        "movieName":movieName,     //电影名称 
                        "moviePic":moviePic,     //电影图片 
                        "movieLength":parseInt(movieLength),     //电影时长 
                        "terminalNetwork": "0",    //注册的商户应用将得到机上网络服务的信息。"0" - 机上网络，"1" - 地面网络
                        "terminalType":"08",       //请求必须带有正确的终端类型信息 "07" – LAPTOP,"08" – Mobile Devices
                        "tailNumber": _this.flightBuyMovieInfo.flight.tailNum,    //飞机机号  B-xxxx
                        "flightID": _this.flightBuyMovieInfo.flight.flightNum,    //航班号 
                        "flightTag": _this.flightBuyMovieInfo.flight.flightTag,   //航班标签
                        "legSn":_this.flightBuyMovieInfo.flight.flightID,         //航节号
                        "flightDate":_this.flightBuyMovieInfo.flight.flightDate,  //航班日期 (年月日yyyyMMdd)
                        "deptCode": _this.flightBuyMovieInfo.flight.origin,       //起飞城市三字码
                        "arrCode": _this.flightBuyMovieInfo.flight.arrival,       //到达城市三字码
                        "deptTime": _this.flightBuyMovieInfo.flight.takeoff,      //实际起飞时间，UTC，格式yyyyMMddHHmm
                        "arrTime": _this.flightBuyMovieInfo.flight.estimated,      //计划降落时间，UTC，格式yyyyMMddHHmm 
                        //"time": new Date().getTime()
                    })
                }
                
                _this.isWaiting = true;
                _this.btn_disabled = true;
                //let goPayApiUrl = "/images/tmp/go_pay.json";
                _this.$http.post(
                    goPayApiUrl,
                    data,
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "X-Requested-With":"XMLHttpRequest",
                            "token": token,
                            "cache-control": "no-cache"
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            // _this.isWaiting = false;
                            // _this.btn_disabled = false;
                            // _this.alertPop("网络请求超时",'刷新重试',function(){
                            //     //location.reload()
                            //     window.location.href = location.href;
                            // })
                        },
                        emulateJSON: true
                    }
                ).then((res) => {
                    _this.isWaiting = false;
                    _this.btn_disabled = false;
                    if (res.status === 200) {
                        let data = res.body;
                        var msg = data.msg;
                        var status = data.status; //"200"表示下单成功可跳转支付页面，"101"表示参数错误，"102"表示不在机上环境，"103"表示已经有一个支付过能看的的电影了，"104"表示库存已满，"105"表示系统错误请稍后重试，"110"表示可以直接观看
                        //_this.statusCode = status;
                        if(status=='200'){
                            var movieStock = data.data.stock;   //库存
                            //已登录跳转到支付页面
                            _this.orderID = data.data.orderID;
                            window.location.href = "order.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(_this.movieData.name)+"&moviePoster="+_this.movieData.row_image+"&tag="+_this.movieID+"&orderID="+_this.orderID;
                            return false;
                        }
                        if(status=='101'){
                            console.log('参数错误'); 
                            _this.tip_msg = "参数错误";
                            _this.$alert({
                                title: _this.tip_msg,
                                btnText: '知道了',
                            })
                            return false;
                        }
                        if(status=='102'){
                            console.log('不在机上环境'); 
                            _this.tip_msg = "仅限空中观看";                         
                            _this.$alert({
                                title: _this.tip_msg,
                                btnText: '知道了',
                            })
                            _this.btn_text = _this.tip_msg;
                            _this.btn_disabled = true;
                            _this.playBtnShow = true;
                            
                            return false;
                        }
                        if(status=='103'){
                            console.log('为保证全体旅客观影体验，自购买上部电影n小时后，可购买新电影'); // 买过其他电影且未超此电影时长
                            let watchLength = data.data.watchLength;
                            _this.tip_msg = "为保证全体旅客观影体验，自购买上部电影"+watchLength+"小时后，可购买新电影";                    
                            _this.$alert({
                                title: _this.tip_msg,
                                btnText: '知道了',
                            })
                            return false;
                        }
                        if(status=='104'){
                            console.log('本次航班空中院线当前暂无座位，请稍后重试'); // 库存不足提示
                            _this.tip_msg = "本次航班空中院线当前暂无座位，请稍后重试";
                            _this.$alert({
                                title: _this.tip_msg,
                                btnText: '知道了',
                            })
                            return false;
                        }
                        if(status=='105'){
                            console.log('系统错误,请稍后重试'); // 系统错误请稍后重试
                            _this.tip_msg = "系统错误,请稍后重试";
                            
                            _this.$confirm({
                                title: _this.tip_msg,
                                //content: _this.tip_msg,
                                yesStyle: {}, // 设置左边按钮样式
                                yesText: '取消',  // 左边按钮文本,
                                noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                                noText: '重试'   // 设置右边按钮文本
                            }).then(res => {
                                // 点yesText时触发
                            }).catch(e => {
                                // 点noText时触发
                                //location.reload() 
                                window.location.href = location.href;
    
                            })
                            return false;
                        }
                        if(status=='106'){
                            _this.orderID = data.orderID;
                            console.log('本次观影结束,继续观看,请重新购买'); 
                            _this.tip_msg = "本次观影结束,继续观看,请重新购买";
                            
                            _this.$confirm({
                                title: _this.tip_msg,
                                content: "",
                                yesStyle: {}, // 设置左边按钮样式
                                yesText: '取消',  // 左边按钮文本,
                                noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                                noText: '重新购买'   // 设置右边按钮文本
                            }).then(res => {
                                // 点yesText时触发
                                console.log("22")
                            }).catch(e => {
                                // 点noText时触发
                                //跳转到支付页面
                                window.location.href = "order.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(_this.movieData.name)+"&moviePoster="+_this.movieData.row_image+"&tag="+_this.movieID+"&orderID="+_this.orderID;
    
                            })
                            return false;
                        }
                        if(status=='110'){
                            _this.btn_text = "播放";
                            _this.playBtnShow = true;
                            _this.orderID = data.orderID;
                            //广告信息接口
                            // $.get("/images/tmp/ad_info.json", function(data){
                            //     console.log(data)
                            // });
                            window.location.href = "movie-play.html?uuid="+_this.uuid+"&movieUrl="+_this.movieUrl+"&movieMD5="+_this.movieMD5+"&movieName="+encodeURI(_this.movieData.name)+"&moviePoster="+_this.movieData.row_image+"&tag="+_this.movieID+"&orderID="+_this.orderID+"&rotate=true";
                            return false;
                        }
                    }else{
                        //_this.showLayer("showMsg", res.body.msg);
                        _this.alertPop("网络请求错误",'刷新重试',function(){
                            //location.reload()
                            window.location.href = location.href;
                        })
                    }
                },()=>{
                    _this.isWaiting = false;
                    _this.btn_disabled = false;
                    //_this.showLayer("showMsg", "网络请求错误");
                    _this.alertPop("网络请求错误",'刷新重试',function(){
                        //location.reload()
                        window.location.href = location.href;
                    })
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
            //展开收起内容
            showOrHide:function(){   
                this.fold = !this.fold;
                if(this.fold==true){
                    this.toggle_btn_text = '展开';
                }else{
                    this.toggle_btn_text = '收起';
                }

            },
            //通用alert弹层
            alertPop(tipMsg,btnText,callback){
                var _this = this;
                _this.$alert({
                    title: tipMsg,
                    btnText: btnText,
                }).then(res => {
                    callback();
                    //_this.goMovieDetail();
                })
            },
            
        },
        components: {
            loading,
            headerNav,
            popLayer
        }
    });

});