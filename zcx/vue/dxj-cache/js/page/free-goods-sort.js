require('../../css/free-goods-sort.scss');

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
            title: "分类",    //页面标题
            curpage: 0,     //当前分页值
            lastNum: 0,     //当前分页最后一条upper_time值
            tag: 0,
            categoryName: "",
            mallCategoryList: [],    //商品分类列表
            mallCategoryData: {
              brand: [],
              goods: []
            },
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
              _this.cacheCategoryData(utcTime);
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
          cacheCategoryData(planeData) {
            var _this = this;
            // var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/city-list' + planeData;
            var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/mallCategory' + planeData;
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
              var _index = 0;
              var tag = _this.getQueryString("tag")?_this.getQueryString("tag"):data[0].id;
              _this.tag = tag;
              //渲染数据
              _this.mallCategoryList = data;
              _this.categoryName = this.mallCategoryList[_index].title;
              _this.cacheCategoryRecommendData(utcTime, this.mallCategoryList[_index].id);
              _this.isWaiting = false;
            }).catch((err) => {
                console.log(err);
                _this.isWaiting = false;
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getMallCategoryListData(_this.dataToken);
                });
            });
          },
          cacheCategoryRecommendData(planeData, id) {
            var _this = this;
            // var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/city-list' + planeData;
            var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/mallCategoryRecommend/' + id + planeData;
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
              _this.tag = id;
              _this.mallCategoryData = data;
              _this.isLoad = false;
              _this.isWaiting = false;
            }).catch((err) => {
                console.log(err);
                _this.isLoad = false;
                _this.isWaiting = false;
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getMallCategoryData(_this.dataToken, id);
                });
            });
          },
          getMallCategoryListData:function (token) {
            var _this = this;
            _this.isWaiting = true;
            var url = _this.dataHost + `/v1/mallCategory/list?` + querystring.stringify({
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
                var tag = _this.getQueryString("tag")?_this.getQueryString("tag"):data[0].id;
                _this.tag = tag;
                _this.categoryName = data[0].title;
                _this.mallCategoryList = data;
                _this.getMallCategoryData(token,tag);
                 
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
          getMallCategoryData:function (token,categoryId) {
            var _this = this;
            _this.isReady = true;
            // 切换分类的时候初始化页数和数据
            if(_this.tag != categoryId) {
              _this.isWaiting = true;
              _this.tag = categoryId;
              _this.curpage = 0;
              _this.mallCategoryData = {
                brand: [],
                goods: []
              };
            }
            else {
              _this.isLoad = true;
            }
            
            var url = _this.dataHost + `/v1/mallCategory/recommend?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "categoryId": parseInt(categoryId),
                "page": _this.curpage,
                "pageSize": 10
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
                _this.baseUrl = _this.dataHost + '/app/dxj';
                var data = message.data.data;
                if(_this.curpage==0){
                  _this.mallCategoryData.goods = [];
                }
                else{
                  data.brand = _this.mallCategoryData.brand;
                }
                if(data.goods.length > 0){
                  _this.curpage++
                }
                if (_this.curpage > 0 && data.goods.length > 0) {}
                else{
                    document.getElementById('free-goods-list-box').removeEventListener('scroll',_this.addMore,false);
                    _this.isReady = true;
                }
                data.goods = _this.mallCategoryData.goods.concat(data.goods);
                _this.mallCategoryData = data;
                _this.isWaiting = false;
                _this.isLoad = false;
              }
              _this.$nextTick(()=>{
                document.getElementById('free-goods-list-box').addEventListener('scroll',_this.addMore.bind(_this),false);
              });
            }, () => {
              _this.isWaiting = false;
              // _this.showLayer("showMsg", "网络请求错误");
            });
          },
          changeMallCategory: function (e) {
            var _index = parseInt(e.target.dataset.index);
            $(".free-goods-list-box").scrollTop(0); 
            this.categoryId = this.mallCategoryList[_index].id;
            this.categoryName = this.mallCategoryList[_index].title;
            this.cacheCategoryRecommendData(utcTime, this.mallCategoryList[_index].id);
          },
          addMore(){
            var H =  document.getElementById('free-goods-list-box').scrollHeight;
            var h = document.getElementById('free-goods-list-box').offsetHeight;
            var t = document.getElementById('free-goods-list-box').scrollTop;
            if (H - (h + t) < 15 && !this.isReady){
              this.getMallCategoryData(this.dataToken,this.tag);
            }
          },
          reloadMallCategory: function() {
            this.getMallCategoryData(this.dataToken,this.tag);
          },
          goFreeBandList:function (e) {
            var categoryId = e.target.dataset.categoryId?e.target.dataset.categoryId:"";
            var categoryName = e.target.dataset.categoryName?encodeURIComponent(e.target.dataset.categoryName):"";
            window.location.href = "free-brand-list.html?categoryId=" + categoryId + "&categoryName=" + categoryName;
          },
          goFreeGoodsList:function (e) {
            var categoryId = e.target.dataset.categoryId?e.target.dataset.categoryId:"";
            var categoryName = e.target.dataset.categoryName?encodeURIComponent(e.target.dataset.categoryName):"";
            var brandId = e.target.dataset.brandId?e.target.dataset.brandId:"";
            var brandName = e.target.dataset.brandName?encodeURIComponent(e.target.dataset.brandName):"";
            window.location.href = "free-goods-list.html?categoryId=" + categoryId + "&categoryName=" + categoryName + "&brandId=" + brandId + "&brandName=" + brandName;
          },
        },
        components: {
            loading,
            popLayer,
            headerNav
        }
    });

});