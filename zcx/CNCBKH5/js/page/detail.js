$(function () {
	
var goodId=GetQueryString('good_id');  
//detailContent(goodId);

function detailContent(goodId){
	 $.ajax({
		  type: "GET",
		  async: false,
		  url: baseUrl+"product.aspx?op=GetGoodContent&good_id="+goodId,
		  dataType: "jsonp", //数据类型为jsonp  
		  jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		  jsonpCallback: "info",
		  success: function (data) {
			  var data = data.result;
			  $('.detail-content').html(data);
		  }
	  });
}

//详情轮播图
	if($('#detailSlider').length>0){
	if($('#detailSlider .swiper-slide').length>1){
			var detailSlider = new Swiper('#detailSlider',{
				loop:true,       //循环切换
				autoplayDisableOnInteraction : false, //swiper之后自动切换不会停止
				pagination:'.swiper-pagination', //分页
				paginationClickable: true,
				//effect : 'coverflow',
			});
	}
	};
  
  //tab切换
  $(".js-tab-menu").find("li").click(function(){
	  var $this = $(this);
	  var $thisIndex = $this.index();
	  $(this).addClass("curr").siblings().removeClass("curr");
	  $(".js-tab-content").find(".js-content-list").eq($thisIndex).show().siblings().hide();
  });
  
  //滚动页面导航固定
  if($('.js-tab-menu-box').length>0){
	$(window).scroll(function(){
	   topFixed('.js-tab-menu-box');
	});
  };
  
  $('.js-ques-list li').click(function(){
  		$(this).addClass('cur').siblings().removeClass('cur');
  });
  
  $('body').delegate(".js-add-cart-btn","click",function(e){
	  e.preventDefault();	 
	  	var $this = $(this);
	  	var prodId = $this.attr("data-id");
	  	var count = $('body').attr("data-count");
		$.ajax({
		    url:path+'/cart/add',
		    data:{
		    	"prodId":prodId,"baseketCount":count
		    },
		    dataType:'json',
		    success:function(data){
		    	if(data.code==0){
		    		jShare('商品已添加到购物车!',"","");
		    		$.ajax({
		    			type: "GET",
		    			url: path+'/cart/count',
		    			dataType: "json",
		    			success: function(data){
		    				if(data.code==0){
		    					$(".nav-icon03").find("em").text(data.count);
		    					$(".red-remind-sub").text(data.count);
		    					$(".cart-icon").find("em").text(data.count);//品牌详情页购物车角标
		    				}
		    			}
		    	  });
		    	}else{
		    		jShare(data.msg,"","");
		    	}
		    },
		    error : function(){
				alert("请求数据失败！");
			}
		});	  
  });

  	//确定收货
  $('body').delegate(".js-confirm-receipt-btn","click",function(e){
		   e.preventDefault();
		   var $this = $(this);
		   var orderNo = $this.attr("data-main-id");
		   var subOrderNo = $this.attr("data-sub-id");
		   jShare("是否确定已收到货品？","",function(result){
				  if(result===true){
					  $.ajax({
						    url:path+'/order/confirm',
						    data:{
						    	"orderNo":orderNo,"subOrderNo":subOrderNo
						    },
						    dataType:'json',
						    success:function(data){
						    	if(data.code==0){
									//$this.parents('.imb-btn-box').remove();
						    		window.location.reload();//刷新当前页面.
						    	}
						    },
						    error : function(){
								alert("请求数据失败！");
							}
						});
				  }
			  });
		});
	//取消订单
  $('body').delegate(".js-cancel-btn","click",function(e){
		 e.preventDefault();
		 var $this = $(this);
		 var orderId = $this.attr("data-id");
		$.ajax({
		    url:path+'/order/cancel',
		    data:{
		    	"orderNo":orderId
		    },
		    dataType:'json',
		    success:function(data){
		    	if(data.code==0){
		    		jShare("取消订单成功！","",function(result){
						if(result==true){ //这是点击确定按钮的操作
							window.location.reload();//刷新当前页面.
						}
					},false);
		    	}
		    },
		    error : function(){
				alert("请求数据失败！");
			}
		});
	  });
	  
	  
	  
	  

	
	
		
	//评论筛选tab
	$(".comment_tab").find("li").on("click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");	
	})
	
	//添加商品数量点击
	$(".amount_add").click(function(){
		var amount_val = $(".amount_val").val();
		
		if($(".amount_val").val()<10){
			$(".amount_val").val(++amount_val);
			commodityNumber=$(".amount_val").val();
		}
		
	});

	//删除商品数量点击
	$(".amount_cut").click(function(){
		var amount_val = $(".amount_val").val();
		if(amount_val>1){
			$(".amount_val").val(--amount_val);
			commodityNumber=$(".amount_val").val();
		}
		
	});

	 //商品详情详情点击收藏
	  $(".js-product-collect-icon").click(function(){
		  var $this = $(this);
		  var prodId = $this.attr("data-id");
		  if(!$(this).hasClass("cur")){
			  $.ajax({
				    url:path+'/favorite/addProduct',
				    data:{
				    	"productId":prodId
				    },
				    dataType:'json',
				    success:function(data){
				    	if(data.code==0){
				    		$this.addClass("cur");
				  		    return jShare('收藏成功!',"","");
				    	}
				    },
				    error : function(){
						alert("请求数据失败！");
					}
				});
		  }else{
			  $.ajax({
				    url:path+'/favorite/delProduct',
				    data:{
				    	"productId":prodId
				    },
				    dataType:'json',
				    success:function(data){
				    	if(data.code==0){
				    		$this.removeClass("cur");
				  		    return jShare('取消收藏!',"","");
				    	}
				    },
				    error : function(){
						alert("请求数据失败！");
					}
				});
		  }				  
	  });
	
	  	var prodNumVal;
		var unitPrice=$('.unit-price').html();
		//删除商品数量
		$(".pick-detail .fillNumber .cut").click(function(){
			var $this = $(this);
			var prodNum = $this.parents(".fillNumber").find(".prodNum");
			var maxNumVal = Number($this.parent(".fillNumber").find(".numberVal").val());
			prodNumVal = Number(prodNum.html());

			if(prodNumVal >1){
				$this.parent(".fillNumber").find(".add").removeClass("disabled");
				prodNum.html(--prodNumVal);
				$('.total-price').html((unitPrice*prodNumVal).toFixed(2));
				$("body").attr("data-count",prodNumVal);
				$("#quantity").val(prodNumVal);
			}else{
				$this.addClass("disabled");
		
			}
		});

		//添加商品数量
		$(".pick-detail .fillNumber .add").click(function(){
			var $this = $(this);
			var prodNum = $this.parent(".fillNumber").find(".prodNum");
			var maxNumVal = Number($this.parent(".fillNumber").find(".numberVal").val());
			prodNumVal = Number(prodNum.html());

			$this.parent(".fillNumber").find(".cut").removeClass("disabled");
			
			if(prodNumVal < maxNumVal){
				prodNum.html(++prodNumVal);
				$('.total-price').html((unitPrice*prodNumVal).toFixed(2));
				$("body").attr("data-count",prodNumVal);
				$("#quantity").val(prodNumVal);
			}else if(prodNumVal == maxNumVal){
				$this.addClass("disabled");
			}
		});
		
		//立即购买
		$("body").delegate(".js-settlement","click",function(){
			var productId=$("#productId").val();
			var quantity=$("#quantity").val();
			window.location.href = path + "/pickup/settment?productId=" + productId+"&quantity="+quantity;
		});
		
		//立即购买
		$("body").delegate(".js-cart-settlement","click",function(){
			var productId=$("#id").val();
			var quantity=$("#quantity").val();
			window.location.href = path + "/cart/addCart?prodId=" + productId+"&baseketCount="+quantity;
		});
		
		 $('body').delegate(".js-add-cart-product-btn","click",function(e){
			  e.preventDefault();	 
			  	var $this = $(this);
			  	var prodId = $this.attr("data-id");
			  	var count = $('body').attr("data-count");
				$.ajax({
				    url:path+'/cart/add',
				    data:{
				    	"prodId":prodId,"baseketCount":count
				    },
				    dataType:'json',
				    success:function(data){
				    	if(data.code==0){
				    		jShare('商品已添加到购物车!',"","");
				    		$.ajax({
				    			type: "GET",
				    			url: path+'/cart/amount',
				    			dataType: "json",
				    			success: function(data){
				    				if(data.code==0){
				    					var amount=data.amount.amount;
				    					var no_carriage=data.amount.noCarriage;
				    					var tag='';
				    					if(no_carriage==0){
				    						tag='￥'+amount.toFixed(2)+'元，免运费';
				    					}else{
				    						tag='￥'+amount.toFixed(2)+'元，差￥'+no_carriage+'元免运费';
				    					}
				    					$(".f-cart-icon.clr").find("em").text(tag);
				    				}
				    			}
				    		});
				    		$.ajax({
				    			type: "GET",
				    			url: path+'/cart/count',
				    			dataType: "json",
				    			success: function(data){
				    				if(data.code==0){
				    					$(".red-remind-sub").text(data.count);
				    				}
				    			}
				    	  });
				    	}else{
				    		jShare(data.msg,"","");
				    	}
				    },
				    error : function(){
						alert("请求数据失败！");
					}
				});	  
		  });

	
});





	
