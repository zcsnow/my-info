require('../../css/newcomer-strategy.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN, callN,dataHost, isNative,apiHost, utcTime, getHash, eventLog, dataVersion,versionContrast} from 'nativeA';
import {setCookie, getCookie, delCookie} from '../modules/cookie.js';
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
    if(versionContrast(NATIVEPARAM.version,'4.2.7')){
      if(isNative){
        setCookie('phone', NATIVEPARAM.userName, 1);
        setCookie('uuid', NATIVEPARAM.userID, 1);
        setCookie('access_token', NATIVEPARAM.token, 1); 
        setCookie('couponBalance', NATIVEPARAM.couponBalance, 1);    
      }
    }
    var uuid = getCookie('uuid') || '';
    var access_token = getCookie('access_token') || '';
    var isUuid = uuid !== null && uuid !== '' && uuid !== 'null';
    var isAccess_token = access_token !== null && access_token !== '' && access_token !== 'null';
    var vm = new Vue({
      el: "#main",
      data: {
          isWaiting: false,   // 显示加载中
          isShow: false,      // 显示toast
          apiHost: apiHost,
          show_msg: "",
          dataToken: "",
          showNav: NATIVEPARAM.showNav,
          scoreExchangeUrl:'',
          isLogin: (isUuid) && (isAccess_token)?true:false, //登陆状态
          loginBtnText: "立即登录",
          eventLog:eventLog
      },
      mounted() {
        var _this = this;
        _this.scoreExchangeUrl = getCookie('scoreExchangeUrl')||'';
        getHash().then(res => {
          _this.dataToken = res.token;
          if(_this.isLogin==true){
            _this.loginBtnText = "去购物";
            if(isNative){
              $('.login-btn').show();
            }else{
              $('.login-btn').hide();
            }
            
          }else{
            _this.loginBtnText = "立即登录";
          }

        }).catch(e => {
            console.log('获取token失败，错误信息:', e);
        });
   
          
      },
    methods: {
      isLoginFun:function(){
        if(this.isLogin==true){
          callN("enterShoppingCard"); 
          eventLog({eventId:'home_shoppingcard_my',eventType:'1'});
          console.log("enterShoppingCard")
        }else{
          eventLog({eventId:'shoppingcard_topic_login',eventType:'1'});
          window.location.href = "login.html"
        }
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