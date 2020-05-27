require('../../css/xmlyFM-detail.scss');

const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import {getN,callN,isNative,dataHost,apiHost,utcTime,getHash} from 'nativeA';
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
            title: "简介",    //页面标题
            dxjApi: "",      //飞机环境访问资源路径
            radioHead: {"image":"/cache/image/eabookcomment/73/20180413113426_523.jpg","tag":"bookcomment_73","title":"新书推荐 | 全世界最快乐的抑郁症患者出书了！","title_second":"书名叫《高兴死了!!!》，却是一位抑郁症患者写的如何快乐的书","author":"周文强","views":27199},
            radio: [],       //视频列表
            tabTypes: [
              {"type":"0", "title":"简介", "active":true},
              {"type":"1", "title":"节目", "active":false}
            ],              //tab类型
            playText: "全部播放",
            sortText: "顺序",
            isPlay: false,  //播放状态
            isSort: false,  //排序状态
            radioIndex: 1,  //播放位置
            checkedText: "" //当前播放标题
        },
        mounted() {
          var _this = this;

          //外部调用dataToken&dxjApi
          getHash().then(res => {
            _this.dataToken = res.token;
            _this.dxjApi = res.hash;

            // 获取短视频数据
            _this.getVideoData();

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
          tabFn:function (index) {    //tab切换方法
            //console.log(i);

            var _this = this;
            //设置tab默认赋值
            for(var i=0, len=_this.tabTypes.length; i<len; i++){
              _this.tabTypes[i].active = false;
            }
            _this.tabTypes[index].active = true;
            //赋值标题
            _this.title = _this.tabTypes[index].title;
            document.title = _this.tabTypes[index].title;
          },
          playFn:function () {    //播放按钮方法
            var _this = this;
            //初始化播放列表
            for(var i=0, len=_this.radio.length; i<len; i++){
              _this.radio[i].active = false;
            }
            //修改按钮状态
            if(!_this.isPlay){
              _this.isPlay = true;
              _this.playText = "暂停播放";
              //修改播放列表当前状态
              _this.radio[_this.radioIndex-1].active = true;
              _this.checkedText = _this.radio[_this.radioIndex-1].title;
              // console.log(_this.radio);
            }else {
              _this.isPlay = false;
              _this.playText = "全部播放";
            }
          },
          sortFn:function () {    //排序按钮方法
            var _this = this;
            if(!_this.isSort){
              _this.isSort = true;
              _this.sortText = "降序";
            }else {
              _this.isSort = false;
              _this.sortText = "顺序";
            }

            //数组反序
            _this.radio = _this.radio.reverse();
            // console.log(_this.radio);
          },
          getVideoData:function () {

            var _this = this;
            _this.isReady = true;

            var videoUrl = _this.dataHost + `/v1/video/index?` + querystring.stringify({
                param: JSON.stringify({
                  "version":NATIVEPARAM.version,
                  "platform":NATIVEPARAM.platform,
                  "environment":NATIVEPARAM.environment
                })
              });
            _this.$http.get(videoUrl).then((message)=>{
              _this.isReady = false;
              
              var status = message.body.status,
                  msg = message.data.msg;

              if (status === 200) {
                var curData = message.body.data.list;    //当次请求内容

                _this.radio = curData;
                // console.log(message.body.data);

                //音频列表总数
                _this.tabTypes[1].title += _this.radio.length;

              }else{
                _this.showLayer("showMsg", msg);
              }

            },()=>{
              _this.isReady = false;
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