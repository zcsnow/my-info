// JavaScript Document
(function($){ 
$.fn.placeHolder = function(options){
	
	//定义参数默认值
	var defaults = {
		value:"请输入…",
		//defaults CSS
		defStyle: {
			color:"#ccc",
			fontSize:"12px",
			left:0,
			top:0,
			zIndex:0,
			lineHeight:"30px"
		},
		//focus css
		focStyle: {
			color:"#000",
			fontSize:"12px",
			zIndex:0,
			lineHeight:"30px"
		}
		
	}
	
	var opts = $.extend(defaults, options);
	
	return this.each(function(){
		var obj = $(this);
		//设置从input中取出值，这样可以实现使用class写多个，但是需要给设置个自定义属性data-val="...";
		var oriVal = obj.attr("phdata");
		opts.value = oriVal || opts.value;
		//添加dome
		obj.parent().css({"position":"relative"});
		obj.before('<label for="'+obj.attr('name')+'">'+opts.value+'</label>');
		var label = obj.prev();
		
		if(obj.css("display") == "none" || obj.val() != "")
		{
			label.css("display","none")
		}

		
		//定义输入框默认CSS
		if(!opts.defStyle.setUpLine){
			label.css({"position":"absolute","top":opts.defStyle.top,"left":opts.defStyle.left ,"cursor":"text",'color':opts.defStyle.color,'font-size':opts.defStyle.fontSize,"line-height":obj.outerHeight()+"px","z-index":opts.defStyle.zIndex});
			$('textarea').prev().css({"line-height":"30px"});//定义特殊的textarea
		}else{
			label.css({"position":"absolute","top":opts.defStyle.top,"left":opts.defStyle.left ,"cursor":"text",'color':opts.defStyle.color,'font-size':opts.defStyle.fontSize,"line-height":opts.defStyle.lineHeight,"z-index":opts.defStyle.zIndex});
		}
		
		obj.css({'border':opts.defStyle.border,'background':opts.defStyle.background});
		
		label.click(function(){
			obj.focus();
		});
		
		var timer = null; //判断如果这个元素blur了就不再执行定时器
		obj.focus(function(){
			
			//跟踪用户输入事件
			var checkInputVal = function(){
				if(obj.val() != ""){   
					label.css("display") != "none" && label.hide();
				}
				else{
					//label.css("display") == "none" && label.show();
				}
				
				if(obj.css("display") == "none")
				{
					label.css("display","none")
				}
			};
			timer = setInterval(checkInputVal, 100);
			
			obj.css({'font-size':opts.focStyle.fontSize,'border':opts.focStyle.border,'background':opts.focStyle.background});
			
			//通过外部传进来的display的值来判断显示和隐藏
			if(opts.focStyle.display){
				label.css({'display':opts.focStyle.display,'color':opts.focStyle.color,'font-size':opts.focStyle.fontSize});
			}else{
				label.css({'color':opts.focStyle.color,'font-size':opts.focStyle.fontSize});
			}
				
		}).blur(function(){
			clearInterval(timer);//判断如果这个元素blur了就不再执行定时器
			timer = null;
			
			if(obj.val() == ''){
				obj.css({'font-size':opts.defStyle.fontSize,'border':opts.defStyle.border,'background':opts.defStyle.background});
				
				//通过外部传进来的display的值来判断显示和隐藏
				if(opts.defStyle.display){
					label.css({'display':opts.defStyle.display,'color':opts.defStyle.color,'font-size':opts.defStyle.fontSize});
				}else{
					label.css({'color':opts.defStyle.color,'font-size':opts.defStyle.fontSize});
				}
				
			}else{
				obj.css({'font-size':opts.defStyle.fontSize,'border':opts.defStyle.border,'background':opts.defStyle.background});
			}
		});
		//判断如果在js没有加载的时候元素已经focus的bug
		if(obj.filter(":focus").length > 0){
            obj.filter(":focus").trigger("focus"); 	
		}
		
	});

};
})(jQuery);

