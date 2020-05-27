require('../../css/login.scss');
require('../../css/messagebox.scss');
const querystring = require('querystring');
const md5 = require('md5');   //MD5

import Vue from 'vue';
import Resource from 'vue-resource';
import { getN, callN,isNative,dataHost, apiHost, getHash} from 'nativeA';
import { Confirm } from 'wc-messagebox'
import loading from 'loading';
import popLayer from 'pop-layer';
import {setCookie, getCookie} from '../modules/cookie.js';
import FastClick from 'fastclick';

Vue.use(Resource);
Vue.use(Confirm);

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
      show_msg: "",
      dataToken: "",
      pageUrl: "",
      phone: "",
      password: "",
      password2: ""
    },
    mounted(){
      var _this = this;
      // _this.pageUrl = _this.getQueryString("pageUrl");
      _this.pageUrl = document.location.search.length>9?document.location.search.slice(9):"";
      getHash().then(res => {
        _this.dataToken = res.token;
      }).catch(e => {
        console.log('获取token失败，错误信息:', e);
      });
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
          if (_this.timeId) { clearInterval(_this.timeId); }
          _this.timeId = setTimeout(() => {
              _this.isShow = false;
              _this.show_msg = "";
          }, 2000);
        }
      },
      goBack: function () {
        window.history.back();
      },
      register: function () {
        var _this = this;
        _this.isWaiting = true;
        var url = dataHost + `/v1/user/signup?` + querystring.stringify({
          param: JSON.stringify({
            "version":NATIVEPARAM.version,
            "platform": 4,
            "environment": 'plan',
            "phone": _this.phone,
            "password": md5(_this.password),
            "code": "1234"
          })
        });
        _this.$http.get(url, {
          headers:{
              "Content-Type": "application/x-www-form-urlencoded",
              "token": _this.dataToken,
              "cache-control": "no-cache"
          },
          _timeout:15000,
          onTimeout: (request) => {
            _this.isWaiting = false;
            _this.showLayer("showMsg", "请求超时");
          }
        }).then((message) => {
          _this.isWaiting = false;
          var starts = message.body.status,
              msg = message.body.msg;
          if (starts == 200) {
            _this.showLayer("showMsg", msg);
            if(isNative){
              var userData = {
                "access_token": message.body.data.access_token,
                "collection": {
                    "count": 0
                },
                "experience": 0,
                "grade": 1,
                "image": "",
                "like": {
                    "count": 0
                },
                "username": '',
                "phone":_this.phone,
                "uuid": message.body.data.uuid,
                "validated": 0

              }
            
              callN("userinfo_to_native", userData);
              console.log("注册userinfo_to_native:"+userData.username)
            }
            setCookie('phone', _this.phone, 1);
            setCookie('uuid', message.body.data.uuid, 1);
            setCookie('access_token', message.body.data.access_token, 1);
            if(_this.pageUrl == "" || _this.pageUrl == null){
              _this.goBack();
            }else{
              window.location.href = _this.pageUrl
            }
            // 根据来源URL跳转，如果没有来源为空字符串可以设置为首页或者其它页面
            // window.location.href = document.referrer;
          } else {
            _this.showLayer("showMsg", msg);
          }

        }, () => {
          _this.isWaiting = false;
          _this.showLayer("showMsg", "网络请求错误");
        });
      },
      checkPhone: function () {
        var _this = this;

        if(_this.phone.length == 0 || _this.password.length == 0 || _this.password2.length == 0) {
          _this.showLayer("showMsg", "请输入手机号和密码");
          return false;
        }
        else{
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(_this.phone)) {
            _this.showLayer("showMsg", '请输入正确手机号');
            return false;
          }
          if (_this.password != _this.password2)
          {
            _this.showLayer("showMsg", '两次输入的密码不一致');
            return false;
          }
        }

        _this.$confirm({
          title: "请确认",
          content: '您的手机号 ' + _this.phone.slice(0,3) + ' ' + _this.phone.slice(3,7) + ' ' + _this.phone.slice(7,11) + ' 填写正确，并注册作为东行记账户机下唯一找回凭证',
          yesStyle: {}, // 设置左边按钮样式
          yesText: '取消',  // 左边按钮文本,
          noStyle: {color: '#F72F42'},  // 设置右边按钮样式,
          noText: '确认并注册'   // 设置右边按钮文本
        }).then(res => {
          // 点取消时候触发
        }).catch(e => {
          _this.register();
          // 点确认并注册时候触发
        })
      }
    },
    components:{
      loading,
      popLayer
    }
  });
});
