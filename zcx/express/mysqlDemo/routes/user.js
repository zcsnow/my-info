var express = require('express');
var router = express.Router();

//import mysql from 'mysql';
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig.js');
var userSQL = require('../db/usersql.js');

//使用DBconfig.js 的配置信息创建一个mysql 连接池
var pool = mysql.createPool(dbConfig.mysql)
//响应一个JSON数据
var responseJSON = function(res, ret){
    if(typeof ret == 'undefined'){
        res.json({
            code: '-200',
            msg: '操作失败'
        })
    }else{
        res.json(ret)
    }
}

router.get('/addUser',function(req,res,next){
    
    //从连接池中获取连接
    pool.getConnection(function(err,connection){
        //获取前台页面传过来的参数
        var param = req.query || req.params;
        //建立链接 增加一个用户信息
        connection.query(userSQL.insert,[param.uid,param.name],function(err,result){
            if(result){
                result = {
                    code: '200',
                    msg: '成功'
                }
            }
            //以json形式把操作结果返回给前台页面
            responseJSON(res,result);

            //释放连接
            connection.release();
        })
    })
})

module.exports = router;