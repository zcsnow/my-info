require('../../css/daxiang-list.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN,isNative,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';

Vue.use(Resource, axios);
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
            isWaiting: true,   // 显示加载中
            isShow: false,      // 显示toast
            isReady: false,     // 下拉加载控制器
            isLoad: true, 		   // 显示加载中
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            dataToken: "",
            movieData: [],
            curpage: 0,     //当前分页值
            lastNum: 0,     //当前分页最后一条upper_time值
            pagecount: 999,    //总页数
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted() {
          var _this = this;
          // 外部调用dataToken&dxjApi
          getHash().then(res => {
              _this.dataToken = res.token;

              //飞机环境要先获取资源
              _this.cacheData(utcTime);
              //_this.getData(_this.dataToken);

          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
          });

        },
        methods: {
          cacheData(planeData) {
            var _this = this;

            var moviePath = apiHost + '/app/dxj/cache/' + dataVersion + '/moviecomment' + planeData;
            //请求本地缓存数据
            axios.get(moviePath).then((result) => {

                var data = result.data.data.list;
                console.log(data);
                if(data==undefined){
                  console.log("数据类型转换");
                  data = JSON.parse(data);
                }

                //渲染数据
                _this.movieData = data;
                _this.isLoad = false;
                _this.isWaiting = false;
                window.removeEventListener('scroll',_this.addMore,false);

            }).catch((err) => {
                console.log(err);
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getData(_this.dataToken);
                });
            });

          },
          getData(token) {
            var _this = this;
            _this.isReady = true;
            var url = dataHost + `/v1/moviecomment/index?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "page":this.curpage,
                "pageSize": 10,
                "lastNumber":this.lastNum
              })
            });
            _this.$http.get(url, {
                  headers:{
                      "Content-Type": "application/x-www-form-urlencoded",
                      "token": token
                  },
                  _timeout:15000,
                  onTimeout: (request) => {
                    _this.isLoad = false;
                    _this.isWaiting = false;
                    _this.showLayer("showMsg", "请求超时，本地获取");

                    //获取本地数据
                    axios.get("../js/data/page/moviecomment.json").then((result) => {
                      var data = result.data.data.list;
                      //console.log(data);
                      //渲染数据
                      _this.movieData = data;
                      
                      window.removeEventListener('scroll',_this.addMore,false);

                    }).catch((err) => {
                        console.log(err);
                    });

                }
              }).then((message) => {
                _this.isWaiting = false;
                _this.isReady = false;
                var starts = message.body.status,
                    msg = message.body.msg;
                if (starts == 200) {

                    var data = message.body.data.list;
                    _this.movieData = _this.movieData.concat(data);

                    if (_this.curpage++>=_this.pagecount) {
                        window.removeEventListener('scroll',_this.addMore,false);
                        _this.isReady = true;
                        _this.isLoad = false;
                    }

                    //分页第二页后需要传值upper_time
                    if (_this.curpage > 0 && data.length > 0) {
                        _this.lastNum = data[data.length-1].upper_time;
                    }else{
                        window.removeEventListener('scroll',_this.addMore,false);
                        _this.isReady = true;
                        _this.isLoad = false;
                    }
                } else {
                    _this.showLayer("showMsg", msg);
                }

                _this.$nextTick(()=>{
                    window.addEventListener('scroll',_this.addMore.bind(_this),false);
                });

            }, () => {
              _this.isWaiting = false;
              _this.isReady = false;
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
                  if (_this.timeId) { clearInterval(_this.timeId); }
                  _this.timeId = setTimeout(() => {
                      _this.isShow = false;
                      _this.show_msg = "";
                  }, 2000);
              }
          },
          addMore(){
            var H = document.documentElement.scrollHeight || document.body.scrollHeight;
            var h = window.innerHeight;
            var t = document.documentElement.scrollTop||document.body.scrollTop;
            if (H - (h + t) < 15 && !this.isReady){
                this.getData(this.dataToken);
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