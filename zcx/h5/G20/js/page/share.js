;$(function () {

    $("#media")[0].play();

    //内容提交
    $(".btn-submit").click(function (e) {
        e.preventDefault();
        if ($("#form").valid()) {
            $('.page2').hide();
            $('.page3').show(); 
            var userinfo =
            {
                username: $("#name").val(),
                phone: $("#phone").val(),
                infotype: 4//吉利中秋
            };
            var reslt = $.ajax({ url: "/CompanyProject/Geelysjyg/GeelyUserinfo.ashx", data: userinfo, type: "post", async: false });
            var jieguo = reslt.responseText;
            alert("提交成功！");
        }
    });


    $("#form").validate({
        //错误信息提示
        errorPlacement: function (error, element) {
            error.appendTo(element.siblings(".error_tip"));
        }
    });

    $('.js-share-btn').on('click', function () {
        $('.js-share-pop').show();
    });
    $('.js-share-pop').on('click', function () {
        $('.js-share-pop').hide();
    });

    $('.tip-pop').on('click', function () {
        $('.tip-pop').hide();
    });

    $('.js-like-btn').on('click', function () {
        var openid = $("#cfopenid").val();
        var htmlid = $("#cfhtmlid").val();
        var istrue = $.ajax({ url: "/CompanyProject/Geelyszhongqiu/Addzan.ashx?htmlid=" + htmlid + "&openid=" + openid, async: false })
        var numbers = istrue.responseText;
        if (numbers == "1") {
            var likeNum = parseInt($('.like-num').text());
            likeNum++;
            $('.like-num').text(likeNum);
            var openid = $("#cfopenid").val();
            var avatarSrc = "/Photo/" + openid + ".jpg";
            var avatarImg = "<span><img src='" + avatarSrc + "'></span>";
            $('.avatar-list').prepend(avatarImg);
        }
        else {
            alert("已点赞");
        }
    }); 
    $('.js-close-btn').on('click', function () {
        $('.form-page').hide();
    });



});
