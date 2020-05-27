// JavaScript Document
var isApp = /(iOS|Android)\/dongxingji\s+(\d\.?)+/i.test(window.navigator.userAgent);
	var isWarn = true; // 是否开启测试警告
	var u = window.navigator.userAgent;
	var isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(u);
	var isAndroid = /(Android|Linux)/i.test(u);

var TESTURL = 'http://42.159.29.181:8083'; // 测试地址 host
var TESTUSERID = '819a3f3c66fd4349a184e06f90a7e153'; // 测试userID
var TESTTOKEN = '78f4b0b701964ba883c52e4b30bcd6fe'; // 测试token
var VERSION = "1.0.0";
var PLATFORM = isAndroid?'Android':'ios'; // 测试型号
	
if (!isApp) {
	window.App = {
		getNativeParam(flag){
			switch(flag){
				case "getBase":
					isWarn && console.warn('获取用户基本信息');
					return {
						"host": TESTURL,
						"userID": TESTUSERID,
						"token": TESTTOKEN,
						"bind_user": "",
						"version":VERSION,
						"platform": PLATFORM
					}
				default:
					isWarn && console.warn('没有找到对应flag,请确保'+ flag +'存在并正确');
					break;
			}
		},
		callNative(flag,param){
			switch(flag){
                case "shareInfo":
                    isWarn && console.warn('获取native分享事件，参数为:', param);
                    break;
                case "copyWechat":
                    isWarn && console.warn('长按复制客服微信, 参数为:',param);
                    break;
                case "copyQQ":
                    isWarn && console.warn('长按复制客服QQ, 参数为:',param);
                    break;
                case "dot":
                case 99:
                    isWarn && console.warn('打点,参数为:',param);
                    break;
                case "close":
                    console.log('关闭当前页面,参数为',param);
                    break;
                case "link":
                    isWarn && console.warn('开网页面,参数为:',param);
                    break;
                case "playVideo":
                    isWarn && console.warn('视频播放,参数为:',param);
                    break;
                case "login":
                    isWarn && console.warn('跳转到登录页面, 参数为:', param);
                    break;
                case "other_login":
                    isWarn && console.warn('多点登陆跳到登录页面, 参数为:', param);
                    break;
                case "shareGrade":
                    isWarn && console.warn('获取native点赞事件，参数为:', param);
                    break;
                case "shareTopic":
                    isWarn && console.warn('获取native分享事件，参数为:', param);
                    break;
                default:
                    isWarn && console.warn('没有找到对应flag,请确保'+ flag +'存在并正确');
                    break;
            }
		},
        getGradeInfo(){
            isWarn && console.warn('获取满意度调查数据');
            return {
                "TRAIN_REQUEST_BASE_URL": TESTURL,
                "userID": TESTUSERID,
                "token": TESTTOKEN,
                "platform": PLATFORM
            };
        }
	}
}else{
	//alert(window.navigator.userAgent);

}

function useClientFunction(target,source){
    if (isIos || !isApp) {
        return window.App[target](source);
    }else{
        if (source === undefined) {
            var s = window.App[target]();
            try{
                return JSON.parse(s);
            }catch(e){
                return s;
            }
        }else{
            if (typeof source === 'object') {
                return window.App[target](JSON.stringify(source));
            }else{
                return window.App[target](source);
            }

        }
    }
}

function getN(flag){
	if (isIos || !isApp) {
		return window.App.getNativeParam(flag);
	}else{
		var a = window.App.getNativeParam(flag);
		return a?JSON.parse(a):'';
	}
}
function callN(flag,param){
	param = param?param:{};
	param.callbackId = flag;
	if(isIos || !isApp){
		return window.App.callNative(flag,param);
	}else{
		return window.App.callNative(flag,JSON.stringify(param));
	}
}
