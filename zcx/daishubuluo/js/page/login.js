$(function(){

    //弹层提示
    var stockOverlay = {
        stockFn:function(text,off){
            var $stockOverlay = $("#stock-overlay");
            if(!$stockOverlay.length){
                var overlayHtml = "";
                overlayHtml += '<div class="select-overlay" id="stock-overlay">'
                    +' <div class="show_window_con">'
                    +' <p></p>'
                    +' </div>'
                    +' </div>';
                $("body").append(overlayHtml);
            }
            $("#stock-overlay").addClass("active");
            $("#stock-overlay").find("p").html(text);
            if(!!off){
                if(stockOverlay.overlayTime){ clearTimeout(stockOverlay.overlayTime);}
                stockOverlay.overlayTime = setTimeout(function(){
                    $("#stock-overlay").removeClass("active");
                },2000);
            }
        }
    }

    //倒计时
    function setTimeInterval(t){
        var timeR;
        var $this = $(t);
        if(!$this.hasClass("disabled")){
            var time = 60;
            $this.addClass("disabled").text(time);
            timeR = setInterval(function(){
                if(time == 1){
                    clearInterval(timeR);
                    $this.removeClass("disabled").text("重新获取");
                    return false;
                }
                $this.text(--time);
            },1000);
        }
    }

    var $showPsw = $("#show-psw");
    var $hidePsw = $("#hide-psw");
    $(".login-psw").on("click",".psw-btn",function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on");
            $hidePsw.val($showPsw.val());
            $showPsw.hide().siblings().show();
        }else{
            $(this).addClass("on");
            $showPsw.val($hidePsw.val());
            $showPsw.show().siblings().hide();
        }
    });

    //选中自动登录
    $(".auto-login-radio").click(function(){
        $(this).hasClass("on") ? $(this).removeClass("on") : $(this).addClass("on");
    });

    var mobileRex = /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
    var passwordRex = /^.{5,25}$/;
    var codeRex = /^\d{4,10}$/;
    var smsCodeRex = /^\d{6}$/;

    /*登录*/
    $(".login-body").on("click","#submit-btn",function(){
        var m = $("#mobile");
        var p = $("#hide-psw");
        var c = $("#codeImg");
        if($.trim(m.val()) == ""){
            stockOverlay.stockFn("请输入手机号码",true);
            return;
        }else if(!mobileRex.test($.trim(m.val()))){
            stockOverlay.stockFn("手机号码格式错误",true);
            return;
        }
        if($.trim(p.val()) == ""){
            stockOverlay.stockFn("请输入登录密码",true);
            return;
        }else if(!passwordRex.test($.trim(p.val()))){
            stockOverlay.stockFn("验证码格式错误",true);
            return;
        }
        if($.trim(c.val()) == ""){
            stockOverlay.stockFn("请输入图形码",true);
            return;
        }else if(!codeRex.test($.trim(c.val()))){
            stockOverlay.stockFn("图形码格式错误",true);
            return;
        }
        window.location.href = "";
    });

    /*登录手机验证*/
    $(".mobileVerifiy-body").on("click",".sms-code-btn",function(){
        setTimeInterval(this);
    });
    $(".mobileVerifiy-body").on("click","#submit-btn",function(){
        var s = $("#smsCode");
        if($.trim(s.val()) == ""){
            stockOverlay.stockFn("请输入验证码",true);
            return;
        }else if(!smsCodeRex.test($.trim(s.val()))){
            stockOverlay.stockFn("验证码格式不对",true);
            return;
        }
        window.location.href = "";
    });

    /*忘记密码*/
    $(".resetPsw-body").on("click","#submit-btn",function(){
        var m = $("#mobile");
        var c = $("#codeImg");
        if($.trim(m.val()) == ""){
            stockOverlay.stockFn("请输入手机号码",true);
            return;
        }else if(!mobileRex.test($.trim(m.val()))){
            stockOverlay.stockFn("手机号码格式错误",true);
            return;
        }
        if($.trim(c.val()) == ""){
            stockOverlay.stockFn("请输入图形码",true);
            return;
        }else if(!codeRex.test($.trim(c.val()))){
            stockOverlay.stockFn("图形码格式错误",true);
            return;
        }
        window.location.href = "sms_verifiy.html";
    });

    /*获取验证码*/
    $(".smsVerifiy-body").on("click",".sms-code-btn",function(){
        setTimeInterval(this);
    });
    $(".smsVerifiy-body").on("click","#submit-btn",function(){
        var s = $("#smsCode");
        if($.trim(s.val()) == ""){
            stockOverlay.stockFn("请输入验证码",true);
            return;
        }else if(!smsCodeRex.test($.trim(s.val()))){
            stockOverlay.stockFn("验证码格式不对",true);
            return;
        }
        window.location.href = "set_psw.html";
    });

    /*重置密码*/
    $(".setPsw-body").on("click","#submit-btn",function(){
        var p1 = $("#setPsw1");
        var p2 = $("#setPsw2");
        if($.trim(p1.val()) == "" || $.trim(p2.val()) == ""){
            stockOverlay.stockFn("请输入登录密码",true);
            return;
        }else if(p1.val() != p2.val()){
            stockOverlay.stockFn("两次密码不一致",true);
            return;
        }else if(!passwordRex.test($.trim(p1.val()))){
            stockOverlay.stockFn("密码不符合规则",true);
            return;
        }
        window.location.href = "";
    });

    /*手机注册验证*/
    $(".register-body").on("click","#submit-btn",function(){
        var m = $("#mobile");
        var c = $("#codeImg");
        var agreeProtocol = $("#agree-protocol");
        if($.trim(m.val()) == ""){
            stockOverlay.stockFn("请输入手机号码",true);
            return;
        }else if(!mobileRex.test($.trim(m.val()))){
            stockOverlay.stockFn("手机号码格式错误",true);
            return;
        }
        if($.trim(c.val()) == ""){
            stockOverlay.stockFn("请输入图形码",true);
            return;
        }else if(!codeRex.test($.trim(c.val()))){
            stockOverlay.stockFn("图形码格式错误",true);
            return;
        }
        if(!agreeProtocol.hasClass("on")){
            stockOverlay.stockFn("请先阅读袋鼠部落用户协议",true);
            return;
        }
        window.location.href = "sms_verifiy.html";
    });

})