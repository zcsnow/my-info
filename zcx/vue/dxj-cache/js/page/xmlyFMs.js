require('../../css/xmlyFM-list.scss');
require('../../css/swiper.min.scss');
const querystring = require('querystring');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,callN,isNative,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion} from 'nativeA';
import loading from 'loading';
import VueLazyload from 'vue-lazyload';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';

import Swiper from 'swiper';
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

window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            isReady: false, 	   // 下拉加载控制器
            isLoad: true, 		   // 显示加载中
            show_msg: "",
            showNav: NATIVEPARAM.showNav,
            isNative: isNative,
            dataHost: dataHost,
            apiHost: apiHost,
            dataToken: "",
            title: "财经", //页面标题
            dxjApi: "",     //飞机环境访问资源路径
            travel: [],     //旅行列表
            finance: [
                {"image":"/cache/image/eabookcomment/73/20180413113426_523.jpg","tag":"bookcomment_73","title":"新书推荐 | 全世界最快乐的抑郁症患者出书了！","title_second":"书名叫《高兴死了!!!》，却是一位抑郁症患者写的如何快乐的书","author":"周文强","views":27199},
                {"image":"/cache/image/eabookcomment/75/20180703180319_872.jpg","tag":"bookcomment_75","title":"经济学","title_second":"经济学(第19版·中文本·典藏版)","author":"周文强","views":27199},
                {"image":"/cache/image/bookcomment/90/20180926175901_158.jpg","tag":"bookcomment_90","title":"111","title_second":"111","author":"周文强","views":27199}
            ]     //财经

        },
        mounted(){
            var _this = this;
            
            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                _this.dxjApi = res.hash;
                // 飞机环境要先获取资源
                console.log(res);
                _this.cacheHome(utcTime);

            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });

        },
        methods:{
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
            travelSwiper: function(){
                this.destroySwiper();
                //旅行轮播
                this._mySwiper = new Swiper(this.$el.querySelector('#swiper'), {
                    direction: 'horizontal',
                    loop: true,
                    autoplay : 5000,
                    slidesPerView: 1,
                    spaceBetween: 10,
                    //freeMode: true,
                    //centeredSlides: true
                });
            },
            destroySwiper: function () {

                //旅行轮播
                this._mySwiper && (this._initialSlide = this._mySwiper.activeIndex);
                this._mySwiper && this._mySwiper.destroy();
                this._mySwiper = null;

            },
            //获取首页接口数据
            cacheHome:function (planeData) {
                var _this = this;

                //飞机环境要先获取资源
                console.log('优先获取机上设备缓存数据');
                var dataPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/home' + planeData;
                //请求飞机首页本地缓存数据
                axios.get(dataPath).then((result) => {
                    var data = result.data.data;
                    //console.log(data);
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }

                    _this.$nextTick(()=>{
                        _this.homeRender(data);
                    });

                }).catch((err) => {
                    console.log(err);
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    //获取首页数据
                    _this.getHomeData(_this.dataToken);
                });
            },
            getHomeData:function (token){

                var _this = this;
                _this.isWaiting = true;

                var homeUrl = _this.dataHost + `/v1/home/index?` + querystring.stringify({
                      param: JSON.stringify({
                          "version":NATIVEPARAM.version,
                          "platform":4,
                          "environment":'plan',
                          "code":"411"
                      })
                  });

                _this.$http.get(homeUrl, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token
                    },
                    _timeout:15000,
                    onTimeout: (request) => {
                        _this.showLayer("showMsg", "请求超时，本地获取");
                        _this.isWaiting = false;
                        _this.isLoad = false;

                        //获取本地首页数据
                        axios.get("../js/data/page/home.json").then((result) => {
                            var data = result.data.data;
                            _this.homeRender(data);

                            //console.log(data);
                        }).catch((err) => {
                            console.log(err);
                        });

                   }
                }).then((message)=>{    //获取首页接口数据

                // _this.$http.get(homeUrl).then((message)=>{    //获取首页接口数据
                    _this.isWaiting = false;
                    var status = message.body.status,
                        msg = message.body.msg;

                    if (status === 200) {
                        var data = message.body.data;
						             _this.homeRender(data);
                    }else{
                        _this.showLayer("showMsg", msg);
                    }
                },()=>{
                    _this.showLayer("show", true);
                    _this.isWaiting = false;
                });

            },
            homeRender: function (data) {
                var _this = this;

                //精致旅行
                _this.travel = data.travel || [];
                if(_this.travel.length > 1){
                    _this.$nextTick(()=>{
                        _this.travelSwiper();  //数据加载成功执行轮播
                	  });
                }

            }
        },
        components:{
            loading,
            popLayer,
            headerNav
        }
    });

});
