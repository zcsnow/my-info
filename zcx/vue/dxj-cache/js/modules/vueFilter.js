import dataFormat from '../modules/dataFormat.js';
export default function filter(Vue){
    Vue.filter('dataformat',function (str){
        return str?dataFormat(str,'M月d日 星期W'):'';
    });
    Vue.filter('format',function (value){
        return value?dataFormat(value,"M月d日"):'';
    });
    Vue.filter('time2HoursAndMinutes',function (str){
        if (str !== 0 && !str) {return '未知';}
        // 12:12 --> 12小时12分
        // 3:00:00 --> 3天0小时0分
        var arr = str.split(':');
        if (arr.length === 3) {
            return arr[0] + '天' + arr[1]/1 + '小时' + arr[2]/1 + '分';
        }else if(arr.length === 2){
            return arr[0]/1 === 0 ? arr[1]/1 + '分' : arr[0]/1 + '小时' + arr[1]/1 + '分';
        }else if(arr.length === 1){
            return arr[0] + '分';
        }
    });
    Vue.filter('time2YearMonthDateAndWeek',function (time){
        return time?dataFormat(time,"YYYY/MM/DD 星期W"):'';
    });
    Vue.filter('time2YearMonthDate',function (time){
        return time?dataFormat(time,"YYYY-MM-DD"):'';
    });
    Vue.filter('timer2hoursMinutes',function (time){
        if (time !== 0 && !time) {return '';}
        var h = time/60|0;
        var m = time - 60*h;
        return h===0?m+'分':h+'小时'+m+'分';
    });
    Vue.filter('timer2dayhoursMinutes',function (time){
        if (time !== 0 && !time) {return '';}
        var t = time/60/24|0;
        var h = ((time/60)|0)-t*24;
        var m = time - 60*h - 60*24*t;
        return t===0?(h===0?m+'分':h+'小时'+m+'分'):t+'天'+(h===0?'':h+'小时')+(m===0?'':m+'分');
    });
    Vue.filter('clearComma',function (str){
        return str.replace(',','');
    });
    Vue.filter('dianping',function (str){
        return str?str.replace(/^https:\/\/m\.51ping\.com\//,"https://m.dianping.com/"):'javascript:;';
    });
}