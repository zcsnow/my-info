require('../../css/search.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import {getN,dataHost,apiHost,getHash} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import VueLazyload from 'vue-lazyload';
import FastClick from 'fastclick';

Vue.use(Resource);
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
          dataToken: "",
          dxjApi: "",     //飞机环境访问资源路径
          show_msg: "",
          keyword: "",
          jsonArray: [],
          resou: true,
          adTextArray: [],
          adImgArray: []
        },
        mounted(){
            var _this = this;

            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                _this.dxjApi = res.hash;
                _this.getAdData(_this.dataToken);
            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });

        },
        methods:{
            search:function(keyword ,token){
              var _this = this;
              var _keyword = keyword;
              _this.isWaiting = true;
              _this.resou = false;
              _this.adTextArray = [];
              _this.adImgArray = [];

              if(_keyword == "debug"){
                console.log('debug');
                //console.log(_this.dxjApi);
                this.isWaiting = false;

                var ts = new Date(),
                    timer = ts.getUTCFullYear()+''+(ts.getUTCMonth()+1)+''+ts.getUTCDate()+ts.getUTCHours();

                window.location.href = apiHost + '/app/dxj/cache/debug/data.html?apiHost='+ apiHost +'&token=' + _this.dataToken +'&dxj=' + _this.dxjApi +'&timer=' + timer;
                return false;
              }

              var url = _this.dataHost + `/v1/search/index`;
              _this.$http.post(url, querystring.stringify({
                param: JSON.stringify({
                  "version":NATIVEPARAM.version,
                  "platform":4,
                  "environment":'plan',
                  "keyword": keyword
                })
              }), {
                headers:{
                  "Content-Type": "application/x-www-form-urlencoded",
                  "token": token
                },
                _timeout:15000,
                onTimeout: (request) => {
                  _this.isWaiting = false;
                  _this.isLoad = false;
                  _this.showLayer("showMsg", "请求超时");
                }
              }).then((message) => {
                var starts = message.body.status,
                    msg = message.body.msg;
                if (starts == 200) {
                  var data = message.body.data.list;
                  data.forEach(function(item,index) {
                    if(_keyword == "."){_keyword = " "+_keyword;}
                    data[index].title = item.title.replace(new RegExp(_keyword,'g'),"<span>" + _keyword + "</span>");
                  });
                  _this.jsonArray = data;
                  _this.isReady = true;
                  _this.isLoad = false;
                  _this.isWaiting = false;
                } else {
                  _this.jsonArray = [];
                  _this.showLayer("showMsg", msg);
                  _this.isWaiting = false;
                }
              });
            },
            clearJsonArray:function(){
              // this.keyword = "";
              // this.jsonArray = [];
              window.history.back();
            },
            clearKeyword:function(){
              this.keyword = "";
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
            getAdData:function(token){
              var _this = this;
              var url = dataHost +'/v1/ad/index?' + querystring.stringify({
                  param: JSON.stringify({
                    "version":NATIVEPARAM.version,
                    "platform":4,
                    "environment":'plan',
                    "ad_type": 12,
                    "num": 5
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

                  data.list.map(function(item,index){
                    // 根据类型分别放到文字广告或者图片广告数组里
                    if(item.show_type == 1){
                      _this.adImgArray.push(item);
                    }else{
                      _this.adTextArray.push(item);
                    }
                  });

                  if(_this.adTextArray.length == 0 && _this.adImgArray.length == 0){
                    // 如果返回广告数据为空显示热搜推荐
                    _this.resou = false;
                  }
                }else{
                  _this.resou = false;
                  _this.showLayer("showMsg", msg);
                }

            },()=>{
              _this.resou = false;
              _this.isWaiting = false;
              _this.showLayer("showMsg", "网络请求错误");
            });
          }

        },
        components: {
            loading,
            popLayer
        }
    });

});