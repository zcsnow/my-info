require('../../css/city-topic.scss');

const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN, dataHost, apiHost, utcTime, getHash, eventLog, dataVersion } from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';

import insertScreenAd from '../modules/insertScreenAd';

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

window.addEventListener('DOMContentLoaded', function() {
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el: "#main",
        data: {
            isWaiting: true,    // 显示加载中
            isShow: false,       // 显示toast
            isReady: false,      // 下拉加载控制器
            isLoad: true,        // 显示加载中
            isFixed: false,     // 是否浮动导航
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "network",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            baseUrlBanner: '',
            dataHost: dataHost,
            title: "目的地",    //页面标题
            tag:'',
            banner: [],
            cityTypes: [],       //类型
            cityType: 1,
            cityDataCache: [[],[],[],[]],
            cityName: "", //城市名字
            pageTimeIn:"",
            eventLog:eventLog, //事件埋点发送方法

        },
        mounted() {
          var _this = this;

          // 根据hash获取当前的分类
          var hash = _this.cityType;
          if(location.hash.indexOf('#')>=0){
            hash = parseInt(location.hash.replace("#",""));
          }

          //设置当前类型赋值
          _this.cityType = parseInt(hash)&&parseInt(hash)<=4?hash:1;
          _this.tag = _this.getQueryString("tag");
  
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
            _this.pageTimeIn = Date.parse(new Date());
            // _this.getDxjJsonData();
            _this.cacheCityData(utcTime);
          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
          });
          this.cityName =  decodeURIComponent(escape(_this.getQueryString("contentTitle")));

          //监听浮动事件
          window.addEventListener('scroll',function(){
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if(t > 300){
              //console.log(t);
              _this.isFixed = true;
            }else{
              _this.isFixed = false;
            }
          },false);
        },
        methods: {
          //获取URL参数方法
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
          changeCityTypes: function (e) {
            var _this = this;
            var _index = parseInt(e.target.dataset.index);
            var _banner = this.banner;
            var _category = _index+1;
            var curType = location.hash.slice(1);
            // 设置hash
            location.href = "#"+ _category;
            _this.cityType = _category;
            _banner.map(function(item,index){
              if(index == _index) {
                _this.banner[index]["active"] = true;
                _this.title = _this.banner[_index].title;
                document.title = _this.banner[_index].title;
              }
              else {
                _this.banner[index]["active"] = false;
              }
            })
            _this.getCityData(_this.dataToken);

            var pageTimeOut = Date.parse(new Date())
            var detentionTime = pageTimeOut-this.pageTimeIn
            eventLog({eventId:'destination_city_'+curType+'_tab_click',eventType:'1',detentionTime:detentionTime})
          },
          getDxjJsonData: function () {
            //获取机上静态资源数据
            var _this = this;
            
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/city-topic/' + _this.tag + '.json';
            axios.get(jsonSrc).then((result) => {
              if(_this.isCacheDataLoad){
                return false
              }
              var data = result.data.data;
              _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              // 渲染数据

              // 把获取到的缓存数据分别写入页面对应的data
              var _cityDataCache = _this.cityDataCache;
              _cityDataCache[0] = data["travel"]?data["travel"]:[];
              _cityDataCache[1] = data["view"]?data["view"]:[];
              _cityDataCache[2] = data["food"]?data["food"]:[];
              _cityDataCache[3] = data["hotel"]?data["hotel"]:[];
              _this.cityDataCache = _cityDataCache;
              
              // 渲染数据
              _this.isWaiting = false;

              if(data.content != undefined)
              {
                data.content = data.content.replace(/cache/g, 'app/dxj/cache');
              }
              _this.articleData = data;
                
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheCityData(planeData) {
            var _this = this;
            _this.tag = _this.getQueryString("tag");
            var url = apiHost + '/app/dxj/cache/' + dataVersion + '/city-topic/' + _this.tag + planeData;
            //请求本地缓存数据
            axios.get(url).then((result) => {
              _this.baseUrl = _this.apiHost + '/app/dxj';
              _this.baseUrlBanner = '/app/dxj';
              _this.isCacheDataLoad = true;
              var data = result.data.data;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }

              var banner = [];
              var cityDataCache = [];
              data.map(function(item,index){
                if(_this.cityType == index+1) {
                  _this.title = item.categoryName;
                  document.title = item.categoryName;
                  item.banner.active = true;
                }
                else {
                  item.banner.active = false;
                }
                item.banner.category = item.category
                item.banner.title = item.categoryName
                banner.push(item.banner);
                cityDataCache.push(item.list?item.list:{});
              })
              _this.banner = banner;
              _this.cityDataCache = cityDataCache;
              
              // 渲染数据
              _this.isWaiting = false;

              if(data.content != undefined)
              {
                data.content = data.content.replace(/cache/g, 'app/dxj/cache');
              }
              _this.articleData = data;

            }).catch((err) => {
                console.log(err);
                _this.isWaiting = false;
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                  _this.getBanner(_this.dataToken);
                });

            });
          },
          getCityData:function (token) {
            var _this = this;
            _this.isWaiting = true;
            var _category = _this.cityType;
            if(_this.banner.length > 0 && (!_this.cityDataCache[_this.banner[_category-1].category] || _this.cityDataCache[_this.banner[_category-1].category].length == 0))
            {
              var url = _this.dataHost + `/v1/whitherdetail/index?` + querystring.stringify({
                param: JSON.stringify({
                  "version":NATIVEPARAM.version,
                  "platform":4,
                  "environment":'plan',
                  "page": _this.curpage,
                  "cid": _this.getQueryString("tag"),
                  "category": _this.banner[_this.cityType-1].category
                })
              });
              _this.$http.get(url, {
                  headers:{
                      "Content-Type": "application/x-www-form-urlencoded",
                      "token": token,
                      "cache-control": "no-cache"
                  },
                  timeout:15000,
                  onTimeout: (request) => {
                    _this.isLoad = false;
                    _this.isWaiting = false;
                  }
                }).then((message) => {
                var starts = message.data.status,
                    msg = message.data.msg;
                if (starts == 200) {
                  _this.baseUrl = '/app/dxj';
                  _this.isCacheDataLoad = true;
                    _this.isLoad = false;
                    var data = message.data.data.list;
                    // 把接口返回当前分类数据放到缓存里
                    _this.cityDataCache[_this.cityType - 1] = data;
                }
                _this.isWaiting = false;
              }, () => {
                _this.isWaiting = false;
              });
            }
            else
            {
              _this.isWaiting = false;
            }
          },
          getBanner(token) {
            var _this = this;
            var url = this.dataHost + `/v1/whitherdetail/banner?` + querystring.stringify({
                param: JSON.stringify({
                "version": NATIVEPARAM.version,
                "platform": 4,
                "environment":'plan',
                "cid": _this.tag
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
                }
            }).then((message) => {
              var starts = message.body.status,
                  msg = message.body.msg;
              if (starts == 200) {
                _this.baseUrlBanner = '/app/dxj';
                var data = message.body.data.list;
                var banner = [];
                data.map(function(item,index){
                  if(index==_this.cityType-1) {
                    _this.title = item.category_name;
                    document.title = item.category_name;
                    item.active = true;
                  }
                  else {
                    item.active = false;
                  }
                  item.title = item.category_name;
                  banner.push(item);
                })
                _this.banner = banner;
                _this.getCityData(token);
              }
            });
          },
          isFullScreen(url, fullScreen){
            if(fullScreen == 1){
              if(url.indexOf('?')>=0){
                return "&fullScreen=ture";
              }
              else {
                return "?fullScreen=ture";
              }
            }
            else{
              return "";
            }
          }
        },
        components: {
          loading,
          popLayer,
          headerNav,
          insertScreenAd
        }
    });

});