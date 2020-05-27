require('../../css/book-list.scss');
require('../../css/swiper.min.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN,isNative,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';

import Swiper from 'swiper';
import FastClick from 'fastclick';

Vue.use(Resource, axios);
Vue.use(VueLazyload,{
    error: '../images/e.gif',
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

window.addEventListener('DOMContentLoaded', function() {
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el: "#main",
        data: {
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            isReady: false,      // 下拉加载控制器
            isLoad: true, 		   // 显示加载中
            show_msg: "",
            title: "阅读",
            jsonArray: [],
            topicArray: [],
            showNav: NATIVEPARAM.showNav,
            dataHost: dataHost,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            isAdCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrlAd: '',
            isCacheDataLoad2:false, //cache或接口资源是否优先加载成功
            baseUrlReadhome: '',
            banner: [{id:undefined}], //头部轮播数据
            readhomeData: {
              listBookOnline: []
            },
            bookTjData: [],
            curpage: 0,     //当前分页值
            lastNum: 0,     //当前分页最后一条upper_time值
            pagecount: 999,    //总页数
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted() {
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

              _this.getBannerJsonData();
              _this.getDxjJsonData();
              _this.getDxjJsonDataReadhome();

              //飞机环境要先获取资源
              _this.cacheBanner(utcTime);
              _this.cacheReadhome(utcTime);
              _this.cacheBook(utcTime);

          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
          });

        },
        methods: {
          getBannerJsonData: function () {
            //获取机上静态资源数据
            var _this = this;
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/focus.json';
            axios.get(jsonSrc).then((result) => {
              var data = result.data.data.book;
              if(_this.isAdCacheDataLoad){
                return false
              }
              _this.baseUrlAd = _this.apiHost + _this.dxjResourceDir;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              // 渲染数据
              _this.banner = data;
              if(data.length>1){
                _this.$nextTick(() => {
                    _this.initSwiper();
                });
              }
                
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheBanner(planeData) {
            var _this = this;

            var focusPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/focus' + planeData;
            //请求本地缓存数据
            axios.get(focusPath).then((result) => {
              _this.baseUrlAd = _this.apiHost + '/app/dxj';
              _this.isAdCacheDataLoad = true;
              var data = result.data.data.book;
              console.log(data);
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }

              //渲染数据
              _this.banner = data;
              if(data.length>1){
                _this.$nextTick(() => {
                    _this.initSwiper();
                });
              }
              
            }).catch((err) => {
                console.log(err);
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getBanner(_this.dataToken);
                });
            });

          },
          getBanner(token) {
            var _this = this;

            var url = _this.dataHost + `/v1/focus/index?` + querystring.stringify({
                param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "type": "book"
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
                var starts = message.body.status,
                  msg = message.body.msg;
                if (starts == 200) {
                  _this.baseUrlAd = '/app/dxj';
                  _this.isAdCacheDataLoad = true;
                    var data = message.body.data.list;
                    _this.banner = data;
                    if(data.length>1){
                      _this.$nextTick(() => {
                        this.initSwiper();
                      });
                    }
                } else {
                    _this.showLayer("showMsg", msg);
                }
            });
          },
          getDxjJsonDataReadhome: function () {
            //获取机上静态资源数据
            var _this = this;
            if(_this.dxjResourceDir == ""|| _this.dxjResourceDir == null){
                console.log('本次航班静态资源不存在');
            }
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/readhome.json';
            axios.get(jsonSrc).then((result) => {
              if(_this.isCacheDataLoad2){
                return false
              }
              var data = result.data.data.list;
              _this.baseUrlReadhome = _this.apiHost + _this.dxjResourceDir;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              //渲染数据
              _this.readhomeData = data;
                
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheReadhome(planeData) {
            var _this = this;

            var readPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/readhome' + planeData;
            //请求本地缓存数据
            axios.get(readPath).then((result) => {
              _this.baseUrlReadhome = _this.apiHost + '/app/dxj';
              _this.isCacheDataLoad2 = true;
              var data = result.data.data.list;
              console.log(data);
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }

              //渲染数据
              _this.readhomeData = data;

            }).catch((err) => {
                console.log(err);
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getReadhomeData(_this.dataToken);
                });
            });

          },
          getReadhomeData(token) {
            var _this = this;
            _this.isWaiting = true;
            var articleUrl = this.dataHost + `/v1/readhome/index?` + querystring.stringify({
                param: JSON.stringify({
                    "version":NATIVEPARAM.version,
                    "platform":4,
                    "environment":'plan',
                    "page":_this.curpage,
                    "pageSize": 10,
                    "lastNumber":_this.lastNum
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
                }
            }).then((message)=>{
                var status = message.body.status,
                    msg = message.body.msg;

                if (status === 200) {
                  _this.baseUrlReadhome = '/app/dxj';
                  _this.isCacheDataLoad2 = true;
                    var data = message.body.data.list;
                    this.readhomeData = data;

                    // this.articleData.content = this.articleData.content.replace(/cache/g, 'app/dxj/cache');
                    // console.log(this.articleData.content);

                    this.isWaiting = false;
                }else{
                    this.isWaiting = false;
                    this.showLayer("showMsg", msg);
                }

            },()=>{
                this.isWaiting = false;
                this.showLayer("showMsg", "网络请求错误");
            });
          },
          getDxjJsonData: function () {
            //获取机上静态资源数据
            var _this = this;
            if(_this.dxjResourceDir == ""|| _this.dxjResourceDir == null){
                console.log('本次航班静态资源不存在');
            }
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/book.json';
            axios.get(jsonSrc).then((result) => {
              if(_this.isCacheDataLoad){
                return false
              }
              var data = result.data.data.list;
              _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              //渲染数据
              _this.bookTjData = data;
              _this.isLoad = false;
              window.removeEventListener('scroll',_this.addMore,false);
                
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheBook(planeData) {
            var _this = this;

            var bookPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/book' + planeData;
            //请求本地缓存数据
            axios.get(bookPath).then((result) => {
              _this.baseUrl = _this.apiHost + '/app/dxj';
              _this.isCacheDataLoad = true;
                var data = result.data.data.list;
                console.log(data);
                if(data==undefined){
                  console.log("数据类型转换");
                  data = JSON.parse(data);
                }

                //渲染数据
                _this.bookTjData = data;
                _this.isLoad = false;
                window.removeEventListener('scroll',_this.addMore,false);

            }).catch((err) => {
                console.log(err);
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getBookTjData(_this.dataToken);
                });
            });

          },
          getBookTjData(token) {
            var _this = this;
            _this.isReady = true;
            var url = this.dataHost + `/v1/book/index?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "page":this.curpage,
                "pageSize": 10,
                "lastNumber":this.lastNum
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
                    _this.isLoad = false;
                    _this.isWaiting = false;
                }
              }).then((message) => {
              _this.isReady = false;
              var starts = message.body.status,
                  msg = message.body.msg;
              if (starts == 200) {
                _this.baseUrl = '/app/dxj';
                _this.isCacheDataLoad = true;
                if(_this.curpage==0){
                  _this.bookTjData = [];
                }
                  var data = message.body.data.list;
                  _this.bookTjData = _this.bookTjData.concat(data);
                  if (_this.curpage++>=_this.pagecount) {
                      window.removeEventListener('scroll',_this.addMore,false);
                      _this.isReady = true;
                      _this.isLoad = false;
                  }
                  //分页第二页后需要传值upper_time
                  if (_this.curpage > 0 && data.length > 0) {
                      _this.lastNum = data[data.length-1].upper_time;
                  }else{
                      window.removeEventListener('scroll',_this.addMore,false);
                      _this.isReady = true;
                      _this.isLoad = false;
                  }
              } else {
                  _this.showLayer("showMsg", msg);
              }
              if(message.body.data) {
                _this.$nextTick(()=>{
                  window.addEventListener('scroll',_this.addMore.bind(_this),false);
                });
              }

            }, () => {
              _this.isReady = false;
              _this.showLayer("showMsg", "网络请求错误");
            });
          },
          showLayer(type, v, auto) { //执行toast弹出层
              var _this = this;
              if (type == "show") {
                  _this.isShow = v;
              } else if (type == "showMsg") {
                  _this.show_msg = v;
              }
              if (!auto) {
                  if (_this.timeId) { clearInterval(_this.timeId); }
                  _this.timeId = setTimeout(() => {
                      _this.isShow = false;
                      _this.show_msg = "";
                  }, 2000);
              }
          },
          initSwiper: function() {
              var _this = this;
              this.destroySwiper();
              this._mySwiper = new Swiper(this.$el.querySelector('#swiper1'), {
                  direction: 'horizontal',
                  loop: true,
                  autoplay: 5000,
                  pagination: '.swiper-pagination',
                  autoplayDisableOnInteraction: false,
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
          destroySwiper: function() {
              this._mySwiper && (this._initialSlide = this._mySwiper.activeIndex);
              this._mySwiper && this._mySwiper.destroy();
              this._mySwiper = null;
          },
          addMore(){
            var H = document.documentElement.scrollHeight || document.body.scrollHeight;
            var h = window.innerHeight;
            var t = document.documentElement.scrollTop||document.body.scrollTop;
            if (H - (h + t) < 15 && !this.isReady){
                this.getBookTjData(this.dataToken);
            }
          },
          //swiper自动轮播 发送埋点数据方法
          bannerAutoSwiperClick:function (index,title,url) {
            eventLog({eventId:'read_adbanner_'+ (parseInt(index)+1) +'_click',eventType:'1',eventIsAD:'1',contentType:'焦点图',contentTitle:title});
            window.location.href = url;
          }
        },
        components: {
            loading,
            popLayer,
            headerNav
        }
    });

});