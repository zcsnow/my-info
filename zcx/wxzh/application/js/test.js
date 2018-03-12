var BASE_URL = "http://localhost/wxTest";
//var BASE_URL = "http://china-dafencun.com/html5/chenxue/wxTest";
var test_title=document.title;
var shareTitle = "";
$(document).ready(function() {
	  var totalScore=0;
	  var testId=$('.test-id').attr('name');
	  var current_id=1;
	  var max=$('.test_box').length;
	  $("#test_box_1").show();
	 // $('.test_box').find('.actived').removeClass('actived');
	  $('.test_box li a').click(function(e){
		  var target=e.target;
		  var id=$(target).attr('name');
		  var id2=parseInt(id)+1;
		  current_id=id2;
		  $(this).parent().parent().find('.actived').removeClass('actived');
		  $(this).addClass('actived');
		  var selected =$(this).attr('data-score');
		  totalScore = parseInt(totalScore) + parseInt(selected);
		  //console.log(totalScore);
		  if(id2 > max)
		  {
			  setTimeout(function(){
				  $("#test_box_"+max).hide();
				  $.ajax({
						 type: "POST",
						 url: BASE_URL+"/func_do/get_result",
						 data: "total_score="+totalScore+"&test_id="+testId,
						 success: function(data){
							 $('.test_result p').html(data);
							 shareTitle = $('.test_result p').html();
						 }
					 });
					
				  $('.test_top h2').addClass('test_icon2').html("测试结果");
				  $(".test_result").show();

					},500);
			

			

		  }else{
			  
			 setTimeout(function(){
				$("#test_box_"+id).hide();
				$("#test_box_"+id2).show();
				},500);
			
			  }
		  
		  })
	 
	  
	  $('.btn_retest').click(function(){
		  totalScore=0;
		  $('.test_box').find('.actived').removeClass('actived');
		  $(".test_result").hide();
		  $("#test_box_1").show();
		  $('.test_top h2').removeClass('test_icon2').html(test_title);
		 
	  })
	  
	  $('.btn_share').click(function(){
		  $('#share').show();
	  });
	  
	  $('#share img').click(function(){
		  $('#share').hide();
	  })
	  
	  
	    /*var page=$('.page').attr('name');
		var page_name=$(".page_name").attr('name');
		$('.moreNovelList').click(function () {
			page++;
			$('.page').attr('name',page);
				$.ajax({
					type: "POST",
					url: BASE_URL+"/cindex/index",
					data:"page="+page,
					success: function(e){
						
						$('.subject_list').append(e);
					}
				});
		});*/
	  
	    
	  
	    var imgUrl = $('.img-url').attr('name');
	    var lineLink ="http://china-dafencun.com/html5/chenxue/wxTest/cindex/test_list/"+testId;
	    var descContent = '快来跟我一起测试！';
	    var appid = '';
	    
	
	    function shareFriend() {
	        WeixinJSBridge.invoke('sendAppMessage',{
	            "appid": appid,
	            "img_url": imgUrl,
	            "img_width": "200",
	            "img_height": "200",
	            "link": lineLink,
	            "desc": descContent,
	            "title": shareTitle
	        }, function(res) {
	            //_report('send_msg', res.err_msg);
	        })
	    }
	    function shareTimeline() {
	        WeixinJSBridge.invoke('shareTimeline',{
	            "img_url": imgUrl,
	            "img_width": "200",
	            "img_height": "200",
	            "link": lineLink,
	            "desc": descContent,
	            "title": shareTitle
	        }, function(res) {
	            //_report('timeline', res.err_msg);
	        });
	    }
	    function shareWeibo() {
	        WeixinJSBridge.invoke('shareWeibo',{
	            "content": descContent,
	            "url": lineLink
	        }, function(res) {
	            //_report('weibo', res.err_msg);
	        });
	    }
	    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
	    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	        // 发送给好友
	        WeixinJSBridge.on('menu:share:appmessage', function(argv){
	            shareFriend();
	        });
	        // 分享到朋友圈
	        WeixinJSBridge.on('menu:share:timeline', function(argv){
	            shareTimeline();
	        });
	        // 分享到微博
	        WeixinJSBridge.on('menu:share:weibo', function(argv){
	            shareWeibo();
	        });
	    }, false);	
		  

	 
});




