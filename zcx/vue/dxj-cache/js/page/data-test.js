require('../../css/index.scss');

const querystring = require('querystring');

//获取本地首页数据
var localHome = require('../data/page/home.json');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,callN,isCeair,isNative,dataHost,apiHost,getHash} from 'nativeA';
import loading from 'loading';
import VueLazyload from 'vue-lazyload';
import popLayer from 'pop-layer';

import Swiper from 'swiper';
//import luckDraw from 'luckDraw';

Vue.use(Resource, axios);
Vue.use(VueLazyload,{
    error: '../images/e.gif'
});


window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el:"#main",
        data:{
            isWaiting: false,   // 显示加载中
            isShow: false,      // 显示toast
            isReady: false, 	   // 下拉加载控制器
            isError: false, 	   // 下拉请求失败控制器
            isLoad: true, 		   // 显示加载中
            show_msg: "",
            isCeair: isCeair,   //是否东航环境
            isNative: isNative,
            dataHost: dataHost,
            apiHost: apiHost,
            dataToken: "",
            dxjApi: "",     //飞机环境访问资源路径
            banner: [],     //头部轮播数据
            game: [],       //推荐游戏
            book: [],       //京东图书
            car:[],         //汽车列表
            travel: [],     //旅行列表
            video: [],      //视频列表
            curpage: 0,     //视频当前分页值
            lastNum: 0,     //视频当前分页最后一条upper_time值
            pagecount: 999 	 //视频总页数
        },
        mounted(){

            var _this = this;

            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                _this.dxjApi = res.hash;

                //飞机环境要先获取资源
                _this.getHomeData(_this.dataToken);

                //获取视频数据
                _this.getVideoData();

                //测试电影目录
                // $.ajax({
                //     type: "GET",
                //     url: _this.apiHost + "/api/apps/contents/dxjfilm1",
                //     headers:{"Content-Type": "application/x-www-form-urlencoded","token": _this.dataToken},
                //     dataType: "json",
                //     success: function(data){
                //         console.log(data);
                //     },
                //     error: function(e){
                //         console.log(e);
                //     }
                // });

            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });

            this.$nextTick(()=>{
                window.addEventListener('scroll',this.addMore.bind(this),false);
            });

        },
        watch: {
            isError(now){
                if (now) {
                    setTimeout(function (){
                        this.isError = false;
                    }.bind(this),3000);
                }
            }
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
            // goNet: function () {
            //     if(this.isNative) {
            //         callN("link", {"url": "http://ce-air.com/?inet=1"});		//跳转开网页
            //     }else{
            //         window.location.href = "http://ce-air.com/?inet=1";
            //     }
            // },
            bannerSwiper: function () {
                this.destroySwiper();
                //头部轮播
                this._mySwiper = new Swiper(this.$el.querySelector('#swiper1'), {
                      direction: 'horizontal',
                      loop: true,
                      autoplay : 5000,
                      pagination: '.swiper-pagination',
                      autoplayDisableOnInteraction : false
                });
            },
            gameSwiper: function(){
                //游戏轮播
                this._mySwiper3 = new Swiper(this.$el.querySelector('#swiper3'), {
                    slidesPerView: 3,
                    spaceBetween: 10
                });
            },
            travelSwiper: function(){
                //旅行轮播
                this._mySwiper2 = new Swiper(this.$el.querySelector('#swiper2'), {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                    //freeMode: true,
                    centeredSlides: true
                });
            },
            destroySwiper: function () {
                //头部轮播
                this._mySwiper && (this._initialSlide = this._mySwiper.activeIndex);
                this._mySwiper && this._mySwiper.destroy();
                this._mySwiper = null;

                //旅行轮播
                this._mySwiper2 && (this._initialSlide = this._mySwiper2.activeIndex);
                this._mySwiper2 && this._mySwiper2.destroy();
                this._mySwiper2 = null;

                //游戏轮播
                this._mySwiper3 && (this._initialSlide = this._mySwiper3.activeIndex);
                this._mySwiper3 && this._mySwiper3.destroy();
                this._mySwiper3 = null;
            },

            //获取首页接口数据
            getHomeData:function (token){

                var _this = this;
                _this.isWaiting = true;

                var homeUrl = _this.dataHost + `/v1/home/index?` + querystring.stringify({
                      param: JSON.stringify({
                          "version":NATIVEPARAM.version,
                          "platform":4,
                          "environment":'plan'
                      })
                  });

                _this.$http.get(homeUrl, {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        "token": token
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

                //头部轮播banner
                _this.banner = data.focus;    //首页轮播数据

                if(_this.banner.length > 1){
                    _this.$nextTick(()=>{
                        _this.bannerSwiper();  //数据加载成功执行轮播
                });
                }

                //游戏
                _this.game = data.game.map(item=>{item.image=_this.dxjApi + item.image;return item});
                if(_this.game.length > 1){
                    _this.$nextTick(()=>{
                        _this.gameSwiper();  //数据加载成功执行轮播
                });
                }

                //精品图书
                _this.book = data.book || [];

                //精选汽车
                _this.car = data.car || [];

                //精致旅行
                _this.travel = data.travel;
                if(_this.travel.length > 1){
                    _this.$nextTick(()=>{
                        _this.travelSwiper();  //数据加载成功执行轮播
                });
                }
            },
            getVideoData:function () {

                var _this = this;
                _this.isReady = true;
				
				        console.log("视频2.0版本改成流播放正则");

                var videoPath = _this.apiHost + _this.dxjApi + '/vedio/page'+ (_this.curpage+1) +'.json';
                // console.log(videoPath);

                //发送一个 get 请求
                axios.get(videoPath)
                  .then( (result) => {
                    _this.isReady = false;
                    _this.isError = false;

                    //东航飞机获取的数据对象为字符串,需要转换为JOSN对象
                    console.log(result);
                    if(/^www\.ce-air\.com/.test(window.location.host) && result.data.data==undefined){
                        console.log("东航正式飞机环境");
                        result = JSON.parse(result);
                    }
                    if(/^10\.10\.55\.60:8080/.test(window.location.host) && result.data.data==undefined){
                        result.data = JSON.parse(result.data);
                    }

                    var curVideo = result.data.data.list,
                      curNext = result.data.data.next;

                    _this.curpage++;
                    // console.log(curVideo);
                    _this.video = _this.video.concat(curVideo);

                    if(curNext == 0){
                        window.removeEventListener('scroll',_this.addMore,false);
                        _this.isReady = true;
                        _this.isLoad = false;
                    }

                }).catch( (err) => {
                        console.log(err);
                    window.removeEventListener('scroll',_this.addMore,false);
                    _this.isReady = false;
                });
            },
            addMore(){
              var H = document.documentElement.scrollHeight || document.body.scrollHeight;
              var h = window.innerHeight;
              var t = document.documentElement.scrollTop || document.body.scrollTop;
              if (H - (h + t) < 15 && !this.isReady){
                  this.getVideoData();
              }
            },
            goFree: function () {
                if(this.isNative){
                    callN("link", {"url": "http://dutyfree-qingdao.extra-aile.com/"});		//跳转开网页
                }else{
                    window.location.href = "/app/dxj/dist/#/free";
                }
            },
            playGame:function(url){
                window.location.href = "play-game.html?path=" + url;
            },
            playVideo:function (data) {

                var _this = this;
                console.log(_this.dxjApi);

                data = _this.apiHost + _this.dxjApi + data;
                if(_this.isNative){
                    callN("playVideo", {"url": data});      //跳转开网页
                }else{
                    window.location.href = data;
                }
            },
            playVideoPage:function (title,image,video) {
                var _this = this;
                title = encodeURIComponent(title);

                video = _this.apiHost + _this.dxjApi + video;

                var reg = RegExp(/^\/s\//);
                if(reg.test(_this.dxjApi)){
                    window.location.href = video;
                }else{
                    window.location.href = "play-video.html?title=" + title + "&image=" + image + "&video=" + video;
                }
                 
            },
            //页面跳转
            goSearch:function () {
                window.location.href = "search.html";
            }
        },
        components:{
            loading,
            popLayer,
            //luckDraw
        }
    });

});
