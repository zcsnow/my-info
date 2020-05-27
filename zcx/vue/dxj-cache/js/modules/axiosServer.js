// axios二次封装
import Vue from 'Vue';
import axios from 'axios';
import qs from 'qs';
//import {Alert, Confirm, Toast, Loading} from 'wc-messagebox';
//import loading from 'loading';


axios.defaults.timeout = 15000;
//axios.defaults.headers.common['Authorization'] = '11111';
// 拦截请求前的状态
axios.interceptors.request.use(function(config){ 
    //config.baseURL = '/api/'
    //config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
    //console.log('开始请求')
    //console.log(`请求地址: ${config.url}`)
    //console.log('request init') //此处添加loading效果
    //loadingStatus$.next(true)
    return config  //return之后会使接下来的代码都不执行
},function(err){
    //Do something with request error
    //console.log('请求失败')
    return Promise.reject(err);
});
// 拦截请求后的状态
axios.interceptors.response.use(function(response){ 
    //console.log('接收响应')
    //console.log(response)
    //loadingStatus$.next(false)
    return response;
},function(err){
    //Do something with response error
    //console.log('响应出错')
    return Promise.reject(err);
    //return Promise.resolve(err);
})





//axios封装
function axiosServer(apiUrl="", method="get", params={},token) {
    var httpDefaultOpts;
    if (token) {
        httpDefaultOpts = { //http默认配置  
            method:method,  
            url: apiUrl,  
            params:params,  //get方法传参时，参数放在params对象中
            data:qs.stringify(params),  //post方法传参时，参数放在data对象中
            headers: method=='get'?{  
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json", 
                "token": token
            }:{  
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json',
                "token": token 
            }  
        }
    }else{
        httpDefaultOpts = { //http默认配置  
            method:method,  
            url: apiUrl,  
            params:params,  //get方法传参时，参数放在params对象中
            data:qs.stringify(params),  //post方法传参时，参数放在data对象中
            headers: method=='get'?{  
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json", 
            }:{  
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json',
            }  
        }
    }
      
    if(method=='get'){  
        delete httpDefaultOpts.data  
    }else{  
        //console.log(params)
        delete httpDefaultOpts.params  
    }  
    return new Promise((resolve, reject) => {
        axios(httpDefaultOpts)
        .then(res=>{
            resolve(res.data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

//调用方式说明
//在调用函数后返回的promise对象，必须使用then方法，才可以获取到promise中的值
/*
    //直接返回的promise对象是无法获取其中的值的
    console.log(axiosServer('/api','get',{param:{load:'noload'}},'tokenVal'))

    // 调用promise对象的then方法就可以获取其中的值
    param = {param:{
        "version": NATIVEPARAM.version,
        "environment":'plan',
    }}
    axiosServer(url,method,params,token).then((res) => {
    if (res.code === ERR_OK) {
        console.log(res.data)
    }
    },(err) => {
    console.log(err)
    })
*/

export default axiosServer