require('../../css/topic.scss');
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
          isWaiting: true,   // 显示加载中
          isShow: false,      // 显示toast
          apiHost: apiHost,
          show_msg: "",
          dxjResourceDir:"",//获取机上静态资源目录
          isCacheDataLoad:false, //cache或接口资源是否优先加载成功
          dataToken: "",
          baseUrl: '',
          title: "专题",
          showNav: NATIVEPARAM.showNav,
          fullScreen: false,
          details: "",
          eventLog:eventLog
      },
      mounted() {
        var _this = this;
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

          var tag = _this.getQueryString("tag");
          var fullScreen = _this.getQueryString("fullScreen");
          if(fullScreen == "true"){
            _this.fullScreen = true;
          }else{
            _this.fullScreen = false;
          }
          
          _this.getDxjJsonData(tag);
          //飞机环境要先获取资源
          _this.cacheTopicData(tag,utcTime);

        }).catch(e => {
            console.log('获取token失败，错误信息:', e);
        });
        //埋点发送id,类型,标题
        var contentId = _this.getQueryString("tag");
        eventLog({contentId:contentId});
          
      },
    methods: {
      getQueryString(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return unescape(r[2]);
          return null;
		  },
		  goBack: function () {
		    window.history.back();
      },
      
      getDxjJsonData: function (tag) {
        //获取机上静态资源数据
        var _this = this;
        let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/ad/' + tag + '.json';
        axios.get(jsonSrc).then((result) => {
          var data = result.data.data;
          if(_this.isCacheDataLoad){
            return false
          }
          _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
          if(data==undefined){
              console.log("数据类型转换");
              data = JSON.parse(data);
          }
          // 渲染数据
          _this.isWaiting = false;
          var data = result.data.data;
          document.title = data.title?data.title:"专题";
          _this.title = data.title?data.title:"专题";
          if(data.details){
            _this.details = data.details.replace(/\/cache/g, _this.baseUrl + '/cache');
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      cacheTopicData(tag, planeData) {
      	var _this = this;
      	var url = apiHost + `/app/dxj/cache/` + dataVersion  + `/ad/` + tag + planeData;
        //请求本地缓存数据
        axios.get(url).then((result) => {
          _this.baseUrl = _this.apiHost + '/app/dxj';
          _this.isCacheDataLoad = true;
          var data = result.data.data;
          if(data==undefined){
            console.log("数据类型转换");
            data = JSON.parse(data);
          }
          // 渲染数据
          _this.isWaiting = false;
          document.title = data.title?data.title:"专题";
          _this.title = data.title?data.title:"专题";
          if(data.details){
            _this.details = data.details.replace(/cache/g, 'app/dxj/cache');
          }
        }).catch((err) => {
            _this.title = '';
            _this.isWaiting = false;
            //获取接口数据
            _this.$nextTick(()=>{
                _this.getTopicData(tag,_this.dataToken);
            });
        });
      },
      getTopicData(tag, token) {
        var _this = this;
        _this.isWaiting = true;
        var url = dataHost + `/v1/addetails/index?` + querystring.stringify({
            param: JSON.stringify({
                "version": NATIVEPARAM.version,
                "environment": 'plan',
                "id": tag
            })
        });
        _this.$http.get(url,{
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
            _this.isWaiting = false;
            var status = message.body.status,
                msg = message.body.msg;
            if (status === 200) {
              _this.baseUrl = '/app/dxj';
              _this.isCacheDataLoad = true;
              var data = message.body.data;
              document.title = data.title?data.title:"专题";
              _this.title = data.title?data.title:"专题";
              if(data.details){
                _this.details = data.details.replace(/cache/g, 'app/dxj/cache');
              }
            }
        },()=>{
            _this.title = '';
            _this.isWaiting = false;
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
              if(_this.timeId){clearTimeout(_this.timeId);}
              _this.timeId = setTimeout(() => {
                  _this.isShow = false;
                  _this.show_msg = "";
              }, 2000);
          }
      },
    },
    components: {
        loading,
        popLayer,
        headerNav
    }
  });

});