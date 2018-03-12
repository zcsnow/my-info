(function($){
	var $scene = $('#scene').parallax({limitY: 0});
	//$scene.parallax('invert', false, false);
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
	
	$.Velocity.RegisterUI('zcx.rightBottomIn2',{
		defaultDuration:1000,
		calls:[
			[{opacity:[1,0],translateX:[0,300],translateY:[0,400]},1,{easing: "easeOut"}]
		]
	});
	
	$.Velocity.RegisterUI('zcx.leftTopOut2',{
		defaultDuration: 10000,
		calls: [
			[{translateX:[0,100],translateY:[0,120]}]
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
	
	$.Velocity.RegisterUI('zcx.flash1',{
		defaultDuration:1000,
		calls:[
				[{opacity:1},0.1],
				[{opacity:0},0.1],
				[{opacity:1},0.1],
				[{opacity:0},0.1],
				[{opacity:1},0.1],
				[{opacity:0},0.1],
				[{opacity:1},0.1],
				[{opacity:0},0.1],
				[{opacity:1},0.1],
				[{opacity:0},0.1]
		]

	});
	
	$.Velocity.RegisterUI('zcx.fadeIn',{
		defaultDuration: 4000,
		calls: [
			[ { opacity: [ 1, 0 ] } ]
		]

	});
	
	$.Velocity.RegisterUI('zcx.rotateIn1',{
		defaultDuration:500,
		calls:[
			[{opacity:[1,0],scaleX:[1,5],scaleY:[1,5],rotateZ:[0,180]}]
		],
	});
	$.Velocity.RegisterUI('zcx.rotateIn2',{
		defaultDuration:500,
		calls:[
			[{opacity:[1,0],scaleX:[1,20],scaleY:[1,20],rotateZ:[0,-180]}]
		],
	});
	
	$.Velocity.RegisterUI('zcx.leftBottomBigIn',{
		defaultDuration:1000,
		calls:[
			[{opacity:[1,0],translateX:[0,-200],translateY:[-100,200]}]
		]
	});
	$.Velocity.RegisterUI('zcx.leftBottomBigOut',{
		defaultDuration:20000,
		calls:[
			[{translateX:[200,0],translateY:[-300,-100]}]
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
	
	$.Velocity.RegisterUI('zcx.slideLeftIn',{
		defaultDuration: 1000,
		calls: [
			[ { opacity: [ 1, 0 ], translateX: [ 0, -80 ], translateZ: 0 } ]
		]
	});
	
	$.Velocity.RegisterUI('zcx.slideLeftOut',{
		defaultDuration: 10000,
		calls: [
			[ {  translateX: [ 100, 0 ], translateZ: 0 } ]
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
		elements:$('.page2-1'),
		properties:'zcx.leftTopOut',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page2-2'),
		properties:'zcx.flash',
		options:{
			delay:300,
			sequenceQueue:false,
		}
		
	},{
		elements:$('.page2-line2'),
		properties:'zcx.fadeIn',
		options:{
			//delay:300,
			sequenceQueue:false
		}
		
	},{
		elements:$('.page2-line1'),
		properties:'zcx.fadeIn',
		options:{
			//delay:500,
			sequenceQueue:false,
			
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
			delay:100,
			sequenceQueue:false
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
		properties:'zcx.flash1',
		options:{
			//delay:100,
			sequenceQueue:false
		}
	},{
		elements:$('.page2-8'),
		properties:'zcx.rotateIn1',
		options:{
			//delay:100,
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
			//sequenceQueue:false
		}
	},{
		elements:$('.page3-2'),
		properties:'zcx.rightBottomIn2',
		options:{
			//delay:500,
			sequenceQueue:false
			 //easing: "easeInOut"
		}
	},{
		elements:$('.page3-5'),
		properties:'transition.fadeIn',
		options:{
			//sequenceQueue:false
		}
	},{
		elements:$('.page3-0'),
		properties:'transition.fadeIn',
		options:{
			//delay:300,
			sequenceQueue:false
		}
	},{
		elements:$('.page3-line1'),
		properties:'zcx.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page3-line2'),
		properties:'zcx.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page3-6'),
		properties:'zcx.flash',
		options:{
			delay:200,
			sequenceQueue:false
		}
	},{
		elements:$('.page3-6'),
		properties:'zcx.fadeInOut',
		options:{
			delay:700,
		}
		
	},{
		elements:$('.page3-4'),
		properties:'zcx.zoomIn',
		options:{
			delay:200,
			sequenceQueue:false
			 //easing: "easeInOut"
		}
	},{
		elements:$('.page-black1'),
		properties:'zcx.fadeInOut',
		options:{
			delay:800,
			sequenceQueue:false
		}
		
	},{
		elements:$('.page3'),
		properties:'transition.slideLeftBigOut',
		options:{
			delay:200,
			sequenceQueue:false
		}
		
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
		elements:$('.page4-line1'),
		properties:'zcx.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-line2'),
		properties:'zcx.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-4'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-1'),
		properties:'zcx.slideLeftIn',
		options:{
			delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page4-1'),
		properties:'zcx.slideLeftOut',
		options:{
			//delay:500,
			sequenceQueue:false
		}
	},{
		elements:$('.page4-7'),
		properties:'zcx.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-6'),
		properties:'callout.flash',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page4-5'),
		properties:'zcx.rotateIn1',
		options:{
			delay:200,
			sequenceQueue:false
		}
	},{
		elements:$('.page4'),
		properties:'transition.slideRightOut',
		options:{
			delay:800,
			//sequenceQueue:false
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
			delay:200,
			sequenceQueue:false
		}
		
	},{
		elements:$('.page5-line1'),
		properties:'zcx.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page5-line2'),
		properties:'zcx.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page5-0'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
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
		elements:$('.page6-line1'),
		properties:'zcx.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page6-line2'),
		properties:'zcx.fadeIn',
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
			delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page01'),
		properties:'transition.slideDownIn',
		options:{
			//delay:1000,
			sequenceQueue:false
		}
	},{
		elements:$('.page01-3'),
		properties:'transition.slideDownIn',
		options:{
			//delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page01-2'),
		properties:'transition.slideDownIn',
		options:{
			//delay:1000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page01-4'),
		properties:'transition.fadeIn',
		options:{
			complete: function(elements) { $('.page01-4').addClass('page-shake'); }
			//sequenceQueue:false
		}
	}
	

	
	];
	
	//page3 动画序列
	var page3Seq = [
	{
		elements:$('.page02'),
		properties:'transition.slideDownIn',
		options:{
			//delay:1000,
			sequenceQueue:false
		}
	},{
		elements:$('.page02-3'),
		properties:'transition.slideDownIn'
	},{
		elements:$('.page02-2'),
		properties:'transition.slideDownIn'
	},{
		elements:$('.page02-4'),
		properties:'transition.fadeIn',
		options:{
			complete: function(elements) { $('.page02-4').addClass('page-shake'); }
		}
	}
	];
	
	//page4 动画序列
	var page4Seq = [
	{
		elements:$('.page03'),
		properties:'transition.slideDownIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page03-3'),
		properties:'transition.slideDownIn'
	},{
		elements:$('.page03-2'),
		properties:'transition.slideDownIn'
	},{
		elements:$('.page03-4'),
		properties:'transition.fadeIn',
		options:{
			complete: function(elements) { $('.page03-4').addClass('page-shake'); }
		}
	}
	];
	
	//page5 动画序列
	var page5Seq = [
	{
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
		elements:$('.page8-btn'),
		properties:'transition.fadeIn',
		options:{
			//delay:500,
			sequenceQueue:false,
			complete: function(elements) { $('.page8-btn').addClass('page-flash'); }
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
		properties:'transition.fadeIn',
		options:{
			delay:300,
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeIn',
		options:{
			//delay:1000,
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeIn',
		options:{
			//delay:1000,
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeIn',
		options:{
			//delay:1000,
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeIn',
		options:{
			//delay:1000,
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word1'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	},{
		elements:$('.page8-word2'),
		properties:'transition.fadeOut',
		options:{
			delay:2000,
			//sequenceQueue:false
		}
	},{
		elements:$('.page8-word3'),
		properties:'transition.fadeIn',
		options:{
			sequenceQueue:false
		}
	}
	];
	
	
	
	
	$('.page01-4').click(function(e) {
		$('.page01').velocity('transition.slideUpBigOut');
		$.Velocity.RunSequence(page3Seq);
		
    });
	
	$('.page02-4').click(function(e) {
		$('.page02').velocity('transition.slideUpBigOut');
		$.Velocity.RunSequence(page4Seq);
		
    });
	
	$('.page03-4').click(function(e) {
		$('.page03').velocity('transition.slideUpBigOut');
		$.Velocity.RunSequence(page5Seq);
		
    });
	
	
	/*var startX,
        startY,
        x, //滑动的距离
        y,
        aboveY=0; //设一个全局变量记录上一次内部块滑动的位置 

	var inner=document.getElementById("inner");
  
	function touchSatrt(e){
		e.preventDefault();
		var touch=e.touches[0];
		startY = touch.pageY;   //刚触摸时的坐标              
	}

	function touchMove(e){
		 e.preventDefault();        
		 var  touch = e.touches[0];               
		 y = touch.pageY - startY;//滑动的距离               
		inner.style.top=aboveY+y+"px"; //这一句中的                          
	}  

	function touchEnd(e){
	  e.preventDefault();                   
	  aboveY=parseInt(inner.style.top);//touch结束后记录内部滑块滑动的位置 在全局变量中体现 一定要用parseInt()将其转化为整数字;
	}

	 $('.page01').on('touchstart', touchSatrt,false);  
	 $('.page01').on('touchmove', touchMove,false);  
	 $('.page01').on('touchend', touchEnd,false);  
*/
	
	

	
	$('.btn').click(function(e) {
		$('.page1').velocity('transition.slideUpBigOut');
		
        $('.page2').velocity('transition.fadeIn');
		$('.page1').hide();
		$.Velocity.RunSequence(page2Seq);
		
    });
	
	
	$('.submit-btn').click(function(e){
		
		e.preventDefault();
   document.getElementById("Uname").value="";
        document.getElementById("Sex").value="";
         document.getElementById("Ages").value="";
      document.getElementById("Phone").value="";
         document.getElementById("sheng").value="";
		$('.js-pop-box').show();
	});
	
	
	$('.js-pop-box .close-btn,.js-pop-box .cancle-btn').click(function(e){
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
		$('.js-pop-box').hide();
	});
	
	
	$('.share-btn').click(function(e){
		e.preventDefault();
		$('.share-img').show();
	});
	
	$('.js-pop-box .ok-btn').click(function(e){
		e.preventDefault();
        var Uname = "", Sex = "", Ages = "", Phone = "", sheng = "";
        Uname = document.getElementById("Uname").value;
        Sex = document.getElementById("Sex").value;
        Ages = document.getElementById("Ages").value;
        Phone = document.getElementById("Phone").value;
        sheng = document.getElementById("sheng").value;
        if(Uname==""||Uname=="请填写姓名"){
        document.getElementById("Uname").placeholder="请填写姓名";
        return;}
           if(Sex==""||Sex=="请填写性别"){
        document.getElementById("Sex").placeholder="请填写性别";
        return;} 
           if(Ages==""||Ages=="请填写驾龄"){
        document.getElementById("Ages").placeholder="请填写驾龄";
        return;
        }
         if(Phone==""||Phone=="请填写电话"||Phone=="该电话已经存在"){
        document.getElementById("Phone").placeholder="请填写电话";
        return;
        }
        else
        { 
            var mre = /^1\d{10}$/;
            if (!mre.test($("#Phone").val())){ 
                document.getElementById("Phone").value="";
                document.getElementById("Phone").placeholder="请输入正确手机号码";
                return;
            }
        }
        if(Phone=="请输入正确手机号码")
            return;
        if(Phone=="该电话已经存在") 
            return; 
           if(sheng==""||sheng=="请填写省份"){
        document.getElementById("sheng").placeholder="请填写省份";
        return;}  
          
        $.ajax({
            url: "../GLAjax.ashx",
            data: { "UName": Uname, "Sex": Sex, "Ages": Ages, "Phone": Phone, "Sheng": sheng },
            contentType: "application/json;charset=utf-8",
            type: "GET",  
            success: function (resute) { 
            if(resute=="1"){
           $('.pop-box2').show();
            }
            else
            {
             	    document.getElementById("Phone").value="";
                    document.getElementById("Phone").placeholder="该电话已经存在";
            }}
        });  
		
	});
	
	$('.pop-box2 .btn1').click(function(e){
		e.preventDefault();
		$('.pop-box2').hide();
		$('.js-pop-box').hide()
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
	
	$('.page8-btn').click(function(e){
		e.preventDefault();
		$('.pop-box3').show();
		
	});
	
	
	$('.pop-box3 .ok-btn1').click(function(e){
		e.preventDefault();
		$('.pop-box3').hide();
		$('.js-pop-box').show();
		
	});
	$('.pop-box3 .close-btn').click(function(e){
		e.preventDefault();
		$('.pop-box3').hide();
		
	});
	
	
})(jQuery);

var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?244e74d65b236982cf7234a043ba59fc";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();