require('../../css/artwork-list.scss');
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

import Swiper from 'swiper';
import FastClick from 'fastclick';
import imgPreview from '../modules/imgPreview';
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
            baseUrlArtList: '',
            baseUrlArtists: '',
            isAdCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrlAd: '',
            title: "艺术品", //页面标题
            isImgPreviewShow:false,
            previewData:'',
            dxjApi: "",     //飞机环境访问资源路径
            bannerData: [],     //banner数据
            ad1: [],  //广告1
            ad2: [], //广告2
            artists: [],    //
            cacheArtistsData:{},
            isHasArtListCache:true,
            isHasCache:true,
            artworkList: [], //作品展览列表
            artworkListCache: [],
            artworkTypes: [],  //作品列表类型列表
            curType: 1,        //当前作品列表类型
            curpage: 0,      //作品展览当前分页值
            lastNum: 0,      //作品展览当前分页最后一条upper_time值
            pagecount: 999, 	//作品展览总页数
            eventLog:eventLog //事件埋点发送方法

        },
        mounted(){
            var _this = this;
            
            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                var planeType = res.planeType;
                if(planeType=="00"){
                    _this.dxjApi = res.hash+'/dxj/dxj';
                    _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
                }else if(planeType=="bc03"){
                    _this.dxjApi = res.hash+'/dxj/dxj';
                    _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
                }else{
                    _this.dxjApi = res.hash;
                    _this.dxjResourceDir = res.hash;//获取机上静态资源目录
                }

                _this.getBannerJsonData();
                // 飞机环境要先获取资源
                console.log(res);
                _this.cacheAdData(utcTime);
                _this.getDxjJsonData();
                // 获取作品展览数据
                _this.cacheArtListData(utcTime,_this.dataToken);
                
                _this.$nextTick(()=>{
                    setTimeout(function(){
                        //监听浮动事件
                        var  navOffHeight = $('.nav-list-box .artworks').offset().top;
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

            //视频类型
            _this.artworkTypes = [
                {"type":"1", "title":"国画", "active":true},
                {"type":"2", "title":"油画", "active":false},
                {"type":"3", "title":"书法", "active":false},
                {"type":"4", "title":"古玩", "active":false},
            ];
        },
        methods:{
            getBannerJsonData: function () {
                //获取机上静态资源数据
                var _this = this;
                let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/artAd.json';
                axios.get(jsonSrc).then((result) => {
                    var data = result.data.data;
                    if(_this.isAdCacheDataLoad){
                        return false
                    }
                    _this.baseUrlAd = _this.apiHost + _this.dxjResourceDir;
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }
                    // 渲染数据
                    _this.$nextTick(()=>{
                        _this.AdRender(data);
                        //艺术名家随机
                        _this.cacheArtistsData = data.artists;
                        _this.randomArtArtists(_this.cacheArtistsData);

                    });
                    _this.isHasCache = true;
                    
                }).catch((err) => {
                    console.log(err);
                });
            },
            //获取广告和banner数据
            cacheAdData:function (planeData) {
                var _this = this;
                //飞机环境要先获取资源
                var dataPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/artAd' + planeData;
                //请求飞机首页本地缓存数据
                axios.get(dataPath).then((result) => {
                    _this.baseUrlAd = _this.apiHost + '/app/dxj';
                    _this.isAdCacheDataLoad = true;
                    var data = result.data.data;
                    if(data==undefined){
                        data = JSON.parse(data);
                    }
                    _this.$nextTick(()=>{
                        _this.AdRender(data);
                        //艺术名家随机
                        _this.cacheArtistsData = data.artists;
                        _this.randomArtArtists(_this.cacheArtistsData);

                    });
                    _this.isHasCache = true;

                }).catch((err) => {
                    _this.isHasCache = false;
                    _this.getAdData(_this.dataToken);
                    _this.getArtistsData(_this.dataToken)
                });
            },
            getAdData:function (token){
                var _this = this;
                _this.isWaiting = true;
                var homeUrl = _this.dataHost + `/v1/artchannel/index?` + querystring.stringify({
                      param: JSON.stringify({
                          "version":NATIVEPARAM.version,
                          "platform":4,
                          "environment":'plan',
                          "time": new Date().getTime()
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
                        _this.isWaiting = false;
                        _this.isLoad = false;
                   }
                }).then((message)=>{    //获取首页接口数据
                    _this.isWaiting = false;
                    var status = message.body.status,
                        msg = message.body.msg;
                    if (status === 200) {
                        _this.baseUrlAd = '/app/dxj';
                        _this.isAdCacheDataLoad = true;
                        var data = message.body.data;
						_this.AdRender(data);
                    }else{
                        _this.showLayer("showMsg", msg);
                    }
                },()=>{
                    _this.showLayer("show", true);
                    _this.isWaiting = false;
                });

            },
            AdRender: function (data) {
                var _this = this;
                //banner 
                _this.bannerData = data.list;
                if(_this.bannerData.length > 1){
                    _this.$nextTick(()=>{
                        _this.bannerSwiper();  //数据加载成功执行轮播
                        
                	});
                }
                //公告 ad1
                _this.ad1 = data.ad1;
                if(_this.ad1.length > 1){
                    _this.$nextTick(()=>{
                        _this.ad1Swiper();  //数据加载成功执行轮播
                	});
                }
               
                //ad2
                _this.ad2 = data.ad2;
                if(_this.ad2.length > 1){
                    _this.$nextTick(()=>{
                        _this.ad2Swiper();  //数据加载成功执行轮播
                	});
                }
            },
            getDxjJsonData: function () {
                //获取机上静态资源数据
                var _this = this;
                let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/arts.json';
                axios.get(jsonSrc).then((result) => {
                    if(_this.isCacheDataLoad){
                        return false
                    }
                  _this.baseUrlArtList = _this.apiHost + _this.dxjResourceDir;
                  _this.baseUrlArtists = _this.apiHost + _this.dxjResourceDir;
                  var data = result.data.data;
                  if(data==undefined){
                    console.log("数据类型转换");
                    data = JSON.parse(data);
                  }
                  //渲染数据
                  _this.isWaiting = false;
                  _this.artworkListCache = data;
                  _this.$nextTick(()=>{
                        _this.isLoad = false;
                        window.removeEventListener('scroll',_this.addMore,false);
                        _this.artworkList = data.list1;
                        if(_this.artworkList.length==0){
                            _this.noDataIShow = true;
                        }else{
                            _this.noDataIShow = false;
                        }
                  });
                    
                }).catch((err) => {
                    console.log(err);
                });
              },
            //请求艺术家数据
            getArtistsData:function (token){
                var _this = this;
                _this.isWaiting = true;
                var homeUrl = _this.dataHost + `/v1/artchannel/randomArtist?` + querystring.stringify({
                      param: JSON.stringify({
                          "version":NATIVEPARAM.version,
                          "platform":4,
                          "environment":'plan'
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
                        _this.isWaiting = false;
                        _this.isLoad = false;
                   }
                }).then((message)=>{    //获取首页接口数据
                    _this.isWaiting = false;
                    var status = message.body.status,
                        msg = message.body.msg;
                    if (status === 200) {
                        _this.baseUrlArtists = '/app/dxj';
                        _this.isCacheDataLoad = true;
                        var data = message.body.data;
						_this.artists=data.list;
                    }
                },()=>{
                    _this.isWaiting = false;
                });

            },
            //cache随机艺术家
            randomArtArtists:function (data){
                var randomArtNum1 = Math.floor(Math.random()*data.list1.length);
                var randomArtNum2 = Math.floor(Math.random()*data.list2.length);
                var randomArtNum3 = Math.floor(Math.random()*data.list3.length);
                var randomArtNum4 = Math.floor(Math.random()*data.list4.length);
                var list1 = data.list1[randomArtNum1];
                var list2 = data.list2[randomArtNum2];
                var list3 = data.list3[randomArtNum3];
                var list4 = data.list4[randomArtNum4];
                this.artists=[list1,list2,list3,list4];
            },
            cacheArtListData:function (planeData,token) {
                var _this = this;
                //飞机环境要先获取资源
                var dataPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/arts' + planeData;
                //请求飞机本地缓存数据
                axios.get(dataPath).then((result) => {
                    _this.baseUrlArtists = _this.apiHost + '/app/dxj';
                    _this.baseUrlArtList = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    var data = result.data.data;
                    console.log(data);
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }
                    _this.artworkListCache = data;
                    _this.$nextTick(()=>{
                        _this.isLoad = false;
                        window.removeEventListener('scroll',_this.addMore,false);
                        _this.artworkList = data.list1;
                        if(_this.artworkList.length==0){
                            _this.noDataIShow = true;
                        }else{
                            _this.noDataIShow = false;
                        }
                    });

                }).catch((err) => {
                    //获取作品展示数据
                    _this.$nextTick(()=>{
                        window.addEventListener('scroll',this.addMore.bind(this),false);
                    });
                    _this.isHasArtListCache = false;
                    _this.getArtListData(_this.curType,token);
                    
                });
            },
            getArtListData:function (curType,token) {
                var _this = this;
                _this.isReady = true;
                var artworkListUrl = _this.dataHost + `/v1/art/index?` + querystring.stringify({
                    param: JSON.stringify({
                      "version":NATIVEPARAM.version,
                      "platform":NATIVEPARAM.platform,
                      "environment":NATIVEPARAM.environment,
                      "category":curType,
                      "page":_this.curpage,
                      "pageSize": 10,
                      "lastNumber":_this.lastNum
                      
                    })
                  });
                _this.$http.get(artworkListUrl, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token,
                        "cache-control": "no-cache"
                    },
                    timeout:15000,
                    onTimeout: (request) => {
                        _this.isWaiting = false;
                    }
                }).then((message) => {
                  _this.isReady = false;
                  var status = message.body.status,
                      msg = message.data.msg;
                  if (status === 200) {
                    _this.baseUrlArtList = '/app/dxj';
                    _this.isCacheDataLoad = true;
                    if(_this.curpage==0){
                        _this.artworkList = [];
                    }
                    var curData = message.body.data.list;    //当次请求内容
                    _this.artworkList = _this.artworkList.concat(curData);
                    if(_this.artworkList.length==0){
                        _this.noDataIShow = true;
                    }else{
                        _this.noDataIShow = false;
                    }

                    if (_this.curpage++>=_this.pagecount) {
                      window.removeEventListener('scroll',_this.addMore,false);
                      _this.isReady = true;
                      _this.isLoad = false;
                    }
                    //console.log(_this.curpage)
                    // console.log(curData);
                    //分页第二页后需要传值upper_time
                    if (_this.curpage > 0 && curData.length > 0) {
                      _this.lastNum = curData[curData.length-1].upper_time;       //接口赋值
                    }else{
                      window.removeEventListener('scroll',_this.addMore,false);
                      _this.isReady = true;
                      _this.isLoad = false;
                    }
                  }
    
                },()=>{
                  _this.isReady = false;
                });
    
            },
            addMore(){
              var H = document.documentElement.scrollHeight || document.body.scrollHeight;
              var h = window.innerHeight;
              var t = document.documentElement.scrollTop || document.body.scrollTop;
              if (H - (h + t) < 15 && !this.isReady){
                  this.getArtListData(this.curType,this.dataToken);
              }
            },
            //查看图片大图
            lookWorkDetail:function (previewData) {
                var _this = this;
                if(previewData.image.indexOf("http")==-1){ //没有http这个字符
                    previewData.image = _this.baseUrlArtList + previewData.image;
                    //previewData.smallImage = _this.baseUrl + previewData.smallImage;
                }
                _this.isImgPreviewShow = true;
                _this.previewData = previewData;
            },
            //隐藏图片预览组件
            hideImgPreview: function (e) {
                this.isImgPreviewShow = false;
            },
            //换一换
            changeOne: function (e) {
                if(this.isHasCache == true){
                    this.randomArtArtists(this.cacheArtistsData)
                }else{
                    this.getArtistsData(this.dataToken);
                }
            },
            tabFn:function (index) {    //tab切换方法
                var _this = this;
                //设置tab默认赋值
                for(var i=0, len=_this.artworkTypes.length; i<len; i++){
                  _this.artworkTypes[i].active = false;
                }
                _this.artworkTypes[index].active = true;
                _this.curpage = 0;
                _this.artworkList = [];
                _this.curType = index+1;
                if(_this.isHasArtListCache == true){
                    var listNum = 'list'+_this.curType
                    _this.$nextTick(()=>{
                        _this.artworkList = _this.artworkListCache[listNum];
                        if(_this.artworkList.length==0){
                            _this.noDataIShow = true;
                        }else{
                            _this.noDataIShow = false;
                        }
                    });
                }else{
                    setTimeout(function(){
                        var navOffHeight = parseInt($('.nav-list-box .artworks').offset().top);
                        $("html,body").scrollTop(navOffHeight+10); 
                    },100)
                    _this.getArtListData(_this.curType,_this.dataToken);
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
            bannerSwiper: function(){
                //this.destroySwiper();
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
            ad1Swiper: function () {
                //this.destroySwiper();
                //头部轮播
                this._mySwiper1 = new Swiper(this.$el.querySelector('#adswiper1'), {
                      direction: 'vertical',
                      loop: true,
                      autoplay : 5000,
                      noSwiping : true,
                      observer:true,
                });
            },
            ad2Swiper: function () {
                //this.destroySwiper();
                //头部轮播
                this._mySwiper2 = new Swiper(this.$el.querySelector('#adswiper2'), {
                      direction: 'horizontal',
                      loop: true,
                      autoplay : 5000,
                      pagination: '.swiper-pagination',
                      autoplayDisableOnInteraction : false,
                      observer:true,
                });
            },
            destroySwiper: function () {

                //banner轮播
                this._mySwiper && (this._initialSlide = this._mySwiper.activeIndex);
                this._mySwiper && this._mySwiper.destroy();
                this._mySwiper = null;

                //广告1轮播
                this._mySwiper1 && (this._initialSlide = this._mySwiper1.activeIndex);
                this._mySwiper1 && this._mySwiper1.destroy();
                this._mySwiper1 = null;

                //广告2轮播
                this._mySwiper2 && (this._initialSlide = this._mySwiper2.activeIndex);
                this._mySwiper2 && this._mySwiper2.destroy();
                this._mySwiper2 = null;

            }
        },
        components:{
            loading,
            popLayer,
            headerNav,
            imgPreview
        }
    });

});
