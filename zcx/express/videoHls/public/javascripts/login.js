
var login_data = $('#login-data');
var login_username = $('#login-username');
var login_password = $('#login-password');
var login_submit = $('#login-submit');
var login_goon = $('#login-goon');
var login_tip = $('#login-tip');

if(login_data.val() !=""){
    isLogined(true);
}else{
    isLogined(false);
}

login_goon.on('click',function(){
    window.location.href='/index';
});
login_submit.on('click',function(e){
    e.preventDefault();
   //校验账号密码是否为空
    if(login_username.val().length>0 && login_password.val().length>0){
        var data = {
            username:login_username.val(),
            password:login_password.val()
        };
        
        $.ajax({
            url:'/login',
            type:'post',
            data:data,
            dataType:'json',
            success:function(data){
                if(data){
                    console.log(data)
                    //data = JSON.parse(data);
                    if(data.code == 0){
                        isLogined(true);
                    }
                }else{
                    isLogined(false);
                }
            },
            error:function(){
                console.log('error')
            }
        });
    }else{
        alert('账号或密码不能为空！');
    }
});

function isLogined(bool){
    if(bool){
        setClickable(login_username,false);
        setClickable(login_password,false);
        setClickable(login_submit,false);
        login_tip.html('登录状态：已登录！');
        setClickable(login_goon,true);
    }else{
        setClickable(login_username,true);
        setClickable(login_password,true);
        setClickable(login_submit,true);
        login_tip.html('登录状态：未登录！');
        setClickable(login_goon,false);
    }
}