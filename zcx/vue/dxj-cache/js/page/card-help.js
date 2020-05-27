require('../../css/card-help.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,dataHost,apiHost,isNative,utcTime,getHash,eventLog,dataVersion,getQueryString} from 'nativeA';
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
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            dataHost: dataHost,
            apiHost: apiHost,
            isNative:isNative,
            show_msg: "",
            dataToken: "",
            title: "",    //页面标题
            articleData: {title:0},
            showNav: NATIVEPARAM.showNav,
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted(){
            var _this = this;
            if(isNative){
                //console.log("app内")
                _this.showNav = false;
                //console.log("导航:"+_this.showNav)
            }
            var type = getQueryString("type");
            // if(type==1){
            //     _this.title = "使用说明";
            // }
            // if(type==2){
            //     _this.title = "帮助说明";
            // }
            
            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                _this.dataApi(_this.dataToken);
            }).catch(e => {
                console.log('获取token失败，错误信息:', e);
            });

        },
        methods:{
            dataApi:function(token){
                var _this = this;
                _this.isWaiting = true;
                var articleUrl = _this.dataHost + `/v1/shoppingCoupon/explain?` + querystring.stringify({
                    param: JSON.stringify({
                        "version": NATIVEPARAM.version,
                        "platform": 4,
                        "environment": 'plan',
                        "type": getQueryString("type"),
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
                        _this.showLayer("showMsg", "请求超时");
                    }
                }).then((message)=>{
                    var status = message.body.status,
                        msg = message.body.msg;
                        _this.isWaiting = false;
                    if (status === 200) {
                        var data = message.body.data;
                        _this.articleData = data;
                        _this.title = data.title;
                        document.title = _this.title;
                    }
                },()=>{
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
            goBack: function () {
                window.history.back();
            }
        },
        components: {
            loading,
            popLayer,
            headerNav
        }
    });

});