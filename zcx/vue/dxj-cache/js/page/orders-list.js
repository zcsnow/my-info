require('../../css/orders.scss');
const querystring = require('querystring');

import Vue from 'vue';
import axiosServer from 'axiosServer';
import { getN, dataHost, apiHost, utcTime, getHash, checkLogin } from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import {setCookie, getCookie, delCookie} from '../modules/cookie.js';
import VueLazyload from 'vue-lazyload';
import formatStr from '../modules/dataFormat.js';
import FastClick from 'fastclick';

Vue.use(VueLazyload,{
    error: '../images/e.gif'
});

window.addEventListener('DOMContentLoaded', function() {
    var NATIVEPARAM = getN('getBase');

    //验证cookie是否存在,不存在跳转登录注册
    checkLogin("orders-list");

    //cookie存在时获取用户ID和TOKEN
    var uid = getCookie('uuid'),
        utoken = getCookie('access_token');

    var vm = new Vue({
        el: "#main",
        data: {
            isWaiting: true,   // 显示加载中
            isShow: false,      // 显示toast
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            ordersList: []
        },
        mounted() {
          var _this = this;
          getHash().then(res => {

            //获取接口数据
            _this.getOrdersData(res.token);

          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
          });
            
        },
        methods: {
          getOrdersData(token) {
            var _this = this;
            _this.isWaiting = true;
            var url = dataHost + `/eastopay/order/getMyOrder`,
                param = {param:JSON.stringify({
                  "version": NATIVEPARAM.version,
                  "environment":'plan',
                  "platform": '4',
                  "limit": 99,
                  "page": 1,
                  "uuid": uid,
                  "token": utoken
                })};

            //请求方式修改
            axiosServer(url,"get",param,token).then((message) => {
              _this.isWaiting = false;

              var status = message.status,
                  msg = message.msg;
              if (status === 200) {
                var data = message.data.list;
                if(data.length){
                  _this.ordersList = data.map(item=>{
                    item.orderTime = formatStr(item.orderTime,'YYYY-MM-DD HH:mm:ss');
                    return item;
                  });
                }
              } else {
                _this.showLayer("showMsg", msg);
              }
              //console.log(data);
            },(err) => {
                console.log(err);
                _this.isWaiting = false;
                if(err.request.readyState == 4 && err.request.status == 0){
                    
                    _this.showLayer("showMsg", "网络请求超时");
                }else{
                    _this.showLayer("showMsg", "网络请求错误");
                }
              //_this.isWaiting = false;
              
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