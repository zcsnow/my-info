$(function(){
	
	//评分
	$('.js-star-box i').click(function(e){
		e.preventDefault();
		$(this).nextAll().removeClass('cur');
		$(this).addClass('cur');
		$(this).prevAll().addClass('cur');
	});
	
	$('.submit-btn').click(function(){
		var starBox1Num = $('.star-box1 i.cur').length;
		var starBox2Num = $('.star-box2 i.cur').length;
		var starBox3Num = $('.star-box3 i.cur').length;
		console.log(starBox1Num,starBox2Num,starBox3Num);
	});
	
	
	//获取订单数据和结构
	function getData() {
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
	};
	
	
	
});