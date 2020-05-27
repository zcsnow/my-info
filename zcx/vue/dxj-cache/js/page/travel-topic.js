require('../../css/travel-topic.scss');
require('../../css/swiper.min.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,dataHost,apiHost,utcTime,getHash,dataVersion} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';

import Swiper from 'swiper';

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
            isLoad: true,        // 显示加载中
            show_msg: "",
            headArray: "",
            jsonArray: [{id:undefined}],
            showNav: NATIVEPARAM.showNav,
            dataHost: dataHost,
            apiHost: apiHost,
            dataToken: "",
            dxjResourceDir:"",//获取机上静态资源目录
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            curpage: 0,     //当前分页值
            lastNum: 0,     //当前分页最后一条upper_time值
            pagecount: 999,    //总页数
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
              _this.getDxjJsonData();
              _this.cacheData(utcTime);
          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
          });
        },
        methods: {
          getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
          },
          getDxjJsonData: function () {
            //获取机上静态资源数据
            var _this = this;
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/travel-topic/' + _this.getQueryString("tag") + '.json';
            axios.get(jsonSrc).then((result) => {
              if(_this.isCacheDataLoad){
                return false
              }
              _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
              var data = result.data.data.list;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              //渲染数据
              _this.jsonArray = data.cont;
              _this.headArray  = data.head;
              _this.isLoad = false;
                
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheData(planeData) {
            var _this = this;
            var readPath = apiHost + '/app/dxj/cache/' + dataVersion + '/travel-topic/' + _this.getQueryString("tag") + planeData;
            //请求本地缓存数据
            axios.get(readPath).then((result) => {
              _this.baseUrl = _this.apiHost + '/app/dxj';
              _this.isCacheDataLoad = true;
              var data = result.data.data.list;
              console.log(data);
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }

              //渲染数据
              _this.jsonArray = data.cont;
              _this.headArray  = data.head;
              _this.isLoad = false;

            }).catch((err) => {
                console.log(err);
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getData(_this.dataToken);
                });
            });
          },
          getData(token) {
            var _this = this;
            _this.isWaiting = true;
            _this.isReady = true;

            var url = this.dataHost + `/v1/subjectarticles/index?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "page": this.curpage,
                "pageSize": 10,
                "sid": this.getQueryString("tag"),
                "lastNumber": this.lastNum
              })
            });
            this.$http.get(url, {
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
              }).then((message) => {
              _this.isReady = false;
              var starts = message.body.status,
                  msg = message.body.msg;
              if (starts == 200) {
                  _this.baseUrl = '/app/dxj';
                  _this.isCacheDataLoad = true;
                  if(_this.curpage==0){
                    _this.jsonArray = [];
                  }
                  if(_this.jsonArray.length==1){_this.jsonArray=[];} //接口请求处理占位数据
                  var data = message.body.data.list;
                  _this.jsonArray = _this.jsonArray.concat(data.cont);
                  _this.headArray  = data.head;
                  if (_this.curpage++>=_this.pagecount) {
                      window.removeEventListener('scroll',_this.addMore,false);
                  }
                  //分页第二页后需要传值upper_time
                  if (_this.curpage > 0 && data.length > 0) {
                      _this.lastNum = data[data.length-1].upper_time;
                  }else{
                      window.removeEventListener('scroll',_this.addMore,false);
                  }
                  _this.isReady = true;
                  _this.isWaiting = false;
              }
              if(message.body.data) {
                _this.$nextTick(()=>{
                  window.addEventListener('scroll',_this.addMore.bind(_this),false);
                });
              }
            }, () => {
              _this.isReady = false;
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
              this.destroySwiper();
              this._mySwiper = new Swiper(this.$el.querySelector('#swiper1'), {
                  direction: 'horizontal',
                  loop: true,
                  autoplay: 5000,
                  pagination: '.swiper-pagination',
                  autoplayDisableOnInteraction: false,
                  observer:true,
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
                this.getData(this.dataToken);
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