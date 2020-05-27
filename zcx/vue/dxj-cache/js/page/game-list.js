require('css/games.scss');

const querystring = require('querystring');

//获取举报原因数据
var games = require('../data/games.json');
//console.log(blogList);

import Vue from 'vue';
import Resource from 'vue-resource';
import {getN,getHash,apiHost} from 'nativeA';
import loading from 'loading';
import popLayer from 'pop-layer';
import headerNav from 'headerNav';
import FastClick from 'fastclick';

Vue.use(Resource);


//解决vue-resource请求报错,data默认不是以form data的形式，而是request payload的问题
Vue.http.options.emulateJSON = true;

window.addEventListener('DOMContentLoaded',function (){

    var NATIVEPARAM = getN('getBase');		//获取native所传各个值方法

    new Vue({
        el: '#main',
        data: {
            isShow: false,      // 显示toast
            show_msg: "",
            dxjApi: "",         // 飞机环境访问资源路径
            apiHost: apiHost,
            jsonArray: [],      // 全部数据
            pageArray: [],      // 当前Tab数据
            gameType: 3,        // 游戏类型
            title: "游戏",       // 页面标题
            showNav: NATIVEPARAM.showNav
        },
        mounted(){
            var _this = this;
            
            
            _this.gameType =_this.getQueryString("type");

            switch(_this.gameType){
                case "1":
                    _this.title = "益智";
                    document.title = "益智";
                    break;
                case "3":
                    _this.title = "休闲";
                    document.title = "休闲";
                    break;
                case "4":
                    _this.title = "竞技";
                    document.title = "竞技";
                    break;
                default:
                    _this.title = "棋牌";
                    document.title = "棋牌";
                    break;
            }

            // 外部调用dataToken&dxjApi
            getHash().then(res => {
                //_this.dxjApi = res.hash;
                var planeType = res.planeType;
                if(planeType=="00"){
                    _this.dxjApi = res.hash+'/dxj';//获取最新更新机上静态资源目录
                }else if(planeType=="bc03"){
                    _this.dxjApi = res.hash+'/dxj/dxj';
                }else{
                    _this.dxjApi = res.hash;
                }
                //修改路径
                _this.jsonArray = games.data.map(item=>{item.pictures=_this.dxjApi+"/h5apps/"+item.pictures;return item});
                // console.log(_this.jsonArray);
                for(var i of _this.jsonArray){
                    if(i.game_type == _this.gameType){
                        _this.pageArray.push(i);
                    }
                }

            }).catch(e => {
                console.log('获取dxjApi失败，错误信息:', e);
            });

        },
        methods: {
            //获取URL参数方法
            getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
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
            playGame:function(url,id,name){
                var type = encodeURIComponent(this.title);
                var name = encodeURIComponent(name);
                window.location.href = "play-game.html?path=" + url+'&contentId='+ id +'&contentType='+ type +'&contentTitle='+ name;
            }

        },
        components:{
            loading,
            popLayer,
            headerNav
        }

    });

},false);