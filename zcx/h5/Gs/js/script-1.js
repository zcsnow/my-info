(function($){
	$("#media")[0].play();
	//自定义动画
	$.Velocity.RegisterUI('zcx.scaleZoom',{
		defaultDuration:2000,
		calls:[
			[{opacity:[1,0],scaleX:[1,1.3],scaleY:[1,1.3],translateY:[0,60],translateX:[0,60]}]
		]
	});
	$.Velocity.RegisterUI('zcx.zoomIn',{
		defaultDuration:300,
		calls:[
			[{opacity:[1,0],scaleX:[1,5],scaleY:[1,5]},1,{easing: "easeOutIn"}]
		]
	});
	$.Velocity.RegisterUI('zcx.scaleZoomBig',{
		defaultDuration:800,
		calls:[
			
			[{translateX:[0,700],translateY:[0,700],scaleX:[1,12],scaleY:[1,12]},1,{easing: "easeOutIn"} ]
			//[{translateX:[0,280],translateY:[0,280],scaleX:[1,6],scaleY:[1,6]},0.4]
		]
	});
	$.Velocity.RegisterUI('zcx.leftBottomIn',{
		defaultDuration:1000,
		calls:[
			[{opacity:[1,0],translateX:[0,-200],translateY:[0,100]}]
		]
	});
	$.Velocity.RegisterUI('zcx.rightBottomIn',{
		defaultDuration:1000,
		calls:[
			[{opacity:[1,0],scaleX:[1.5,3],scaleY:[1.5,3],translateX:[100,300],translateY:[120,400],rotateZ:[-20,0]},1,{easing: "easeOut"}]
		]
	});
	
	
	
	
	$.Velocity.RegisterUI('zcx.rotateInOut',{
		defaultDuration:1500,
		calls:[
			[{opacity:[1,0],scaleX:[1,1.5],scaleY:[1,1.5],rotateZ:[0,180]}]
		],
		reset: { opacity: 0 }
	});
	
	$.Velocity.RegisterUI('zcx.rotateIn',{
		defaultDuration:500,
		calls:[
			[{opacity:[1,0],scaleX:[0.9,10],scaleY:[0.9,10],rotateZ:[0,180]}]
		],
	});
	$.Velocity.RegisterUI('zcx.fadeInOut',{
		defaultDuration:200,
		calls:[
				[{opacity:1},0.25],
				[{opacity:0},0.25],
				[{opacity:1},0.25],
				[{opacity:0},0.25]
		]

	});
	$.Velocity.RegisterUI('zcx.rotateIn1',{
		defaultDuration:1000,
		calls:[
			[{opacity:[1,0],scaleX:[1,5],scaleY:[1,5],rotateZ:[0,180]}]
		],
	});
	$.Velocity.RegisterUI('zcx.rotateIn2',{
		defaultDuration:1000,
		calls:[
			[{opacity:[1,0],scaleX:[1,20],scaleY:[1,20],rotateZ:[0,-180]}]
		],
	});
	
	$.Velocity.RegisterUI('zcx.leftBottomBigIn',{
		defaultDuration:1000,
		calls:[
			[{opacity:[1,0],translateX:[30,-200],translateY:[-140,200]},1,{easing: "easeInOut"}]
		]
	});
	
	$.Velocity.RegisterUI('zcx.flipXBigIn',{
		defaultDuration: 2000,
		calls: [
			[ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], rotateY: [ 0, -90 ],translateX:[0,50],translateY:[0,200] }]
			//[ {translateX:[-200,0],translateY:[-200,0] },0.5 ]
		],
		 reset: { transformPerspective: 0 }
		 
	});
	$.Velocity.RegisterUI('zcx.leftTopOut',{
		defaultDuration: 10000,
		calls: [
			[{translateX:[-50,100],translateY:[-120,120]}]
		]
		 
	});
	
	$.Velocity.RegisterUI('zcx.leftTopOut1',{
		defaultDuration: 1000,
		calls: [
			[{translateX:[-200,0],translateY:[-350,0]}]
		]
		 
	});
	
	$.Velocity.RegisterUI('zcx.slideDownBigIn',{
		defaultDuration: 850,
		calls: [
			[ { opacity: [ 1, 0 ], translateY: [ 0, -500 ], translateZ: 0 } ]
		]
		 
	});
	
	$.Velocity.RegisterUI('zcx.slideDownBigOut',{
		defaultDuration: 850,
		calls: [
			[ { opacity: [ 0, 1 ], translateY: 500, translateZ: 0 } ]
		],
		reset: { translateY: 0 }
	 
	});
	
	$.Velocity.RegisterUI('zcx.slideUpBigIn',{
		defaultDuration: 850,
		calls: [
			[ { opacity: [ 1, 0 ], translateY: [ 0, 500 ], translateZ: 0 } ]
		]
	});
	
	$.Velocity.RegisterUI('zcx.slideUpBigOut',{
		defaultDuration: 850,
		calls: [
			[ { opacity: [ 0, 1 ], translateY: -500, translateZ: 0 } ]
		],
		reset: { translateY: 0 }
	 
	});
	
	$.Velocity.RegisterUI('zcx.slideRightBigIn',{
		defaultDuration: 2000,
		calls: [
			[ { opacity: [ 1, 0 ], translateX: [ 0, 200 ], translateZ: 0 },1,{easing: "easeInOut"} ]
		]
	 
	});
	
	$.Velocity.RegisterUI('zcx.flipYIn',{
		defaultDuration: 100,
		  calls: [
			  [ { opacity: [ 1, 0 ], transformPerspective: [ 800, 800 ], rotateX: [ 0, -90 ] } ]
		  ],
		  reset: { transformPerspective: 0 }
	 
	});
	
	$.Velocity.RegisterUI('zcx.flipYOut',{
		defaultDuration: 100,
		calls: [
			[ { opacity: [ 0, 1 ],transformPerspective: [ 800, 800 ], rotateX: 90 } ]
		],
		reset: { transformPerspective: 0, rotateX: 0 }
	 
	});
	
	$.Velocity.RegisterUI('zcx.flash',{
		defaultDuration: 500,
		calls: [
			[ { opacity: [ 0, "easeInOutQuad", 1 ] }, 0.25 ],
			[ { opacity: [ 1, "easeInOutQuad" ] }, 0.25 ],
			[ { opacity: [ 0, "easeInOutQuad" ] }, 0.25 ],
			[ { opacity: [ 1, "easeInOutQuad" ] }, 0.25 ]
		]
	 
	});
	
	
	

	
	
	//page1 动画序列
	var page1Seq = [
	{
		elements:$('.page1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page1-1'),
		properties:'zcx.scaleZoom',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page1-2'),
		properties:'zcx.scaleZoomBig',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page1-3'),
		properties:'zcx.leftBottomIn',
		options:{
			//delay:1000
			//sequenceQueue:false
		}
	},{
		elements:$('.page1-5'),
		properties:'transition.slideRightBigIn',
		options:{
			//delay:500
		}
	}
	];
	
	
	//事件绑定
	setTimeout(function(){
		$('.loading-box').hide();
		$.Velocity.RunSequence(page1Seq);
	},5000);
	
	
	
	
	//page2动画
	var page2Seq = [
	{
		elements:$('.page2-1'),
		properties:'zcx.rightBottomIn',
		
	},{
		elements:$('.page2-line2'),
		properties:'transition.fadeIn',
		options:{
			delay:900,
			sequenceQueue:false
		}
		
	},{
		elements:$('.page2-line1'),
		properties:'transition.fadeIn',
		options:{
			//delay:500,
			sequenceQueue:false,
			
		}
	},{
		elements:$('.page2-2'),
		properties:'zcx.flash',
		options:{
			delay:1000,
			sequenceQueue:false,
		}
		
	},{
		elements:$('.page2-1'),
		properties:'zcx.leftTopOut',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page2-2'),
		properties:'transition.fadeOut',
		options:{
			delay:300,
			sequenceQueue:false
		}
		
	},{
		elements:$('.page2-3'),
		properties:'zcx.rotateIn',
		options:{
			
			//sequenceQueue:false
		}
		
	},{
		elements:$('.page2'),
		properties:'zcx.fadeInOut',
		options:{
			delay:700,
		}
		
	},{
		elements:$('.page2_1'),
		properties:'transition.fadeIn'
	
	},{
		elements:$('.page2-4'),
		properties:'transition.slideLeftBigIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page2-5'),
		properties:'zcx.slideRightBigIn',
		options:{
			delay:100,
			sequenceQueue:false
		}
	},{
		elements:$('.page2-6'),
		properties:'callout.flash',
		options:{
			delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page2-8'),
		properties:'zcx.rotateIn1',
		options:{
			delay:100,
			sequenceQueue:false
		}
		
	},{
		elements:$('.page2-7'),
		properties:'transition.slideRightBigIn',
		options:{
			delay:300,
			
		}
	},{
		elements:$('.page-black4'),
		properties:'zcx.fadeInOut',
		options:{
			
			sequenceQueue:false
		}
		
	},{
		elements:$('.page3-1'),
		properties:'zcx.rotateIn2',
	},{
		elements:$('.page2_1'),
		properties:'transition.fadeOut',
		options:{
			delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page3-0'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page3-line-box1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page3-line-box2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page3-2'),
		properties:'zcx.leftBottomBigIn',
		options:{
			//delay:500,
			sequenceQueue:false
			 //easing: "easeInOut"
		}
	},{
		elements:$('.page2-2'),
		properties:'zcx.zoomIn',
		options:{
			delay:500,
			sequenceQueue:false
			 //easing: "easeInOut"
		}
	},{
		elements:$('.page2-2'),
		properties:'transition.flipYOut',
		options:{
			delay:500,
		}
	},{
		elements:$('.page3-4'),
		properties:'transition.flipYIn',
		options:{
			
			//sequenceQueue:false
			 //easing: "easeInOut"
		}
	},{
		elements:$('.page-black1'),
		properties:'zcx.fadeInOut',
		options:{
			delay:300,
			//sequenceQueue:false
		}
		
	},{
		elements:$('.page3'),
		properties:'transition.flipXOut',
		
	},{
		elements:$('.page4'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-0'),
		properties:'transition.fadeIn',
		options:{
			//delay:100,
			sequenceQueue:false

		}
	},{
		elements:$('.page4-2'),
		properties:'zcx.flipXBigIn',
	},{
		elements:$('.page4-3'),
		properties:'zcx.flipXBigIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-line1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-line2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-4'),
		properties:'transition.slideUpIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-1'),
		properties:'transition.fadeIn',
		options:{
			delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page4-6'),
		properties:'callout.flash'
	},{
		elements:$('.page4-5'),
		properties:'transition.flipXIn'
	},{
		elements:$('.page4-2'),
		properties:'zcx.leftTopOut1',
	},{
		elements:$('.page4-3'),
		properties:'zcx.leftTopOut1',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-1'),
		properties:'transition.slideUpOut',
		options:{
			delay:200,
			sequenceQueue:false
		}
	},{
		elements:$('.page4'),
		properties:'transition.fadeOut',
		options:{
			
			sequenceQueue:false
		}
	},{
		elements:$('.page5'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page-black2'),
		properties:'zcx.fadeInOut',
		options:{
			
			//sequenceQueue:false
		}
		
	},{
		elements:$('.page5-line1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page5-line2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page5-0'),
		properties:'transition.fadeIn',
	},{
		elements:$('.page2-2'),
		properties:'zcx.zoomIn',
		options:{
			//sequenceQueue:false
		}
	},{
		elements:$('.page5-1'),
		properties:'transition.slideUpBigIn',
		options:{
			delay:500,
			sequenceQueue:false
		}
		
	},{
		elements:$('.page-black3'),
		properties:'zcx.fadeInOut',
		options:{
			
			sequenceQueue:false
		}
		
	},{
		elements:$('.page2-2'),
		properties:'transition.fadeOut',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page5-4'),
		properties:'zcx.rotateIn1',
		options:{
			//sequenceQueue:false
		}
	},{
		elements:$('.page5'),
		properties:'transition.fadeOut',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page6'),
		properties:'callout.flash',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page6-0'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page6-2'),
		properties:'transition.slideUpIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page6-3'),
		properties:'transition.slideUpBigIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page6-1'),
		properties:'transition.slideUpBigIn',
		options:{
			delay:200,
			sequenceQueue:false
		}
	},{
		elements:$('.page6-line-box1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page6-line-box2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page2-2'),
		properties:'zcx.zoomIn',
		options:{
			//delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page2-2'),
		properties:'transition.flipYOut',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page6-4'),
		properties:'zcx.rotateIn2',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page6'),
		properties:'zcx.slideDownBigOut',
		options:{
			delay:700
			//sequenceQueue:false
		}
	},{
		elements:$('.page7'),
		properties:'zcx.slideUpBigIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page7-0'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.word7-1'),
		properties:'transition.slideDownIn',
		options:{
			delay:100,
			sequenceQueue:false
		}
	},{
		elements:$('.word7-2'),
		properties:'transition.slideDownIn',
		options:{
			delay:200,
			sequenceQueue:false
		}
	},{
		elements:$('.word7-3'),
		properties:'transition.slideDownIn',
		options:{
			delay:300,
			sequenceQueue:false
		}
	},{
		elements:$('.word7-4'),
		properties:'transition.slideDownIn',
		options:{
			delay:400,
			sequenceQueue:false
		}
	},{
		elements:$('.word7-5'),
		properties:'transition.slideDownIn',
		options:{
			delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page7-2'),
		properties:'transition.fadeIn',
		options:{
			//delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page7-1'),
		properties:'transition.slideDownIn',
		options:{
			//delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page3-3'),
		properties:'zcx.fadeInOut',
		options:{
			//delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page7-3'),
		properties:'zcx.zoomIn',
		options:{
			//delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page7'),
		properties:'zcx.slideDownBigOut',
		options:{
			delay:700,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8'),
		properties:'zcx.slideDownBigIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-1'),
		properties:'transition.fadeIn',
		options:{
			//delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page8-3'),
		properties:'transition.fadeIn',
		options:{
			//delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page8-0'),
		properties:'transition.fadeIn',
		options:{
			//delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-t'),
		properties:'transition.slideLeftBigIn',
		options:{
			//delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-4'),
		properties:'transition.fadeIn',
		options:{
			//delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-5'),
		properties:'transition.fadeIn',
		options:{
			//delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYIn',
		options:{
			delay:300,
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'zcx.flipYOut',
		options:{
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'zcx.flipYIn',
		options:{
			delay:500,
			//sequenceQueue:false
		}
	}
	

	
	];
	
	

	
	$('.btn').click(function(e) {
		$('.page1').velocity('transition.slideUpBigOut');
		
        $('.page2').velocity('transition.fadeIn');
		$('.page1').hide();
		$.Velocity.RunSequence(page2Seq);
		
    });
	
	
	$('.submit-btn').click(function(e){
		
		e.preventDefault();
		$('.pop-box').show();
	});
	
	
	$('.close-btn,.cancle-btn').click(function(e){
		e.preventDefault();
		$('.pop-box1').show();
	});
	
	
	$('.pop-box1 .btn1').click(function(e){
		e.preventDefault();
		$('.pop-box1').hide();
	});
	
	
	$('.pop-box1 .btn2').click(function(e){
		e.preventDefault();
		$('.pop-box1').hide();
		$('.pop-box').hide();
	});
	
	
	$('.share-btn').click(function(e){
		e.preventDefault();
		$('.share-img').show();
	});
	
	$('.ok-btn').click(function(e){
		e.preventDefault();
		$('.pop-box2').show();
	});
	$('.pop-box2 .btn1').click(function(e){
		e.preventDefault();
		$('.pop-box2').hide();
	});
	
	$('.pop-box2 .btn2').click(function(e){
		e.preventDefault();
		$('.share-img').show();
	});
	
	$('.share-img').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.share-img').hide();
	});
	
	
})(jQuery);