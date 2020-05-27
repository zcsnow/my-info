require('../../css/free-brand-list.scss');
require('../../css/free-goods-list.scss');

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
            isLoad: true,
            noDataIShow:false,
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            dataHost: dataHost,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            title: "品牌列表",
            isSelect: false,
            categoryId: 0,
            mallCategoryAndBrandData: [],
            mallBrandListData: [],
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted() {
          var _this = this;
          _this.categoryId = this.getQueryString("categoryId");
          _this.title = decodeURI(escape(_this.getQueryString("categoryName")));
          _this.categoryName = decodeURI(escape(_this.getQueryString("categoryName")));
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
              _this.cacheCategoryAndBrandData(utcTime);

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
          
          cacheCategoryAndBrandData(planeData) {
            var _this = this;
            // var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/city-list' + planeData;
            var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/mallCategoryAndBrand' + planeData;
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
              //渲染数据
              var _index = 0;
              data.map(function(item,index){
                if(item.id == parseInt(_this.categoryId)){
                  _index = index;
                  return;
                }
              })
              _this.mallCategoryAndBrandData = data;
              _this.mallBrandListData = data[_index].brandList;
              _this.categoryName =  data[_index].brandList.title;
              _this.isWaiting = false;
            }).catch((err) => {
                console.log(err);
                _this.isWaiting = false;
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getMallBrandListData(_this.dataToken);
                });
            });
          },
          getMallBrandListData:function (token) {
            var _this = this;
            _this.isWaiting = true;
            var url = _this.dataHost + `/v1/mallBrand/list?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "categoryId": parseInt(_this.categoryId)
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
                _this.baseUrl = _this.dataHost + '/app/dxj';
                _this.isCacheDataLoad = true;
                var data = message.data.data.list;
                _this.mallBrandListData = data;
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
          goFreeGoodsList: function(e) {
            var categoryId = e.target.dataset.categoryId?e.target.dataset.categoryId:"";
            var categoryName = e.target.dataset.categoryName?encodeURIComponent(e.target.dataset.categoryName):"";
            var brandId = e.target.dataset.brandId?e.target.dataset.brandId:"";
            var brandName = e.target.dataset.brandName?encodeURIComponent(e.target.dataset.brandName):"";
            window.location.href = "free-goods-list.html?categoryId=" + categoryId + "&categoryName=" + categoryName + "&brandId=" + brandId + "&brandName=" + brandName;
          }
        },
        components: {
            loading,
            popLayer,
            headerNav
        }
    });

});