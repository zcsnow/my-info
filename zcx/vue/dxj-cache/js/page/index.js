require('../../css/index.scss');
require('../../css/swiper.min.scss');
const querystring = require('querystring');
// const Hls = require('hls');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {scrollMove} from '../modules/method.js';
import {getN,callN,isCeair,isNative,dataHost,apiHost,utcTime,getQueryString,getHash,eventLog,dataVersion,versionContrast} from 'nativeA';
import {setCookie, getCookie} from '../modules/cookie.js';
import loading from 'loading';
import VueLazyload from 'vue-lazyload';
import popLayer from 'pop-layer';

import Swiper from 'swiper';
import luckDraw from '../modules/luckDraw.vue';
import entryAdv from '../modules/entryAdv';
import FastClick from 'fastclick';

import insertScreenAd from '../modules/insertScreenAd';


//var gcs = GCS.state();
//console.log(GCS)

Vue.use(Resource, axios);
Vue.use(VueLazyload,{
    error: '../images/e.gif'
});

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
    if(versionContrast(NATIVEPARAM.version,'4.2.7')){
      if(isNative){
        setCookie('phone', NATIVEPARAM.userName, 1);
        setCookie('uuid', NATIVEPARAM.userID, 1);
        setCookie('access_token', NATIVEPARAM.token, 1); 
        setCookie('couponBalance', NATIVEPARAM.couponBalance, 1);    
      }
    }
    var uuid = getCookie('uuid') || '';
    var access_token = getCookie('access_token') || '';
    var isUuid = uuid !== null && uuid !== '' && uuid !== 'null';
    var isAccess_token = access_token !== null && access_token !== '' && access_token !== 'null';
    
    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            isReady: false, 	   // 下拉加载控制器
            isInfoReady: false, 	   // 文章下拉加载控制器
            isLoad: true, 		   // 显示加载中
            isLogin: (isUuid) && (isAccess_token)?true:false, //登陆状态
            show_msg: "",
            isTop: false,       // 显示返回顶部
            isCeair: isCeair,   //是否东航环境
            isNative: isNative,
            dataHost: dataHost,
            apiHost: apiHost,
            baseUrl: '',
            dataToken: "",
            dxjApi: "",     //飞机环境访问资源路径
            dxjAdDir: "",   //东行记AD目录
            dxjVideoDir:"",//东行记短视频目录
            dxjVideoMp4Dir:"",//东行记短视频目录
            dxjResourceDir:"",//获取机上静态资源目录
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            banner: [],     //头部轮播数据
            topAd: "",      //通用广告
            navIcon: [],    //频道导航
            navIcon2: [],    //频道导航2
            cardEnterisShow:false,
            couponOpen:"0",
            couponBalance:"0",
            notice: [],     //公告
            movie: [],      //空中影院
            newVideo: [],   //娱乐影音
            city: [],       //推荐目的地
            homeMiddleAd:[],//中部横幅广告
            travel: [],     //旅行列表
            homeCarAd:[],//汽车广告位
            carMoreHref:'',//汽车更多跳转
            infoRecommendArr:[],//信息流-热门推荐-文章和娱乐影音数据
            infoRecommendCurPage: 0,     //当前信息流分页值
            video: [],      //视频列表
            videoAd: [],     //视频广告
            hotSearch: [],     //热搜
            videoPage: undefined, //视频列表分页
            curpage: 0,     //视频当前分页值
            scoreExchangeUrl:"", //积分商城兑换地址
            eventLog:eventLog, //事件埋点发送方法
            movieMoreHref: "",
            travelMoreHref: "",
            whitherMoreHref: "",
            curVideoData:[],
        },
        mounted(){
            var _this = this;
            if(isNative){
                _this.cardEnterisShow = true;
            }
            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                
                //飞机机型是否是BC03
                var planeType = res.planeType;
                if(planeType=="00"){
                    _this.dxjApi = res.hash+'/dxj';
                    _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
                    _this.dxjVideoMp4Dir = res.hash+'/ces_ad';
                    //_this.dxjVideoMp4Dir = res.hash+'/ces_ad/video1';
                    _this.dxjVideoDir = res.hash+'/dxj/videos';
                }else if(planeType=="bc03"){
                    _this.dxjApi = res.hash+'/dxj/dxj';
                    _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
                    _this.dxjVideoDir = res.hash+'/video1/video1';
                }else{
                    _this.dxjApi = res.hash;
                    _this.dxjResourceDir = res.hash;//获取机上静态资源目录
                    _this.getVideoDir(_this.dataToken);
                }
                
                _this.getDxjAdDir(res.token);
                // 获取机上短视频数据
                _this.getVideoData();
                _this.getDxjJsonData()  //获取飞机本地资源
                //setTimeout(function(){
                    _this.cacheHome(utcTime);//获取cache资源
                    _this.getInfoRecommendCacheData(utcTime)
                    
                //},10000)

                

                // 获取短视频广告数据
                //_this.getAdData();
                if(isNative){
                    callN("ceairToken", {"token": _this.dataToken});
                    console.log("ceairToken:"+ _this.dataToken)
                }

            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });

        },
        computed:{
            aHerf() {
                return  function(url){
                    return url.indexOf('?')!= -1 ? url+'&': url+'?';  
                }       
            }
        },
        methods:{
            getDxjJsonData:function (){
                //获取机上静态资源数据
                var _this = this;
                let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/home.json';
                axios.get(jsonSrc).then((result) => {
                    var data = result.data.data;
                    if(_this.isCacheDataLoad){
                        return false
                    }
                    _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
                    //data.focus[0].image = data.focus[1].image
                    _this.homeRender(data);
                    
                    window.removeEventListener('scroll',_this.addMore,false);
                    //console.log(data);
                }).catch((err) => {
                    //console.log(err);
                });
            },
            getVideoDir:function (token){
                var _this = this;
                $.ajax({
                    type: "GET",
                    async:false,
                    url: apiHost + "/api/apps/contents/video1",
                    headers:{"Content-Type": "application/x-www-form-urlencoded","token": token},
                    dataType: "json",
                    success: function(data){

                        if(data.video1==null){
                            _this.dxjVideoDir = _this.dxjApi;
                        }else{
                            _this.dxjVideoDir = data.video1;
                        }
                    },
                    error: function(e){
                        console.log(e);
                    }
                });
            },
            getDxjAdDir:function (token){
                var _this = this;
                $.ajax({
                    type: "GET",
                    async:false,
                    url: apiHost + "/api/apps/contents/dxjres",
                    headers:{"Content-Type": "application/x-www-form-urlencoded","token": token},
                    dataType: "json",
                    success: function(data){

                        if(data.dxjres==null){
                            _this.dxjAdDir = _this.dxjApi;
                        }else{
                            _this.dxjAdDir = data.dxjres;
                        }
                    },
                    error: function(e){
                        //console.log(e);
                    }
                });
            },
            showLayer(type,v,auto){    //执行toast弹出层
                var _this = this;
                if(type == "show"){
                    _this.isShow = v;
                }else if(type == "showMsg"){
                    _this.show_msg = v;
                }
                if(!auto){
                    if(_this.timeId){ clearInterval(_this.timeId);}
                    _this.timeId = setTimeout(()=>{
                        _this.isShow = false;
                        _this.show_msg = "";
                    },2000);
                }
            },
            bannerSwiper: function () {
                this.destroySwiper(1);
                //头部轮播
                this._mySwiper1 = new Swiper(this.$el.querySelector('#swiper1'), {
                      direction: 'horizontal',
                      loop: true,
                      autoplay : 5000,
                      pagination: '.swiper-pagination',
                      autoplayDisableOnInteraction : false,
                      observer:true,
                      onClick: function(swiper){
                          // swiper自动轮播 循环后第一个slide不能执行click方法 bug,此处解决方式是用swiper的回调click方法处理
                          // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
                          // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
                          var index = swiper.clickedSlide.attributes['data-swiper-slide-index'].nodeValue; //轮播图所处索引值
                          var title = swiper.clickedSlide.attributes['data-title'].nodeValue; //轮播图图片标题
                          var url = swiper.clickedSlide.attributes['data-url'].nodeValue;     //轮播图跳转链接
                          vm.bannerAutoSwiperClick(index,title,url)  //发送埋点数据方法
                      }
                });
            },
            noticeSwiper: function () {
                //this.destroySwiper();
                //公告轮播
                this._noticeSwiper = new Swiper(this.$el.querySelector('#noticeSwiper'), {
                    direction: 'vertical',
                    loop: true,
                    autoplay : 5000,
                    noSwiping : true,
                    observer:true,
                });
            },
            movieSwiper: function () {
                //空中影院轮播
                this._mySwiper4 = new Swiper(this.$el.querySelector('#swiper4'), {
                    initialSlide :0,
                    slidesPerView: 3,
                    spaceBetween: 7,
                    observer:true,
                });
            },
            citySwiper: function(){
                //目的地轮播
                this._mySwiper3 = new Swiper(this.$el.querySelector('#swiper3'), {
                    initialSlide :0,
                    slidesPerView: 3,
                    spaceBetween: 7,
                    observer:true,
                });
            },
            travelSwiper: function(){
                //旅行轮播
                this._mySwiper2 = new Swiper(this.$el.querySelector('#swiper2'), {
                    initialSlide :0,
                    slidesPerView: 1,
                    spaceBetween: 10,
                    observer:true,
                }); 
            },
            destroySwiper: function (num) {
                //头部轮播
                if(this.$el.querySelector('#swiper'+num)!=null){
                    //this["_mySwiper"+num] && (this._initialSlide = this["_mySwiper"+num].activeIndex);
                    this["_mySwiper"+num] && this["_mySwiper"+num].destroy(true, true);
                    this["_mySwiper"+num] = null;
                }
            },
            //获取首页接口数据
            cacheHome:function (planeData) {
                var _this = this;
                
                //飞机环境要先获取资源
                //console.log('优先获取机上设备缓存数据');
                var dataPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/home' + planeData;
                //请求飞机首页本地缓存数据
                axios.get(dataPath).then((result) => {
                    var data = result.data.data;
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    //console.log(data);
                    if(data==undefined){
                        //console.log("数据类型转换");
                        data = JSON.parse(data);
                    }

                    _this.$nextTick(()=>{
                        _this.homeRender(data);
                    });

                }).catch((err) => {
                    //console.log(err);
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    //获取首页数据
                    _this.getHomeData(_this.dataToken);
                });
            },
            getHomeData:function (token){

                var _this = this;
                //_this.isWaiting = true;
                var homeUrl = _this.dataHost + `/v1/home/index?` + querystring.stringify({
                      param: JSON.stringify({
                          "version":NATIVEPARAM.version,
                          "platform":4,
                          "environment":'plan',
                          "uuid":getCookie('uuid'),
                          "token":getCookie('access_token'),
                          "code":"411"
                      })
                  });

                _this.$http.get(homeUrl, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token,
                        "cache-control": "no-cache"
                    },
                    _timeout:15000,
                    onTimeout: (request) => {
                        //_this.showLayer("showMsg", "请求超时，本地获取");
                        //_this.isWaiting = false;
                        //_this.isLoad = false;
                   }
                }).then((message)=>{    //获取首页接口数据
                    //_this.isWaiting = false;
                    var status = message.body.status,
                        msg = message.body.msg;

                    if (status === 200) {
                        var data = message.body.data;
                        _this.baseUrl = _this.apiHost + '/app/dxj';
                        _this.isCacheDataLoad = true;
						_this.homeRender(data);
                    }else{
                        //_this.showLayer("showMsg", msg);
                    }
                },()=>{
                    //_this.showLayer("show", true);
                    //_this.isWaiting = false;
                });

            },
            homeRender: function (data) {
                var _this = this;

                //头部轮播banner
                _this.banner = data.focus || [];    //首页轮播数据
                if(_this.banner.length > 1){
                    _this.$nextTick(()=>{
                        _this.bannerSwiper();  //数据加载成功执行轮播
                	  });
                }

                //通用广告
                _this.topAd = data.ad || [];
                
                //公告
                _this.notice = data.notice || [];
                if(_this.notice.length > 1){
                    _this.$nextTick(()=>{
                        _this.noticeSwiper();  //数据加载成功执行轮播
                	});
                }

                //热搜
                _this.hotSearch = data.hotSearch || [];

                //频道导航
                _this.navIcon = data.icon || [];
                //频道导航2
                _this.navIcon2 = data.icon2 || [];
                //console.log(_this.navIcon2.length)

                //购物券开关
                _this.couponOpen = data.couponOpen;
                //购物券余额
                
                _this.couponBalance = getCookie('couponBalance');
                //console.log(_this.couponBalance)

                _this.scoreExchangeUrl = data.scoreExchangeUrl;
                setCookie('scoreExchangeUrl', data.scoreExchangeUrl, 1);  

                //空中院线
                // _this.movie = data.movie || [];
                // if(_this.movie.length > 3){
                //     _this.$nextTick(()=>{
                //         _this.movieSwiper(); //数据加载成功执行轮播
                        
                //     });
                // }else{
                //     _this.destroySwiper(4);
                // }

                //娱乐影音
                _this.newVideo = data.video || [];
                if(_this.newVideo.length > 3){
                    _this.$nextTick(()=>{
                        _this.movieSwiper(); //数据加载成功执行轮播
                    });
                }else{
                    _this.destroySwiper(4);
                }
                if(Object.keys(data.more).length!=0){
                    _this.carMoreHref = data.more.car;
                    _this.movieMoreHref = data.more.movie ||"new-video.html";
                    _this.travelMoreHref = data.more.travel ||"travel-list.html";
                    _this.whitherMoreHref = data.more.whither ||"city-list.html";
                }
                //热门目的地
                data.whither.map(function(item,index){
                    if(item.isAd == 1){
                        //data.whither[index].name = item.title;
                       if(item.landType == 1){
                          data.whither[index].url = 'article.html?tag=' + item.tag;
                       }
                    }else {
                        data.whither[index].url = 'city-topic.html?tag=' + item.id + '&contentType=目的地&contentTitle=' + item.name
                    }
                })

                _this.city = data.whither || [];
                
                //alert(_this.city[name])
                if(_this.city.length > 3){
                    //alert(JSON.stringify(_this.city))
                    _this.$nextTick(()=>{
                        _this.citySwiper();  //数据加载成功执行轮播
                    });
                }else{
                    _this.destroySwiper(3);
                }

                //中部横幅广告
                _this.homeMiddleAd = data.homeMiddleAd||[];

                //汽车广告位
                _this.homeCarAd = data.homeCarAd||[];
                //汽车更多跳转
                //_this.homeCarMore = data.homeCarMore;

                //精致旅行
                _this.travel = data.travel || [];
              
                if(_this.travel.length > 1){
                    _this.$nextTick(()=>{
                        _this.travelSwiper();  //数据加载成功执行轮播
                	});
                }else{
                    _this.destroySwiper(2);
                }
            },
            //随机获取机上视频
            getRandomVideoData:function () {
                var _this = this;
                _this.isReady = true;

                var page = _this.videoPage;
                var videoPage = _this.videoPage;
                if(!page){
                  page = 7;
                  videoPage = [];
                  for(var i=1;i<=page;i++){
                    videoPage.push(i);
                  }
                }
                else{
                  page = videoPage.length;
                }
                if(_this.isLoad && _this.isReady && page>0){

                  var random = Math.floor(Math.random()*page);
                  var randomPage = videoPage[random];
                  videoPage.splice(random,1);
                  
                  _this.videoPage = videoPage;

                  
                  if(_this.dxjVideoDir == _this.dxjApi){
                    var videoPath = _this.apiHost + _this.dxjVideoDir + '/vedio/page'+ randomPage +'.json';
                  }else{
                    var videoPath = _this.apiHost + _this.dxjVideoDir + '/page'+ randomPage +'.json';
                  }
                  
                  
                  //var videoPath = _this.apiHost + _this.dxjApi + '/vedio/page'+ (_this.curpage+1) +'.json';
                  // console.log(videoPath);

                  //发送一个 get 请求
                  axios.get(videoPath).then( (result) => {
                        _this.isReady = false;

                        //东航飞机获取的数据对象为字符串,需要转换为JOSN对象
                        //console.log(result);
                        if(/^www\.ce-air\.com/.test(window.location.host) && result.data.data==undefined){
                          console.log("东航正式飞机环境");
                          result = JSON.parse(result);
                        }

                        var curVideo = result.data.data.list,
                            curNext = result.data.data.next;

                        //_this.curpage++;
                        // console.log(curVideo);
                        var videoData = _this.video.concat(curVideo) || [];

                        var videoAdData = _this.videoAd;
                        videoAdData.map(function(item){
                            var index = (item.page-1) * 10 + item.sort - 1;
                            // 判断广告索引值在视频列表最后一页范围，满足则替换对应索引值视频内容
                            if(index < videoData.length && index >= videoData.length - 10)
                            {
                                item.isAD = true;
                                videoData[index] = item;
                            }
                            
                        })
                        if(_this.dxjVideoDir != _this.dxjApi){
                            videoData.map(function(item){
                                //console.log(item.image)
                                if(item.image.substring(0,6)=='/vedio'){
                                    item.image=item.image.substring(6)
                                    item.video=item.video.substring(6)
                                }
                                
                            });
                        }

                        _this.video = videoData;
                        _this.infoRecommendArr = _this.video;
                        // if(curNext == 0){
                        //   window.removeEventListener('scroll',_this.addMore,false);
                        //   _this.isReady = true;
                        //   _this.isLoad = false;
                        // }
                        
                        _this.$nextTick(()=>{
                            window.addEventListener('scroll',this.addMore.bind(this),false);
                        });

                  }).catch( (err) => {
                    //console.log(err);
                    window.removeEventListener('scroll',_this.addMore,false);
                    _this.isReady = false;
                  });
                }
                else {
                  // console.log('执行了~~~~~~~~~~')
                  _this.isReady = false;
                  _this.isLoad = false;
                }  
            },
            
            getVideoData:function () {
                var _this = this;
                _this.isReady = true;
                if(_this.isLoad && _this.isReady){
                  if(_this.dxjVideoDir == _this.dxjApi){
                    var videoPath = _this.apiHost + _this.dxjVideoDir + '/vedio/page'+ (_this.curpage+1) +'.json';
                  }else{
                    var videoPath = _this.apiHost + _this.dxjVideoDir + '/page'+ (_this.curpage+1) +'.json';
                  }

                  //发送一个 get 请求
                  axios.get(videoPath).then( (result) => {
                        _this.isReady = false;
                        _this.isLoad = true;
                        //东航飞机获取的数据对象为字符串,需要转换为JOSN对象
                        if(/^www\.ce-air\.com/.test(window.location.host) && result.data.data==undefined){
                          console.log("东航正式飞机环境");
                          result = JSON.parse(result);
                        }

                        if (_this.curpage >= 0 && result.data.data.list.length > 0) {
                            //接口赋值
                            var videoData = result.data.data.list;
                            _this.curpage++;
                            //var videoData = _this.video.concat(curVideo) || [];
                            if(_this.dxjVideoDir != _this.dxjApi){
                                videoData.map(function(item){
                                    //console.log(item.image)
                                    if(item.image.substring(0,6)=='/vedio'){
                                        item.image=item.image.substring(6)
                                        item.video=item.video.substring(6)
                                    }
                                    
                                });
                            }
                            _this.video = videoData;
                            //_this.infoRecommendArr = _this.video;
                            
                            _this.$nextTick(()=>{
                                window.addEventListener('scroll',this.addMore.bind(this),false);
                            });
                        }else{
                            window.removeEventListener('scroll',_this.addMore,false);
                            _this.isReady = true;
                            _this.isLoad = false;
                        }
      
                        

                  }).catch( (err) => {
                    window.removeEventListener('scroll',_this.addMore,false);
                    _this.isReady = true;
                    _this.isLoad = false;
                    
                  });
                }
                else {
                  // console.log('执行了~~~~~~~~~~')
                  window.removeEventListener('scroll',_this.addMore,false);
                  _this.isReady = true;
                  _this.isLoad = false;
                }  
            },
            addMore(){
              var H = document.documentElement.scrollHeight || document.body.scrollHeight;
              var h = window.innerHeight;
              var t = document.documentElement.scrollTop || document.body.scrollTop;
              if (H - (h + t) < 15 && !this.isReady){
                  this.getVideoData();
                  //this.getRandomVideoData();
                  eventLog({eventId:'home_video_more',eventType:'1'})
              }
              if (H - (h + t) < 15 && !this.isInfoReady){
                this.getInfoRecommendCacheData(utcTime)
              }

                //显示返回顶部按钮
                // console.log(t);
                if(t > 2000){
                    this.isTop = true;
                }else{
                    this.isTop = false;
                }
            },
            playGame:function(url){
                window.location.href = "play-game.html?path=" + url;
            },
            playVideoPage:function (title,image,video,isAD) {
                eventLog({eventId:'home_video_load',eventType:1,contentType:'视频',contentTitle:title})
                var _this = this;
                title = encodeURIComponent(title);
                //var dxjDir = isAD?_this.dxjAdDir:_this.dxjApi;
                var dxjDir = isAD?_this.dxjApi:_this.dxjVideoMp4Dir;
                
                video = _this.apiHost + dxjDir + video;
                //window.location.href = video;
                //window.location.href = "play-video.html?title=" + title + "&image=" + image + "&video=" + video + "&rotate=true";

                if(_this.isNative){
                    callN("playVideo", {"url": video});      //跳转Native播放器
                }else{
                    window.location.href = video;
                    // window.location.href = "play-video.html?title=" + title + "&image=" + image + "&video=" + video;
                }
                 
            },
            getAdData:function (videoData, videoPage) {
              var _this = this;
              //获取本地广告数据
              /*var vData = _this.apiHost + _this.dxjAdDir + "/dxjad/short_video/ad_video/data.json";  //短视频广告路径
              // vData = "../js/data/page/videoAd.json";
              axios.get(vData).then((result) => {
                  _this.videoAd = result.data.data.list;
                  _this.getRandomVideoData();
              }).catch( (err) => {
                _this.getRandomVideoData();
                console.log(err);
              });*/

              _this.getRandomVideoData();
            },
            //页面跳转
            goSearch:function () {
                eventLog({eventId:'home_search_click',eventType:'1',contentType:'search'});
                window.location.href = "search.html";
            },
            scrollTop:function () {
                scrollMove({y: 0});
            },
            //swiper自动轮播 发送埋点数据方法
            bannerAutoSwiperClick:function (index,title,url) {
                 eventLog({eventId:'home_adbanner_'+ (parseInt(index)+1) +'_click',eventType:'1',eventIsAD:'1',contentType:'焦点图',contentTitle:title});
                 if(url!=""){
                    window.location.href = url;
                 }
            },
            enterShoppingCard: function () {
                if(this.isLogin==true){
                    callN("enterShoppingCard"); 
                    eventLog({eventId:'home_shoppingcard_my',eventType:'1'});
                    console.log("enterShoppingCard")
                }else{
                    eventLog({eventId:'shoppingcard_topic_login',eventType:'1'});
                    window.location.href = "login.html?pageUrl=index.html"
                }
            },
            //获取首页信息流 热门推荐cache数据
            getInfoRecommendCacheData:function(planeData) {
                var _this = this;
                _this.isInfoReady = true;
                if(_this.isInfoReady){
                    var infoFlowDataPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/infoFlow/'+ parseInt(parseInt(_this.infoRecommendCurPage)+1) + planeData;
                    axios.get(infoFlowDataPath).then((result) => {
                        _this.isInfoReady = false;
                        var data = result.data.data;
                        if(data==undefined){
                            data = JSON.parse(data);
                        }
                        if (_this.infoRecommendCurPage >= 0 && data.length > 0) {
                            //接口赋值
                            var infoRecommendCurPageData = data||[];
                             
                            var curPageAllData = _this.infoRecommendInsertVideo(infoRecommendCurPageData);
                            _this.infoRecommendArr = _this.infoRecommendArr.concat(curPageAllData) 
                            //console.log(_this.infoRecommendArr)
                            _this.infoRecommendCurPage++;
                            _this.$nextTick(()=>{
                                window.addEventListener('scroll',_this.addMore.bind(_this),false);
                            });
                        }else{
                            window.removeEventListener('scroll',_this.addMore,false);
                            _this.isInfoReady = true;
                            _this.isLoad = false;
                        }

                    }).catch((err) => {
                         //_this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                        //获取首页数据
                        _this.isInfoReady = false;
                        _this.isLoad = true;
                        _this.getInfoRecommendData(_this.dataToken);
                    });
                }else {
                     //console.log('执行了~~~~~~~~~~')
                    window.removeEventListener('scroll',_this.addMore,false);
                    _this.isInfoReady = false;
                    _this.isLoad = false;
                  }  
            },
            //获取首页信息流 热门推荐数据
            getInfoRecommendData:function(token) {
                var _this = this;

                var infoFlowUrl = _this.dataHost + `/v1/infoFlow/index?` + querystring.stringify({
                    param: JSON.stringify({
                        "version":NATIVEPARAM.version,
                        "platform":4,
                        "environment":'plan',
                        //"page":0,
                        "page":_this.infoRecommendCurPage,
                        "pageSize":30
                    })
                });

                _this.$http.get(infoFlowUrl, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token,
                        "cache-control": "no-cache"
                    }
                }).then((message)=>{ 
                    _this.isInfoReady = false;
                    var status = message.body.status,
                        msg = message.body.msg;
                        
                    if (status === 200) {
                        var data = message.body.data;
                        //_this.baseUrl = _this.apiHost + '/app/dxj';
                        
                        if (_this.infoRecommendCurPage >= 0 && data.list.length > 0) {
                            //接口赋值
                            var infoRecommendCurPageData = data.list||[];
                            var curPageAllData = _this.infoRecommendInsertVideo(infoRecommendCurPageData);
                            _this.infoRecommendArr = _this.infoRecommendArr.concat(curPageAllData) 
                            //console.log(_this.infoRecommendArr)
                            _this.infoRecommendCurPage++;
                            _this.$nextTick(()=>{
                                window.addEventListener('scroll',_this.addMore.bind(_this),false);
                            });
                        }else{
                            window.removeEventListener('scroll',_this.addMore,false);
                            _this.isInfoReady = true;
                            _this.isLoad = false;
                        }
                        
                    }else{
                        //_this.showLayer("showMsg", msg);
                        if(_this.isReady==false){
                            _this.infoRecommendArr = _this.infoRecommendArr.concat(_this.video);
                            
                        }
                        //console.log(_this.infoRecommendArr)
                    }
                },()=>{
                    //_this.showLayer("show", true);
                    //_this.isWaiting = false;
                    if(_this.isReady==false){
                        _this.infoRecommendArr = _this.infoRecommendArr.concat(_this.video);
                    }
                });
              
            },
            //文章信息流中插入机上短视频
            infoRecommendInsertVideo:function(curPageData){
                var _this = this;
                //console.log(JSON.stringify(_this.curVideoData)!= JSON.stringify(_this.video))
                if(JSON.stringify(_this.curVideoData)!= JSON.stringify(_this.video)){
                    _this.curVideoData=_this.video;
                    for(let i=0;i<_this.video.length;i++){
                        for(let j=0;j<curPageData.length;j++){
                            if(j==i){
                                curPageData.splice((3*(j+1)-1), 0,_this.video[i])
                            }
                        }
                    }
                    return curPageData;
                }else{
                    return curPageData
                }
                
            },
        },
        

        components:{
            loading,
            popLayer,
            entryAdv,
            luckDraw,
            insertScreenAd
        }
    });

});
