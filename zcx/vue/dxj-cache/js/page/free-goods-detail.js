require('../../css/free-goods-detail.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,callN,isNative,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion,versionContrast} from 'nativeA';
import {setCookie, getCookie} from '../modules/cookie.js';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import FastClick from 'fastclick';

import Swiper from 'swiper';

Vue.use(Resource, axios);

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
            isWaiting: true,   // 显示加载中
            isShow: false,      // 显示toast
            dataHost: dataHost,
            apiHost: apiHost,
            isLogin: (isUuid) && (isAccess_token)?true:false, //登陆状态
            show_msg: "",
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            tag: [],
            detailData: {title:0},
            showNav: NATIVEPARAM.showNav,
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted(){
            // this.focus = this.getQueryString("focus")?this.getQueryString("focus"):0
            
            var _this = this;

            // 外部调用dataToken&dxjApi
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
                _this.cacheDetailData(utcTime);

            }).catch(e => {
                console.log('获取token失败，错误信息:', e);
                _this.isWaiting =false;
            });

        },
        methods:{
            getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            showLayer(type, v, auto) { //执行toast弹出层
                var _this = this;
                if (type == "show") {
                  _this.isShow = v;
                } else if (type == "showMsg") {
                  _this.show_msg = v;
                }
                if (!auto) {
                  if(_this.timeId){clearTimeout(_this.timeId);}
                  _this.timeId = setTimeout(() => {
                    _this.isShow = false;
                  _this.show_msg = "";
                }, 2000);
                }
            },
            cacheDetailData(planeData) {
                var _this = this;
                var id = _this.getQueryString("id");
                // var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/city-list' + planeData;
                var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/mallGoods/' + id + planeData;
                //请求本地缓存数据
                _this.isWaiting = true;
                axios.get(url).then((result) => {
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    var data = result.data.data;
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }
                    _this.isCacheDataLoad = true;
                    if(data.content != undefined)
                    {
                        data.content = data.content.replace(/cache/g, 'app/dxj/cache');
                    }
                    else if(data.description != undefined){
                        data.content = data.description.replace(/cache/g, 'app/dxj/cache');
                    }
                    _this.detailData = data;
                    
                    if(data.images && data.images.length > 1){
                        _this.$nextTick(()=>{
                            _this.bannerSwiper();  //数据加载成功执行轮播
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    _this.isWaiting = false;
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    //获取接口数据
                    _this.$nextTick(()=>{
                        _this.getDetailData(_this.dataToken);
                    });
                });
            },
            getDetailData:function(token){
                var _this = this;
                _this.isWaiting = true;
                var articleUrl = _this.dataHost + `/v1/mallGoods/detail?` + querystring.stringify({
                    param: JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "platform": 4,
                        "environment": 'plan',
                        "id": parseInt(_this.getQueryString("id"))
                    })
                });
                _this.$http.get(articleUrl, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token,
                        "cache-control": "no-cache"
                    },
                    _timeout:15000,
                    onTimeout: (request) => {
                        _this.isWaiting = false;
                        // _this.showLayer("showMsg", "请求超时");
                    }
                }).then((message)=>{
                    var status = message.body.status,
                        msg = message.body.msg;
                    if (status === 200) {
                        _this.isCacheDataLoad = true;
                        var data = message.body.data;
                        _this.baseUrl = _this.dataHost + '/app/dxj';
                        if(data.content != undefined)
                        {
                            data.content = data.content.replace(/cache/g, 'app/dxj/cache');
                        }
                        else if(data.description != undefined){
                            data.content = data.description.replace(/cache/g, 'app/dxj/cache');
                        }
                        _this.detailData = data;
                        
                        if(data.images && data.images.length > 1){
                            _this.$nextTick(()=>{
                                _this.bannerSwiper();  //数据加载成功执行轮播
                            });
                        }
                    }
                    _this.isWaiting = false;

                },()=>{
                    _this.isWaiting = false;
                    // _this.showLayer("showMsg", "网络请求错误");
                });
            },
            destroySwiperdestroySwiper: function (num) {
                //头部轮播
                if(this.$el.querySelector('#swiper'+num)!=null){
                    //this["_mySwiper"+num] && (this._initialSlide = this["_mySwiper"+num].activeIndex);
                    this["_mySwiper"+num] && this["_mySwiper"+num].destroy(true, true);
                    this["_mySwiper"+num] = null;
                }
            },
            bannerSwiper: function () {
                // this.destroySwiper(1);
                //头部轮播
                this._mySwiper1 = new Swiper(this.$el.querySelector('#swiper'), {
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
                        //   var index = swiper.clickedSlide.attributes['data-swiper-slide-index'].nodeValue; //轮播图所处索引值
                        //   var title = swiper.clickedSlide.attributes['data-title'].nodeValue; //轮播图图片标题
                        //   var url = swiper.clickedSlide.attributes['data-url'].nodeValue;     //轮播图跳转链接
                        //   vm.bannerAutoSwiperClick(index,title,url)  //发送埋点数据方法
                      }
                });
                console.log(this._mySwiper1)
            },
            goBack: function () {
                window.history.back();
            },
            enterShoppingCard: function () {

                if(this.isLogin==true){
                    callN("enterShoppingCard"); 
                    eventLog({eventId:'home_shoppingcard_my',eventType:'1'});
                    console.log("enterShoppingCard")
                }else{
                    eventLog({eventId:'shoppingcard_topic_login',eventType:'1'});
                    window.location.href = "login.html?pageUrl=free-goods-detail.html?id=" + parseInt(this.getQueryString("id"))
                }

            }
        },
        components: {
            loading,
            popLayer,
            headerNav
        }
    });

});