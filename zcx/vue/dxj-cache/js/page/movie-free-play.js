require('../../css/video-js.css');
require('../../css/movie-play.scss');
require('../../css/messagebox.scss');
require('../../css/swiper.min.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axiosServer from 'axiosServer';
import {getN,callN,apiHost,dataHost,isNative,getHash,resTimeout,getQueryString,checkLogin,eventLog,Fingerprint2} from 'nativeA';
import {isIos} from "../modules/method.js";
import loading from 'loading';
import popLayer from 'pop-layer';
import videojs from 'video.js';
//import 'videojs-contrib-hls';
import * as HLS from 'videojs-contrib-hls';
import Swiper from 'swiper';
import {setCookie, getCookie} from '../modules/cookie.js';
import {Alert, Confirm, Toast, Loading} from 'wc-messagebox';

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
            isNative: isNative,
            apiHost:apiHost,
            isShow: false,      // 显示toast
            show_msg: "",
            timeout:resTimeout,
            dataToken:"",
            showNav: NATIVEPARAM.showNav,
            eventLog:eventLog, //事件埋点发送方法
            movie:'',//电影video初始化
            uuid:"",   //用户id
            access_token:"", // 用户登录token
            orderID:"",  //电影订单id
            movieUrl:"", //电影机上路径
            dxjFilmDir:'',
            movieID:"",  //电影id
            movieName:"空中影院",
            isPlayBtnShow:false, //播放按钮是否显示
            flightInfo:{},//航班信息
            dxjAdDir:"",  //机上广告目录
            dxjResourceDir:"",
            moviePosterShow:true, //电影封面是否显示
            moviePoster:"/images/e.gif",       //电影封面
            video_sources:[],//电影资源信息
            adJson:false,
            adStartUiShow:false, //片头广告UI是否显示
            adStopUiShow:false,  //暂停广告UI是否显示
            adEndUiShow:false,   //片尾广告UI是否显示
            adStartDetailUrl:'', //片头广告详情地址
            adIframeUrl:"",
            adStartList:[], //电影片头广告列表信息
            adEndList:[], //电影片尾广告列表
            adStopList:[], //电影暂停广告列表
            adCurr:0,   //片头广告列表里当前播放的哪一个
            adStartSource:[],//电影片头广告列表视频
            adDuration:0, //广告持续时间
            adPlayedSeconds:0, //广告已播放时间
            adCurrTime:0, //广告当前显示时间
            movieIsPlay:false,
            adVoiceClose:false,//广告静音
            movieInterval:null,//判断电影是否超时的定时任务
            movieLastWatchTime:0, //电影上次播放时间停止点
            fingerprint:'',
            fullscreenToggle: false, // 是否有全屏控制按钮
            adTitle: "",
            adDetails: "",
            dxjRoot:"" //dxj根目录
        },
        mounted(){
            var _this = this;
            //checkLogin();
            
            
            _this.uuid = getQueryString("uuid")||getCookie('uuid'); //用户id
            _this.movieUrl = getQueryString("movieUrl"); //机上电影路径

            _this.movieMD5 = getQueryString("movieMD5"); //机上电影MD5
            _this.movieName = getQueryString("movieName"); //机上电影MD5
            _this.movieLastWatchTime = getCookie('movieLastWatchTime_'+encodeURIComponent(_this.movieMD5))||0;
            _this.moviePoster = getQueryString("moviePoster"); //机上电影封面
            _this.movieID = getQueryString("tag"); //电影id
            _this.access_token = getCookie('access_token')||"1111";
            _this.getFlightInfo();
            var referrer = getQueryString("referrer"); //此页面上一页来源
   
            if(typeof(_this.movieName)!="undfined" && _this.movieName != "" && _this.movieName != null){
                document.title = decodeURI(escape(_this.movieName));
            }   

            if(typeof(_this.moviePoster)=="undfined" || _this.moviePoster == "" || _this.moviePoster == null){
                _this.moviePosterShow = false;
            }
            _this.isPlayBtnShow = true;
            //如果机上电影不存在
            if(typeof(_this.movieMD5)=="undfined" || _this.movieMD5 == "" || _this.movieMD5 == null){
                _this.alertPop("本次航班暂未上映，敬请期待",'知道了')
                return false;
            }
            var videoSource = document.getElementById('source');
            videoSource.src = apiHost+_this.movieUrl+"playlist.m3u8";
            getHash().then(res => {
                _this.dataToken = res.token;

                var [, packId] = (_this.movieUrl.match(/video_([0-9]+)(\/.+)/) || [])
                var contentId = 'movie'+packId
                //飞机机型是否是BC03
                var planeType = res.planeType;
                if(planeType=="00"){
                    _this.dxjFilmDir = res.hash+'/ces_ad/'+contentId;//获取最新更新机上静态资源目录
                }else if(planeType=="bc03"){
                    _this.dxjFilmDir = res.hash+'/'+contentId+'/'+contentId;
                }else{
                    _this.getMovieDir(contentId,_this.dataToken)
                }


                // var [, packId] = (_this.movieUrl.match(/video_([0-9]+)(\/.+)/) || [])
                // var contentId = 'movie'+packId
                // _this.getMovieDir(contentId,_this.dataToken)

                if(_this.dxjFilmDir != ""){
                    _this.movieUrl=_this.movieUrl.substring(8)
                }
                console.log(_this.movieUrl)
                _this.movieUrl =_this.dxjFilmDir+_this.movieUrl;
                
                //_this.getDxjAdDir(_this.dataToken);
                _this.dxjAdDir = res.hash + '/dxjad'
                _this.dxjResourceDir = res.hash;//获取机上静态资源目录
                if(_this.dxjAdDir == ""|| _this.dxjAdDir == null){
                    console.log('机上无广告');
                    _this.adStartUiShow = false;
                }else{
                    //let adApiPath = apiHost + _this.dxjAdDir + '/dxjad/' +decodeURI(_this.movieMD5)+'.json';
                    //电影片头广告
                    let adApiPath = '../images/tmp/movie_dxjg.json';
                    //_this.getDxjAdList(adApiPath)
                    _this.getDxjRoot(_this.dataToken)
                }    
                

                /* //电影心跳
                _this.movieInterval = setInterval(function(){
                    //movieIsPlay = true;
                    console.log("5分钟")
                    new Fingerprint2().get(function(result, components) {
                        _this.fingerprint = result;
                        _this.freeMovieHeartBeat(_this.fingerprint,_this.uuid,_this.movieID,_this.flightInfo.flightNum,_this.flightInfo.flightDate,_this.dataToken,_this.access_token);
                    });
                    
                },1000*60*3) */
    
            }).catch(e => {
                //console.log('获取token失败，错误信息:', e);
                _this.alertPop("网络请求失败",'重新获取',function(){
                    window.location.href = location.href;
                })
            });
            
            //判断是否是app环境
            //if(isNative){
                //判断是否是安卓环境
                if(!isIos){
                    //安卓app环境下可以开启全屏控制按钮
                    _this.fullscreenToggle = true;
                }
            //}

            
            // videojs 初始化
            this.movie = videojs('movie',{
                bigPlayButton : true, 
                textTrackDisplay : false, 
                posterImage: true,
                errorDisplay : false,
                isFullscreen:false,
                nativeControlsForTouch: false,
                language: 'zh-CN',
                controlBar : {
                    captionsButton : false,
                    chaptersButton: false,
                    subtitlesButton:false,
                    liveDisplay:false,
                    playbackRateMenuButton:false,
                    fullscreenToggle: _this.fullscreenToggle,
                    /* progressHolder: {
                        inline: false,
                        vertical: true
                    },
                    VolumeBar: {
                        inline: false,
                        vertical: true
                    },//竖着的音量条 */
                }
                
            });
            
            /* this.movie.on('loadedmetadata',function(){
                alert('loadedmetadata');
                
            })
            this.movie.on('firstplay',function(){
                alert('firstplay')
            })
            this.movie.on('loadstart',function(){
            //开始加载
            alert('loadstart')
            })
            this.movie.on('loadeddata',function(){
                alert('loadeddata')
            })
            this.movie.on('seeking',function(){
            //正在去拿视频流的路上
            alert('seeking')
            })
            this.movie.on('seeked',function(){
            //已经拿到视频流,可以播放
            alert('seeked')
            }) */

            this.movie.on('play',function(e){
                $('.vjs-big-play-button').hide();
                // if (!this.isFullscreen()) {
                //     this.requestFullscreen();
                // } else {
                //     this.exitFullscreen();
                // }
               
            });
            this.movie.on('pause',function(e){
                $('.vjs-big-play-button').show();
                
            })
            
            //埋点发送id,类型,标题
            // var contentId = getQueryString("video");
            // var contentType = '视频';
            // var contentTitle = decodeURIComponent(escape(getQueryString("title")));
            // eventLog({contentId:contentId,contentType:contentType,contentTitle:contentTitle});
             // console.log('本次观影结束，继续观看请重新购买');
        },
        watch: {
            movieIsPlay: function () {
                var _this = this;
                if(_this.movieIsPlay){
                    if(_this.adJson){
                        setTimeout(function(){
                            _this.movie.on('play',function(e){
                                $('.vjs-big-play-button').hide();
                                _this.adStopUiShow = false;
                            });
                            _this.movie.on('pause',function(e){
                                $('.vjs-big-play-button').show();
                                //_this.movieStop();
                                if(_this.adStopList.length > 1){
                                    _this.adStopUiShow = true;
                                    _this.$nextTick(()=>{
                                        _this.adStopSwiper();  
                                        
                                    });
                                }
                            })
                        },3000)
                    }
                }
            }
        },
        methods:{
            //获取机上电影广告目录
            getDxjAdDir:function (token){
                var _this = this;
                $.ajax({
                    type: "GET",
                    async:false,
                    url: apiHost + "/api/apps/contents/dxjres",
                    headers:{"Content-Type": "application/x-www-form-urlencoded","token": token},
                    dataType: "json",
                    success: function(data){
                        console.log(data);
                        _this.dxjAdDir = data.dxjres;
                    },
                    error: function(e){
                        console.log(e);
                    }
                });
            },
            //获取机上dxj代码根目录
            getDxjRoot:function (token){
                var _this = this;
                $.ajax({
                    method: 'get',
                    url:apiHost + '/api/apps/route/dxj',
                    headers:{
                      token:token
                    },
                    success: function(data){
                        console.log(data);
                        _this.dxjRoot = data.dxj;
                    },
                    error: function(e){
                        console.log(e);
                    }
                })
            },
            getMovieDir:function (contentId,token){
                var _this = this;
                $.ajax({
                    type: "GET",
                    async:false,
                    url: apiHost + "/api/apps/contents/"+contentId,
                    headers:{"Content-Type": "application/x-www-form-urlencoded","token": token},
                    dataType: "json",
                    success: function(data){
                        if(data[contentId]==null){
                            _this.dxjFilmDir = "";
                        }else{
                            _this.dxjFilmDir = data[contentId];
                        }
                        
                    },
                    error: function(e){
                        console.log(e);
                    }
                });
            },
            //获取机上某电影相关广告配置信息
            getDxjAdList:function (url){
                var _this = this;
                _this.isWaiting = true;

                let param = {
                    // param: JSON.stringify({
                    //     "version": NATIVEPARAM.version,
                    //     "environment": 'plan',
                    // })
                };
                axiosServer(url,"get",param).then((res) => {
                    _this.isWaiting = false;
                    
                        let data = res;
                        console.log(data)
                        _this.adJson = true;
                        //遍历机上电影片头广告列表
                        data.startAdList.forEach(function(item,index,arr){
                            if(item.isShow){
                                _this.adStartList.push(item)
                            }
                        });
                        if(_this.adStartList.length==0){
                            console.log('无片头广告')
                            _this.adStartUiShow = false;
                        }else{
                            console.log('有片头广告')
                            _this.adStartUiShow = true;
                        }
                        //遍历机上电影暂停广告列表
                        data.stopAdList.forEach(function(item,index,arr){
                            if(item.isShow){
                                _this.adStopList.push(item)
                            }
                        });
                        if(_this.adStopList.length==0){
                            console.log('无暂停广告')
                            _this.adStopUiShow = false;
                        }else{
                            console.log('有暂停广告')
                            
                        }

                        //遍历机上电影片尾广告列表
                        data.endAdList.forEach(function(item,index,arr){
                            if(item.isShow){
                                _this.adEndList.push(item)
                            }
                        });
                        console.log(_this.adEndList)
                        if(_this.adEndList.length==0){
                            console.log('无片尾广告')
                            _this.adEndUiShow = false;
                        }else{
                            console.log('有片尾广告')
                            _this.adEndUiShow = true;
                        }

                    
                    
                },(err) => {
                    _this.isWaiting = false;
                    
                });
 
            },
            //该航班信息
            getFlightInfo:function () {
                var _this = this;
                $.get(apiHost +"/api/flight"+"?time="+ ((new Date()).getTime()), function(data){
                    _this.flightInfo = data;
                    if(data.flightNum==""){
                        _this.flightInfo.flightNum = data.tailNum
                    }
                    _this.flightInfo.flightDate=data.flightDate+'_' + data.origin +'_' + data.arrival
                });
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
                        "time": new Date().getTime()
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
                            "token": token
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {
                            _this.isWaiting = false;
                            _this.alertPop("网络请请求超时",'刷新重试',function(){
                                //location.reload()
                                window.location.href = location.href;
                            })
                        }
                    }
                ).then((res) => {
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        let data = res.body;
                        var status = data.status; //
                        if(status=='200'){
                            _this.playMovie();
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
                });
            },
            //免费电影播放页心跳
            freeMovieHeartBeat:function (fingerprint,uuid,movieID,flightNum,flightDate,token,access_token) {
                var _this = this;
                //订单信息接口
                let orderApiUrl = dataHost +'/eastopay/freeMovie/heartBeat?' + querystring.stringify({
                    param: JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "environment":'plan',
                        "platform": '4',
                        "token": access_token,
                        "fingerprint":fingerprint,
                        "uuid": uuid,      //用户id
                        "movieID":movieID,         //电影id
                        "flightID":flightNum,     //航班号 
                        "flightDate":flightDate,   //航班日期
                        "time": new Date().getTime() 
                    })
                });
                _this.$http.get(
                    orderApiUrl,
                    {
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            "token": token
                        },
                        _timeout:_this.timeout,
                        onTimeout: (request) => {

                        }
                    }
                ).then((res) => {
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        let data = res.body;
                        var msg = data.msg;
                        var status = data.status; //"200"表示可以看，"101"表示参数错误，"103"表示已经有一个支付过能看的的电影了，"104" 本次心跳距离上次心跳超过了十分钟,并且库存已满
                        _this.initStatusCode = status;
                        if(status=='200'){
                            return false;
                        }
                        if(status=='101'){
                            clearInterval(_this.movieInterval)
                            _this.movie.pause();
                            _this.tip_msg = "参数错误";
                            _this.alertPop(_this.tip_msg,'知道了',_this.goMovieDetail)
                            return false;
                        }
                        if(status=='103'){
                            clearInterval(_this.movieInterval)
                            _this.movie.pause();
                            let watchLength = data.data.watchLength;
                            _this.tip_msg = "为保证全体旅客观影体验，自购买上部电影"+watchLength+"小时后，可购买新电影";
                            _this.alertPop(_this.tip_msg,'知道了',_this.goMovieDetail)
                            return false;
                        }
                        if(status=='104'){
                            clearInterval(_this.movieInterval)
                            _this.movie.pause();
                            _this.tip_msg = "本次航班空中院线当前暂无座位，请稍后重试";// 库存不足提示
                            _this.alertPop(_this.tip_msg,'知道了',_this.goMovieDetail)
                            return false;
                        }
                        
                        
                        
                    }
                });

            },
            //点击播放按钮
            playStart:function(){
                var _this = this;
                _this.playMovie();
                // getHash().then(res => {
                //     _this.dataToken = res.token;
                //     new Fingerprint2().get(function(result, components) {
                //         _this.fingerprint = result;
                //         _this.checkFreeMoiveInfo(_this.fingerprint,_this.uuid,_this.movieID,_this.flightInfo.flightNum,_this.flightInfo.flightDate,_this.dataToken,_this.access_token);
                //     });
                    
                // }).catch(e => {
                //     console.log('获取token失败，错误信息:', e);
                //     _this.alertPop("网络请求错误",'刷新重试',function(){
                //         window.location.href = location.href;
                //     })
                // });
                
            },
            playMovie:function(){
                var _this = this;
                _this.adCurrTime = 0;
                //var isNative = true;
                // if(isNative){
                //     _this.detectOtt()
                // }
                _this.adStopUiShow = false;
                var videoMovie = document.getElementById('movie');
                var playBtn = document.getElementById('playBtn');
                var isPlayed = false;
                //var movieIsPlay = false;
                _this.video_sources = [{
                    type:"application/x-mpegURL",
                    src: apiHost+_this.movieUrl+"playlist.m3u8",
                    //type:"video/mp4",
                    //src:videoBaseUrl+_this.movieUrl+".mp4"
                }];
                
                _this.moviePosterShow = false;

                if(_this.adStartUiShow){
                    console.log(2222)
                    console.log(apiHost +_this.dxjRoot+_this.adStartList[0].adurl)
                    _this.adStartSource = [{
                        type:"video/mp4",
                        //src:apiHost + _this.dxjAdDir +_this.adStartList[0].adurl
                        //src:apiHost + _this.dxjAdDir +_this.adStartList[0].adurl
                        src:apiHost +_this.dxjRoot+_this.adStartList[0].adurl
                    }];
                    _this.adDuration = 0;
                    _this.adStartList.forEach(function(item,index,arr){
                        _this.adDuration += item.time;
                    });
                    _this.adCurrTime = _this.adDuration;
                    _this.videoPlay(_this.adStartSource,false);
                    _this.isPlayBtnShow = false;
                    $('.vjs-big-play-button').show();
                    //_this.adStartDetailUrl = _this.adStartList[0].url;
                    _this.adStartDetailUrl = "97";
                    $('.ad-start').show();
                }else{
                    _this.movieIsPlay = true;
                    _this.adCurrTime = 0;
                    _this.movie.currentTime(0);
                    _this.videoPlay(_this.video_sources,true);
                    
                    _this.movie.muted(false);
                    _this.isPlayBtnShow = false;
                    $('.vjs-big-play-button').show();
                }

                this.movie.on('timeupdate',function(e){
                    //当视频的currentTime大于0.1时表示黑屏时间已过，已有视频画面
                    //if (_this.movie.currentTime()>0.1){}
                    if(_this.adStartUiShow){
                        $('.public-time').show();
                        if(_this.adStartList[0].url != undefined && _this.adStartList[0].url != ""){
                            $('.ad-learn-more').show();
                        }
                        if(!_this.movieIsPlay){
                            var curTime = _this.movie.currentTime(); 
                            _this.adPlayedSeconds = Math.floor(curTime);
                            _this.adCurrTime = _this.adDuration - Math.floor(curTime);
                        }else{
                            setCookie('movieLastWatchTime_'+encodeURIComponent(_this.movieMD5),_this.movie.currentTime());
                        }
                    }else{
                        if(_this.movieIsPlay==true){
                            setCookie('movieLastWatchTime_'+encodeURIComponent(_this.movieMD5),_this.movie.currentTime());
                        }
                    }
                });
                

                this.movie.on('ended',function(){
                    if(_this.adStartUiShow){
                        _this.adCurr++;
                        if(_this.adCurr >= _this.adStartList.length){
                            // 广告播放完了，播放电影
                            _this.movieIsPlay = true;
                            _this.adStartUiShow=false;
                            _this.adCurrTime = 0;
                            _this.movie.currentTime(0);
                            _this.videoPlay(_this.video_sources,true);
                            
                            _this.movie.muted(false);
                            _this.adStartDetailUrl = ""
                        }else{
                            _this.adStartSource[0].src = apiHost + _this.dxjAdDir +_this.adStartList[_this.adCurr].adurl;
                            if(_this.adStartList[_this.adCurr].url != undefined && _this.adStartList[_this.adCurr].url != ""){
                                _this.adStartDetailUrl = _this.adStartList[_this.adCurr].url;
                                $('.ad-learn-more').show();
                            }
                            _this.adDuration =  _this.adDuration - _this.adPlayedSeconds;
                            _this.videoPlay(_this.adStartSource,false)
                        }
                    }else{
                        // 电影播放完了
                        
                    }
                    
                    /* if(_this.movieIsPlay){
                        console.log("ended")
                        //_this.getUserPayInfo(_this.uuid,_this.movieID,_this.flightInfo.flightID,_this.flightInfo.flightNum,_this.flightInfo.flightDate,_this.dataToken,_this.access_token);
                    } */
                });
                
                // var movieStartTime = data.data.movieStartTime;
                // var movieCurTime = data.data.sysTime;
                // var moviePlayDuration = (_this.utcChangeTime(movieStartTime) - _this.utcChangeTime(movieCurTime))/1000/3600;
                // if(moviePlayDuration<=3){
                    
                // }
            },
            //更改视频地址和属性
            videoPlay:function (src,controls){
                var _this = this;
                this.movie.ready(function() {
                    var obj  = this;
                    obj.pause();
                    obj.src(src);         //重置video的src
                    obj.load();
                    obj.controls(controls);//是否显示控制条
                    if(src==_this.video_sources){
                        _this.movie.currentTime(_this.movieLastWatchTime);       
                    }
                    obj.play();
                    if(_this.fullscreenToggle){
                        $('.vjs-duration').css('right','50px')
                    }else{
                        $('.vjs-duration').css('right','0.2rem')
                    }
                });

            },
            getadDetailData(tag, token) {
                var _this = this;
                _this.isWaiting = true;
                let url = dataHost +'/v1/addetails/index';
                let param = {
                    param: JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "environment": 'plan',
                        "id": tag,
                        "time": new Date().getTime()
                    })
                };
                axiosServer(url,"get",param,token).then((res) => {
                    _this.isWaiting = false;
                    if (res.status === 200) {
                        let data = res.data;
                        _this.adTitle = data.title;
                        if(data.details){
                            _this.adDetails = data.details.replace(/cache/g, 'app/dxj/cache');
                            //_this.adDetails = data.details.replace(/cache\/image\/addetails\/12/g, 'images/tmp/topic');
                        }
                        
                    }else{
                        // _this.alertPop("网络请求错误",'刷新重试',function(){
                        //     window.location.href = location.href;
                        // })
                        _this.showLayer("showMsg", "网络请求错误");
                    }
                },(err) => {
                    _this.isWaiting = false;
                    if(err.request.readyState == 4 && err.request.status == 0){
                        // _this.alertPop("网络请求超时",'刷新重试',function(){
                        //     window.location.href = location.href;
                        // })
                        _this.showLayer("showMsg", "网络请求超时");
                    }else{
                        // _this.alertPop("网络请求错误",'刷新重试',function(){
                        //     window.location.href = location.href;
                        // })
                        _this.showLayer("showMsg", "网络请求错误");
                    }
                });
                

            },
            //广告了解更多按钮点击
            adDetail:function (tag){
                if(tag!=''){
                    //this.adIframeUrl = src
                    //this.adStartDetailUrl = src;
                    var _this = this;
                    _this.adDetails = "";
                    _this.adTitle = "";
                    _this.$nextTick(()=>{
                        _this.getadDetailData(tag,_this.dataToken);
                        $('.ad-pop-box').fadeIn();
                        $('#movie').fadeOut();
                    });
                    this.movie.pause();
                }
            },
            //关闭广告活动页面
            closeAdPage:function (src,controls){
                $('.ad-pop-box').hide();
                this.adStopUiShow = false;
                //this.adIframeUrl = "";
                $('#movie').show();
                $('.vjs-big-play-button').hide();
                callN("moviePlay", {"rotate": true});
                this.movie.play();
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
            goBack: function(){
                //window.history.back();
                callN("moviePlay", {"rotate": false});
                window.location.href = "movie-detail.html?tag="+this.movieID;
            },
            //跳转到电影详情重新购买或者观看
            goMovieDetail: function(){
                var _this=this;
                window.location.href = "movie-detail.html?movieUrl="+_this.movieUrl+"&tag="+_this.movieID;
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
            //超时提醒点击并刷新
            confirmPop(tipMsg,yesBtnText){
                this.$confirm({
                    title: tipMsg,
                    content: "",
                    yesStyle: {}, // 设置左边按钮样式
                    yesText: '取消',  // 左边按钮文本,
                    noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
                    noText: yesBtnText   // 设置右边按钮文本
                }).then(res => {
                    // 点取消时触发
                    //location.reload()
                }).catch(e => {
                    // 点确认时触发
                    window.location.href = location.href;
                })
            },
            adStopSwiper: function () {
                //暂停广告轮播
                var mySwiper = new Swiper(this.$el.querySelector('#adStopSwiper'), {
                      direction: 'horizontal',
                      loop: true,
                      autoplay : 3000,
                      pagination: '.swiper-pagination',
                      autoplayDisableOnInteraction : false,
                      observer:true, //修改swiper自己或子元素时，自动初始化swiper
                      observeParents:true,//修改swiper的父元素时，自动初始化swiper
                      onClick: function(swiper){
                          // swiper自动轮播 循环后第一个slide不能执行click方法 bug,此处解决方式是用swiper的回调click方法处理
                          // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
                          // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
                          /* var index = swiper.clickedSlide.attributes['data-swiper-slide-index'].nodeValue; //轮播图所处索引值
                          var title = swiper.clickedSlide.attributes['data-title'].nodeValue; //轮播图图片标题
                          var url = swiper.clickedSlide.attributes['data-url'].nodeValue;     //轮播图跳转链接
                          vm.bannerAutoSwiperClick(index,title,url)  //发送埋点数据方法 */
                      }
                });
            },
            //暂停广告提示
            movieStop: function (){
                this.adStopUiShow = !this.adStopUiShow;
                if(this.adStopUiShow==true){
                    //this.movie.pause();
                    if(this.adStopList.length > 1){
                        this.$nextTick(()=>{
                            this.adStopSwiper();  
                        });
                    }
                }else{
                    //this.movie.play();
                }
            },
            adVoice(){
                this.adVoiceClose = !this.adVoiceClose;
                if(this.adVoiceClose==true){
                    this.movie.muted(true); 
                }else{
                    this.movie.muted(false);
                }
            },
            adSkip(){
                this.movie.pause();
                this.movieIsPlay = true;
                this.adStartUiShow=false;
                this.adCurrTime = 0;
                this.movie.currentTime(0);
                this.videoPlay(this.video_sources,true);
                this.movie.muted(false);
                this.adStartDetailUrl = ""
            },
            adSwiperClose(){
                this.adStopUiShow = false;
            },
            defaultScroll(e){
                e.preventDefault();
            },
            disabledScroll(){
                document.addEventListener("touchmove",this.defaultScroll,false);
            },
            enabledScroll(){
                document.removeEventListener("touchmove",this.defaultScroll,false);
            },
            //判断手机横竖屏状态
			detectOtt(){
                var clientW=document.documentElement.clientWidth,clientH=document.documentElement.clientHeight;
                //竖屏
                if(clientW<clientH){
                    var wrapLeft=(clientW-clientH)*0.5+"px",
                    wrapTop=(clientH-clientW)*0.5+"px";
                    $("#main").css({"-webkit-transform":"rotate(90deg)","width":clientH,"height":clientW,"left":wrapLeft,"top":wrapTop})
                }
            }



        },
        components: {
            loading,
            popLayer
        }
    });

});