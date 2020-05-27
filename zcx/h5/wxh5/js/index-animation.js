var index_animation = function(){
    var banner = $('#banner');
    //var need_seller = $('#need_seller');//寻找写手
    var banner_img_a = $('#banner_img_a');
    function init(){
        //创建banner 背景
        var img = document.createElement("img");
        img.setAttribute("src", "./img/banner-b1g.jpg");
        img.onload = function(){
            set_banner_size();//设置banner 长宽高
        };
        //创建banner 背景end
        banner_img_a.append(img);
        set_banner_size();
    }
    function set_banner_size(){
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;
        var window_wh = window_width/window_height;
        var img_a = banner_img_a.find('img');
        var benner_wh = img_a.width()/img_a.height();
        //banner全屏
        banner.width(window_width);
        banner.height(window_height);
        if(benner_wh < window_wh){
            img_a.get(0).style.cssText = 'display:block;width:'+window_width+'px;';
        }
        if(benner_wh > window_wh){
            img_a.get(0).style.cssText = 'display:block;height:'+window_height+'px;';
        }
    }
    //need_seller.on('click',function(){
    //    $('.txt_1t').find('img').eq(1).addClass('txt_animation_top');
    //    setTimeout(function(){
    //        $('.txt_2t').addClass('txt_animation_top');
    //    },100);
    //    setTimeout(function(){
    //        $('.txt_3t').addClass('txt_animation_top');
    //    },200);
    //
    //    //登入框登场
    //});
    $(window).on('resize',function(){set_banner_size();});//窗口改变 重新计算 banner 背景图
    init();
};