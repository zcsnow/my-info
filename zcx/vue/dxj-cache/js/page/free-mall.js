require('../../css/free-mall.scss');
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
import headerNav from 'headerNav';
import Swiper from 'swiper';

import FastClick from 'fastclick';

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
    // if(versionContrast(NATIVEPARAM.version,'4.2.7')){
    //     if(isNative){
    //         setCookie('phone', NATIVEPARAM.userName, 1);
    //         setCookie('uuid', NATIVEPARAM.userID, 1);
    //         setCookie('access_token', NATIVEPARAM.token, 1); 
    //         setCookie('couponBalance', NATIVEPARAM.couponBalance, 1);
    //         var uuid = getCookie('uuid') || '';
    //         var access_token = getCookie('access_token') || '';
    //         var isUuid = uuid !== null && uuid !== '' && uuid !== 'null';
    //         var isAccess_token = access_token !== null && access_token !== '' && access_token !== 'null'; 
    //     }
    // }
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
            isLoad: true, 		   // 显示加载中
            isLogin: (isUuid) && (isAccess_token)?true:false, //登陆状态
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            isNative: isNative,
            dataHost: dataHost,
            apiHost: apiHost,
            baseUrl: '',
            dataToken: "",
            dxjApi: "",     //飞机环境访问资源路径
            banner: [],     //头部轮播数据
            mimiAd: [],
            cardEnterisShow:false,
            couponOpen:"0",
            couponBalance:"0",
            popularGoods: [],      //空中影院
            category: [],       //推荐目的地
            travel: [],     //旅行列表
            subject: [],      //视频列表
            subjectAd: {},     //视频广告
            subjectGoods:[],
            scoreExchangeUrl:'',
            eventLog:eventLog, //事件埋点发送方法
            

        },
        mounted(){
            var _this = this;
            //if(isNative){
                _this.cardEnterisShow = true;
            //}
            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                _this.dxjApi = res.hash;
                //setTimeout(function(){
                    _this.cacheHome(utcTime);//获取cache资源
                //},10000)

                if(isNative){
                    callN("ceairToken", {"token": _this.dataToken});
                    console.log("ceairToken:"+ _this.dataToken)
                }

            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });

        },
        methods:{
            
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
            
            popularGoodsSwiper: function () {
                //空中影院轮播
                this._mySwiper2 = new Swiper(this.$el.querySelector('#swiper2'), {
                    initialSlide :0,
                    slidesPerView: 3,
                    spaceBetween: 4,
                    observer:true,
                });
            },
            subjectGoodsSwiper: function () {
                //空中影院轮播
                this._mySwiper4 = new Swiper(this.$el.querySelectorAll('.subject-swiper'), {
                    initialSlide :0,
                    slidesPerView: 3,
                    spaceBetween: 4,
                    observer:true,
                });
            },
            categorySwiper: function () {
                    //目的地轮播
                    this._mySwiper3 = new Swiper(this.$el.querySelector('#swiper3'), {
                    initialSlide :0,
                    slidesPerView: 5,
                    spaceBetween: 17,
                    observer:true,
                });
            },
           
            cardSwiper: function(){
                //旅行轮播
                this._mySwiper5 = new Swiper(this.$el.querySelector('#swiper6'), {
                    direction: 'horizontal',
                    loop: false,
                    autoplay : 5000,
                    pagination: '.swiper-pagination',
                    autoplayDisableOnInteraction : false,
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
                console.log('优先获取机上设备缓存数据');
                var dataPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/mallChannel' + planeData;
                //请求飞机首页本地缓存数据
                axios.get(dataPath).then((result) => {
                    var data = result.data.data;
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    //console.log(data);
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }

                    _this.$nextTick(()=>{
                        _this.homeRender(data);
                    });

                }).catch((err) => {
                    console.log(err);
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    //获取首页数据
                    _this.getHomeData(_this.dataToken);
                });
            },
            getHomeData:function (token){

                var _this = this;
                //_this.isWaiting = true;
                var homeUrl = _this.dataHost + `/v1/mallChannel/index?` + querystring.stringify({
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
                        _this.showLayer("showMsg", "请求超时，本地获取");
                        _this.isWaiting = false;
                        //_this.isLoad = false;
                   }
                }).then((message)=>{    //获取首页接口数据
                    _this.isWaiting = false;
                    var status = message.body.status,
                        msg = message.body.msg;

                    if (status === 200) {
                        var data = message.body.data;
                        _this.baseUrl = _this.apiHost + '/app/dxj';
						_this.homeRender(data);
                    }else{
                        _this.showLayer("showMsg", msg);
                    }
                },()=>{
                    _this.showLayer("show", true);
                    _this.isWaiting = false;
                });

            },
            homeRender: function (data) {
                var _this = this;
                //头部轮播banner
                _this.banner = data.banner || [];
                if(_this.banner.length > 1){
                    _this.$nextTick(()=>{
                        _this.bannerSwiper(); 
                	  });
                }

                //min 广告轮播
                _this.mimiAd = data.mimiAd || [];
                if(_this.mimiAd.length > 1){
                    _this.$nextTick(()=>{
                        _this.cardSwiper();
                	  });
                }

                //购物券开关
                //_this.couponOpen = data.couponOpen =1;
                //购物券余额
                
                //_this.couponBalance = getCookie('couponBalance');
                //console.log(_this.couponBalance)
                
                _this.popularGoods = data.popularGoods || [];
                if(_this.popularGoods.length > 3){
                    _this.$nextTick(()=>{
                        _this.popularGoodsSwiper(); 
                        
                    });
                }else{
                    _this.destroySwiper(2);
                }

                _this.subject = data.subject || [];
                _this.subject.forEach(element => {
                    if(element.subjectGoods.length > 3){
                        _this.$nextTick(()=>{
                            _this.subjectGoodsSwiper();
                        });
                    }
                });
               
                _this.category = data.category || [];
                if(_this.category.length > 3){
                    _this.$nextTick(()=>{
                        _this.categorySwiper();
                    });
                }else{
                    _this.destroySwiper(3);
                }


                _this.scoreExchangeUrl = data.scoreExchangeUrl;
                setCookie('scoreExchangeUrl', data.scoreExchangeUrl, 1);  
                

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
                    window.location.href = "login.html?pageUrl=free-mall.html"
                }
            },
        },
        components:{
            loading,
            popLayer,
            headerNav,

        }
    });

});
