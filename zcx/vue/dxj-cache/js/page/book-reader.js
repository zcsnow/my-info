require('../../css/book-reader.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {isIos} from '../modules/method.js';
import {getN,isTest,apiHost,dataHost,utcTime,getHash,eventLog,dataVersion} from 'nativeA';
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

    var Book;       //定义图书公共变量

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: true,   // 显示加载中
            isShow: false,     // 显示toast
            dataHost: dataHost,
            apiHost: apiHost,
            show_msg: "",      // 错误提示文案
            title: "书籍详情",  // 默认标题
            dataToken: "",
            bookData:{url_upload:undefined},
            showNav: NATIVEPARAM.showNav,
            dxjResourceDir:"",//获取机上静态资源目录
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            baserResource:"",
            eventLog: eventLog
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
                    _this.getDxjJsonData();//渲染机上本地化数据
                    _this.cacheBookData(utcTime);
                }
                else{
                    _this.showLayer("showMsg", "此文章不存在");
                }
            }).catch(e => {
                console.log('获取token失败，错误信息:', e);
            });
            //埋点发送id,类型,标题
            var contentId = _this.getQueryString("tag");
            var contentType = decodeURIComponent(escape(_this.getQueryString("contentType")));
            var contentTitle = decodeURIComponent(escape(_this.getQueryString("contentTitle")));
            eventLog({contentId:contentId,contentType:contentType,contentTitle:contentTitle});
        },
        methods:{
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
                   //渲染数据
                   _this.bookData = data;
                   _this.isWaiting = false;
 
                    _this.baserResource = _this.baseUrl + this.bookData.url_upload;
                   
                   //_this.bookFn(resource);
                    
                }).catch((err) => {
                    console.log(err);
                });
              },
            bookFn: function (resource) {
                var _this = this;

                Book = ePub(resource, {restore: true});

                Book.renderTo("area").then(function(){
                    Book.setStyle("font-size", "1.2em");
                    Book.getMetadata().then(function(meta){
                        document.title = meta.bookTitle; //+" – "+meta.creator;
                        _this.title = meta.bookTitle;
                    });
                });
            },
            prevPage: function (){
                Book.prevPage();
            },
            nextPage: function (){
                Book.nextPage();
            },
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
                    if (_this.timeId) { clearInterval(_this.timeId); }
                    _this.timeId = setTimeout(() => {
                        _this.isShow = false;
                        _this.show_msg = "";
                    }, 2000);
                }
            },
            cacheBookData(planeData) {
                var _this = this;
                var readPath = apiHost + '/app/dxj/cache/' + dataVersion + '/' + _this.tag[0] + '/' + _this.tag[1] + planeData;
                console.log(planeData)
                //请求本地缓存数据
                axios.get(readPath).then((result) => {
                    _this.baseUrl = _this.apiHost + '/app/dxj';
                    _this.isCacheDataLoad = true;
                    
                  var data = result.data.data;
                  if(data==undefined){
                    console.log("数据类型转换");
                    data = JSON.parse(data);
                  }

                  //渲染数据
                  _this.bookData = data;
                  _this.isWaiting = false;

                  if(isTest){
                    var resource = apiHost + this.bookData.url_upload;
                  }else{
                    var resource = _this.baseUrl + this.bookData.url_upload;
                  }
                  _this.bookFn(resource);

                }).catch((err) => {
                    _this.bookData.url_upload = undefined;
                    _this.isWaiting = false;
                    console.log(err);
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    //获取接口数据
                    _this.$nextTick(()=>{
                        _this.getBookData(_this.dataToken);
                    });
                });
            },
            getBookData:function(token){
                var _this = this;

                var bookUrl = dataHost + `/v1/detail/index?` + querystring.stringify({
                      param: JSON.stringify({
                          "version": NATIVEPARAM.version,
                          "platform": 4,
                          "environment": 'plan',
                          "tag": _this.getQueryString("tag")
                      })
                  });
                _this.$http.get(bookUrl, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token
                    },
                    _timeout:3000,
                    onTimeout: (request) => {
                        _this.isWaiting = false;
                        _this.bookFn(_this.baserResource);
                        //_this.showLayer("showMsg", "请求超时");
                    }
                }).then((message)=>{
                    var status = message.body.status;
                    if (status === 200) {
                        _this.baseUrl = '/app/dxj';
                        _this.isCacheDataLoad = true;
                        var data = message.body.data,
                            msg = message.body.msg;

                        _this.bookData = data;

                        if(isTest){
                            //var resource = apiHost + this.bookData.url_upload;
                            var resource = apiHost + this.bookData.url_upload;
                        }else{
                            //var resource = "/app/dxj" + this.bookData.url_upload;
                            var resource = _this.baseUrl + this.bookData.url_upload;
                        }

                        _this.bookFn(resource);

                        // console.log(data.url_upload);
                    }else{
                        _this.showLayer("showMsg", msg);
                    }
                    _this.isWaiting = false;

                },()=>{
                    //_this.bookData.url_upload = undefined;
                    _this.isWaiting = false;
                    //_this.showLayer("showMsg", "网络请求错误");
                    _this.bookFn(_this.baserResource);
                });
            },
            goBack: function () {
                window.history.back();
            }
        },
        components:{
            loading,
            popLayer,
            headerNav
        }
    });

    // setTimeout(function (){
    //     console.log($("#area iframe").contents().find("html").html());
    //     $("#area iframe").contents().find("html").css({'column-width':'100%','max-width':'25em'});
    // },3000);
});