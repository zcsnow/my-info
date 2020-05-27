$(function(){

	var my_video = document.getElementById("myVideo");
	var post_bg = '';
	var post_jz = '';
	var bgm = {
		//url:'./mp3/bgm.mp3',
		obj:document.getElementById('bgm'),
		button:$('.button_ls'),
		start:function(){
			//this.obj.attr('src',this.url);
			if(this.obj.paused)
			{
				this.obj.play();
				bgm.button.find('span').html('+');
				_hmt.push(['_trackEvent','video','play','bgm']);
			}else{
				this.obj.pause();// 这个就是暂停
				bgm.button.find('span').html('-');
				_hmt.push(['_trackEvent','video','pause','bgm']);
			}
		},
		play:function(){
			this.obj.play();
			bgm.button.find('span').html('+');
			_hmt.push(['_trackEvent','video','play','bgm']);
		},
		pause:function(){
			this.obj.pause();// 这个就是暂停
			bgm.button.find('span').html('-');
			_hmt.push(['_trackEvent','video','pause','bgm']);
		}
	};

	bgm.button.on('click',function(){
		//if(bgm.obj.attr('src') != ''){
		//	bgm.obj.attr('src','');
		//}else{
		//	bgm.start();
		//	bgm.obj.find('span').html('+');
		//}
		bgm.start();
	});
	var pages = function(obj){
		this.obj = obj;
		this.button = obj.find('.button');
	};
	pages.prototype = {
		show:function(){
			this.obj.show();
		},
		hide:function(){
			this.obj.hide();
		}
	};
	var  index =  new pages($('#index'));
	var  page1 =  new pages($('#page1'));
	var  page2 =  new pages($('#page2'));
	var  page3 =  new pages($('#page3'));
	var  page4 =  new pages($('#page4'));
	var  page5 =  new pages($('#page5'));
	var page2_p1 = $('#page2-p1');
	var page2_p2 = $('#page2-p2');
	page2.zn = page2.obj.find('.zn');
	page2.rep = page2.button.find('a').eq(0);
	page2.next = page2.button.find('a').eq(1);
	page2.img = page2.obj.find('.img').find('img');
	page2.jz = page2.obj.find('.main-m').find('img');

	page4.rep = page4.button.find('a').eq(0);
	page4.next = page4.button.find('a').eq(1);

//		//调用微信拍照
//		page1.button.on('click',function(){
//			wx.chooseImage({
//				count: 1, // 默认9
//				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//				success: function (res) {
//					var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//					page2.img.attr('src',localIds);
//					page1.hide();
//					page2.show();
//				}
//			});
//			console.log('调用微信拍照');
//		});
	//搭配指南
	page2.zn.on('click',function(){
		console.log('搭配指南');
		page2.hide();
		page3.show();
		_hmt.push(['_trackEvent','page','click','guide']);
	});
	////重新拍照
	//page2.rep.on('click',function(){
	//	console.log('重新拍照');
	//	clear_jz();
	//	page2.hide();
	//	page1.show();
	//});
	//确认照片
	page2_p1.find('.button').find('a').eq(1).on('click',function(){
		console.log('确认照片');
		var jz = $('.xz_jz');
		var a = 0;
		for(var i in jz){
			a++;
		}
		if(a <= 0){
			return false;
		}
		//$('.black_bj').show();
		$('.xz_jz').removeClass('element_double');
		$('#page2-p1').hide();
		$('#page2-p2').show();
		_hmt.push(['_trackEvent','page','click','ok_picture']);
		//page4.show();
	});
	var jz = {};
	var rbg = 0;
	var o = $('.canvas').find('.zz');
	page2_p2.find('.main-m li').on('click',function(){
		var img = $(this).find('.lvjing').attr('data-rbg');
		var h = '';
		if(typeof img != 'undefined'){
			 h = '<img class="lvjing" data-rbg="'+img+'" src="./img/lj/'+img+'" />';
			o.html(h);
		}else{
			o.html('');
		}
		rbg = img;
	});

	page2_p1.find('.button').find('a').eq(0).on('click',function(){
		page2.hide();
		page1.show();
		clear_jz();
		_hmt.push(['_trackEvent','page','click','re_picture']);
	});
	page2_p2.find('.button').find('a').eq(0).on('click',function(){
		page2_p1.show();
		page2_p2.hide();
		clear_jz();
		_hmt.push(['_trackEvent','page','click','re_match']);
	});
	function clear_jz(){
		page2_p1.show();
		page2_p2.hide();
		rbg = 0;
		o.html('');
		$('.xz_jz').remove();
	}


	var element =  {};
	var data_style = {};


	var add_tata_style = function(){
		element = $('.element_double');
		var that = element.get(0);
		data_style = {};
		data_style[0] = {};
		data_style[1] = {};
		data_style[0].oldx = that.old_x;
		data_style[0].oldy = that.old_y;
		data_style[0].newx = that.new_x;
		data_style[0].newy = that.new_y;
		data_style[0].nowx = that.now_x;
		data_style[0].nowy = that.now_y;
		data_style[0].oldr = that.old_rotate;
		data_style[0].nowr = that.now_rotate;
		data_style[0].newr = 0;
		data_style[0].olds = that.old_scale;
		data_style[0].nows = that.now_scale;
		data_style[0].news = 0;
		data_style[0].id = 0;
	};
	var copy_tata_style = function(){
		var that = element.get(0);
		that.new_x = data_style[0].newx;
		that.new_y = data_style[0].newy;
		that.now_x = data_style[0].nowx;
		that.now_y = data_style[0].nowy;
		that.old_x = data_style[0].oldx;
		that.old_y = data_style[0].oldy;
		that.old_rotate = data_style[0].oldr;
		that.now_rotate = data_style[0].nowr;
		that.old_scale = data_style[0].olds;
		that.now_scale = data_style[0].nows;
	};
	var cv = $('#canvas_double');
	cv.get(0).addEventListener('touchstart',touch_db,false);
	cv.get(0).addEventListener('touchmove',touch_db,false);
	cv.get(0).addEventListener('touchend',touch_db,false);

	cv.on('click','.xz_jz',function(){
		$('.xz_jz').removeClass('element_double');
		$(this).addClass('element_double');
		add_tata_style();
	});
	var styles = function(){
		element.get(0).style.cssText = '-webkit-transform:'+
			'translate('+data_style[0].nowx+'px,'+data_style[0].nowy+'px) '+
			'rotate('+data_style[0].nowr+'deg) '+
			'scale('+data_style[0].nows+');';
	};

	cv.on('touchstart','.close',function(e){
		$(this).parent().remove();
		e.stopPropagation();
		return false;
	});
	var restart = false;
	function touch_db(e){
		var event = e;
		var e = event.touches;
		var touch = e.length;
		//多点触控
		switch(event.type) {
			case "touchstart":
				data_style[0].newx = e[0].clientX;
				data_style[0].newy = e[0].clientY;
				if(touch == '2'){
					restart = true;
					data_style[1].newx = e[1].clientX;
					data_style[1].newy = e[1].clientY;
				}
				break;
			case "touchmove":
				if(!restart){
					data_style[0].nowx = data_style[0].oldx*1 + e[0].clientX - data_style[0].newx*1;
					data_style[0].nowy = data_style[0].oldy*1 + e[0].clientY - data_style[0].newy*1;
				}else{
					if(touch == '2'){
						//放大缩小
//							得到0的x，y轴，
//							到1的x，y轴距离的平方；

						var a = Math.abs(data_style[1].newx*1 - data_style[0].newx*1);
						var b =  Math.abs(data_style[1].newy*1 - data_style[0].newy*1);
						var c = (a*2 + b*2)/2 ;
						var aa = Math.abs(e[1].clientX - e[0].clientX);
						var bb = Math.abs(e[1].clientY - e[0].clientY);
						var cc = (aa*2 + bb*2)/2 ;
						data_style[0].nows = data_style[0].olds*1 - (1-cc/c);
						//旋转
						var oldwx = data_style[1].newx*1 - data_style[0].newx*1;
						var oldwy = data_style[1].newy*1 - data_style[0].newy*1;
						var nowwx = e[1].clientX - e[0].clientX;
						var nowwy = e[1].clientY - e[0].clientY;
						data_style[0].nowr = data_style[0].oldr*1 + (180*Math.atan2(nowwy,nowwx)/Math.PI + 180*Math.atan2(oldwy,oldwx)/Math.PI * -1);
					}
				}
				styles();
				event.preventDefault();
				event.stopPropagation();
//				log_touch(event.targetTouches);
				break;
			case "touchend":
				data_style[0].oldx = data_style[0].nowx;
				data_style[0].oldy = data_style[0].nowy;
				data_style[0].olds = data_style[0].nows;
				data_style[0].oldr = data_style[0].nowr;
				copy_tata_style();
				if(touch == '0'){
					restart = false;
				}
				break;
		}
		return false;
	}
	//选戒子
	page2_p1.find('.main-m').find('img').on('click',function(){
		var key = $(this).index();
		var element_double = document.createElement('div');
		$('.element_double').removeClass('element_double');
		element_double.setAttribute('class','xz_jz element_double');
		element_double.setAttribute('url',(key+1)+'n.png');
		element_double.new_x = 0;
		element_double.new_y = 0;
		element_double.now_x = 0;
		element_double.now_y = 0;
		element_double.old_x = 0;
		element_double.old_y = 0;
		element_double.old_rotate = 0;
		element_double.now_rotate = 0;
		element_double.old_scale = 1;
		element_double.now_scale = 1;
		$(element_double).append('<img src="./img/jz/'+(key+1)+'n.png" />'+
			'<span class="close"></span><span class="rotate"></span><span class="pinch"></span>');
		cv.append(element_double);
		add_tata_style();
		_hmt.push(['_trackEvent','ring','click',key]);
	});
	var fx_img = '';
	//返回照片
	page3.button.on('click',function(){
		console.log('返回照片');
		page3.hide();
		page2.show();

	});
	//返回照片
	page4.rep.on('click',function(){
		console.log('返回照片');
		page4.hide();
		page2.show();
	});
	//确认滤镜
	page4.next.on('click',function(){
		console.log('确认滤镜');
		$('.black_bj').show();
		page5.show();
	});
	index.button.on('click',function(){
		index.hide();
		page1.show();
		bgm.play();
		my_video.pause();
		_hmt.push(['_trackEvent','page','click','start']);
	});
	//bgm.start();
	index.show = function(){
		this.obj.show();
		$('.global_button').show();
		$('#f-page').hide();
	};
	index.hide = function(){
		this.obj.hide();
		$('#content').show();
		page1.show();
	};
	page5.obj.find('.zz').on('click',function(){
		$('#fxiang').show();
	});
	page5.obj.find('.right').on('click',function(){
		$('#fxiang').hide();
	});

		//index.show();
	var is_f_page = false;
	var is_f_page_video = false;
	var video_play = false;
	$('#open').on('touchy-drag', function (event, phase, $target, data) {
		if(!$(this).hasClass('cur')){ return false;}
		var f_page = $('#f-page');
		var movePoint = data.movePoint,
			startPoint = data.startPoint;
		var x =  movePoint.x - startPoint.x;
		switch (phase) {
			case 'start':
				if ("Safari" == mb) {
					if(!video_play){
						video_play = true;
						my_video.play();//播放视屏
						_hmt.push(['_trackEvent','video','play','short']);
						setTimeout(function(){
							index.show();
						},10000);
					}
				}
				break;
			case 'move':
//					' + (movePoint.y - startPoint.y) +
				if(!is_f_page){
					if(x > 0){
						$target.get(0).style.cssText = 'z-index:5;-webkit-transform:translate(' + (movePoint.x - startPoint.x) + 'px,0);';
							if(x > 150){
								//$('#loading').hide();//loading 页面隐藏
								$target.get(0).style.cssText = '-webkit-transform:translate(100%,0);-webkit-transition: -webkit-transform .4s;';
								is_f_page = true;
							}
					}
				}
				break;
			case 'end':
				if(!is_f_page){
					$target.get(0).style.cssText = '-webkit-transform:translate(0,0);-webkit-transition: -webkit-transform .4s;';
				}else{
					if(!video_play){
						video_play = true;
						requestFullScreen();
						my_video.play();//播放视屏
						_hmt.push(['_trackEvent','video','play','short']);
						setTimeout(function(){
							index.show();
						},10000);
					}
				}
				break;
		}
	});
	function requestFullScreen() {
		var de = my_video;
		if (de.requestFullscreen) {
			de.requestFullscreen();
		} else if (de.mozRequestFullScreen) {
			de.mozRequestFullScreen();
		} else if (de.webkitRequestFullScreen) {
			de.webkitRequestFullScreen();
		}
	}

	//获取内容页面高度
	var window_width = $('html,body').innerWidth();
	var window_height = $('html,body').innerHeight();
	var img_height = window_height*0.58;
	var img_width = (img_height/4)*3;
	$('.canvas').css({width:img_width,height:img_height});
	$('.img').css({width:img_width,height:img_height});

	$('#post_img').on('change',function(){
		//var preview, file_head = $(this).get(0),
		//	picture = file_head.value;
		//if (!picture.match(/.jpg|.jpeg|.gif|.png|.bmp/i)) return alert("您上传的图片格式不正确，请重新选择！"),
		//	!1;
		//if (preview = document.getElementById("page2-img"), file_head.files && file_head.files[0]) preview.style.display = "block",
		//	preview.src = window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file_head.files[0]) : window.URL.createObjectURL(file_head.files[0]);
		//page2.obj.find('#page2-img').attr('src',preview.src);
		//$('#page2-p2').find('.main-m').find('.ditu').attr('src',preview.src);
		//selectFileImage(this);
		var file = this.files['0'];
		//图片方向角 added by lzk
		var Orientation = null;

		if (file) {
			console.log("正在上传,请稍后...");
			var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
			if (!rFilter.test(file.type)) {
				//showMyTips("请选择jpeg、png格式的图片", false);
				return;
			}
			// var URL = URL || webkitURL;
			//获取照片方向角属性，用户旋转控制
			EXIF.getData(file, function() {
				// alert(EXIF.pretty(this));
				EXIF.getAllTags(this);
				//alert(EXIF.getTag(this, 'Orientation'));
				Orientation = EXIF.getTag(this, 'Orientation');
				//return;
			});

			var oReader = new FileReader();
			oReader.onload = function(e) {
				//var blob = URL.createObjectURL(file);
				//_compress(blob, file, basePath);
				var image = new Image();
				image.src = e.target.result;
				image.onload = function() {
					var expectWidth = this.naturalWidth;
					var expectHeight = this.naturalHeight;

					if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
						expectWidth = 800;
						expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
					} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
						expectHeight = 1200;
						expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
					}
					//alert(expectWidth+','+expectHeight);
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					canvas.width = expectWidth;
					canvas.height = expectHeight;
					ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
					//alert(canvas.width+','+canvas.height);

					var base64 = null;
					var mpImg = new MegaPixImage(image);
					mpImg.render(canvas, {
						maxWidth: 800,
						maxHeight: 1200,
						quality: 0.8,
						orientation: Orientation
					});
					base64 = canvas.toDataURL("image/jpeg", 0.8);
					$('#page2-img').attr('src',base64);
					$('#page2-p2').find('.main-m').find('.ditu').attr('src',base64);
					page1.obj.find('input[name="base64"]').val(base64);
					page1.hide();
					page2.show();
					_hmt.push(['_trackEvent','page','click','picture']);
				};
			};
			oReader.readAsDataURL(file);
		}
	});
	$('#form1').on('submit', function() {
		var jz = $('.xz_jz');
		var jzs = '[';
		var a = 0;
		for(var i = 0; i< jz.length ; i++){
			jzs += 'url:'+jz.eq(i).attr('url')+
				',w:90'+
				',h:90'+
				',l:'+jz.get(i).old_x+
				',t:'+jz.get(i).old_y+
				',p:'+jz.get(i).old_scale+
				',o:'+jz.get(i).now_rotate+'][';
			a++;
		}
		jzs += ']';
		page1.obj.find('input[name="jz"]').val(jzs);
		page1.obj.find('input[name="width"]').val(img_width);
		page1.obj.find('input[name="rbg"]').val(rbg);
		$('.black_bj').show();
		$(this).ajaxSubmit({
			type: 'post', // 提交方式 get/post
			url: _url+'index.php/trys/ajax_post_file', // 需要提交的 url
			dataType: "json",
			success: function(data) { // data 保存提交后返回的数据，一般为 json 数据
				//alert('123');
				//for( var i in data){
				//	alert(data[i]+'-'+i);
				//}
				fx_img = data['url'];
				//page2.obj.find('#page2-img').attr('src','application/web/uploads/'+fx_img+'.jpg');
				//$('#page2-p2').find('.main-m').find('.ditu').attr('src','application/web/uploads/'+fx_img+'.jpg');
                //
				$('#save_img').attr('src','application/web/uploads/'+fx_img+'.jpg?type=1');
				$('#fxiang-img').attr('src','application/web/uploads/'+fx_img+'.jpg?type=1');
				page2.hide();
				page5.obj.show();
				$('.black_bj').hide();
				clear_jz();
			}
		});
		_hmt.push(['_trackEvent','page','click','post_phone']);
		return false;
	});
	$('#lb1').on('click',function(){
		$('#content').hide();
		page5.obj.hide();
		$('#index').show();
		_hmt.push(['_trackEvent','page','click','again']);
	});
	$('#lb2').on('click',function(){
		page5.obj.find('.black_bj').show();
		_hmt.push(['_trackEvent','page','click','qrcode']);
	});
	$('#lb3').on('click',function(){
		//window.location.href = 'http://d.uget.top/index.php/fxs/fx/'+fx_img;
		wx.onMenuShareTimeline({
			title: '快来看我的CHAUMET !', // 分享标题
			link:  'http://chaumet-easycomad.uget.top/index.php/trys/user/'+fx_img, // 分享链接
			imgUrl: 'http://chaumet-easycomad.uget.top/application/web/uploads/'+fx_img+'.jpg', // 分享图标
			success: function () {
				$('#weixin_fx').hide();
			},
			complete: function () {
				$('#weixin_fx').hide()
			}
		});
		wx.onMenuShareAppMessage({
			title: '快来看我的CHAUMET !', // 分享标题
			link:  'http://chaumet-easycomad.uget.top/index.php/trys/user/'+fx_img, // 分享链接
			imgUrl: 'http://chaumet-easycomad.uget.top/application/web/uploads/'+fx_img+'.jpg', // 分享图标
			desc: '', // 分享描述
			success: function () {
				$('#weixin_fx').hide();
			},
			complete: function () {
				$('#weixin_fx').hide()
			}
		});
		$('#weixin_fx').show();
		_hmt.push(['_trackEvent','page','click','share']);
	});
	page5.obj.find('.black_bj').find('.bj').on('click',function(){
		page5.obj.find('.black_bj').hide();
	});

	$('#lb4').on('click',function(){
		//$('#f-page').show();
		bgm.pause();
		requestFullScreen();
		my_video.play();//播放视屏
		$('#content').hide();
		$('#page5').hide();
		setTimeout(function(){
			$('#index').show();
		},5000);
		_hmt.push(['_trackEvent','video','play','short']);
	});
	$('#weixin_fx').on('click',function(){
		$(this).hide();
	});
});