$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        async: false,
        jsonpCallback: "lenovoopen", url: "http://services.hyh6.com/Customer.aspx?op=lenovoopenapi",
        success: function (data) {
            $("#gywm").html(data.result.gywm);
            var htmlcon = data.result.xczb.split('|');
            for (var i = 0; i < htmlcon.length; i++) {
                $("#xczb").append("<li><a href=\"\"><i><img src=\"../images/icon1.png\"></i>" + htmlcon[i] + "</li>");
            }
            htmlcon = data.result.dhgd.split('|');
            for (var i = 0; i < htmlcon.length; i++) {
                $("#dhgd").append("<li style=\"background:url(http://openlenovo.hyh6.com/Uploads/" + htmlcon[i] + ") 50% 0 no-repeat;background-size:contain\"><a href=\"meeting_view.html.html\"></a></li>");
            }
            htmlcon = data.result.zxjj.split('$');
            for (var i = 0; i < htmlcon.length; i++) {
                $("#zxjj").append("<li><a href=\"Info_focus_detail.html\"><i><img src=\"../images/icon2.png\"></i>" + htmlcon[i] + "</a></li>");
            }
            htmlcon = data.result.jcsj.split('|');
            for (var i = 0; i < htmlcon.length; i++) {
                $("#jcsj").append("<li style=\"background:url(http://openlenovo.hyh6.com/Uploads/" + htmlcon[i] + ") 50% 0 no-repeat;background-size:contain\"><a href=\"meeting_view.html.html\"></a></li>");
            }
        }
    }
    );
//    $.ajax({
//        type: "GET",
//        dataType: "jsonp",
//        jsonp: "callback",
//        jsonpCallback: "lenovoopenxczb", url: "http://services.hyh6.com/Customer.aspx?op=lenovoopenapixczb",
//        success: function (data1) {
//            var htmlcon = data1.result.split('|');
//            for (var i = 0; i < htmlcon.length; i++) {
//                $("#xczb").append("<li><a href=\"\"><i><img src=\"../images/icon1.png\"></i>"+htmlcon[i]+"</li>");
//            }
//        }
//    }
//    ); 
//    $.ajax({
//        type: "GET",
//        dataType: "jsonp",
//        jsonp: "callback",
//        jsonpCallback: "lenovoopendhgd", url: "http://services.hyh6.com/Customer.aspx?op=lenovoopenapidhgd",
//        success: function (data) {
//            var htmlcon = data.result.split('|');
//            for (var i = 0; i < htmlcon.length; i++) {
//                $("#dhgd").append("<li style=\"background:url(http://openlenovo.hyh6.com/Uploads/"+htmlcon[i]+") 50% 0 no-repeat;background-size:contain\"><a href=\"meeting_view.html.html\"></a></li>");
//            }
//        }
//    }
//    );
//    $.ajax({
//        type: "GET",
//        dataType: "jsonp",
//        jsonp: "callback",
//        jsonpCallback: "lenovoopenzxjj", url: "http://services.hyh6.com/Customer.aspx?op=lenovoopenapizxjj",
//        success: function (data) {
//            var htmlcon = data.result.split('$');
//            for (var i = 0; i < htmlcon.length; i++) {
//                $("#zxjj").append("<li><a href=\"Info_focus_detail.html\"><i><img src=\"../images/icon2.png\"></i>"+htmlcon[i]+"</a></li>");
//            }
//        }
//    }
//    );
//    $.ajax({
//        type: "GET",
//        dataType: "jsonp",
//        jsonp: "callback",
//        jsonpCallback: "lenovoopenjchx", url: "http://services.hyh6.com/Customer.aspx?op=lenovoopenapijcsj",
//        success: function (data) {
//            var htmlcon = data.result.split('|');
//            for (var i = 0; i < htmlcon.length; i++) {
//                $("#jcsj").append("<li style=\"background:url(http://openlenovo.hyh6.com/Uploads/" + htmlcon[i] + ") 50% 0 no-repeat;background-size:contain\"><a href=\"meeting_view.html.html\"></a></li>");
//            }
//        }
//    }
//    );
});
