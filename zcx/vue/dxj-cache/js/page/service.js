require('../../css/service.scss');

import Vue from 'vue';
import {getN,callN,isNative} from 'nativeA';
import headerNav from 'headerNav';
import FastClick from 'fastclick';


window.addEventListener('DOMContentLoaded',function (){
    var NATIVEPARAM = getN('getBase');

    var vm = new Vue({
        el:"#main",
        data:{
            isNative: isNative,
            showNav: NATIVEPARAM.showNav
        },
        mounted(){
            //
        },
        methods:{
            //
        },
        components:{
            headerNav
        }
    });

});