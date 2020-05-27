require('../../css/artwork-detail.scss');

const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN, dataHost, apiHost, utcTime, getHash,getQueryString, eventLog, dataVersion } from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';
import imgPreview from '../modules/imgPreview';
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
            isWaiting: false,    // 显示加载中
            isShow: false,       // 显示toast
            isFixed: false,     // 是否浮动导航
            noDataIShow:false,  //无数据提示
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            dataToken: "network",
            dataHost: dataHost,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            dxjApi: "",     //飞机环境访问资源路径
            title: "艺术品",    //页面标题
            tabTypes: [],       //类型
            tabType: 1,
            artData: {},
            artList:{},
            arts:[],
            isImgPreviewShow:false,
            previewData:'',
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted() {
          var _this = this;
          _this.tabTypes = [
            {"type":"1", "title":"简介", "active":false},
            {"type":"2", "title":"作品", "active":false},
          ];

          // 根据hash获取当前的分类
          var hash = _this.tabType;
          if(location.hash.indexOf('#')>=0){
            hash = parseInt(location.hash.replace("#",""));
          }
          _this.tabType = hash;
          _this.tabTypes[_this.tabType-1].active = true;


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

              _this.$nextTick(()=>{
                _this.getDxjJsonData();
                _this.cacheArtWorkDetailData(utcTime);
              });
          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
              _this.noDataIShow = true;
          });

          //监听浮动事件
          _this.$nextTick(()=>{
            window.addEventListener('scroll',function(){
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                if(t > 300){
                //console.log(t);
                _this.isFixed = true;
                }else{
                _this.isFixed = false;
                }
            },false);
          });

        },
        methods: {
            
            getDxjJsonData: function () {
              //获取机上静态资源数据
              var _this = this;
              let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/artist/' + getQueryString('id')  + '.json';
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
                //渲染数据
                _this.artData = data;
                _this.artList = data.artist;
                _this.arts = data.arts
                  
              }).catch((err) => {
                  console.log(err);
              });
            },
            cacheArtWorkDetailData(planeData) {
                var _this = this;
                //飞机环境要先获取资源
                var dataPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/artist/' + getQueryString('id') + planeData;
                //请求飞机本地缓存数据
                _this.isWaiting = true;
                axios.get(dataPath).then((result) => {
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    _this.isWaiting = false;
                    var data = result.data.data;
                    if(data==undefined){
                        data = JSON.parse(data);
                    }
                    _this.artData = data;
                    _this.artList = data.artist;
                    _this.arts = data.arts

                }).catch((err) => {
                    //获取大师详情数据
                    _this.getArtWorkDetailData(_this.dataToken);
              });
            },
            getArtWorkDetailData:function (token) {
                var _this = this;
                _this.isWaiting = true;
                var url = _this.dataHost + `/v1/artist/detail?` + querystring.stringify({
                    param: JSON.stringify({
                    "version":NATIVEPARAM.version,
                    "platform":4,
                    "environment":'plan',
                    "id": getQueryString("id")
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
                        _this.isWaiting = false;
                        //_this.showLayer("showMsg", "请求超时");
                        //_this.noDataIShow = true;
                        
                    }
                    }).then((message) => {
                    _this.noDataIShow = false; 
                    var status = message.data.status,
                        msg = message.data.msg;
                    if (status == 200) {
                        _this.baseUrl = '/app/dxj';
                        _this.isCacheDataLoad = true;
                        _this.artData = message.data.data;
                        _this.artList = message.data.data.artist;
                        _this.arts = message.data.data.arts
                    } else {
                        //_this.showLayer("showMsg", msg);
                        //无数据情况
                        //_this.noDataIShow = true; 
                    }
                    _this.isWaiting = false;
                }, () => {
                    _this.isWaiting = false;
                    //_this.showLayer("showMsg", "网络请求错误");
                    //_this.noDataIShow = true;
                });
                
            },
            //查看图片大图
            lookWorkDetail:function (previewData) {
                var _this = this;
                if(previewData.image.indexOf("http")==-1){ //没有http这个字符
                    previewData.image = _this.baseUrl + previewData.image;
                    //previewData.smallImage = _this.baseUrl + previewData.smallImage;
                }
                _this.isImgPreviewShow = true;
                _this.previewData = previewData;
            },
            //隐藏图片预览组件
            hideImgPreview: function (e) {
                this.isImgPreviewShow = false;
            },
            goBack: function () {
                window.history.back();
            },
            tabFn:function (index) {    //tab切换方法
                var _this = this;
                //设置tab默认赋值
                for(var i=0, len=_this.tabTypes.length; i<len; i++){
                  _this.tabTypes[i].active = false;
                }
                _this.tabTypes[index].active = true;
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
            headerNav,
            imgPreview
        }
    });

});