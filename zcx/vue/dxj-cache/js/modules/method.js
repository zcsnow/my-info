import dataFormat from '../modules/dataFormat.js';

var u = window.navigator.userAgent;
const isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(u);
const isAndroid = /(Android|Linux)/i.test(u);
const isMobile = 'ontouchstart' in window;
const isWeixin = /MicroMessenger/i.test(navigator.userAgent);
const orientation = 'onorientationchange' in window ? 'orientationchange' : 'resize';  //横竖屏
const clone = (origin) => JSON.parse(JSON.stringify(origin));
const toDou = n => n<10?'0'+n:n;


const format2Time = (time) => {
  var y = time.substr(0,4),
    M = time.substr(5,2)-1,
    d = time.substr(8,2),
    h = time.substr(11,2) || 0,
    m = time.substr(14,2) || 0,
    s = time.substr(17,2) || 0;
  var nowDate = new Date();
  nowDate.setFullYear(y,M,d);
  nowDate.setHours(h,m,s);
  return nowDate.getTime();
};

const time2YearMonthDateHoursMinutesSeconds = (time,clean) => {
  return clean?dataFormat(time,"YYYY-MM-DD 00:00:00"):dataFormat(time,"YYYY-MM-DD hh:mm:ss");
};
const time2YearMonthDate = (time) => {
  return dataFormat(time,"YYYY-MM-DD");
};
const time2yearmonthdate = (time) => {
  return dataFormat(time,"YYYYMMDD");
};
const time2MonthDateYear = (time) => {
  return dataFormat(time,"MM/DD/YYYY");
};
const time2MonthAndDate = (time) => {
  return dataFormat(time,"M月d日 星期W");
};

const time2HoursAndMinutes = (str) => {
  // 12:12 --> 12小时12分
  // 3:00:00 --> 3天0小时0分
  var arr = str.split(':');
  if (arr.length === 3) {
    return arr[0] + '天' + arr[1]/1 + '小时' + arr[2]/1 + '分';
  }else if(arr.length === 2){
    return arr[0]/1 === 0 ? arr[1] + '分' : arr[0] + '小时' + arr[1]/1 + '分';
  }else if(arr.length === 1){
    return arr[0] + '分';
  }
};

const timer2dayhoursMinutes = (time) => {
  if (time !== 0 && !time) {return '';}
  var t = time/60/24|0;
  var h = ((time/60)|0)-t*24;
  var m = time - 60*h - 60*24*t;
  return t===0?(h===0?m+'分':h+'小时'+m+'分'):t+'天'+(h===0?'':h+'小时')+(m===0?'':m+'分');
};

const setTime = (callback) => {
  var a = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback){
    return window.setTimeout(function (){
      callback();
    }, 16.7);
  });
  return a(callback);
};
const clearTime = (id) => {
  var a = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (id){
      window.clearTimeout(id);
    };
  return a(id);
};

var scrollMoveTimer = null;
const scrollMove = (options) => {
  options = options || {};
  options.time = options.time || 700;
  options.type = options.type || "ease-out";
  options.y = options.y || 0;
  var start = document.documentElement.scrollTop || document.body.scrollTop;

  var dis = options.y - start;
  var n = 0;
  var count = Math.floor(options.time / 16.7);
  if (!dis) {return false;}

  clearTime(scrollMoveTimer);
  scrollMoveTimer = setTime(base);

  function base(){
    n++;
    var v,cur;
    switch (options.type) {
      case "linear":
        v = n / count;
        cur = start + dis * v;
        break;
      case "ease-in":
        v = n / count;
        cur = start + dis * v * v * v;
        break;
      case "ease-out":
        v = 1 - n / count;
        cur = start + dis * (1 - v * v * v);
        break;
    }
    document.documentElement.scrollTop = document.body.scrollTop = cur;

    if (n === count) {
      clearTime(scrollMoveTimer);
      options.end && options.end();
    }else{
      scrollMoveTimer = setTime(base);
    }
  }
};


export {
    isIos,
    isAndroid,
    isMobile,
    isWeixin,
    orientation,
    clone,
    toDou,
    setTime,
    clearTime,
    scrollMove,
    format2Time,
    time2YearMonthDateHoursMinutesSeconds,
    time2YearMonthDate,
    time2yearmonthdate,
    time2MonthDateYear,
    time2HoursAndMinutes,
    time2MonthAndDate,
    timer2dayhoursMinutes
};