(function (lib, img, cjs) {
var p; // shortcut to reference prototypes
// stage content:
(lib.OpenMeetingShow = function() {
	this.initialize();
	// main
	this.instance = new lib.Main();
	this.instance.setTransform(320,4000,1,1,0,0,0,320,4000);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,112.1,640,8000);
// symbols:
(lib.bg1 = function() {
	this.initialize(img.bg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,4000);

(lib.bg2 = function() {
	this.initialize(img.bg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,4000);

(lib.arrowImg = function() {
	this.initialize(img.arrow);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,50,38);

//page1 img
(lib.p11 = function() {
	this.initialize(img.p11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,182);

(lib.p110 = function() {
	this.initialize(img.p110);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,420);

(lib.p111 = function() {
	this.initialize(img.p111);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,650);

(lib.p112 = function() {
	this.initialize(img.p112);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,470);

(lib.p121 = function() {
	this.initialize(img.p121);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,294);

(lib.p12 = function() {
	this.initialize(img.p12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,540,160);

(lib.p13 = function() {
	this.initialize(img.p13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,44);

(lib.p14 = function() {
	this.initialize(img.p14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,342,44);

(lib.p15 = function() {
	this.initialize(img.p15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,342,44);

//page2 img
(lib.p21 = function() {
	this.initialize(img.p21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,470,70);

(lib.p22 = function() {
	this.initialize(img.p22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,470,70);

(lib.p23 = function() {
	this.initialize(img.p23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,470,70);

(lib.p24 = function() {
	this.initialize(img.p24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,470,70);

(lib.p25 = function() {
	this.initialize(img.p25);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,122);

(lib.p26 = function() {
	this.initialize(img.p26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,1229);

(lib.p27 = function() {
	this.initialize(img.p27);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,122);

(lib.p28 = function() {
	this.initialize(img.p28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,122);

(lib.p251 = function() {
	this.initialize(img.p251);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,78);

(lib.p261 = function() {
	this.initialize(img.p261);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,78);

(lib.p271 = function() {
	this.initialize(img.p271);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,78);

(lib.p281 = function() {
	this.initialize(img.p281);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,78);

(lib.p2quan = function() {
	this.initialize(img.p2quan);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,122,122);

(lib.p2line = function() {
	this.initialize(img.p2line);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,30);

//page3 img
(lib.p31 = function() {
	this.initialize(img.p31);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,410,120);

(lib.p32 = function() {
	this.initialize(img.p32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,330,330);

(lib.p33 = function() {
	this.initialize(img.p33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,248);

//page4 img
(lib.p41 = function() {
	this.initialize(img.p41);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,410,120);

(lib.p42 = function() {
	this.initialize(img.p42);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,330,330);

(lib.p43 = function() {
	this.initialize(img.p43);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,248);

//page5 img
(lib.p51 = function() {
	this.initialize(img.p51);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,410,120);

(lib.p52 = function() {
	this.initialize(img.p52);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,330,330);

(lib.p53 = function() {
	this.initialize(img.p53);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,248);

//page6 img
(lib.p61 = function() {
	this.initialize(img.p61);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,410,120);

(lib.p62 = function() {
	this.initialize(img.p62);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,330,330);

(lib.p63 = function() {
	this.initialize(img.p63);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,580,248);

//page7 img
(lib.p71 = function() {
	this.initialize(img.p71);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,200);

(lib.p72 = function() {
	this.initialize(img.p72);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,340);

(lib.p73 = function() {
	this.initialize(img.p73);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,220,40);

(lib.p74 = function() {
	this.initialize(img.p74);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,220,40);

(lib.p75 = function() {
	this.initialize(img.p75);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,220,40);

(lib.p76 = function() {
	this.initialize(img.p76);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,412);


//quan
(lib.quan = function() {
	this.initialize(img.quan);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,425,438);


//quan img
(lib.p_quan = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.quan();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,330,330);


//page2 layer
(lib.p2_1 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p21();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,363,129);

(lib.p2_2 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p22();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,363,129);

(lib.p2_3 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p23();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,363,129);

(lib.p2_4 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p24();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,363,129);


//p2 quan img
(lib.p2_quan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});
	// Layer 1
	this.instance = new lib.p2quan();
	this.instance.setTransform(61,61,1,1,0,0,0,61,61);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:359.1},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,122,122);

//page1 layer
(lib.p15_1 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p15();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,342,44);


(lib.p14_1 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p14();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,342,44);


(lib.p13_1 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p13();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,266,44);

(lib.p12_1 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p12();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,540,160);

(lib.p1_2_1 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p121();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,294);


(lib.p1_1_2 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p112();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,470);


(lib.p1_1_1 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p111();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,650);


(lib.p1_1_0 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p110();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,420);


(lib.p11_1 = function() {
	this.initialize();
	// Layer 1
	this.instance = new lib.p11();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,212);

//pubilc

(lib.bg = function() {
	this.initialize();
	// Layer 2
	this.instance = new lib.bg2();
	this.instance.setTransform(0,4000);
	// Layer 1
	this.instance_1 = new lib.bg1();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,8000);

(lib.arrow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});
	// Layer 1
	/*this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,255,255,0)").ss(4,1,1).p("AiqhTICpCnAACBUICpin");
	this.shape.setTransform(17.2,-1.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(4,1,1).p("AiqhTICpCnAACBUICpin");
	this.shape_1.setTransform(17.2,-0.3);*/
	
	this.initialize(mode,startPosition,loop,{});
	// Layer 1
	this.instance = new lib.arrowImg();
	this.instance.setTransform(10,0,1,1,0,0,0,25,17);
	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-2.0},8).wait(1));

	/*this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{y:-1.4}}]}).to({state:[{t:this.shape_1,p:{y:-0.3}}]},1).to({state:[{t:this.shape_1,p:{y:0.7}}]},1).to({state:[{t:this.shape_1,p:{y:1.8}}]},1).to({state:[{t:this.shape_1,p:{y:2.9}}]},1).to({state:[{t:this.shape_1,p:{y:4}}]},1).to({state:[{t:this.shape_1,p:{y:5.1}}]},1).to({state:[{t:this.shape_1,p:{y:6.3}}]},1).to({state:[{t:this.shape_1,p:{y:7.4}}]},1).to({state:[{t:this.shape_1,p:{y:8.5}}]},1).to({state:[{t:this.shape_1,p:{y:9}}]},1).to({state:[{t:this.shape_1,p:{y:9.5}}]},1).to({state:[{t:this.shape_1,p:{y:10}}]},1).to({state:[{t:this.shape_1,p:{y:10.5}}]},1).to({state:[{t:this.shape_1,p:{y:11}}]},1).to({state:[{t:this.shape_1,p:{y:11.5}}]},1).to({state:[{t:this.shape_1,p:{y:12}}]},1).to({state:[{t:this.shape_1,p:{y:12.5}}]},1).to({state:[{t:this.shape_1,p:{y:13}}]},1).to({state:[{t:this.shape_1,p:{y:13.5}}]},1).to({state:[{t:this.shape_1,p:{y:14}}]},1).to({state:[{t:this.shape_1,p:{y:14.5}}]},1).to({state:[{t:this.shape_1,p:{y:15}}]},1).to({state:[{t:this.shape_1,p:{y:15.5}}]},1).to({state:[{t:this.shape_1,p:{y:16}}]},1).to({state:[{t:this.shape_1,p:{y:16.5}}]},1).to({state:[{t:this.shape_1,p:{y:17}}]},1).to({state:[{t:this.shape_1,p:{y:17.5}}]},1).to({state:[{t:this.shape_1,p:{y:18}}]},1).to({state:[{t:this.shape,p:{y:18.5}}]},1).wait(1));*/

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9.9,34.4,25.9);

(lib.quan_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});
	// Layer 1
	this.instance = new lib.p_quan();
	this.instance.setTransform(165,165,1,1,0,0,0,165,165);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:359.1},34).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,330,330);

//page7
(lib.p7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});
	
	// p7-1
	this.instance_1 = new lib.p71();
	this.instance_1.setTransform(320,210,0.5,0.5,0,0,0,200,100);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(14).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(28));
	
	// p7-2
	this.instance_2 = new lib.p72();
	this.instance_2.setTransform(320,520,1,1,0,0,0,200,170);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({_off:false},0).to({alpha:1},20,cjs.Ease.get(1)).wait(28));
	
	// p7-3
	this.instance_3 = new lib.p73();
	this.instance_3.setTransform(320,770,0.6,0.6,0,0,0,110,20);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(34).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(38));
	
	// p7-4
	this.btn2 = new lib.p74();
	this.btn2.setTransform(430,890,0.6,0.6,0,0,0,100,20);
	this.btn2.alpha = 0;
	this.btn2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.btn2).wait(44).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(48));
	new cjs.ButtonHelper(this.btn2, 0, 1, 2, false, new lib.p74(), 3);
	
	// p7-5
	this.btn1 = new lib.p75();
	this.btn1.setTransform(210,890,0.6,0.6,0,0,0,100,20);
	this.btn1.alpha = 0;
	this.btn1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.btn1).wait(44).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(48));
	new cjs.ButtonHelper(this.btn1, 0, 1, 2, false, new lib.p75(), 3);
	
	// p7-6
	this.instance_6 = new lib.p76();
	this.instance_6.setTransform(320,-206,1,1,0,0,0,320,206);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:false},0).to({y:206},20,cjs.Ease.get(1)).wait(14));
	
	
	
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(53,44.6,532,921.7);

//page6
(lib.p6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});
	// p6-1
	this.instance_1 = new lib.p61();
	this.instance_1.setTransform(221,-150,1,1,0,0,0,205,60);
	this.instance_1.off = true;
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},0).to({y:150},20,cjs.Ease.get(1)).wait(26));

	// p6-2
	this.instance_2 = new lib.p62();
	this.instance_2.setTransform(320,440,0.1,0.1,0,0,0,165,165);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(30));
	
	// p6-3
	this.more6 = new lib.p63();
	this.more6.setTransform(320,1400,1,1,0,0,0,290,124);
	this.more6.alpha = 0;
	this.more6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.more6).wait(28).to({_off:false},0).to({y:780,alpha:1},20,cjs.Ease.get(1)).wait(44));
	new cjs.ButtonHelper(this.more6, 0, 1, 2, false, new lib.p63(), 3);

	// quan
	this.instance_4 = new lib.quan_1();
	this.instance_4.setTransform(320,440,1.5,1.5,0,0,0,165,165);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(14).to({scaleX:1,scaleY:1,alpha:1},14).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,196,184);

//page5
(lib.p5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});
	// p5-1
	this.instance_1 = new lib.p51();
	this.instance_1.setTransform(221,-150,1,1,0,0,0,205,60);
	this.instance_1.off = true;
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},0).to({y:150},20,cjs.Ease.get(1)).wait(26));

	// p5-2
	this.instance_2 = new lib.p52();
	this.instance_2.setTransform(320,440,0.1,0.1,0,0,0,165,165);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(30));
	
	// p5-3
	this.more5 = new lib.p53();
	this.more5.setTransform(320,1400,1,1,0,0,0,290,124);
	this.more5.alpha = 0;
	this.more5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.more5).wait(28).to({_off:false},0).to({y:780,alpha:1},20,cjs.Ease.get(1)).wait(44));
	new cjs.ButtonHelper(this.more5, 0, 1, 2, false, new lib.p53(), 3);

	// quan
	this.instance_4 = new lib.quan_1();
	this.instance_4.setTransform(320,440,1.5,1.5,0,0,0,165,165);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(14).to({scaleX:1,scaleY:1,alpha:1},14).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.7,18.6,637.5,657);

//page4
(lib.p4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// p4-1
	this.instance_1 = new lib.p41();
	this.instance_1.setTransform(221,-150,1,1,0,0,0,205,60);
	this.instance_1.off = true;
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},0).to({y:150},20,cjs.Ease.get(1)).wait(26));

	// p4-2
	this.instance_2 = new lib.p42();
	this.instance_2.setTransform(320,440,0.1,0.1,0,0,0,165,165);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(30));
	
	// p4-3
	this.more4 = new lib.p43();
	this.more4.setTransform(320,1400,1,1,0,0,0,290,124);
	this.more4.alpha = 0;
	this.more4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.more4).wait(28).to({_off:false},0).to({y:780,alpha:1},20,cjs.Ease.get(1)).wait(44));
	new cjs.ButtonHelper(this.more4, 0, 1, 2, false, new lib.p43(), 3);

	// quan
	this.instance_4 = new lib.quan_1();
	this.instance_4.setTransform(320,440,1.5,1.5,0,0,0,165,165);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(14).to({scaleX:1,scaleY:1,alpha:1},14).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(11.4,241.6,637.5,657);

//page3
(lib.p3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// p3-1
	this.instance_1 = new lib.p31();
	this.instance_1.setTransform(221,-150,1,1,0,0,0,205,60);
	this.instance_1.off = true;
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},0).to({y:150},20,cjs.Ease.get(1)).wait(26));

	// p3-2
	this.instance_2 = new lib.p32();
	this.instance_2.setTransform(320,440,0.1,0.1,0,0,0,165,165);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},20,cjs.Ease.get(1)).wait(30));
	
	// p3-3
	this.more3 = new lib.p33();
	this.more3.setTransform(320,1400,1,1,0,0,0,290,124);
	this.more3.alpha = 0;
	this.more3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.more3).wait(28).to({_off:false},0).to({y:780,alpha:1},20,cjs.Ease.get(1)).wait(44));
	new cjs.ButtonHelper(this.more3, 0, 1, 2, false, new lib.p33(), 3);

	// quan
	this.instance_4 = new lib.quan_1();
	this.instance_4.setTransform(320,440,1.5,1.5,0,0,0,165,165);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(14).to({scaleX:1,scaleY:1,alpha:1},14).wait(30));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.9,78.2,510,525.6);

//page2
(lib.p2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// p25_1
	this.instance_9 = new lib.p251();
	this.instance_9.setTransform(-100,710,1,1,0,0,0,61,39);
	this.instance_9.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(50).to({x:100,alpha:1},14).wait(170));
	// p26_1
	this.instance_10 = new lib.p261();
	this.instance_10.setTransform(-250,710,1,1,0,0,0,61,39);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;
	
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(70).to({_off:false},0).to({x:250,alpha:1},14).wait(150));

	// p27_1
	this.instance_11 = new lib.p271();
	this.instance_11.setTransform(-400,710.1,1,1,0,0,0,61,39);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(90).to({_off:false},0).to({x:400,alpha:1},14).wait(130));
	
	// p28_1
	this.instance_12 = new lib.p281();
	this.instance_12.setTransform(-550,710,1,1,0,0,0,61,39);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(110).to({_off:false},0).to({x:550,alpha:1},14).wait(110));

	
	// p25
	this.instance_5 = new lib.p25();
	this.instance_5.setTransform(-100,580,1,1,0,0,0,61,61);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(50).to({x:100,alpha:1},14).wait(170));	
	// p26
	this.instance_6 = new lib.p26();
	this.instance_6.setTransform(-250,580,1,1,0,0,0,61,61);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(70).to({_off:false},0).to({x:250,alpha:1},14).wait(150));


	// p27
	this.instance_7 = new lib.p27();
	this.instance_7.setTransform(-400,580.1,1,1,0,0,0,61,61);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(90).to({_off:false},0).to({x:400,alpha:1},14).wait(130));
	
	// p28
	this.instance_8 = new lib.p28();
	this.instance_8.setTransform(-550,580,1,1,0,0,0,61,61);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(110).to({_off:false},0).to({x:550,alpha:1},14).wait(110));

	
	// p24
	this.instance_4 = new lib.p24();
	this.instance_4.setTransform(300,380,1,1,0,0,0,235,35);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(30).to({_off:false},0).to({alpha:1},14).wait(180));

	// p23
	this.instance_3 = new lib.p23();
	this.instance_3.setTransform(300,300.1,1,1,0,0,0,235,35);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(20).to({_off:false},0).to({alpha:1},14).wait(190));

	// p22
	this.instance_2 = new lib.p22();
	this.instance_2.setTransform(300,220,1,1,0,0,0,235,35);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(10).to({_off:false},0).to({alpha:1},14).wait(200));

	// p21
	this.instance_1 = new lib.p21();
	this.instance_1.setTransform(300,140,1,1,0,0,0,235,35);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:1},14).wait(210));

	// p2-line
	this.instance_001 = new lib.p2line();
	this.instance_001.setTransform(-320,800,1,1,0,0,0,320,15);
	this.instance_001.alpha = 1;
	this.instance_001._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_001).wait(50).to({_off:false},0).to({x:320},80,cjs.Ease.get(1)).wait(142));

	// p2 quan1
	this.instance_01 = new lib.p2_quan();
	this.instance_01.setTransform(100,580,1,1,0,0,0,61,61);
	this.instance_01.rotation = 0;
	this.instance_01.alpha = 0;
	this.instance_01._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_01).wait(70).to({_off:false},0).to({rotation:360,alpha:1},21));
	
	// p2 quan2
	this.instance_02 = new lib.p2_quan();
	this.instance_02.setTransform(250,580,1,1,0,0,0,61,61);
	this.instance_02.rotation = 0;
	this.instance_02.alpha = 0;
	this.instance_02._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_02).wait(90).to({_off:false},0).to({rotation:360,alpha:1},21));
	// p2 quan3
	this.instance_03 = new lib.p2_quan();
	this.instance_03.setTransform(400,580,1,1,0,0,0,61,61);
	this.instance_03.rotation = 0;
	this.instance_03.alpha = 0;
	this.instance_03._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_03).wait(110).to({_off:false},0).to({rotation:360,alpha:1},21));
	// p2 quan4
	this.instance_04 = new lib.p2_quan();
	this.instance_04.setTransform(550,580,1,1,0,0,0,61,61);
	this.instance_04.rotation = 0;
	this.instance_04.alpha = 0;
	this.instance_04._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_04).wait(130).to({_off:false},0).to({rotation:360,alpha:1},21));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(91.4,276.6,466.6,384.2);

//loading
(lib.Loading = function() {
	this.initialize();

	// Layer 2
	this.msg = new cjs.Text("99%", "30px Heiti SC", "#0098AC");
	this.msg.textAlign = "center";
	this.msg.lineHeight = 38;
	this.msg.lineWidth = 74;
	this.msg.setTransform(318.3,451);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Egx/BOwMAAAidfMBj+AAAMAAACdfg");
	this.shape.setTransform(320,504);

	this.addChild(this.shape,this.instance,this.msg);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


//page1
(lib.p1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// line
	/*this.instance = new lib.linemc();
	this.instance.setTransform(143,207,1,1,0,0,0,101.5,3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0));*/

	

	// p1-1
	this.instance_1 = new lib.p11_1();
	this.instance_1.setTransform(320,-91,1,1,0,0,0,320,91);
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:91},14,cjs.Ease.get(1)));
	

	// p1-2.png
	this.instance_2 = new lib.p12_1();
	this.instance_2.setTransform(320,500,0.3,0.3,0,0,0,270,80);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(32).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},35,cjs.Ease.get(1)).wait(19));
	
	// p121.png
	this.instance_121 = new lib.p1_2_1();
	this.instance_121.setTransform(320,490,1,1,0,0,0,320,147);
	this.instance_121.alpha = 0;
	this.instance_121._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_121).wait(90).to({_off:false},0).to({alpha:1},35,cjs.Ease.get(1)).wait(49));
	
	
	// p110.png
	this.instance_110 = new lib.p1_1_0();
	this.instance_110.setTransform(320,366,0.5,0.5,0,0,0,320,210);
	this.instance_110.alpha = 0;
	this.instance_110._off = true;
	
	this.timeline.addTween(cjs.Tween.get(this.instance_110).wait(14).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},15,cjs.Ease.get(1)).wait(40));
	
	// p112.png
	this.instance_112 = new lib.p1_1_2();
	this.instance_112.setTransform(320,198,0.5,0.5,0,0,0,320,235);
	this.instance_112.alpha = 0;
	this.instance_112._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_112).wait(60).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},35,cjs.Ease.get(1)).wait(49));
	
	
	// p111
	this.instance_111 = new lib.p1_1_1();
	this.instance_111.setTransform(320,-325,1,1,0,0,0,320,325);
	
	this.timeline.addTween(cjs.Tween.get(this.instance_111).to({y:325},14,cjs.Ease.get(1)));
	
	
	// p1-3.png
	this.instance_3 = new lib.p13_1();
	this.instance_3.setTransform(320,675,0.3,0.3,0,0,0,133,22);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;
	
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(58).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},35,cjs.Ease.get(1)).wait(49));
	/*this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(69).to({_off:false},0).to({scaleX:1.1,scaleY:1.1,alpha:1},6,cjs.Ease.get(1)).to({scaleX:1,scaleY:1},4).wait(4).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).wait(4).wait(2).to({scaleY:1.03,skewX:14.5},0).wait(2).to({scaleY:1,skewX:0},0).wait(2).to({scaleY:1.03,skewX:-14.3},0).wait(2).to({scaleY:1,skewX:0},0).wait(1).to({scaleY:1,skewX:5.5},0).wait(1).to({scaleY:1,skewX:0},0).wait(49));*/
	
	// p1-4.png
	this.instance_4 = new lib.p14_1();
	this.instance_4.setTransform(320,752,0.3,0.3,0,0,0,171,22);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(76).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},27,cjs.Ease.get(1)).wait(49));

	// p1-5.png
	this.instance_5 = new lib.p15_1();
	this.instance_5.setTransform(320,826,0.3,0.3,0,0,0,171,22);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(94).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},35,cjs.Ease.get(1)).wait(49));


}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-255.9,640,212);


(lib.Main = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_130 = function() {
		this.stop();
	}
	this.frame_300 = function() {
		this.stop();
	}
	this.frame_380 = function() {
		this.stop();
	}
	this.frame_460 = function() {
		this.stop();
	}
	this.frame_540 = function() {
		this.stop();
	}
	this.frame_620 = function() {
		this.stop();
	}
	this.frame_800 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(130).call(this.frame_130).wait(170).call(this.frame_300).wait(80).call(this.frame_380).wait(80).call(this.frame_460).wait(80).call(this.frame_540).wait(80).call(this.frame_620).wait(80).call(this.frame_800));

	// arrow
	this.arrow = new lib.arrow();
	this.arrow.setTransform(320.1,948.6,1,1,0,0,0,17.2,8.4);
	this.arrow.alpha = 0;
	this.arrow._off = true;

	this.timeline.addTween(cjs.Tween.get(this.arrow).wait(115).to({_off:false},0).to({alpha:1},11).to({_off:true},495).wait(80));

	// p7
	this.p7 = new lib.p7("synched",0);
	this.p7.setTransform(290,480,1,1,0,0,0,290,484.1);
	this.p7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.p7).wait(646).to({_off:false},0).wait(55));

	// p6
	this.p6 = new lib.p6("synched",0);
	this.p6.setTransform(301.2,463.8,1,1,0,0,0,301.2,463.8);
	this.p6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.p6).wait(566).to({startPosition:0,_off:false},0).wait(55).to({startPosition:55},0).to({y:-544,startPosition:79},24,cjs.Ease.get(-0.99)).to({_off:true},1).wait(55));

	// p5
	this.p5 = new lib.p5("synched",0);
	this.p5.setTransform(336.1,396.4,1,1,0,0,0,336.1,396.4);
	this.p5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.p5).wait(485).to({startPosition:0,_off:false},0).wait(56).to({startPosition:56},0).to({y:-611.4,startPosition:0},24,cjs.Ease.get(-0.99)).to({_off:true},1).wait(135));

	// p4
	this.p4 = new lib.p4("synched",0);
	this.p4.setTransform(293.3,394.6,1,1,0,0,0,293.3,394.6);
	this.p4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.p4).wait(405).to({startPosition:0,_off:false},0).wait(56).to({startPosition:56},0).to({y:-613.2,startPosition:0},24,cjs.Ease.get(-0.99)).to({_off:true},1).wait(215));

	// p3
	this.p3 = new lib.p3("synched",0);
	this.p3.setTransform(243.2,380.4,1,1,0,0,0,243.2,380.4);
	this.p3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.p3).wait(325).to({startPosition:0,_off:false},0).wait(56).to({startPosition:56},0).to({y:-627.4,startPosition:0},24,cjs.Ease.get(-0.99)).to({_off:true},1).wait(295));

	// p2
	this.p2 = new lib.p2("synched",0);
	this.p2.setTransform(307,432.6,1,1,0,0,0,307,432.6);
	this.p2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.p2).wait(145).to({startPosition:0,_off:false},0).wait(156).to({startPosition:156},0).to({y:-575.2,startPosition:180},24,cjs.Ease.get(-0.99)).to({_off:true},1).wait(375));

	// p1
	this.instance_5 = new lib.p1("synched",0);
	this.instance_5.setTransform(320,300.1,1,1,0,0,0,320,300.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(14).to({startPosition:0,_off:false},0).wait(117).to({startPosition:116},0).to({y:-899.7,startPosition:140},24,cjs.Ease.get(-0.99)).to({_off:true},1).wait(545));

	// bg
	this.instance_6 = new lib.bg();
	this.instance_6.setTransform(320,4112.1,1,1,0,0,0,320,4000);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:4000,alpha:1},19).wait(112).to({y:2992},49,cjs.Ease.get(-0.99)).wait(121).to({y:1739.7},49,cjs.Ease.get(-0.99)).wait(31).to({y:711.4},49,cjs.Ease.get(-0.99)).wait(31).to({y:-590.7},49,cjs.Ease.get(-0.99)).wait(31).to({y:-1586.9},49,cjs.Ease.get(-0.99)).wait(31).to({y:-2569.2},49,cjs.Ease.get(-0.99)).wait(31));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,112.1,640,8000);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;