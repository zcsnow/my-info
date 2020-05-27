//弹层提示
var $DS = {
    stockOverlay:function(text,off){
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
            if($DS.overlayTime){ clearTimeout($DS.overlayTime);}
            $DS.overlayTime = setTimeout(function(){
                $("#stock-overlay").removeClass("active");
            },2000);
        }
    },
    ajaxGetQuest:function(url,d,callback){  //ulr:host, d:data
        $.ajax({
            type: "get",
            contentType: "application/x-www-form-urlencoded",
            url : url + "?param=" + JSON.stringify(d),
            dataType: "jsonp",
            data:"",
            success: function (result) {
                if(callback && (typeof callback) == "function"){
                    callback(result);
                }
            },
            error: function () {
                $DS.stockOverlay("请求数据失败",true);
                _this.isClick = true;
            }
        });
    }
};

var fnObj = {
    "isClick": true,
    "textLen": 0,
    "viewObj" : {
        "text": ""
    }
}
var vm = new Vue({
    el: ".main",
    data: fnObj,
    watch:{
        "viewObj.text":function(n,o){
            this.textLen = n.length;
        }
    },
    methods:{
        editOperate:function(v){    //保存
            if(!this.isClick){ return false;}
            var _this = this;
            var obj={
                "id":v,
                "text" : _this.viewObj.text
            };

            _this.isClick = false;

            //判断是否为空
            if(_this.viewObj.text == ""){
                $DS.stockOverlay("话题内容不能为空",true);
                _this.isClick = true;
                return false;
            }

            //提交表单数据
            var url = "host/data.josn";
            var comment_text={
                "text" : _this.viewObj.ext
            };
            $DS.ajaxGetQuest(url, comment_text, function(){
                _this.clearData();
                _this.isClick = true;
                $DS.stockOverlay("评论提交成功",true);
            });
        },
        clearData:function(){
            var _this = this;
            _this.viewObj.text = "";
        }
    },
    ready:function(){
        //
    }
});