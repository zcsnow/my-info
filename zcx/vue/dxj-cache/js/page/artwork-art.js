require('../../css/artwork-list.scss');

const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN, isNative, dataHost, apiHost, utcTime, getHash, dataVersion} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';

import FastClick from 'fastclick';

Vue.use(Resource);
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
            isReady: false,      // 下拉加载控制器
            isLoad: true,        // 显示加载中
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            dataHost: dataHost,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            dxjApi: "",     //飞机环境访问资源路径
            artList: [{
              index: 1,
              titleImg: "ss"
            },{
              index: 2,
              titleImg: "hn"
            },{
              index: 3,
              titleImg: "dw"
            },{
              index: 4,
              titleImg: "rw"
            }],
            artData: [],       //名家列表
        },
        mounted() {
          var _this = this;

          // 外部调用dataToken&dxjApi
          getHash().then(res => {
            _this.dataToken = res.token;

             //飞机机型是否是BC03
             var planeType = res.planeType;
             if(planeType=="00"){
                _this.dxjApi = res.hash+'/dxj';
                _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
             }else if(planeType=="bc03"){
                 _this.dxjApi = res.hash+'/dxj/dxj';
                 _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
             }else{
                 _this.dxjApi = res.hash;
                 _this.dxjResourceDir = res.hash;//获取机上静态资源目录
             }

            _this.getDxjJsonData();
            // 获取名家列表数据
            // _this.getArtData(res.token);
            _this.cacheArtData(utcTime);

          }).catch(e => {
              console.log('获取dxjApi失败，错误信息:', e);
          });
            
        },
        methods: {
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
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/artists.json';
            axios.get(jsonSrc).then((result) => {
              if(_this.isCacheDataLoad){
                return false
              }
              _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
              
              var data = result.data.data;
              if(_this.isCacheDataLoad){
                return false
              }
              _this.isCacheDataLoad = true;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              //渲染数据
              _this.artData = data;
              _this.isWaiting = false;
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheArtData(planeData) {
            var _this = this;
            // var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/city-list' + planeData;
            var url = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/artists' + planeData;
            //请求本地缓存数据
            _this.isWaiting = true;
            axios.get(url).then((result) => {
              _this.baseUrl = _this.apiHost + '/app/dxj';
              _this.isCacheDataLoad = true;
              var data = result.data.data;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              //渲染数据
              _this.artData = data;
              _this.isWaiting = false;

            }).catch((err) => {
                console.log(err);
                _this.isWaiting = false;
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getArtData(_this.dataToken);
                });

            });

          },
          getArtData:function (token) {
            var _this = this;
            var url = _this.dataHost + `/v1/artist/index?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":NATIVEPARAM.platform,
                "environment":NATIVEPARAM.environment
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
                //_this.showLayer("showMsg", "请求超时，本地获取");

                //获取本地banner数据
                axios.get("../images/tmp/artists.json").then((result) => {
                  var data = result.data.data;
                  //console.log(data);
                  //渲染数据
                  _this.artData = data;

                }).catch((err) => {
                    console.log(err);
                });
              }
            }).then((message) => {
              _this.isWaiting = false;
              var starts = message.data.status,
                  msg = message.data.msg;
              if (starts == 200) {
                _this.baseUrl = '/app/dxj';
                _this.isCacheDataLoad = true;
                  _this.artData = message.body.data;
              } else {
                  _this.showLayer("showMsg", msg);
              }
            }, () => {
              _this.isWaiting = false;
              _this.showLayer("showMsg", "网络请求错误");
            });

          }
        },
        components: {
            loading,
            popLayer,
            headerNav
        }
    });

});