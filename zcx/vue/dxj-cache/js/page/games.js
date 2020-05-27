require('css/games.scss');
require('../../css/swiper.min.scss');
const querystring = require('querystring');

const games = require('../data/games.json');

import Vue from 'vue';
import Resource from 'vue-resource';
import axios from 'axios';
import {getN,isNative,dataHost,apiHost,utcTime,getHash,eventLog,dataVersion} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';

import Swiper from 'swiper';
import FastClick from 'fastclick';

Vue.use(Resource, axios);

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


//解决vue-resource请求报错,data默认不是以form data的形式，而是request payload的问题
Vue.http.options.emulateJSON = true;

window.addEventListener('DOMContentLoaded',function (){

    var NATIVEPARAM = getN('getBase');		//获取native所传各个值方法

    var vm = new Vue({
        el: '#main',
        data: {
            isWaiting: false,   //显示加载中
            isShow: false,      //显示toast
            show_msg: "",
            banner: [],         //头部轮播数据
            jsonArray: [],      //全部数据
            hotArray: [],       //热门推荐
            qipaiArray: [],     //棋牌推荐
            xiuxianArray: [],   //休闲推荐
            jingjiArray: [],    //竞技推荐
            yizhiArray: [],     //益智推荐
            dxjResourceDir:"",//获取机上静态资源目录
            apiHost: apiHost,
            dataHost: dataHost,
            dataToken: "",
            isAdCacheDataLoad:false, //cache或接口资源是否优先加载成功
            baseUrlAd: '',
            dxjApi: "",         // 飞机环境访问资源路径
            pageArray: [],      // 当前Tab数据
            gameType: 3,        // 游戏类型
            showNav: NATIVEPARAM.showNav,
            eventLog:eventLog //事件埋点发送方法
        },
        mounted(){
            var _this = this;

            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                _this.dataToken = res.token;
                //_this.dxjResourceDir = res.hash;//获取机上静态资源目录
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
                var gameLen = games.data.length;
                console.log(games)
                
                
                _this.getBannerJsonData();
                _this.cacheBanner(utcTime);

                //_this.dxjApi = _this.apiHost + res.hash;
                //热门推荐
                var hotGameLen = 6;
                _this.hotArray = this.gameRandom(_this.hotArray,hotGameLen,gameLen,_this.dxjApi)

                // _this.hotArray = [
                //     {"id":307,"game_name":"滚滚足球","game_link":"307\/index.html","pictures":_this.dxjApi + "\/h5apps\/307\/img\/img.jpg"},
                //     {"id":337,"game_name":"水下逃生","game_link":"337\/index.html","pictures":_this.dxjApi + "\/h5apps\/337\/img\/img.jpg"},
                //     {"id":292,"game_name":"快乐搭积木","game_link":"292\/index.html","pictures":_this.dxjApi + "\/h5apps\/292\/img\/img.jpg"},
                //     {"id":333,"game_name":"布丁乐园","game_link":"333\/index.html","pictures":_this.dxjApi + "\/h5apps\/333\/img\/img.jpg"},
                //     {"id":279,"game_name":"忍者传说","game_link":"279\/index.html","pictures":_this.dxjApi + "\/h5apps\/279\/img\/img.jpg"},
                //     {"id":276,"game_name":"动态拼图","game_link":"276\/index.html","pictures":_this.dxjApi + "\/h5apps\/276\/img\/img.jpg"}
                // ];



                //棋牌推荐
                _this.qipaiArray = [
                    {"id":318,"game_name":"飞行棋大战","description":"以模拟飞机飞行为主题，先到达者为胜","game_link":"318\/index.html","pictures":_this.dxjApi + "\/h5apps\/318\/img\/img.jpg"},
                    {"id":293,"game_name":"数独","description":"风靡全球的智力游戏","game_link":"293\/index.html","pictures":_this.dxjApi + "\/h5apps\/293\/img\/img.jpg"},
                    {"id":280,"game_name":"中国象棋","description":"象棋爱好者的最佳选择","game_link":"280\/index.html","pictures":_this.dxjApi + "\/h5apps\/280\/img\/img.jpg"},
                    {"id":324,"game_name":"超级连线","description":"游戏易上手但是通关很难哦","game_link":"324\/index.html","pictures":_this.dxjApi + "\/h5apps\/324\/img\/img.jpg"}
                ];

                //休闲推荐
                _this.xiuxianArray = [
                    // {"id":291,"game_name":"松鼠酷跑","description":"趣味跨越障碍动作类游戏","game_link":"291\/index.html","pictures":_this.dxjApi + "\/h5apps\/291\/img\/img.jpg"},
                    {"id":331,"game_name":"找你妹","description":"益智还带一点恶搞哦","game_link":"331\/index.html","pictures":_this.dxjApi + "\/h5apps\/331\/img\/img.jpg"},
                    {"id":288,"game_name":"农场果冻解谜","description":"一款充满乐趣的休闲游戏","game_link":"288\/index.html","pictures":_this.dxjApi + "\/h5apps\/288\/img\/img.jpg"},
                    {"id":283,"game_name":"停车入位","description":"停车其实没有那么难","game_link":"283\/index.html","pictures":_this.dxjApi + "\/h5apps\/283\/img\/img.jpg"},
                    {"id":322,"game_name":"吃货","description":"吃货的游戏描述","game_link":"322\/index.html","pictures":_this.dxjApi + "\/h5apps\/322\/img\/img.jpg"}
                ];

                //竞技推荐
                _this.jingjiArray = [
                    {"id":307,"game_name":"滚滚足球","description":"通过移动障碍物把球送进球门","game_link":"307\/index.html","pictures":_this.dxjApi + "\/h5apps\/307\/img\/img.jpg"},
                    {"id":277,"game_name":"奔跑吧熊猫","description":"看萌萌哒的国宝大熊猫怎样穿过层层凶险","game_link":"277\/index.html","pictures":_this.dxjApi + "\/h5apps\/277\/img\/img.jpg"},
                    {"id":311,"game_name":"疯狂的竞技赛车","description":"速度与激情,是男人的浪漫","game_link":"311\/index.html","pictures":_this.dxjApi + "\/h5apps\/311\/img\/img.jpg"},
                    {"id":332,"game_name":"3D拳王","description":"在擂台上击败每一个对手","game_link":"332\/index.html","pictures":_this.dxjApi + "\/h5apps\/332\/img\/img.jpg"}
                ];

                //益智推荐
                _this.yizhiArray = [
                    {"id":304,"game_name":"黑白贪吃蛇","description":"经典复古的贪吃蛇小游戏","game_link":"304\/index.html","pictures":_this.dxjApi + "\/h5apps\/304\/img\/img.jpg"},
                    {"id":319,"game_name":"电光波波球","description":"以最快的速度，消除所有小球吧","game_link":"319\/index.html","pictures":_this.dxjApi + "\/h5apps\/319\/img\/img.jpg"},
                    {"id":276,"game_name":"动态拼图","description":"从动态的效果中找到线索，成功拼出拼图","game_link":"276\/index.html","pictures":_this.dxjApi + "\/h5apps\/276\/img\/img.jpg"},
                    {"id":275,"game_name":"超级记忆","description":"超级记忆将挑战你的大脑，你能完成每一关吗？","game_link":"275\/index.html","pictures":_this.dxjApi + "\/h5apps\/275\/img\/img.jpg"}
                ];


            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });

        },
        methods: {
          getBannerJsonData: function () {
            //获取机上静态资源数据
            var _this = this;
            let jsonSrc = _this.apiHost + _this.dxjResourceDir + '/cache/' + dataVersion + '/focus.json';
            axios.get(jsonSrc).then((result) => {
                if(_this.isAdCacheDataLoad){
                    return false
                }
              var data = result.data.data.game;
              _this.baseUrlAd = _this.apiHost + _this.dxjResourceDir;
              _this.dxjApi = _this.apiHost + _this.dxjResourceDir;

              if(data==undefined){
                console.log("数据类型转换");
                data = JSON.parse(data);
              }
              // 渲染数据
              _this.banner = data;
              if(data.length>1){
                _this.$nextTick(() => {
                    _this.initSwiper();
                });
              }
                
            }).catch((err) => {
                console.log(err);
            });
          },
            cacheBanner(planeData) {
                var _this = this;

                var focusPath = _this.apiHost + '/app/dxj/cache/' + dataVersion + '/focus' + planeData;
                //var focusPath = "../js/data/page/focus.json";       //测试本地数据
                //请求本地缓存数据
                axios.get(focusPath).then((result) => {
                    _this.baseUrlAd = _this.apiHost + '/app/dxj';
                    _this.isAdCacheDataLoad = true;
                    var data = result.data.data.game;
                    console.log(data);
                    if(data==undefined){
                        console.log("数据类型转换");
                        data = JSON.parse(data);
                    }

                    //渲染数据
                    _this.banner = data;
                    if(data.length>1){
                        _this.$nextTick(() => {
                            _this.initSwiper();
                        });
                    }

                }).catch((err) => {
                    console.log(err);
                    // _this.showLayer("showMsg", "获取机上cache失败，从数据接口获取");
                    //获取接口数据
                    _this.$nextTick(()=>{
                        _this.getBanner(_this.dataToken);
                    });
                });

            },
            getBanner(token) {
                var _this = this;
                _this.isWaiting = true;
                var url = _this.dataHost + `/v1/focus/index?` + querystring.stringify({
                      param: JSON.stringify({
                          "version":NATIVEPARAM.version,
                          "platform":4,
                          "environment":'plan',
                          "type": "game"
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
                        // _this.showLayer("showMsg", "请求超时，获取包内容");
                    }
                }).then((message) => {
                    var starts = message.body.status,
                        msg = message.body.msg;
                    if (starts == 200) {
                        _this.baseUrlAd = '/app/dxj';
                        _this.isAdCacheDataLoad = true;
                        var data = message.body.data.list;
                        this.banner = data;
                        if(data.length>1){
                            this.$nextTick(() => {
                                this.initSwiper();
                            });
                        }
                    }
                    this.isWaiting = false;
                },()=>{
                    this.isWaiting = false;
                });
            },
            initSwiper: function() {
                var _this = this;
                this.destroySwiper();
                this._mySwiper = new Swiper(this.$el.querySelector('#swiper1'), {
                    direction: 'horizontal',
                    loop: true,
                    autoplay: 5000,
                    pagination: '.swiper-pagination',
                    autoplayDisableOnInteraction: false,
                    observer:true,
                    onClick: function(swiper){
                        // swiper自动轮播 循环后第一个slide不能执行click方法 bug,此处解决方式是用swiper的回调click方法处理
                        // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
                        // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
                        var index = swiper.clickedSlide.attributes['data-swiper-slide-index'].nodeValue; //轮播图所处索引值
                        var title = swiper.clickedSlide.attributes['data-title'].nodeValue; //轮播图图片标题
                        var url = swiper.clickedSlide.attributes['data-url'].nodeValue;     //轮播图跳转链接
                        vm.bannerAutoSwiperClick(index,title,url)  //发送埋点数据方法
                    }
                });
            },
            destroySwiper: function() {
                this._mySwiper && (this._initialSlide = this._mySwiper.activeIndex);
                this._mySwiper && this._mySwiper.destroy();
                this._mySwiper = null;
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
            playGame:function(url,id,name,type){
                var type = encodeURIComponent(type);
                var name = encodeURIComponent(name);
                window.location.href = "play-game.html?path=" + url+'&contentId='+ id +'&contentType='+ type +'&contentTitle='+ name;
            },
            //swiper自动轮播 发送埋点数据方法
            bannerAutoSwiperClick:function (index,title,url) {
                eventLog({eventId:'game_adbanner_'+ (parseInt(index)+1) +'_click',eventType:'1',eventIsAD:'1',contentType:'焦点图',contentTitle:title});
                if(url!=""){
                    window.location.href = url;
                }
           },
           gameRandom:function(arr,hotGameLen,gameLen,dxjApi){
                var _this = this;
                arr = [];
                let json={};
                while(arr.length<hotGameLen){
                    var k=Math.round(Math.random()*gameLen);
                    if(!json[k]){
                    json[k]=true;
                    games.data[k].pictures = dxjApi + '/h5apps/' +games.data[k].pictures;
                    arr.push(games.data[k])
                    }
                }
                return arr;
            }
        },
        components:{
            loading,
            popLayer,
            headerNav
        }

    });

},false);