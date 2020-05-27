require('../../css/city-list.scss');

const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN, isNative, dataHost, apiHost, utcTime, getHash, dataVersion,eventLog} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';

import insertScreenAd from '../modules/insertScreenAd';

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
            isWaiting: false,    // 显示加载中
            isShow: false,       // 显示toast
            isReady: false,      // 下拉加载控制器
            isLoad: false,
            noDataIShow:false,
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            dataHost: dataHost,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            isCacheCity: true,//默认读取缓存数据
            baseUrl: '',
            title: "目的地",    //页面标题
            curpage: 0,     //当前分页值
            lastNum: 0,     //当前分页最后一条upper_time值
            tag: 0,
            areaId: undefined,
            areaIndex: 0,
            areaData: {
              area:[]
            },
            cityData: [],       //目的地列表
            eventLog:eventLog //事件埋点发送方法
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
              //飞机环境要先获取资源
              _this.cacheCityData(utcTime);
              // _this.getAreaData(res.token);

          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
              _this.noDataIShow = true;
          });
          
        },
        watch: {
            movieIsPlay: function () {
                
            }
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
          getDxjJsonData: function () {
            //获取机上静态资源数据
            var _this = this;
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/area-list.json';
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
              var tag = _this.getQueryString("tag")?_this.getQueryString("tag"):data.area[0].id;
              _this.areaData = data;
              var tag = "list" + tag;
              _this.tag = tag;
              _this.cityData = data[tag];
              _this.isWaiting = false;
                
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheCityData(planeData) {
            var _this = this;
            // var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/city-list' + planeData;
            var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/area-list' + planeData;
            //请求本地缓存数据
            _this.isWaiting = true;
            axios.get(url).then((result) => {
              _this.baseUrl = _this.apiHost + '/app/dxj';
              _this.isCacheDataLoad = true;

              // 是否读取缓存数据
              _this.isCacheCity = true;

              var data = result.data.data;
              console.log(data);
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              var tag = _this.getQueryString("tag")?_this.getQueryString("tag"):data.area[0].id;
              //渲染数据
              _this.areaData = data;
              var tag = "list" + tag;
              _this.tag = tag;
              _this.cityData = data[tag];
              _this.isWaiting = false;

            }).catch((err) => {
                console.log(err);
                _this.isWaiting = false;

                // 是否读取缓存数据
                _this.isCacheCity = false;
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getAreaData(_this.dataToken);
                });

            });

          },
          getAreaData:function (token) {
            var _this = this;
            _this.isWaiting = true;
            var url = _this.dataHost + `/v1/area/index?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "page": 0,
                "pageSize": 50,
                "lastNumber": this.lastNum
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
                  // _this.showLayer("showMsg", "请求超时，本地获取");
                }
              }).then((message) => {
                _this.isWaiting = false;
              var starts = message.data.status,
                  msg = message.data.msg;
              if (starts == 200) {
                  _this.baseUrl = '/app/dxj';
                  _this.isCacheDataLoad = true;
                  var data = message.data.data.list;
                  _this.tag = "list" + data[0].id;
                  _this.areaData.area = data;
                  _this.getCityData(token,data[0].id);
                 
              } else {
                  // _this.showLayer("showMsg", msg);
                  _this.noDataIShow = true;
              }
            }, () => {
              _this.isWaiting = false;
              _this.noDataIShow = true;
              // _this.showLayer("showMsg", "网络请求错误");
            });
          },
          getCityData:function (token,areaId) {
            var _this = this;
            _this.isReady = true;
            // 切换分类的时候初始化页数和数据
            if(_this.areaId != areaId) {
              _this.isWaiting = true;
              _this.areaId = areaId;
              _this.curpage = 0;
              _this.cityData = [];
            }
            else {
              _this.isLoad = true;
            }
            var url = _this.dataHost + `/v1/area/whitherList?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "page": this.curpage,
                "pageSize": 10,
                "areaId": this.areaId
              })
            });
            _this.$http.get(url, {
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                    "token": token,
                    "cache-control": "no-cache"
                }
              }).then((message) => {
              _this.isReady = false;
              var starts = message.data.status,
                  msg = message.data.msg;
              if (starts == 200) {
                  _this.baseUrl = '/app/dxj';
                  if(_this.curpage==0){
                    _this.cityData = [];
                  }
                  var data = message.data.data.list;
                  console.log(data)
                  _this.cityData = _this.cityData.concat(data);
                  _this.isWaiting = false;
                  _this.isLoad = false;

                  // 是否读取缓存数据
                  _this.isCacheCity = false;

                  if (_this.curpage++>=_this.pagecount) {
                      document.getElementById('city-list-box').removeEventListener('scroll',_this.addMore,false);
                      _this.isReady = true;
                  }
                  if (_this.curpage > 0 && data.length > 0) {
                  }else{
                      document.getElementById('city-list-box').removeEventListener('scroll',_this.addMore,false);
                      _this.isReady = true;
                  }

              }
              _this.$nextTick(()=>{
                document.getElementById('city-list-box').addEventListener('scroll',_this.addMore.bind(_this),false);
              });
            }, () => {
              _this.isWaiting = false;
              // _this.showLayer("showMsg", "网络请求错误");
            });
          },
          changeAreaTypes: function (e) {
            var _index = parseInt(e.target.dataset.index);
            var _tag = 'list' + this.areaData.area[_index].id;
            this.tag = _tag;
            this.areaIndex = _index;
            $(".city-list-box").scrollTop(0); 
            console.log(this.isCacheCity)
            if(this.isCacheCity && this.areaData[_tag]){
              this.cityData = this.areaData[_tag];
            }
            else {
              // 获取不到数据时候请求接口
              this.getCityData(this.dataToken,this.areaData.area[_index].id);
            }
          },
          addMore(){
            var H =  document.getElementById('city-list-box').scrollHeight;
            var h = document.getElementById('city-list-box').offsetHeight;
            var t = document.getElementById('city-list-box').scrollTop;
            if (H - (h + t) < 15 && !this.isReady){
              this.getCityData(this.dataToken,this.areaId);
            }
          },
          reloadArea: function() {
            this.getCityData(this.dataToken,this.areaIndex);
          },
          //页面跳转
          goSearch:function () {
            eventLog({eventId:'city_search_click',eventType:'1',contentType:'search'});
            window.location.href = "city-search.html";
          },
        },
        components: {
            loading,
            popLayer,
            headerNav,
            insertScreenAd
        }
    });

});