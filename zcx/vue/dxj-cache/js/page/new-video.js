require('../../css/new-video.scss');
require('../../css/swiper.min.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,callN,isNative,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion} from 'nativeA';
import loading from 'loading';
import VueLazyload from 'vue-lazyload';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import videoSwiper from '../modules/videoSwiper';

import Swiper from 'swiper';
import FastClick from 'fastclick';
import { random } from 'node-forge';

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

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            isReady: false, 	   // 下拉加载控制器
            isLoad: true, 		   // 显示加载中
            noDataIShow:false,  //无数据提示
            isFixed: false,     // 是否浮动导航
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            isNative: isNative,
            dataHost: dataHost,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            isImgPreviewShow:false,
            previewData:'',
            dxjApi: "",     //飞机环境访问资源路径
            AudioVideoData: [],
            AudioVideoCacheData: {},
            AudioVideoColumnData: [],
            isHasArtListCache:true,
            isHasCache:true,
            curType: 0,        //当前列表类型
            curpage: 0,      //当前分页值
            lastNum: 0,      //当前分页最后一条upper_time值
            pagecount: 999, 	//总页数
            eventLog:eventLog //事件埋点发送方法

        },
        mounted(){
            var _this = this;
            
            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                var planeType = res.planeType;
                if(planeType=="00"){
                    _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
                }else if(planeType=="bc03"){
                    _this.dxjApi = res.hash+'/dxj/dxj';
                    _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
                }else{
                    _this.dxjApi = res.hash;
                    _this.dxjResourceDir = res.hash;//获取机上静态资源目录
                }

                // 获取影音数据
                // _this.getAudioVideoData(utcTime);
                _this.getDxjJsonData();
                _this.cacheData(utcTime);

                // _this.$nextTick(()=>{
                //     window.addEventListener('scroll',this.addMore.bind(this),false);
                // });
                
                
                _this.$nextTick(()=>{
                    setTimeout(function(){
                        //监听浮动事件
                        var  navOffHeight = $('.nav-list-box .movie').offset().top;
                        // console.log(navOffHeight)
                        window.addEventListener('scroll',function(){
                            var t = document.documentElement.scrollTop || document.body.scrollTop;
                            if(t > navOffHeight){
                                // console.log(t);
                                _this.isFixed = true;
                            }else{
                                _this.isFixed = false;
                            }
                        },false);
                    },2000)
                });
                

            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });
        },
        methods:{
            bannerSwiper: function(){
                if(this.$el.querySelector('#swiper')!=null){
                    this._mySwiper && this._mySwiper.destroy(true, true);
                    this._mySwiper = null;
                }
                this._mySwiper = new Swiper(this.$el.querySelector('#swiper'), {
                    direction: 'horizontal',
                    loop: true,
                    autoplay : 5000,
                    pagination: '.swiper-pagination',
                    autoplayDisableOnInteraction : false,
                    observer:true,
                    //slidesPerView: 1,
                    //spaceBetween: 10,
                    //freeMode: true,
                    //centeredSlides: true
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
            getDxjJsonData: function () {
                //获取机上静态资源数据
                var _this = this;
                
                let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/audioVideoIndex.json';
                axios.get(jsonSrc).then((result) => {
                    if(_this.isCacheDataLoad){
                        return false
                    }
                    console.log(result)
                    var data = result.data.data;
                    _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }
                    // 渲染数据
                    _this.isLoad = false;
                    _this.isWaiting = false;
                    _this.AudioVideoCacheData = data;
                    _this.AudioVideoColumnData = data.column;

                    var _AudioVideoData = {};
                    _AudioVideoData.banner = data.banner;
                    _AudioVideoData.notice = data.notice;
                    _AudioVideoData.column = data.column;
                    _AudioVideoData.columnNameList = data.columnNameList;
                    _this.AudioVideoData = _AudioVideoData;
 
                    if(data.banner.length>1)
                    {
                        _this.$nextTick(()=>{
                            _this.bannerSwiper();  //数据加载成功执行轮播
                        });
                    }
                    //公告
                    if(data.notice.length > 1){
                        _this.$nextTick(()=>{
                            _this.noticeSwiper();  //数据加载成功执行轮播
                        });
                    }
                    
                }).catch((err) => {
                    console.log(err);
                });
            },
            cacheData(planeData) {
                var _this = this;
                
                var moviePath = apiHost + '/app/dxj/cache/' + dataVersion + '/audioVideoIndex' + planeData;
                //请求本地缓存数据
                axios.get(moviePath).then((result) => {
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    var data = result.data.data;
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }

                    //渲染数据
                    _this.isLoad = false;
                    _this.isWaiting = false;
                    _this.AudioVideoCacheData = data;
                    _this.AudioVideoColumnData = data.column;

                    var _AudioVideoData = {};
                    _AudioVideoData.banner = data.banner;
                    _AudioVideoData.notice = data.notice;
                    _AudioVideoData.column = data.column;
                    _AudioVideoData.columnNameList = data.columnNameList;
                    _this.AudioVideoData = _AudioVideoData;

                    if(data.banner.length>1)
                    {
                        _this.$nextTick(()=>{
                            _this.bannerSwiper();  //数据加载成功执行轮播
                        });
                    }
                    //公告
                    if(data.notice.length > 1){
                        _this.$nextTick(()=>{
                            _this.noticeSwiper();  //数据加载成功执行轮播
                        });
                    }

                }).catch((err) => {
                    console.log(err);
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    //获取接口数据
                    _this.$nextTick(()=>{
                        _this.getAudioVideoData(_this.dataToken);
                    });
                });
            },
            getAudioVideoData:function (token) {
                var _this = this;
                _this.isWaiting = true;
                var url = _this.dataHost + `/v1/audioVideo/index?` + querystring.stringify({
                    param: JSON.stringify({
                    "version":NATIVEPARAM.version,
                    "platform":4,
                    "environment":'plan'
                    })
                });
                _this.$http.get(url, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token,
                        "cache-control": "no-cache"
                    },
                    _timeout:15000,
                    onTimeout: (request) => {
                        _this.isWaiting = false;
                    }
                    }).then((message) => {
                        _this.isWaiting = false;
                        var starts = message.data.status,
                            msg = message.data.msg;
                        if (starts == 200) {
                        _this.baseUrl = apiHost + '/app/dxj';
                        _this.isCacheDataLoad = true;
                        var data = message.data.data;
                        _this.AudioVideoData = data;
                        _this.isReady = true;
                        _this.isLoad = false;
                        if(data.banner.length>1)
                        {
                            _this.$nextTick(()=>{
                                _this.bannerSwiper();  //数据加载成功执行轮播
                            });
                        }
                        //公告
                        if(data.notice.length > 1){
                            _this.$nextTick(()=>{
                                _this.noticeSwiper();  //数据加载成功执行轮播
                            });
                        }
                    }
                }, () => {
                    _this.isWaiting = false;
                    // _this.showLayer("showMsg", "网络请求错误");
                });
            },
            getColumnJsonData: function (columnId) {
                //获取机上静态资源数据
                var _this = this;
                
                let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/columnAudioVideo/' + columnId + '.json';
                axios.get(jsonSrc).then((result) => {
                    if(_this.isAdCacheDataLoad){
                        return false
                    }
                    var data = result.data.data;
                    _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }
                    // 渲染数据
                    _this.AudioVideoColumnData = data.list;
                    
                }).catch((err) => {
                    console.log(err);
                });
            },
            cacheColumnData(planeData,columnId) {
                var _this = this;
                _this.AudioVideoColumnData = [];
                var moviePath = apiHost + '/app/dxj/cache/' + dataVersion + '/columnAudioVideo/' + columnId + planeData;
                //请求本地缓存数据
                axios.get(moviePath).then((result) => {
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    var data = result.data.data;
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }
                    window.removeEventListener('scroll',_this.addMore,false);
                    //渲染数据
                    _this.AudioVideoColumnData = data.list;
                    
                    
                    _this.isReady = false;

                }).catch((err) => {
                    console.log(err);
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    window.addEventListener('scroll',_this.addMore,false);
                    //获取接口数据
                    _this.$nextTick(()=>{
                        _this.getAudioVideoColumnData(_this.dataToken,columnId);
                    });
                });
            },
            getAudioVideoColumnData:function (token,columnId) {
                var _this = this;
                _this.isWaiting = true;
                _this.isReady = true;
                var url = _this.dataHost + `/v1/audioVideo/column?` + querystring.stringify({
                    param: JSON.stringify({
                    "version":NATIVEPARAM.version,
                    "platform":4,
                    "environment":'plan',
                    "columnId": columnId,
                    "page": _this.curpage,
                    "pageSize": 10
                    })
                });
                _this.$http.get(url, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token,
                        "cache-control": "no-cache"
                    },
                    _timeout:15000,
                    onTimeout: (request) => {
                        _this.isWaiting = false;
                        _this.isReady = false;
                    }
                    }).then((message) => {
                    var starts = message.data.status,
                        msg = message.data.msg;
                    if (starts == 200) {
                        _this.baseUrl = _this.dataHost + '/app/dxj';
                        var data = message.data.data.list;
                        if(_this.curpage==0){
                            _this.AudioVideoColumnData = [];
                        }
                        if(data.length > 0){
                            _this.curpage++
                        }
                        if (_this.curpage > 0 && data.length > 0) {}
                        else{
                            window.removeEventListener('scroll',_this.addMore,false);
                            _this.isReady = false;
                        }
                        if(data.length>0){
                            _this.AudioVideoColumnData = _this.AudioVideoColumnData.concat(data);
                        }

                        _this.isWaiting = false;
                        _this.isReady = false;
                        _this.isLoad = false;
                    }
                }, () => {
                    _this.isWaiting = false;
                    // _this.showLayer("showMsg", "网络请求错误");
                });
            },
            tabFn:function (index) {    //tab切换方法
                var _this = this;
                //设置tab默认赋值
                _this.curpage = 0;
                _this.curType = index;
                eventLog({eventId:'EntertainmentVideo_Type_'+ _this.AudioVideoData.column[index].id +'_click',eventType:'1'})
                if(index==0){
                    window.removeEventListener('scroll',_this.addMore,false);
                }else{
                    _this.$nextTick(()=>{
                        
                        _this.getColumnJsonData(_this.AudioVideoData.column[index].id);
                        _this.cacheColumnData(utcTime, _this.AudioVideoData.column[index].id);
                        // _this.getAudioVideoColumnData(_this.dataToken, _this.AudioVideoData.column[index].id);
                    });
                }
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
            addMore(){
                var H = document.documentElement.scrollHeight || document.body.scrollHeight;
                var h = window.innerHeight;
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                if (H - (h + t) < 15 && !this.isReady){
                  this.getAudioVideoColumnData(this.dataToken, this.AudioVideoData.column[this.curType].id);
                }
              },
              enterVideoEventLog(item){
                eventLog({eventId:'EntertainmentVideo_program_'+ item.id +'_click',eventType:'1',contentTitle:item.title});
                setTimeout(function() {
                    window.location.href = 'new-video-detail.html?id=' + item.id;
                },500)
              }
        },
        components:{
            loading,
            popLayer,
            headerNav,
            videoSwiper
        }
    });

});
