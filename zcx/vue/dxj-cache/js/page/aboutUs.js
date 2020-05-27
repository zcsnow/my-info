require('../../css/aboutUs.scss');

import Vue from 'vue';
import {getN,callN} from 'nativeA';
import headerNav from 'headerNav';

import FastClick from 'fastclick';

window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el:"#main",
        data:{
            version: NATIVEPARAM.version || "4.0.0",
            showNav: NATIVEPARAM.showNav
        },
        mounted(){
            // console.log(isNative);
        },
        methods:{
            copyWechat(){
                callN("copyWechat", {"wechat":"wangfanwi-fi"});        //长按复制客服微信
            },
            copyQQ(){
                callN("copyQQ", {"qq":"2141049291"});              //长按复制客服QQ
            }
        },
        components:{
            headerNav
        }
    });


    $.fn.longPress = function(fn) {
        var timeout = undefined;
        var $this = this;
        for(var i = 0;i<$this.length;i++){
            $this[i].addEventListener('touchstart', function(e) {
                timeout = setTimeout(fn, 800);
                e.preventDefault();
            }, false);
            $this[i].addEventListener('touchend', function(e) {
                clearTimeout(timeout);
                e.preventDefault();
            }, false);
        }
    }

    //长按复制客服微信
    $("#wechat").longPress(function () {
        vm.copyWechat();
    });
    //长按复制客服QQ
    $("#qq").longPress(function () {
        vm.copyQQ();
    });

});
