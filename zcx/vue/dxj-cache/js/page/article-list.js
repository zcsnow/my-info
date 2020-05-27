require('../../css/article-list.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import { getN,isNative,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion,getQueryString} from 'nativeA';
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

    var vm = new Vue({
        el: "#main",
        data: {
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            isReady: false,      // 下拉加载控制器
            isLoad: true, 		   // 显示加载中
            noData: false,
            show_msg: "",
            title: "文章列表",
            id:'',
            showNav: NATIVEPARAM.showNav,
            dataHost: dataHost,
            apiHost: apiHost,
            dxjResourceDir:"",//获取机上静态资源目录
            dataToken: "",
            isCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrl: '',
            coverShape:false, //封面图形状： 0/true 横图； 1/false 竖图 默认竖图
            articleListData: [],
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

              //飞机机型是否是BC03
              var planeType = res.planeType;
              if(planeType=="00"){
                _this.dxjResourceDir = res.hash+'/dxj';//获取最新更新机上静态资源目录
              }else if(planeType=="bc03"){
                  _this.dxjResourceDir = res.hash+'/dxj/dxj';//获取BC03机上静态资源目录
              }else{
                  _this.dxjResourceDir = res.hash;//获取机上静态资源目录
              }

              _this.id = getQueryString("id");
              _this.getDxjJsonData();
              //飞机环境要先获取资源
              _this.cacheArticleList(utcTime);
              //_this.getArticleListData(_this.dataToken);
          }).catch(e => {
              console.log('获取token失败，错误信息:', e);
          });

        },
        methods: {
          getDxjJsonData: function () {
            //获取机上静态资源数据
            var _this = this;
            if(_this.dxjResourceDir == ""|| _this.dxjResourceDir == null){
                console.log('本次航班静态资源不存在');
            }
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/articleCategory/'+ _this.id +'/1.json';
            axios.get(jsonSrc).then((result) => {
              if(_this.isCacheDataLoad){
                return false
              }
              var data = result.data.data.list;
              _this.baseUrl = _this.apiHost + _this.dxjResourceDir;
              _this.title = result.data.data.categoryName;
              document.title = result.data.data.categoryName;
              _this.coverShape = !result.data.data.coverShape;
              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              //渲染数据
              _this.articleListData = data;
              _this.isLoad = false;
              window.removeEventListener('scroll',_this.addMore,false);
                
            }).catch((err) => {
                console.log(err);
            });
          },
          cacheArticleList(planeData) {
            var _this = this;
            _this.isReady = true;
            var articleListPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/articleCategory/'+ _this.id +'/'+ parseInt(parseInt(_this.curpage)+1) + planeData;
            //请求本地缓存数据
            axios.get(articleListPath).then((result) => {
                _this.isReady = false;
                _this.baseUrl = _this.apiHost + '/app/dxj';
                _this.isCacheDataLoad = true;
                var data = result.data.data.list;
                _this.title = result.data.data.categoryName;
                document.title = result.data.data.categoryName;
                _this.coverShape = !result.data.data.coverShape;
                if(data==undefined){
                  console.log("数据类型转换");
                  data = JSON.parse(data);
                }

                //渲染数据
                //_this.articleListData = data;
                //_this.isLoad = false;
                window.removeEventListener('scroll',_this.addMore,false);

                if(_this.curpage==0){
                  _this.articleListData = [];
                }
                
                _this.articleListData = _this.articleListData.concat(data);
                if (_this.curpage++>=Math.ceil((result.data.data.count)/50)) {
                    window.removeEventListener('scroll',_this.cacheAddMore,false);
                    _this.isReady = true;
                    _this.isLoad = false;
                }
                //分页第二页后需要传值upper_time
                if (_this.curpage > 0 && data.length > 0) {
                    _this.lastNum = data[data.length-1].upper_time;
                    _this.isLoad = false;
                }else{
                    window.removeEventListener('scroll',_this.cacheAddMore,false);
                    _this.isReady = true;
                    _this.isLoad = false;
                }

                if(result.data.data) {
                  _this.$nextTick(()=>{
                    window.addEventListener('scroll',_this.cacheAddMore.bind(_this),false);
                  });
                }

            }).catch((err) => {
                console.log(err);
                // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                //获取接口数据
                _this.$nextTick(()=>{
                    _this.getArticleListData(_this.dataToken);
                });
            });

          },
          getArticleListData(token) {
            var _this = this;
            _this.isReady = true;
            var url = this.dataHost + `/v1/article/list?` + querystring.stringify({
              param: JSON.stringify({
                "version":NATIVEPARAM.version,
                "platform":4,
                "environment":'plan',
                "id":_this.id,
                "page":this.curpage,
                "pageSize": 10,
                "lastNumber":this.lastNum
              })
            });
            _this.$http.get(url, {
                  headers:{
                      "Content-Type": "application/x-www-form-urlencoded",
                      "token": token,
                      "cache-control": "no-cache"
                  },
                  _timeout:15000,
                  onTimeout: (request) => {
                    _this.isLoad = false;
                    _this.isWaiting = false;
                }
              }).then((message) => {
              _this.isReady = false;
              var starts = message.body.status,
                  msg = message.body.msg;
                  
              if (starts == 200) {
                  _this.baseUrl = '/app/dxj';
                  _this.isCacheDataLoad = true;
                  _this.title = message.body.data.categoryName;
                  document.title = message.body.data.categoryName;
                  if(_this.curpage==0){
                    _this.articleListData = [];
                  }
                  _this.coverShape = !message.body.data.coverShape;
                  var data = message.body.data.list;
                  _this.articleListData = _this.articleListData.concat(data);
                  console.log(_this.pagecount)
                  if (_this.curpage++>=_this.pagecount) {
                      window.removeEventListener('scroll',_this.addMore,false);
                      _this.isReady = true;
                      _this.isLoad = false;
                  }
                  //分页第二页后需要传值upper_time
                  if (_this.curpage > 0 && data.length > 0) {
                      _this.lastNum = data[data.length-1].upper_time;
                      _this.isLoad = false;
                  }else{
                      window.removeEventListener('scroll',_this.addMore,false);
                      _this.isReady = true;
                      _this.isLoad = false;
                  }
              } else {
                  _this.showLayer("showMsg", msg);
                  _this.noData = true;
              }
              if(message.body.data) {
                _this.$nextTick(()=>{
                  window.addEventListener('scroll',_this.addMore.bind(_this),false);
                });
              }

            }, () => {
              _this.isReady = false;
              _this.showLayer("showMsg", "网络请求错误");
              _this.noData = true;
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
                this.isLoad = true;
                this.getArticleListData(this.dataToken);
            }
          },
          cacheAddMore(){
            var H = document.documentElement.scrollHeight || document.body.scrollHeight;
            var h = window.innerHeight;
            var t = document.documentElement.scrollTop||document.body.scrollTop;
            if (H - (h + t) < 15 && !this.isReady){
                this.isLoad = true;
                this.cacheArticleList(utcTime);
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