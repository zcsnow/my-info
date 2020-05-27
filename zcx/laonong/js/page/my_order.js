$(function(){
	//首页轮播图
	if($('.my-order-swiper').length>0){
	  var swiper1 = new Swiper('.my-order-swiper', {
		  slidesPerView: 'auto',
		  spaceBetween: 10,
	  });
	};
	
	
	$('.js-order-delete-btn').click(function(e){
	   e.preventDefault();
	   var $this = $(this);
	   jShare("确定删除此订单吗？","",function(result){
			  if(result===true){
				  $this.parents('.order-item').remove();
				  
			  }
		  });
	});
	
	$('.js-confirm-receipt-btn').click(function(e){
	   e.preventDefault();
	   var $this = $(this);
	   jShare("是否确定已收到货品？","",function(result){
			  if(result===true){
				  $this.parents('.imb-btn-box').remove();
			  }
		  });
	});
	
	
	//获取订单数据和结构
	/*function getData() {
		$("#tabs_txt0").children().remove();
		var path = getRootPath();
		$.ajax({	
			url : path + "/product/getTemplate",
			data : {
				"productNo" : $('#productNo').val(),
				"type" : "3"
			},
			dataType : "json",
			success : function(data) {
				$("#tabs_txt4").html(data.productTemplate.html);
			}
		});
	};*/
	
});