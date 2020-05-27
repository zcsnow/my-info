var flag=false;

var tool={
		  defaultScroll:function(e){e.preventDefault();},
		  disabledScroll:function(){document.addEventListener("touchmove",this.defaultScroll,false);},
		  enabledScroll:function(){document.removeEventListener("touchmove",this.defaultScroll,false);},
		  disabledPop:function(){window.addEventListener("touchstart",this.defaultScroll,false);},
		  enabledPop:function(){window.removeEventListener("touchstart",this.defaultScroll,false);}, 
	}
	
//滚动条不可滚动、高度100%
tool.disabledScroll();

var preload = new createjs.LoadQueue();
var manifest = [
{src: 'images/p1_bg.jpg', id: 'p1_bg'},
{src: 'images/p2_bg1.jpg', id: 'p2_bg1'},
{src: 'images/p2_bg2.jpg', id: 'p2_bg2'},
{src: 'images/p3_bg1.jpg', id: 'p3_bg1'},
{src: 'images/p3_bg2.jpg', id: 'p3_bg2'},
{src: 'images/p4_bg1.jpg', id: 'p4_bg1'},
{src: 'images/p4_bg2.jpg', id: 'p4_bg2'},
{src: 'images/p4_bg3.jpg', id: 'p4_bg3'},
{src: 'images/p5_bg1.jpg', id: 'p5_bg1'},
{src: 'images/p5_bg2.jpg', id: 'p5_bg2'},
{src: 'images/p6_bg1.jpg', id: 'p6_bg1'},
{src: 'images/p6_bg2.jpg', id: 'p6_bg2'},
{src: 'images/p7_bg.jpg', id: 'p7_bg'},

{src: 'images/wall1.jpg', id: 'wall1'},
{src: 'images/wall2.jpg', id: 'wall2'},
{src: 'images/wall3.jpg', id: 'wall3'},
{src: 'images/wall4.jpg', id: 'wall4'},
{src: 'images/wall5.jpg', id: 'wall5'},
{src: 'images/wall6.jpg', id: 'wall6'},

{src: 'images/p1_img1.png', id: 'p1_img1'},
{src: 'images/p1_img2.png', id: 'p1_img2'},
{src: 'images/p1_img3.png', id: 'p1_img3'},
{src: 'images/p1_img4.png', id: 'p1_img4'},
{src: 'images/p2_bg3.png', id: 'p2_bg3'},
{src: 'images/p2_img1.png', id: 'p2_img1'},
{src: 'images/p2_img2.png', id: 'p2_img2'},
{src: 'images/p2_img3_2.png', id: 'p2_img3_2'},
{src: 'images/p2_img3_3.png', id: 'p2_img3_3'},
{src: 'images/p3_arm1.png', id: 'p3_arm1'},
{src: 'images/p3_arm2.png', id: 'p3_arm2'},
{src: 'images/p3_clothes.png', id: 'p3_clothes'},
{src: 'images/p4_img1.png', id: 'p4_img1'},
{src: 'images/p4_img2.png', id: 'p4_img2'},
{src: 'images/p4_img5.png', id: 'p4_img5'},
{src: 'images/p4_img6.png', id: 'p4_img6'},
{src: 'images/p5_man.png', id: 'p5_man'},
{src: 'images/p5_arm1.png', id: 'p5_arm1'},
{src: 'images/p5_arm2.png', id: 'p5_arm2'},
{src: 'images/p5_txt4.png', id: 'p5_txt4'},
{src: 'images/p6_boy1.png', id: 'p6_boy1'},
{src: 'images/p6_boy2.png', id: 'p6_boy2'},
{src: 'images/p7_img.png', id: 'p7_img'},
{src: 'images/p2_title.png', id: 'p2_title'},
{src: 'images/p3_title.png', id: 'p3_title'},
{src: 'images/p4_title.png', id: 'p4_title'},
{src: 'images/p5_title.png', id: 'p5_title'},
{src: 'images/p6_title.png', id: 'p6_title'},

{src: 'images/bgmusic.mp3?6',id: 'bgm'},
{src: 'images/p1_wall_voice.mp3',id: 'p1_wall_voice'},
{src: 'images/p2_wall_voice.mp3',id: 'p2_wall_voice'},
{src: 'images/p3_wall_voice.mp3',id: 'p3_wall_voice'},
{src: 'images/p4_wall_voice.mp3',id: 'p4_wall_voice'},
{src: 'images/p5_wall_voice.mp3?2',id: 'p5_wall_voice'},
{src: 'images/p6_wall_voice.mp3',id: 'p6_wall_voice'},

{src: 'images/p2_voice1.mp3?2',id: 'sound2_1'},
{src: 'images/p2_voice2.mp3?2',id: 'sound2_2'},
{src: 'images/p2_voice3.mp3?2', id: 'sound2_3'},
{src: 'images/p3_voice1.mp3?2', id: 'sound3_1'},
{src: 'images/p3_voice2.mp3?2',id: 'sound3_2'},
{src: 'images/p3_voice3.mp3?2',id: 'sound3_3'},
{src: 'images/p3_voice4.mp3?2', id: 'sound3_4'},
{src: 'images/p4_voice1.mp3?2',id: 'sound4_1'},
{src: 'images/p4_voice2.mp3?2',id: 'sound4_2'},
{src: 'images/p4_voice3.mp3?2', id: 'sound4_3'},
{src: 'images/p4_voice4.mp3?2',id: 'sound4_4'},
{src: 'images/p4_voice5.mp3?2',id: 'sound4_5'},
{src: 'images/p5_voice1.mp3?3', id: 'sound5_1'},
{src: 'images/p5_voice2.mp3?2',id: 'sound5_2'},
{src: 'images/p5_voice3.mp3?3', id: 'sound5_3'},
{src: 'images/p5_voice4.mp3?2',id: 'sound5_4'},
{src: 'images/p6_voice1.mp3?2',id: 'sound6_1'},
{src: 'images/p6_voice2.mp3?2',id: 'sound6_2'},
{src: 'images/p6_voice3.mp3?2', id: 'sound6_3'},

];
function init() {
  
  preload.installPlugin(createjs.Sound);//注意加载音频文件需要调用如下代码行
  preload.addEventListener("fileload", handleFileLoad);
  preload.addEventListener("progress", handleFileProgress);
  preload.addEventListener("complete", handleFileComplete);
  preload.addEventListener("error", loadError);
  //preload.loadFile("assets/preloadjs-bg-center.png");
  preload.loadManifest(manifest);
}
init();

//处理单个文件加载
function handleFileLoad(event) {
	console.log("文件类型: " + event.item.type);
	if(event.item.id == "logo"){
		console.log("logo图片已成功加载");
	}
}

//处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
function loadError(evt) {
	console.log("加载出错！",evt.text);
}

//已加载完毕进度 
function handleFileProgress(event) {
	//console.log("已加载 " + (preload.progress*100|0) + " %");
	//$('#progressText').html((preload.progress*100|0) + " %");
	//console.log(preload.progress);
	if(preload.progress>0.3){
	$('#progressText').html('听说美术馆里出现一款神秘耳机之后');
	}
	if(preload.progress>0.7){
	$('#progressText').html('世界名画突然集体消失?');
	}
	$("#progressbar").width((preload.progress*100|1) + "%");
}

function handleFileComplete(event) {
  //document.body.appendChild(event.result);
  console.log("已加载完毕全部资源");
  $('.loading-box').fadeOut();
  page3Ani();
}

var soundID = "Thunder";

function loadSound () {
  createjs.Sound.registerSound("assets/thunder.ogg", soundID);
}

function playSound () {
  createjs.Sound.play(soundID);
}


  
function audioAutoPlay(id){
	var audio = document.getElementById(id),
		play = function(){
		audio.play();
		document.removeEventListener("touchstart",play, false);
	};
	audio.play();
	document.addEventListener("WeixinJSBridgeReady", function () {//微信
	   play();
	   /*$('#p2Voice')[0].play();
	   $('#p2Voice')[0].pause();
*/
	}, false);
	document.addEventListener('YixinJSBridgeReady', function() {//易信
			  play();
		}, false);
	//document.addEventListener("touchstart",play, false);
}
audioAutoPlay('bgMusic');
$('#bgMusic')[0].volume=0.2;


function page1Ani(){
	$('.page1').show();
	$('.music').show();
	
}

$('.page1').on('click',function(e){
	e.stopPropagation();
	$('.page1').fadeOut();	
	$('.page1-wall').show();
	$('.page1-wall .bg').addClass('page1WallBgAni')
	$('.page1-wall .txt').fadeIn();
	createjs.Sound.play('p1_wall_voice');
	
	setTimeout(function(){
		$('.page1-wall .voice-hand').show();
		$('.page1-wall .voice-hand').on('click',function(e){
			$('.page1-wall .voice-hand').hide();
			$('.page1-wall').hide();
			$('.page2-black').show();
			setTimeout(function(){
			$('.page2-black .text').fadeIn()
			},500);
			setTimeout(function(){
				$('.page2-black .text').fadeOut();	
				setTimeout(function(){
				 page2Ani();
				},500);
			},3500);
			
		});
	},3800);

	/*setTimeout(function(){
		page2Ani();
	},3000);*/
});


function page2Ani(){
	//$('.page1').fadeOut();
	//$('.page2-black').fadeOut();	
	$('.page2').show();
	$('.page2 .ele-box').addClass('animated fadeInLeft');
	setTimeout(function(){
		$('.page2-black').hide();	
		$('.page2 .headset-box').fadeIn();
		$('.page2 .ele2').show();
		$('.page2 .ele3').addClass('mouthMove1');
		$('.page2 .ele4').addClass('eyeMove1');
		$('.page2 .txt1').fadeIn();
		//$('#p2Voice')[0].play();
		//createjs.Sound.registerSound("images/p2_voice2.mp3", 'sound2_2');
		 createjs.Sound.play('sound2_1');
	},1000);
	setTimeout(function(){
		$('.page2 .quan-box').fadeIn();
		$('.page2 .voice-hand').fadeIn();
		
		$('.page2 .ele2').fadeOut();
		$('.page2 .txt1').fadeOut();
		$('.page2 .ele3').removeClass('mouthMove1');
		//$('.page2 .ele4').removeClass('eyeMove1');
	
	
	$('.page2 .headset-btn').on('click',function(e){
		$('.page2 .voice-hand').hide();
		/*$('.page2 .ele2').show();
		$('.page2 .ele3').addClass('mouthMove1');
		$('.page2 .ele4').addClass('eyeMove1');
		$('.page2 .txt1').fadeIn();
		$('#p2Voice')[0].play();
		setTimeout(function(){*/
			
			$('.page2 .txt2').fadeIn();
			//$('#p2Voice1')[0].pause();
			
			//$('#p2Voice2')[0].play();
			
			//$('#p2Voice').attr('src','images/p2_voice2.mp3');
			//$('#p2Voice')[0].play();
			createjs.Sound.play('sound2_2');
			$('.page2 .headset-btn').off('click');
			$('.page2 .ele4').addClass('eyeDown');
			setTimeout(function(){
				
				$('.page2 .txt2').hide();
				$('.page2 .txt3').fadeIn();
				$('.page2 .ele4').addClass('eyeCenter');
				setTimeout(function(){
					$('.page2 .bg2').fadeIn();
					$('.page2 .ele3').find('img').attr('src','images/p2_img3_2.png');
					$('.page2 .ele4').addClass('eyeRight');
				},5000);
				setTimeout(function(){

					$('.page2 .ele3').find('img').attr('src','images/p2_img3_3.png');
					//createjs.Sound.play('sound2_3');
					$('.page2 .txt3').hide();
					//$('.page2 .txt4').fadeIn();
					$('.page2 .end-pass-btn').fadeIn();
					$('.page2 .end-pass-btn').on('click',function(e){
					//setTimeout(function(){
						$('.page2 .end-pass-btn').hide();
						$('.page2 .ele4').removeClass('eyeMove1');
						$('.page2 .ele3').find('img').attr('src','images/p2_img3.png');
						$('.page2 .ele4').addClass('eyeLeft');
						//$('#p2Voice3')[0].pause();
						$('.page2 .bg2').fadeOut();

						//$('.page2 .ele4').removeClass('eyeMove1');
						$('.page2 .txt4').hide();
						//$('.page2 .p2-last-title').fadeIn();
						$('.page2 .end').show();
						
						//$('.page2 .bg').css({'background-image':'url(images/p2_bg2.jpg)'})
						$('.page2 .bg').hide();
						$('.page2 .last-bg').show();
						//$('.page2 .quan-box').hide();
						
						$('.page2 .ele2').hide();
						setTimeout(function(){
							$('.page2').fadeOut();	
							$('.page2-wall').show();
							$('.page2-wall .txt').fadeIn();
							createjs.Sound.play('p2_wall_voice');
							$('.page2-wall .mouth').addClass('p2wallMouthMove');
							setTimeout(function(){
								$('.page2-wall .txt').hide();
								$('.page3-black').show();
								setTimeout(function(){
								$('.page3-black .text').fadeIn()
								},500);
								setTimeout(function(){
									$('.page3-black .text').fadeOut();	
									setTimeout(function(){
									 page3Ani();
									},500);
								},2500);
								
								//page3Ani();
							},3600);
							
						 },5000);
						
					//},7000);
					});
				},6000);
			},4000);
		//},4000);
		
	});
	
	},4000)
	
}

function page3Ani(){ 
	//$('.page2').fadeOut();
	$('.page2-wall').fadeOut();	
	$('.page3').show();
	$('.page3 .ele-box').addClass('animated fadeInLeft');
	setTimeout(function(){
		$('.page3-black').hide();	
		$('.page3 .ele4').addClass('eyeMove1');
		$('.page3 .ele6').addClass('armMove2');
		createjs.Sound.play('sound3_1');
		$('.page3 .txt1').fadeIn();
		$('.page3 .headset-box').fadeIn();
		setTimeout(function(){
			$('.page3 .txt1').hide();
			$('.page3 .txt2').fadeIn();
			
			//$('.page3 .ele7').addClass('armMove2');
			$('.page3 .ele8').addClass('mouthMove2');
			setTimeout(function(){
				//$('.page3 .ele6').removeClass('armMove2');
				$('.page3 .ele8').removeClass('mouthMove2');
				$('.page3 .txt2').hide();
				$('.page3 .txt3').fadeIn();
				$('.page3 .ele2').addClass('armMove1');
				$('.page3 .ele3').addClass('mouthMove1');
				
				setTimeout(function(){
					//$('#p2Voice').attr('src','images/p3_voice2.mp3');
					//$('#p2Voice')[0].play();
					createjs.Sound.play('sound3_2');
					$('.page3 .ele2').removeClass('armMove1');
					$('.page3 .ele3').removeClass('mouthMove1');
					//('.page3 .ele4').removeClass('eyeMove1');
					$('.page3 .txt3').hide();
					$('.page3 .txt4').fadeIn();
					//$('.page3 .ele6').addClass('armMove2');
					$('.page3 .ele8').addClass('mouthMove2');
					setTimeout(function(){
				      //$('.page3 .ele6').removeClass('armMove2');
					  $('.page3 .ele8').removeClass('mouthMove2');
					  
					  $('.page3 .quan-box').fadeIn();
					  $('.page3 .voice-hand').fadeIn();
					  $('.page3 .txt4').hide();
					  $('.page3 .headset-btn').on('click',function(e){
						  $('.page3 .voice-hand').hide();
						  
						  createjs.Sound.play('sound3_3');
						  $('.page3 .headset-btn').off('click');
						  $('.page3 .txt5').fadeIn();
						  setTimeout(function(){
							  $('.page3 .txt5').hide();
							  $('.page3 .txt6').fadeIn();
							  setTimeout(function(){
								 //createjs.Sound.play('sound3_4');
								  $('.page3 .txt6').hide();
								  //$('.page3 .txt7').fadeIn();
								  $('.page3 .end-pass-btn').fadeIn();
								  $('.page3 .end-pass-btn').on('click',function(e){
								  //setTimeout(function(){
									  $('.page3 .end-pass-btn').hide();
									 //$('.page3 .p3-last-title').fadeIn();
									 $('.page3 .end').show();
									 //$('.page3 .bg').css({'background-image':'url(images/p3_bg2.jpg)'});
									 $('.page3 .bg').hide();
									 $('.page3 .last-bg').show();
									 $('.page3 .people-img').show();
									 $('.page3 .ele-box').hide();
									 $('.page3 .headset-box').hide();
									 setTimeout(function(){
										$('.page3').fadeOut();	
										$('.page3-wall').show();
										$('.page3-wall .txt').fadeIn();
										createjs.Sound.play('p3_wall_voice');
										setTimeout(function(){
											$('.page3-wall .txt').hide();
											$('.page4-black').show();
											setTimeout(function(){
											$('.page4-black .text').fadeIn()
											},500);
											setTimeout(function(){
												$('.page4-black .text').fadeOut();	
												setTimeout(function(){
												 page4startAni();
												},500);
											},2500);
											
											//page4startAni();
										},4000);
									
										
									},5000); /**/
								  
								  //},7000);
								  });
							  },6000);
						  },3000);
						  
					  });
					  
					},4800);
					
				},2000);
				
			},5000);
			
		},5000);
	},1000);	

	
}

function page4startAni(){
	//$('.page3').fadeOut();
	$('.page3-wall').fadeOut();	 
	$('.page4start').show();
	$('.page4start .ele-box').addClass('animated fadeInLeft');
	
	setTimeout(function(){
		$('.page4-black').hide();	
		//$('#p2Voice').attr('src','images/p4_voice1.mp3');
		//$('#p2Voice')[0].play();
		createjs.Sound.play('sound4_1');
		$('.page4start .txt1').fadeIn();
		$('.page4start .ele3').addClass('mouthMove1');
		$('.page4start .ele4').addClass('eyeMove1');
		setTimeout(function(){
			$('.page4start .txt1').hide();
			$('.page4start .txt2').fadeIn();
			setTimeout(function(){
				$('.page4start .ele3').removeClass('mouthMove1');
				//$('.page4start .ele4').removeClass('eyeMove1');
				$('.page4start .headset-box').fadeIn();
				$('.page4start .txt2').hide();
				$('.page4start .quan-box').fadeIn();
				$('.page4start .voice-hand').fadeIn();
				$('.page4start .headset-btn').on('click',function(e){
					$('.page4start .voice-hand').hide();
					//$('#p2Voice').attr('src','images/p4_voice2.mp3');
					//$('#p2Voice')[0].play();
					createjs.Sound.play('sound4_2');
					$('.page4start .headset-btn').off('click');
					$('.page4start .txt3').fadeIn();
					setTimeout(function(){
						$('.page4start .txt3').hide();
						$('.page4start .txt4').fadeIn();
						setTimeout(function(){
							$('.page4start .ele4').removeClass('eyeMove1');
							
						   page4Ani()
						},3000);
					},7000);
				});
			},5200);
		},6000);
	},1000);

	
}

function page4Ani(){
	$('.page4start').hide();	
	$('.page4').show();
	$('.page4 .ele-box').addClass('animated fadeInUp');
	
	setTimeout(function(){
		//$('#p2Voice').attr('src','images/p4_voice3.mp3');
		//$('#p2Voice')[0].play();
		createjs.Sound.play('sound4_3');
		$('.page4 .txt4').hide();
		$('.page4 .txt5').fadeIn();
		setTimeout(function(){
			$('.page4 .ele3').removeClass('mouthMove1');
			$('.page4 .headset-box').show();
			$('.page4 .quan-box').show();
			//$('.page4 .voice-hand').fadeIn();
			//$('#p2Voice').attr('src','images/p4_voice4.mp3');
			//$('#p2Voice')[0].play();
			createjs.Sound.play('sound4_4');
			$('.page4 .txt5').hide();
			$('.page4 .txt6').fadeIn();
			setTimeout(function(){
				//$('#p2Voice').attr('src','images/p4_voice5.mp3');
				//$('#p2Voice')[0].play();
				//createjs.Sound.play('sound4_5');
				$('.page4 .txt6').hide();
				//$('.page4 .txt7').fadeIn();
				$('.page4 .end-pass-btn').fadeIn();
				$('.page4 .end-pass-btn').on('click',function(e){
				//setTimeout(function(){
					$('.page4 .end-pass-btn').hide();
					$('.page4 .bg').removeClass('bgAni');
					//$('.page4 .bg').css({'background-image':'url(images/p4_bg3.jpg)'})
					$('.page4 .bg').hide();
					$('.page4 .last-bg').show();
					
					$('.page4 .ele-box').hide();
					$('.page4 .voice-hand').hide();
					$('.page4 .txt7').hide();
					$('.page4 .quan-box1').show();
					//$('.page4 .p4-last-title').fadeIn();
					$('.page4 .end').show();
					setTimeout(function(){
						$('.page4').fadeOut();	
						$('.page4-wall').show();
						
						createjs.Sound.play('p4_wall_voice');
						
						setTimeout(function(){
							$('.page4-wall .txt').fadeIn();
							$('.page4-wall .mouth').addClass('p4wallMouthMove');
						},2000);
						setTimeout(function(){
							    $('.page4-wall .txt').hide();
							    $('.page5-black').show();
								setTimeout(function(){
								$('.page5-black .text').fadeIn()
								},500);
								setTimeout(function(){
									$('.page5-black .text').fadeOut();	
									setTimeout(function(){
									 page5Ani();
									},500);
								},2500);
							
							//page5Ani();
						},6000);
						//page5Ani();
					},5000);
				//},8000);
				});
			},6500);
		},2500);
	},1000);
	
}

function page5Ani(){ 
	//$('.page4').fadeOut();
	$('.page4-wall').fadeOut();	
	$('.page5').show();
	$('.page5 .ele-box').addClass('animated fadeInLeft');

	setTimeout(function(){
		$('.page5-black').hide();	
		$('.page5 .headset-box').show();
		//$('#p2Voice').attr('src','images/p5_voice1.mp3');
		//$('#p2Voice')[0].play();
		createjs.Sound.play('sound5_1');
		$('.page5 .txt1').fadeIn();
		$('.page5 .ele3').addClass('mouthMove1');
		setTimeout(function(){
			$('.page5 .txt1').hide();
			$('.page5 .txt2').fadeIn();
			
			setTimeout(function(){
				$('.page5 .txt2').hide();
				$('.page5 .ele3').removeClass('mouthMove1');
				
				$('.page5 .quan-box').show();
				$('.page5 .voice-hand').fadeIn();
				$('.page5 .headset-btn').on('click',function(e){
					$('.page5 .voice-hand').hide();
					//$('#p2Voice').attr('src','images/p5_voice2.mp3');
					//$('#p2Voice')[0].play();
					createjs.Sound.play('sound5_2');
					$('.page5 .headset-btn').off('click');
					$('.page5 .txt3').fadeIn();
					setTimeout(function(){
						$('.page5 .txt3').hide();
						$('.page5 .txt4').fadeIn();
						setTimeout(function(){
							$('.page5 .quan-box').hide();
							
							//$('#p2Voice').attr('src','images/p5_voice3.mp3');
							//$('#p2Voice')[0].play();
							createjs.Sound.play('sound5_3');
							$('.page5 .txt4').hide();
							$('.page5 .txt5').fadeIn();
							$('.page5 .ele3').addClass('mouthMove1');
							setTimeout(function(){
								$('.page5 .ele3').removeClass('mouthMove1');
								$('.page5 .quan-box').show();
								//$('.page5 .voice-hand').fadeIn();
								//$('#p2Voice').attr('src','images/p5_voice4.mp3');
								//$('#p2Voice')[0].play();
								createjs.Sound.play('sound5_4');
								$('.page5 .txt5').hide();
								$('.page5 .txt6').fadeIn();
								$('.page5 .ele3').css({'background-image':'url(images/p5_mouth4.png)'})
								setTimeout(function(){
									
									//$('.page5 .bg').css({'background-image':'url(images/p5_bg2.jpg)'})
									$('.page5 .bg').hide();
									$('.page5 .last-bg').show();
									//$('.page5 .voice-hand').hide();
									$('.page5 .ele-box').hide();
									$('.page5 .txt6').hide();
									$('.page5 .quan-box1').show();
									//$('.page5 .p5-last-title').fadeIn();
									$('.page5 .end').show();
									setTimeout(function(){
										$('.page5').fadeOut();	
										$('.page5-wall').show();
										$('.page5-wall .txt').fadeIn();
										createjs.Sound.play('p5_wall_voice');
										setTimeout(function(){
											$('.page5-wall .txt').hide();
											$('.page6-black').show();
											setTimeout(function(){
											$('.page6-black .text').fadeIn()
											},500);
											setTimeout(function(){
												$('.page6-black .text').fadeOut();	
												setTimeout(function(){
												 page6Ani();
												},500);
											},2500);
											
											//page6Ani();
										},6500);
										//page6Ani();
									},5000);
								},7000);
							 },3500);
						 },15500);
						
					},2000);
				});
				
	
			
		   },3500);
		},5000);
	},1000);
		
		
}

function page6Ani(){
	//$('.page5').fadeOut();	
	$('.page5-wall').fadeOut();
	$('.page6').show();
	$('.page6 .ele-box').addClass('animated fadeInLeft');
	
	setTimeout(function(){
		$('.page6-black').hide();	
		$('.page6 .headset-box').show();
		//$('#p2Voice').attr('src','images/p6_voice1.mp3');
		//$('#p2Voice')[0].play();
		createjs.Sound.play('sound6_1');
		$('.page6 .txt1').fadeIn();
		setTimeout(function(){
			$('.page6 .txt1').hide();
			$('.page6 .ele3').removeClass('mouthMove1');
			$('.page6 .ele3').hide();
			$('.page6 .ele1').find('img').attr('src','images/p6_boy2.png');
			$('.page6 .musical-box').show();
			$('.page6 .quan-box').show();
			$('.page6 .voice-hand').fadeIn();
			$('.page6 .headset-btn').on('click',function(e){
				$('.page6 .voice-hand').hide();
				//$('#p2Voice').attr('src','images/p6_voice2.mp3');
				//$('#p2Voice')[0].play();
				createjs.Sound.play('sound6_2');
				$('.page6 .headset-btn').off('click');
				$('.page6 .txt2').fadeIn();
				setTimeout(function(){
					//$('#p2Voice').attr('src','images/p6_voice3.mp3');
					//$('#p2Voice')[0].play();
					createjs.Sound.play('sound6_3');
					$('.page6 .txt2').hide();
					$('.page6 .txt3').fadeIn();
					setTimeout(function(){
						//$('.page6 .bg').css({'background-image':'url(images/p6_bg2.jpg)'});
						$('.page6 .bg').hide();
						$('.page6 .last-bg').show();
						$('.page6 .ele-box').hide();
						$('.page6 .quan-box1').show();
						$('.page6 .txt3').hide();
						//$('.page6 .p6-last-title').fadeIn();
						$('.page6 .end').fadeIn();
						setTimeout(function(){
							$('.page6').fadeOut();	
							$('.page6-wall').show();
							$('.page6-wall .txt').fadeIn();
							createjs.Sound.play('p6_wall_voice');
							setTimeout(function(){
								page7Ani();
							},3000);
							//page7Ani();
						},5000);
					},7000);
				},4500);
			});
		},4500);
	},1000);
	
	

}

function page7Ani(){
	//$('.page6').fadeOut();
	$('.page6-wall').hide();
	$('.page7').show();
	
}


//分享
$('.js-share-btn').click(function(){
	$('.js-share-pop').show();	
});
$('.js-share-pop').click(function(e){
	e.stopPropagation();
	$('.js-share-pop').hide();	
});


function popTip(msg){
	$('.pop-tip-msg').html(msg);
	$('.pop-tip-box').show();
	setTimeout(function(){
		$('.pop-tip-box').hide();
	},2000);
};

$('.music').on('click', function () {
  if ($('.music').hasClass('on')) {
	  $('.music').removeClass('on');
	  $('.music img').attr('src', 'images/music1.png');
		 $('#bgMusic')[0].pause();
		
	  
  } else {
	  $('.music').addClass('on');
	  $('.music img').attr('src', 'images/music0.png');
		 $('#bgMusic')[0].play();
		
  }
});



	  
	 