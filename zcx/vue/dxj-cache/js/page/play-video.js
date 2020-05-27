require('../../css/play-video.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import {getN,callN,apiHost,isNative,eventLog} from 'nativeA';
import {isIos} from "../modules/method.js";
import loading from 'loading';
import FastClick from 'fastclick';

Vue.use(Resource);

window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: false,   // 显示加载中
            apiHost: apiHost,
            isNative: isNative,
            isIos: isIos, //判断是否ios
            isPlayer: true, //控制播放按钮是否显示
            iframeW: window.parent.innerWidth + "px",
            iframeH: window.parent.innerHeight + "px",
            showNav: NATIVEPARAM.showNav,
            videoUrl: "",
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted(){
            var _this = this;
            _this.getVideo();
            //埋点发送id,类型,标题
            var contentId = _this.getQueryString("video");
            var contentType = '视频';
            var contentTitle = decodeURIComponent(escape(_this.getQueryString("title")));
            eventLog({contentId:contentId,contentType:contentType,contentTitle:contentTitle});

            

        },
        methods:{
            //
            getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            goBack: function(){
                callN("moviePlay", {"rotate": false});
                window.history.back();
                window.location.href =  'index.html#video';
            },
            getVideo:function () {
                var _this = this,
                    reg = RegExp(/\/s\//);

                if(reg.test(_this.getQueryString("video"))){
                  _this.videoUrl = _this.getQueryString("video");
                }else{
                  _this.isWaiting = true;
                  var req = new XMLHttpRequest();
                  req.open('GET', _this.getQueryString("video"), true);
                  req.responseType = 'blob';

                  req.onload = function() {
                    // Onload is triggered even on 404
                    // check the status code
                    if (this.status === 200) {
                      var videoBlob = this.response;
                      var vid;
                      try {
                        vid = (window.URL || window.webkitURL || window).createObjectURL(videoBlob); // IE10+
                      } catch (e) {
                        vid = _this.getQueryString("video");
                      }
                      _this.videoUrl = vid;
                      _this.isWaiting = false;
                      // _this.videoUrl = this.getQueryString("video");
                    }
                  }
                  req.onerror = function(e) {
                    _this.isWaiting = false;
                    console.log('video request error', e);
                  }
                  req.send();
                }
            }
        },
        components: {
            loading
        }
    });

});