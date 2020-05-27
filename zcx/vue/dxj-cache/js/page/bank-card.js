require('../../css/bank-card.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN, dataHost, apiHost, utcTime, getHash, checkLogin} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import {setCookie, getCookie, delCookie} from '../modules/cookie.js';
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

window.addEventListener('DOMContentLoaded', function() {
    var NATIVEPARAM = getN('getBase');

    //验证cookie是否存在,不存在跳转登录注册
    checkLogin("bank-card");

    //cookie存在时获取用户ID和TOKEN
    var uid = getCookie('uuid'),
        utoken = getCookie('access_token');

    var vm = new Vue({
        el: "#main",
        data: {
            isWaiting: true,   // 显示加载中
            isShow: false,     // 显示toast
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            cardList: []
        },
        mounted() {
          var _this = this;
          getHash().then(res => {

            //获取接口数据
            _this.getCardData(res.token);

          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
          });
            
        },
        methods: {
          getCardData(token) {
            var _this = this;
            _this.isWaiting = true;
            var url = dataHost + `/eastopay/cust/list?` + querystring.stringify({
                param: JSON.stringify({
                    "version": NATIVEPARAM.version,
                    "environment":'plan',
                    "platform": '4',
                    "uuid": uid,
                    "token": utoken
                })
            });
            _this.$http.get(url, {
              headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "token": token
              },
              _timeout:15000,
              onTimeout: (request) => {
                _this.isWaiting = false;
                _this.showLayer("showMsg", "请求超时");
              }
            }).then((message)=>{
                _this.isWaiting = false;
                var status = message.body.status,
                    msg = message.body.msg;
                if (status === 200) {
                  var data = message.body.data.list;
                  if(data.length){
                    _this.cardList = data.map(item=>{var code=item.cardNum;item.cardNum=code.substr(code.length-4);return item});
                  }
                  //console.log(_this.cardList);
                }else{
                  _this.showLayer("showMsg", msg);
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
          }
    },
    components: {
        loading,
        popLayer,
        headerNav
    }
  });

});