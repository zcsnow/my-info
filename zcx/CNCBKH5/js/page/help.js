function helpAjax(num) {
    var json_data = $.ajax({
        type: "GET",
        async: false,
		url: baseUrl+"home.aspx?op=HomeRules&rules_type=" + num + "&callback=callback",
        dataType: "jsonp", //数据类型为jsonp  
        jsonp: "callback", //服务端用于接收callback调用的function名的参数  
        jsonpCallback: "callback",
        success: function (data) {
            var help = data.result;
			var help_title = help.rules_name;
			var help_content = help.rules_content;
			$('.help-title').html(help_title);
			$('.help-con').html(help_content);
        }
    });
}





	
