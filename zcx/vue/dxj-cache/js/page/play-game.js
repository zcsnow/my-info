require('../../css/play-game.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import {getN,apiHost,isNative,getHash,eventLog} from 'nativeA';
import FastClick from 'fastclick';

Vue.use(Resource);

window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el:"#main",
        data:{
            apiHost: apiHost,
            isNative: isNative,
            iframeW: window.parent.innerWidth + "px",
            iframeH: window.parent.innerHeight + "px",
            dxjApi: "",     //飞机环境访问资源路径
            gamePath: "",
            showNav: NATIVEPARAM.showNav,
            eventLog:eventLog, //事件埋点发送方法
        },
        mounted(){
            var _this = this;

            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                
                var planeType = res.planeType;
                if(planeType=="00"){
                    _this.dxjApi = _this.apiHost + res.hash+'/dxj';//获取最新更新机上静态资源目录
                }else if(planeType=="bc03"){
                    _this.dxjApi = _this.apiHost + res.hash+'/dxj/dxj';
                }else{
                    _this.dxjApi = _this.apiHost + res.hash;
                }

                _this.gamePath =  _this.dxjApi + '/h5apps/' + _this.getQueryString("path");
            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });
            //埋点发送id,类型,标题
            var contentId = _this.getQueryString("contentId");
            var contentType = decodeURIComponent(escape(_this.getQueryString("contentType")));
            var contentTitle = decodeURIComponent(escape(_this.getQueryString("contentTitle")));
            eventLog({contentId:contentId,contentType:'游戏-'+contentType,contentTitle:contentTitle});

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
                window.history.back();
            }
        }
    });

});