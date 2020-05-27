$(function(){
	//页面加载执行公共方法，计算价格
	selectNumAmountFun();
	var prodNumVal;
	
	//删除商品数量
	$(".fillNumber .cut").click(function(){
		var $this = $(this);
		var prodNum = $(this).parents(".fillNumber").find(".prodNum");
		var maxNumVal = Number($this.parent(".fillNumber").find(".numberVal").val())
		prodNumVal = Number(prodNum.html());

		if($this.hasClass("cut_disable")){
			return false;
		}else{
			
			if(prodNumVal >1){
				$this.parent(".fillNumber").find(".add").removeClass("disabled");
				selectNumAmountFun();
				prodNum.html(--prodNumVal);
			}else{
				
				jShare("确定从购物车中删除该商品吗？","",function(result){
					if(result===true){
						$this.parents("dd").fadeOut("slow");
						setTimeout(function(){
							$this.parents("dd").remove();
							selectNumAmountFun();
						},600)
					}
				});
			
			}
		}
	});

	//添加商品数量
	$(".fillNumber .add").click(function(){
		var $this = $(this);
		var prodNum = $this.parent(".fillNumber").find(".prodNum");
		var maxNumVal = Number($this.parent(".fillNumber").find(".numberVal").val())
		prodNumVal = Number(prodNum.html());
		var commodityPrice = $this.parent(".fillNumber").find(".commodity_price");
		var comprice = commodityPrice.attr("comprice");

		$this.parent(".fillNumber").find(".cut").removeClass("disabled");
		if($this.hasClass("add_disable")){
			return false;
		}else{
			if(prodNumVal < maxNumVal){
				prodNum.html(++prodNumVal);
				selectNumAmountFun();
				$(".commodity_price").html()
			}else if(prodNumVal == maxNumVal){
				$(".errorPrompt").fadeIn("slow").find("span").html(prodNumVal);

				$(this).addClass("disabled");
				setTimeout(function(){
					$(".errorPrompt").fadeOut("slow");
				},5000)
			}
		}
	});

	//删除商品
	$("dd").delegate(".js-delete-btn","click",function(){
		var $this = $(this);
		var thisId = $this.attr("id");
		
		jShare("确定从购物车中删除该商品吗？","",function(result){
  
			if(result===true){
				$("#"+thisId).parents("dd").fadeOut("slow");
				setTimeout(function(){
					$("#"+thisId).parents("dd").remove();
					selectNumAmountFun();
				},600)
			}else{
				
			}
		});
		return false;
		
	});
  

	$("#immediately").click(function(){
		if($("#total_number").text()>10){

			jShare("商品数量不能超过10件","",function(result){

				if(result===true){ //这是点击确定按钮的操作
					
				}
			},false);
		}
		//return false;
	})

	//var saveMoneyAll = 0;
	//计算总金额公共方法
	function selectNumAmountFun(){
		
		var $selectChoice = $('.cart-box').find("a.input_curr");
		//计算数量
		/*var selectNum = 0
		$selectElement.each(function(){
			var $this = $(this);
			if(!$this.hasClass("dd_fail") && $selectChoice){
				selectNum++;
			}
		})*/
		var selectNum = $selectChoice.length;

		$('#total_number').text(selectNum);

		var money = (function(){
			var money = 0;
			$selectChoice.each(function() {
				var $this = $(this).parents("dd");
				if(!$this.hasClass("dd_fail") ){
					var priceNew = parseFloat($this.find('.commodity_price').attr("comprice")), //单价
						amountVal = parseInt($this.find('.prodNum').text()), //个数
						amountVal = amountVal ? amountVal : 1,
						sum = $.Calc.Mul(priceNew,amountVal);
					//计算总金额
	            	money = $.Calc.Add(money,sum); 
				}
        	});

			return money;
		})();

		//优惠金额
		//var saveAll=0;
		var saveMoney = (function(){
			var saveMoney = 0;
			$(".cart-box").find('dl').each(function(){
				var $this = $(this);
				var $thisDdLength = $this.find("dd").length;
				var $thisDdCurrLength = $this.find("dd .input_curr").length;
				if($thisDdLength==$thisDdCurrLength && $this.find("dt").length==1){
					saveMoney = parseInt(saveMoney) + parseInt($this.find(".saveAmount").text());
				}
			});
        	$(".save_amount").find("em").html(saveMoney);
			return saveMoney;
		})();
		$('#total_amount').text(money-saveMoney);
	}

	//模拟checkbox点击效果
	$("a.input").click(function(){
		var $this = $(this);
		if(!$this.parents("dd").hasClass("dd_fail")){
			if(!$this.hasClass("input_curr")){
				$this.addClass("input_curr");
				$this.find("input").attr("checked","checked")
				
			}else{
				$this.removeClass("input_curr");
				$this.find("input").removeAttr("checked")
			}
			var dl_length=$(".cart-box").find('dd').not('.dd_fail').length;
			var input_curr_length=$(".cart-box dd").find('.input_curr').length;
			if(input_curr_length==dl_length){
				$("a.input_all").addClass("inputall_curr");
				$("a.input_all").attr("checked","checked");
			}else{
				$("a.input_all").removeClass("inputall_curr");
				$("a.input_all").removeAttr("checked");
			}

			selectNumAmountFun();
		}
		
	});

	//模拟总金额单选选中效果
	$("a.input_all").click(function(){
		var $this = $(this);
		if(!$this.hasClass("inputall_curr")){
			$this.addClass("inputall_curr");
			$this.find("input_all").attr("checked","checked");

			$(".cart-box").find("dd").each(function(){
				var $this = $(this);
				if(!$this.hasClass("dd_fail")){
					$this.find(".input").addClass("input_curr").find("input").attr("checked","checked");
				}
			})
			
		}else{
			$this.removeClass("inputall_curr");
			$this.find("input_all").removeAttr("checked");
			$(".cart-box").find("dd").each(function(){
				var $this = $(this);
				if(!$this.hasClass("dd_fail")){
					$this.find(".input").removeClass("input_curr").find("input").removeAttr("checked");
				}
			})
		}
		selectNumAmountFun();
		
	});
	
});