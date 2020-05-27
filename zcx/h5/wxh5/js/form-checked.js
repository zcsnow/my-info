
var DL_forms = function(obj){
    this.obj = obj;//绑定父元素
    this.input = obj.find('input');
    this.msg = obj.find('p');
    this.data_type = obj.find('input').attr('data-type');
    this.error = '';
    this.bin_event();
};
DL_forms.prototype = {
    //绑定获取焦点
    bin_event:function(){
        var that = this;
        //绑定获取焦点
        this.input.on('focus',function(){
            that.focus();
            that.console(that.input.attr('name'),'focus');
        });
        //绑定失去焦点
        this.input.on('blur',function(){
            that.blur();
            that.console(that.input.attr('name'),'blur');
        });
        //绑定每次输入
        this.input.on('input propertychange',function(){
            that.propertychange();
            that.console(that.input.attr('name'),'propertychange');
        });
    },
    focus:function(){
        //取消当前错误提示
        this.clear_error();
    },
    blur:function(){
        //空值
        if(this.input.val() == ''){
            this.error = '*必填项不能为空';
            this.set_error();
        }else{
            this.error = '';
            //手机
            if(this.data_type == 'phone'){
                //没有 满11位
                if(!checked_phone(this.input.val())){
                    this.error = '*手机号码格式错误';
                    this.set_error();
                }else{
                    this.error = '';
                }
            }
            //code
            if(this.data_type == 'code'){
                // 没有 满6位
                if(this.input.val().length < 6){
                    this.error = '*请输入6位验证码';
                    this.set_error();
                }else{
                    this.error = '';
                }
            }
        }
    },
    propertychange:function(){},
    set_error:function(){
        this.msg.html(this.error);
        this.msg.addClass('lr_block');
    },
    clear_error:function(){
        this.msg.removeClass('lr_block');
    },
    bin_submit:function(){
        this.blur();
        return this.error ?  false : true;
    },
    console:function(name,value){
        console.log('["'+name+'":'+value+']');
    }
};