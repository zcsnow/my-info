var avatarUpload = function(options) {

    //容器的尺寸
    var containerWidth = options.container.width;
    var containerHeight = options.container.height;
	/*var containerWidth = 750;
	var containerHeight = 1303;*/

    //裁剪区域的尺寸
    var canvasW = options.clip.width;
    var canvasH = options.clip.height;
	/*var canvasW = 750;
    var canvasH = 1303;*/

    //控件让用户选择文件
    var $file = $(options.fileId);

    //用户上传的图片由URL.createObjectURL生成的URL指向
    var imgObjectURL = "";

    //canvas容器 用于:
    //1.生成用户裁剪的图片
    //2.生成二进制并上传
    var canvas = $(options.canvasId)[0];

    //图片操作相关的数据
    var imgData = {
        //图像的尺寸
        origin: {
            width: 0,
            height: 0
        },

        //缩放比例 默认为1
        scale: 1,

        //偏移量
        move: {
            x: 0,
            y: 0
        },

        //临时缩放比例
        tempScale: 0,

        //临时缩放偏移量,用于用户操作相关的计算
        tempMove: {
            x: 0,
            y: 0
        }

    };

    //选择图片
    function selectImg() {
        $file.click();
    }

    //显示用户选择的图片 获取图片的原始尺寸
    function handleFiles(fn) {
        //如果没有图片就返回
        var files = $file[0].files;
        if (files.length === 0) return;

        if (Object.prototype.toString.call(fn) === "[object Function]") {
            fn();
        }

        //取得file对象
        var file = files[0]

        //还原imgData相关的数据
        imgData = {
            //图像的尺寸
            origin: {
                width: 0,
                height: 0
            },

            //缩放比例 默认为1
            scale: 1,

            //偏移量
            move: {
                x: 0,
                y: 0
            },

            //临时缩放比例
            tempScale: 0,

            //临时缩放偏移量,用于用户操作相关的计算
            tempMove: {
                x: 0,
                y: 0
            }

        };
        //释放上个图片的资源
        if(imgObjectURL){
            window.URL.revokeObjectURL(imgObjectURL);
        }
		var img = new Image();
		
		var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
		if (!rFilter.test(file.type)) {
			//showMyTips("请选择jpeg、png格式的图片", false);
			return;
		}
		//获取照片方向角属性，用户旋转控制
		EXIF.getData(file, function() {
		    EXIF.getAllTags(this); 
		    Orientation = EXIF.getTag(this, 'Orientation');
		});
		
		var oReader = new FileReader();
		var expectWidth,expectHeight;
		oReader.onload = function(e) {
			var image = new Image();
			image.src = e.target.result;
			image.onload = function() {
				var expectWidth = this.naturalWidth;
				var expectHeight = this.naturalHeight;

				if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 750) {
					expectWidth = 750;
					expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
				} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1330) {
					expectHeight = 1330;
					expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
				}
				
				//原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
				canvas.width = expectWidth;
				canvas.height = expectHeight;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
				var base64 = null;
				base64 = canvas.toDataURL("image/png", 0.6);
				//修复ios
				if (navigator.userAgent.match(/iphone/i)) {
					//如果方向角不为1，都需要进行旋转 added by lzk
					if(Orientation != "" && Orientation != 1){
						
						// alert('旋转处理');
						switch(Orientation){
						 	case 6://需要顺时针（向左）90度旋转
						 		// alert('需要顺时针（向左）90度旋转');
						 		rotateImg(this,'left',canvas,expectWidth,expectHeight);
						 		break;
						 	case 8://需要逆时针（向右）90度旋转
						 		// alert('需要顺时针（向右）90度旋转');
						 		rotateImg(this,'right',canvas,expectWidth,expectHeight);
						 		break;
						 	case 3://需要180度旋转
						 		// alert('需要180度旋转');
								
								rotateImg(this,'right',canvas,expectWidth,expectHeight,true);//转两次

								break;
						}		
					}

				}else if (navigator.userAgent.match(/Android/i)) {// 修复android
					
				}else{
					//alert(Orientation);
					if(Orientation != "" && Orientation != 1){
						//alert('旋转处理');
						switch(Orientation){
						 	case 6://需要顺时针（向左）90度旋转
						 		// alert('需要顺时针（向左）90度旋转');
						 		rotateImg(this,'left',canvas,expectWidth,expectHeight);
						 		break;
						 	case 8://需要逆时针（向右）90度旋转
						 		// alert('需要顺时针（向右）90度旋转');
						 		rotateImg(this,'right',canvas,expectWidth,expectHeight);
						 		break;
						 	case 3://需要180度旋转
						 		// alert('需要180度旋转');
								rotateImg(this,'right',canvas,expectWidth,expectHeight);//转两次
								rotateImg(this,'right',canvas,expectWidth,expectHeight);
								break;
						}		
					}
					//base64 = canvas.toDataURL("image/jpeg", 0.6);
					
				}
				base64 = canvas.toDataURL("image/png", 0.6);

				//执行操作
				imgObjectURL=base64;
				//$("#pictureUpload-bg").css("backgroundImage", "url(\"" + imgObjectURL + "\")");
				$("#pictureUpload-bg").find('img').attr('src',imgObjectURL);
				/**/if (imgData.origin.height >= containerHeight) {
				   $('#pictureUpload-bg img').css({'max-height':'100%','width':'auto','top':'0','left':'50%','transform':'translateX(-50%)','-webkit-transform':'translateX(-50%)'});
				}else{
					$('#pictureUpload-bg img').css({'max-height':'auto','width':'100%','top':'0','left':'50%','transform':'translateX(-50%)','-webkit-transform':'translateX(-50%)'});
				}
				img.src = imgObjectURL
				img.onload = function () {
					imgData.origin.width = img.width;
					imgData.origin.height = img.height;
				}


			};
		};
		oReader.readAsDataURL(file);

		
		
		
		
        //生成图片的URL
        //imgObjectURL = window.URL.createObjectURL(file);

        //显示图片
        //$("#pictureUpload-bg").css("backgroundImage", "url(\"" + imgObjectURL + "\")");

        //储存原图片的尺寸
        

    }


    //生成图片
    function createImg(fn) {
        canvas.width = canvasW;
        canvas.height = canvasH;
		//$('#pictureUpload').hide();
		//$('#canvasWrap').show();
        var context = canvas.getContext("2d");
        var img = new Image();
        img.src = imgObjectURL
        img.onload = function () {
            //在画布上放置图像的 x 坐标位置。
            var offsetx;
            //在画布上放置图像的 y 坐标位置。
            var offsety;
            //要使用的图像的宽度。（伸展或缩小图像）
            var biliW = containerWidth;
            //要使用的图像的高度。（伸展或缩小图像）
            var biliH = containerHeight;

            if (imgData.origin.width >= imgData.origin.height) {
                biliH = (containerWidth / imgData.origin.width) * imgData.origin.height
            } else if (imgData.origin.width < imgData.origin.height) {
                biliW = (containerHeight / imgData.origin.height) * imgData.origin.width
				//console.log(1)
            }
			console.log(canvasW,biliW,imgData.move.x);
			console.log(canvasH,biliH,imgData.move.y);

            offsetx = ((canvasW - biliW * imgData.scale) / 2 + imgData.move.x);
            offsety = ((canvasH - biliH * imgData.scale) / 2 + imgData.move.y);
			
			console.log(offsetx,offsety);

            context.drawImage(img, 0, 0, img.width, img.height, offsetx, offsety, biliW * imgData.scale, biliH * imgData.scale);
			

            if (Object.prototype.toString.call(fn) === "[object Function]") {
                fn();
            }
        }
		
		
    }

    //上传图片
    function submit(fn) {
        createImg(function () {
            canvas.toBlob(function (blob) {
                if (Object.prototype.toString.call(fn) === "[object Function]") {
                    fn(blob);
                }
            }, "image/jpeg", options.imgQuality); // JPEG at 100% quality
        })
    }

    //生成本地图片
    function createLocalImg(aIdName, aParentIdName, name) {
        createImg(function () {
            canvas.toBlob(function (blob) {
                var a;
                if (document.getElementById(aIdName)) {
                    a = document.getElementById(aIdName);
                } else {
                    var a = document.createElement("a");
                    a.id = aIdName;
                    document.getElementById(aParentIdName).appendChild(a);
                }
                var nBytes = blob.size;
                var size = nBytes + " bytes";
                for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
                    size = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
                }
                a.textContent = "Download(" + size + ")";
                a.href = window.URL.createObjectURL(blob);
                a.download = name + '.jpg';
            }, "image/jpeg", options.imgQuality); // JPEG at 100% quality
        })
    }

    // 此块也可以可以独立出来
    // 使用hammer.min.js对触摸滑动、缩放事件进行监听
    // 先要对监听的DOM进行一些初始化
    var mc = new Hammer($(options.containerId)[0]);
    var pan = new Hammer.Pan();
    var pinch = new Hammer.Pinch();
    var $uploadBg = $(options.uploadBgId);
    // add to the Manager
    mc.add([pan, pinch]);

    //缩放
    mc.on("pinchstart", function (ev) {
        imgData.tempScale = ev.scale;
    });
    mc.on("pinchmove", function (ev) {
        imgData.scale = ev.scale - imgData.tempScale + imgData.scale;
        imgData.tempScale = ev.scale
        $uploadBg.css("transform", "scale(" + imgData.scale + "," + imgData.scale + ")")

    });
    //移动
    mc.on("panstart", function (ev) {
        var x = ev.center.x;
        var y = ev.center.y;
        imgData.tempMove.x = x;
        imgData.tempMove.y = y;
    });

    mc.on("panmove", function (ev) {
        var x = ev.center.x;
        var y = ev.center.y;

        var px = x - imgData.tempMove.x;
        var py = y - imgData.tempMove.y;


        imgData.move.x = imgData.move.x + px
        imgData.move.y = imgData.move.y + py

        imgData.tempMove.x = x;
        imgData.tempMove.y = y;

        $uploadBg.css({
            left: imgData.move.x + "px",
            top: imgData.move.y + "px"
        })

    });

    return {
        selectImg: selectImg,
        handleFiles: handleFiles,
        createImg: createImg,
        submit: submit,
        imgData: imgData,
        createLocalImg: createLocalImg
    }
};