require('../../css/member.scss');

import Vue from 'vue';
import {getN,callN,isCeair,isNative,dataHost,apiHost,utcTime,getQueryString,getHash,eventLog,dataVersion,versionContrast} from 'nativeA';
import {setCookie, getCookie, delCookie} from '../modules/cookie.js';
import FastClick from 'fastclick';

window.addEventListener('DOMContentLoaded',function (){
  var NATIVEPARAM = getN('getBase');
  if(versionContrast(NATIVEPARAM.version,'4.2.7')){
    if(isNative){
      console.log(JSON.stringify(NATIVEPARAM));
      // alert(JSON.stringify(NATIVEPARAM));
      // alert(NATIVEPARAM.userName);
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
    el:"#main",
    data:{
      isNative:isNative,
      isLogin: (isUuid) && (isAccess_token)?true:false, //登陆状态
      phone: ""
    },
    mounted(){
      var _this = this;
      if(_this.isLogin==true){
        if(isNative){
          _this.phone = NATIVEPARAM.userName;
        }else{
          var phone = getCookie('phone')!=null?getCookie('phone'):'';
          // 只有在手机号长度为11位的时候才截取
          _this.phone = phone.length==11?phone.slice(0,3) + "****" + phone.slice(7,11):phone;
        }
        
      }
    },
    methods:{
      goBack: function () {
        window.location.href = "index.html";
        // window.history.back();
      },
      enterShoppingCard: function () {
        callN("enterShoppingCard"); 
        
        eventLog({eventId:'my_shoppingcard_click',eventType:'1'});
        console.log("enterShoppingCard")
      },
      loginOut: function () {
        var _this = this;
        _this.isLogin = false;
        delCookie('phone');
        delCookie('uuid');
        delCookie('access_token');
        delCookie('couponBalance');
        if(isNative){
          console.log("loginOut")
          callN("loginOut"); 
        }  
      }
    },
    components:{
    }
  });
});
