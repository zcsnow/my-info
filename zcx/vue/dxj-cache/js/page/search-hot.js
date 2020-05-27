require('../../css/search-hot.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,dataHost,apiHost,utcTime,getHash,dataVersion} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import VueLazyload from 'vue-lazyload';
import headerNav from 'headerNav';
import FastClick from 'fastclick';

Vue.use(Resource, axios);
Vue.use(VueLazyload,{
    error: '../images/e.gif',
});

//解决vue-resource请求报错,data默认不是以form data的形式，而是request payload的问题
Vue.http.options.emulateJSON = true;

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
          isReady: false,      // 加载控制器
          isLoad: true,        // 显示加载中
          dataHost: dataHost,
          showNav: NATIVEPARAM.showNav,
          dataToken: "",
          dxjApi: "",     //飞机环境访问资源路径
          dxjResourceDir:"",//获取机上静态资源目录
          isCacheDataLoad:false, //cache或接口资源是否优先加载成功
          baseUrl: '',
          show_msg: "",
          jsonArray: [],
          resou: true
        },
        mounted(){
            var _this = this;

            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                _this.dxjApi = res.hash;
                console.log(utcTime)
                _this.cacheData(utcTime);
            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });

        },
        methods:{
          hotSearch:function(token){
            var _this = this;
            var url = dataHost +'/v1/hotSearch/list?' + querystring.stringify({
                param: JSON.stringify({
                  "version":NATIVEPARAM.version,
                  "platform":4,
                  "environment":'plan'
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
                var data = message.body.data;
                _this.jsonArray = data.list;
              }else{
                _this.resou = false;
                _this.showLayer("showMsg", msg);
              }

          },()=>{
            _this.resou = false;
            _this.isWaiting = false;
            _this.showLayer("showMsg", "网络请求错误");
          });
        },
        cacheData(planeData) {
          var _this = this;
          
          var url = apiHost + '/app/dxj/cache/' + dataVersion + '/hotSearch' + planeData;
          //请求本地缓存数据
          axios.get(url).then((result) => {
            _this.baseUrl = _this.apiHost + '/app/dxj';
            _this.isCacheDataLoad = true;
            var data = result.data.data;
            if(data==undefined){
              console.log("数据类型转换");
              data = JSON.parse(data);
            }
            _this.jsonArray = data;

          }).catch((err) => {
              console.log(err);
              // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
              //获取接口数据
              _this.$nextTick(()=>{
                _this.hotSearch(_this.dataToken);
              });
          });
        },
        showLayer(type,v,auto){    //执行toast弹出层
          var _this = this;
          if(type == "show"){
              _this.isShow = v;
          }else if(type == "showMsg"){
              _this.show_msg = v;
          }
          if(!auto){
            if(_this.timeId){ clearInterval(_this.timeId);}
              _this.timeId = setTimeout(()=>{
                _this.isShow = false;
                _this.show_msg = "";
            },2000);
          }
        },
        show:function(ev){
            var _this = this;
            if(ev.keyCode == 13){
              _this.search(_this.keyword, _this.dataToken);          //获取资源目录
              // alert('你按回车键了');
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