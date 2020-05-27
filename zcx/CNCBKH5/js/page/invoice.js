
var pageIndex = 1;//当前页码
var listNum = 10;// 每页展示10条
var pageTotalNum;// 总页数


var userId=GetQueryString('user_id');  

$.ajax({
	  type: "GET",
	  async:true,
	  url: baseUrl+"Member.aspx?op=MemberGetInvoice&user_id="+userId+"&pageindex="+ pageIndex +"&pagesize="+listNum,
	  dataType: "jsonp", //数据类型为jsonp  
	  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
	  jsonpCallback: "info",
	  success: function (data) {
		  var data = data.result;
		  var totalCount = data.count;
		  pageTotalNum = Math.ceil(totalCount/listNum);
		  $('.invoice-money').html(data.use_money||0);
		  $('.surplus-money').html(data.surplus||0);

		  if(data.list == "" || data.list == undefined || data.list == null){
			  var result = '';
			  result += '<div class="no-data">';
			  result += '<span>暂无数据</span>';
			  result += '</div>';
			  $('.invoice-list-box').append(result);
		  }else{
			  //列表下拉加载数据
			  $('.invoice-list-box').dropload({
				  scrollArea : window,
				  loadDownFn : function(me){
					  integralList(pageIndex,listNum,me);
					  if(pageIndex >= pageTotalNum){
						  // 锁定
						  me.lock();
						  // 无数据
						  me.noData();
						  return;
					  }
					  pageIndex++;
				  }
			  });
		  }
	  }
});
	

function integralList(pageIndex,listNum,me){
	var json_data = $.ajax({
		  type: "GET",
		  async: false,
		  url: baseUrl+"Member.aspx?op=MemberGetInvoice&user_id="+userId+"&pageindex="+ pageIndex +"&pagesize="+listNum,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  var result = '';
			  $.each(data["list"],function(i,info){
				  result += '<li class="clr">';
				  result += '<span>'+info.datetime+'</span>';
				  result += '<span>'+info.invoice_money+'</span>';
				  result += '<span>'+info.remarks+'</span>';
				  result += '</li>';
				  
			  });
			  // 为了测试，延迟0.3秒加载
			  setTimeout(function(){
				   $('.invoice-list').append(result);
				  // 每次数据加载完，必须重置
				  me.resetload();
			  },300);
		  },
		  error: function(xhr, type){
			  alert('Ajax error!');
			  // 即使加载出错，也得重置
			  me.resetload();
		  }
	  });
}
	
//去报销
$('.js-app-integral').on('click',function(e){
	  var surplusMoney = $('.surplus-money').html();
	  if(isAndroid){
		   //alert("Android");
	  	   test.goInvoice(surplusMoney);
	  }else{
		  //alert("ios");
		  window.webkit.messageHandlers.goInvoice.postMessage(surplusMoney);
	  }
});

//帮助按钮
$('.js-invoice-help').on('click',function(e){
	  
	  if(isAndroid){
		   //alert("Android");
	  	  window.location.href="invoice_help.html";
	  }else{
		  //alert("ios");
		  window.webkit.messageHandlers.invoiceHelp.postMessage(null);
	  }
});





	
