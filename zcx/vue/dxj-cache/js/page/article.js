require('../../css/article.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion,isEmpty} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import FastClick from 'fastclick';

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

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: true,   // 显示加载中
            isShow: false,      // 显示toast
            dataHost: dataHost,
            apiHost: apiHost,
            show_msg: "",
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            tag: [],
            focus: 0, //全屏展示广告 1:全屏 2不是全屏
            articleData: {title:0},
            videoUrl:'',
            videoPoster:'',
            showNav: NATIVEPARAM.showNav,
            isEmpty:isEmpty,
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted(){
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


                if(_this.getQueryString("tag").indexOf("_") >= 0){
                    _this.tag = _this.getQueryString("tag").split("_");
                }else{
                    _this.tag[0] = 'article';
                    _this.tag[1] = _this.getQueryString("tag");
                }
                _this.getDxjJsonData();
                _this.cacheArticleData(utcTime);


            }).catch(e => {
                console.log('获取token失败，错误信息:', e);
                _this.isWaiting =false;
            });
            //埋点发送id,类型,标题
            var contentId = _this.getQueryString("tag");
            var contentType = decodeURIComponent(escape(_this.getQueryString("contentType")));
            var contentTitle = decodeURIComponent(escape(_this.getQueryString("contentTitle")));
            //eventLog({contentId:contentId,contentType:contentType,contentTitle:contentTitle});

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
            getDxjJsonData: function () {
                //获取机上静态资源数据
                var _this = this;
                let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/' + _this.tag[0] + '/' + _this.tag[1] + '.json';
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
                    _this.isWaiting = false;

                    if(data.content != undefined)
                    {
                        data.content = data.content.replace(/\/cache/g, _this.baseUrl + '/cache');
                    }
                    else if(data.description != undefined){
                        data.content = data.description.replace(/\/cache/g, _this.baseUrl + '/cache');
                    }
                    _this.articleData = data;
                    _this.videoUrl = _this.dxjResourceDir+'/'+_this.articleData.portalUrl.split('|')[0];
                    _this.videoPoster = _this.dxjResourceDir+'/'+_this.articleData.portalUrl.split('|')[1];
                    
                }).catch((err) => {
                    console.log(err);
                });
            },
            cacheArticleData(planeData) {
                var _this = this;
                var url = apiHost + '/app/dxj/cache/' + dataVersion + '/' + _this.tag[0] + '/' + _this.tag[1] + planeData;
                // var url = '/js/data/page/' + _this.tag[0] + '/' + _this.tag[1] + planeData;
                //请求本地缓存数据
                axios.get(url).then((result) => {
                _this.isCacheDataLoad = true;
                  var data = result.data.data;
                  if(data==undefined){
                    console.log("数据类型转换");
                    data = JSON.parse(data);
                  }

                  // 渲染数据
                  _this.isWaiting = false;

                  if(data.content != undefined)
                    {
                        data.content = data.content.replace(/cache/g, 'app/dxj/cache');
                    }
                    else if(data.description != undefined){
                        data.content = data.description.replace(/cache/g, 'app/dxj/cache');
                    }
                  _this.articleData = data;
                  _this.videoUrl = _this.dxjResourceDir+'/'+_this.articleData.portalUrl.split('|')[0];
                  _this.videoPoster = _this.dxjResourceDir+'/'+_this.articleData.portalUrl.split('|')[1];

                }).catch((err) => {
                    console.log(err);
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    //获取接口数据
                    _this.$nextTick(()=>{
                        _this.ArticleData(_this.dataToken);
                    });

                });
            },
            ArticleData:function(token){
                var _this = this;
                _this.isWaiting = true;
                var articleUrl = _this.dataHost + `/v1/detail/index?` + querystring.stringify({
                    param: JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "platform": 4,
                        "environment": 'plan',
                        "tag": _this.getQueryString("tag"),
                        "isPreview":_this.getQueryString("isPreview")
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
                        if(data.content != undefined)
                        {
                            data.content = data.content.replace(/cache/g, 'app/dxj/cache');
                            data.content = data.content.replace(/<a href=['"]([\w|-]*.html[^'"]*['"][^>]*?)>/g, "<a href=\""+apiHost+"/dxj/html/$1 >")
                            data.content = data.content.replace(/<a href=['"](..\/template\/html\/[\w|-]*.html[^'"]*['"][^>]*?)>/g, "<a href=\""+apiHost+"/dxj/html/$1 >")

                        }
                        else if(data.description != undefined){
                            data.content = data.description.replace(/cache/g, 'app/dxj/cache');
                            data.content = data.content.replace(/<a href=['"]([\w|-]*.html[^'"]*['"][^>]*?)>/g, "<a href=\""+apiHost+"/dxj/html/$1 >")
                            data.content = data.content.replace(/<a href=['"](..\/template\/html\/[\w|-]*.html[^'"]*['"][^>]*?)>/g, "<a href=\""+apiHost+"/dxj/html/$1 >")
                        }
  
                        _this.articleData = data;
                        //dxjad/adxjp/adxjp.mp4|dxjad/adxjp/adxjp.png
                        _this.videoUrl = _this.dxjResourceDir+'/'+_this.articleData.portalUrl.split('|')[0];
                        _this.videoPoster = _this.dxjResourceDir+'/'+_this.articleData.portalUrl.split('|')[1];

                    }
                    _this.isWaiting = false;

                },()=>{
                    _this.isWaiting = false;
                    // _this.showLayer("showMsg", "网络请求错误");
                });
            },
            goBack: function () {
                window.history.back();
            },
            videoPlay: function () {
                var playBtn = document.getElementById("playBtn");
                var video = document.getElementById("video");
                playBtn.style.display="none"
                video.play();
            }
        },
        components: {
            loading,
            popLayer,
            headerNav
        }
    });

});