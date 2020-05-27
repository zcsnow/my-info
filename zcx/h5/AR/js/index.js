function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true
	} else {
		return false
	}
}

if (isWeiXin()) {
	//locationJump = "//pvp.qq.com/cp/a20161205wzry/page.html"
} else {
	//locationJump = "//pvp.qq.com/cp/a20161205wzry/index.html"
}

//判断ios版本
var agent = navigator.userAgent.toLowerCase();
var version;
if (agent.indexOf("like mac os x") > 0) {
	var regStr_saf = /os [\d._]*/gi;
	var verinfo = agent.match(regStr_saf);
	version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".")

	var version_str = version + "";
	if (version_str != "undefined" && version_str.length > 0) {
		version = version.substring(0, 1);
		if (version > 5 && version < 9) {
			//版本为iOS8以下直接跳转落地页
			//window.location.href = locationJump
		}
	}
}



//设备不支持陀螺仪
if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", function(event) {
		if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {

		} else {
			//window.location.href = locationJump
		}
	});
} else {
    alert('您的浏览器不支持DeviceMotion');  
}


var music = document.getElementById("musicAudio");
var musicIcon = document.getElementById("music");
var hasMoved = false;
(function() {
	var load = (function() {
		var I = {};
		var loaded = 0;
		var last_num = 0;
		var t = 0;
		var $num = document.querySelector("#load_num");
		//var path = "//ossweb-img.qq.com/images/yxzj/act/a20161130ar";
		var path = "img";

		function num(n) {
			last_num++;
			$num.innerHTML = last_num;
			if (last_num < n) {
				clearTimeout(t);
				t = setTimeout(function() {
					num(n)
				}, 30)
			} else {
				if (n == 100) {
					if (!Detector.webgl) {
						//不支持WebGL
						window.location.href = locationJump
					} else {
						//支持WebGL
						init();
					}
				}
			}
		}

		var images = ["/pvp.jpg", "/DiaoChan_D_512.png", "/DiaoChan_Taikongcang_D_512.png", "/target.png", "/music_icon.png"];
		$.getJSON(path + "/dc_mini.js?1", function(geometry, materials) {
			loaded++;
			num(loaded / (images.length + 3) * 100)
		});
		$.getJSON(path + "/jc_s.js", function(geometry, materials) {
			loaded++;
			num(loaded / (images.length + 3) * 100)
		});
		$.getJSON(path + "/pd.js", function(geometry, materials) {
			
			loaded++;
			num(loaded / (images.length + 3) * 100)
		});

		function ing() {
			for (var i = 0; i < images.length; i++) {
				var img = new Image();
				img.src = path + images[i];
				img.onload = function() {
					loaded++;
					num(loaded / (images.length + 3) * 100)
				}
			}

		}
		I.ing = ing;
		return I
	}());
	load.ing();
	var camera_debug = false;
	var $stage = document.querySelector("#stage");
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var clock = new THREE.Clock();
	var container;
	var globalCamera, camera, scene, renderer, controls;
	var poi_jc, poi_dc;
	var light;
	var need_3droom = false;
	var dc_lock = false;
	var jc_tween;
	var jc_tween_start = false;
	var dc_tween_end = false;
	var target_dc = false;
	var open_door = true;
	var targetTime = 0;
	var targetTimeStart = null;
	var targetTimeEnd = null;
	if (SCREEN_WIDTH > SCREEN_HEIGHT) {
		var camera_w = camera_debug ? SCREEN_WIDTH * 0.5 : SCREEN_WIDTH;
		var camera_h = SCREEN_HEIGHT
	} else {
		var camera_w = SCREEN_WIDTH;
		var camera_h = camera_debug ? SCREEN_HEIGHT * 0.5 : SCREEN_HEIGHT
	}
	var meshPool = {
		"diaochan": {},
		"piaodai": {},
		"jichan": {}
	};

	console.log(!1)

	function genModel(config) {
		var geometry = config.g;
		var materials = config.m;
		for (var i = 0; i < materials.length; i++) {
			var m = materials[i];
			m.skinning = true
		}
		var material = new THREE.MultiMaterial(materials);
		var mesh = new THREE.SkinnedMesh(geometry, material);
		mesh.name = config.name;
		mesh.position.set(0, 0, 0);
		mesh.geometry.computeVertexNormals(); //areaWeighted - 如果为true，每一个法线对顶点法线的贡献是由面面积加权的。默认值为true。通过平均面法线计算顶点法线。
		var helper = new THREE.SkeletonHelper(mesh);
		helper.material.linewidth = 3;
		helper.visible = false;
		scene.add(helper);
		var mixer = new THREE.AnimationMixer(mesh);
		var ani = geometry.animations[0];
		var action = mixer.clipAction(ani);
		action.clampWhenFinished = true;
		action.setEffectiveTimeScale(0);
		action.play();
		mesh.mixer = mixer;
		mesh.action = action;
		mesh.helper = helper;
		return mesh
	}

	function init() {
		container = document.createElement("div");
		$stage.appendChild(container);
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(90, camera_w / camera_h, 1, 1000);
		controls = new THREE.DeviceOrientationControls(camera);
		if (camera_debug) {
			cameraHelper = new THREE.CameraHelper(camera);  //这有助于形象地显示一个照相机包含在它的截头体中
			cameraHelper.visible = true;
			scene.add(cameraHelper);
			globalCamera = new THREE.PerspectiveCamera(50, camera_w / camera_h, 1, 10000);
			globalCamera.position.z = 2500;
			var axisHelper = new THREE.AxisHelper(500); //以简单的方式可视化3个轴  500表示轴的线的大小。默认值为1。
			scene.add(axisHelper)
		}
		scene.add(new THREE.AmbientLight(0x404040, 3));
		light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 500, 300);
		scene.add(light);
		poi_jc = new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0), new THREE.MeshBasicMaterial({
			color: 0,
			wireframe: true
		}));
		scene.add(poi_jc);
		poi_dc = new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0), new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true
		}));
		scene.add(poi_dc);
		var loader = new THREE.JSONLoader();
		loader.load("img/dc_mini.js?1", function(geometry, materials) {
			document.querySelector(".info").innerHTML = "推开机舱，唤醒我";
			var config = {
				name: "diaochan",
				g: geometry,
				m: materials
			};
			var diaochan = genModel(config);
			window.diaochan = diaochan;
			poi_dc.add(diaochan);
			diaochan.rotation.set(0, -1.57, 1.57);
			diaochan.status = 1;
			meshPool["diaochan"] = diaochan;
			meshPool["diaochan"].visible = false;
			window.defaultCameraDirection = camera.getWorldDirection(); //返回一个Vector3，表示相机正在查看的世界空间方向。这不是相机的正面，而是它的负z轴，与基类（Object3D）的getWorldDirection相反 。
			loader.load("img/pd.js", function(geometry, materials) {
				var config = {
					name: "piaodai",
					g: geometry,
					m: materials
				};
				var piaodai = genModel(config);
				console.log(piaodai);
				piaodai.position.set(0, 10, -15);
				piaodai.rotation.set(-0.3, -0.5, -1.9);
				piaodai.action.setEffectiveTimeScale(0);
				piaodai.visible = false;
				meshPool["piaodai"] = piaodai;
				window.piaodai = meshPool["piaodai"];
				meshPool["diaochan"].add(piaodai)
			})
		});
		loader.load("img/jc_s.js", function(geometry, materials) {
			var config = {
				name: "jichan",
				g: geometry,
				m: materials
			};
			var jichan = genModel(config);
			jichan.rotation.set(0.5, 3.14, 1.57);
			jichan.visible = true;
			poi_jc.add(jichan);
			meshPool["jichan"] = jichan
		});
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		renderer.setClearColor(0, 0.01);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		renderer.domElement.style.position = "relative";
		container.appendChild(renderer.domElement);
		renderer.autoClear = false;
		animate();
		window.addEventListener("resize", onWindowResize, false)
	}

	function onWindowResize(event) {
		SCREEN_WIDTH = window.innerWidth;
		SCREEN_HEIGHT = window.innerHeight;
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		camera.aspect = camera_w / camera_h;
		camera.updateProjectionMatrix()
	}

	function resetLocationAndRotation() {
		var v = camera.getWorldDirection();
		var l = 400;
		var scale = 1 / Math.sqrt(v.x * v.x + v.z * v.z);
		v.x = v.x * scale;
		v.z = v.z * scale;
		poi_dc.position.set(v.x * l, -l, v.z * l);
		poi_jc.position.set(v.x * l, -l, v.z * l);
		poi_dc.lookAt(new THREE.Vector3(0, 0, 0));
		poi_jc.lookAt(new THREE.Vector3(0, 0, 0));
		if (need_3droom) {
			//初始化3D全景的朝向
			var geometry = new THREE.SphereGeometry(1000, 16, 8);
			geometry.scale(-1, 1, 1);
			var material = new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load("img/pvp.jpg")
			});
			var stage = new THREE.Mesh(geometry, material);
			stage.lookAt(new THREE.Vector3(v.x, 0, v.z)); //旋转3D全景朝向 使每次打开页面都会朝向一个固定的方向
			stage.rotateY((85 * Math.PI) / 180);
			stage.rotateZ((-4 * Math.PI) / 180);
			scene.add(stage)
		}
		var speed = 100;
		jc_tween = new TWEEN.Tween(poi_jc.position).to({
			x: poi_jc.position.x,
			y: poi_jc.position.y,
			z: poi_jc.position.z
		}, 40 * speed).onComplete(function() {
			meshPool["diaochan"].visible = true;
			meshPool["diaochan"].action.setEffectiveTimeScale(0.5);
			dc_tween.start();
			dc_ro_tween.start()
		});
		var jc_tween2 = new TWEEN.Tween(poi_jc.position).to({
			x: poi_jc.position.x,
			y: poi_jc.position.y + 1000,
			z: v.z * 700
		}, 10 * speed).easing(TWEEN.Easing.Exponential.InOut).delay(30 * speed).onComplete(function() {
			poi_jc.visible = false
		});
		jc_tween.chain(jc_tween2);
		var dc_tween = new TWEEN.Tween(poi_dc.position).to({
			x: poi_dc.position.x,
			y: poi_dc.position.y - 30,
			z: v.z * 100
		}, 6 * speed);
		var dc_tween2 = new TWEEN.Tween(poi_dc.position).to({
			x: poi_dc.position.x,
			y: poi_dc.position.y + 300,
			z: v.z * 150
		}, 10 * speed).easing(TWEEN.Easing.Back.In);
		var dc_tween3 = new TWEEN.Tween(poi_dc.position).to({
			x: poi_dc.position.x - 100,
			y: 0,
			z: v.z * 300
		}, 30 * speed).easing(TWEEN.Easing.Elastic.InOut);
		var dc_tween4 = new TWEEN.Tween(poi_dc.position).to({
			x: poi_dc.position.x + 100,
			y: 100,
			z: v.z * 200
		}, 20 * speed);
		var dc_tween5 = new TWEEN.Tween(poi_dc.position).to({
			x: v.x * 100,
			y: 0,
			z: v.z * 150
		}, 30 * speed).onComplete(function() {
			document.querySelector(".info").innerHTML = "执我之手，一起歌咏梦想和荣耀";
			diaochan.status = 2;
			dc_lock = true
		});
		var dc_ro_tween = new TWEEN.Tween(diaochan.rotation).to({x: 1,y: -1.8,z: 1.57}, 6 * speed);
		var dc_ro_tween2 = new TWEEN.Tween(diaochan.rotation).to({x: 0.2,y: -0.8,z: 1.57}, 10 * speed).easing(TWEEN.Easing.Back.Out);
		dc_tween.chain(dc_tween2);
		dc_tween2.chain(dc_tween3);
		dc_tween3.chain(dc_tween4, dc_ro_tween2);
		dc_tween4.chain(dc_tween5);
		setTimeout(function() {
			$("#load").hide();
			if (need_3droom) {
				$(".music").show()
			}
			$(".target").show()
		}, 1000)
	}

	function animate() {

		requestAnimationFrame(animate);
		render();
		TWEEN.update();
		// 瞄准判定 在页面中心设置一个瞄准区域，用户移动手机让3D模型处在瞄准区域内; 3D模型和camera都有自己的三维坐标，new THREE.Vector3获取到两者的坐标，a.angleTo(b)求他们的夹角，夹角小于设定范围，则判断为已瞄准。
		var v = camera.getWorldDirection();
		if (meshPool["diaochan"].status == 2) {
			var stay = new TWEEN.Tween(meshPool["diaochan"].rotation).to({x: 0.5 + v.y,y: -0.8 + v.x,z: 1.57
			}, 200).onComplete(function() {
				meshPool["diaochan"].status = 3;
				dc_tween_end = true
			}).start()
		}
		if (meshPool["diaochan"].status == 3) {
			meshPool["diaochan"].rotation.set(0.5 + v.y, -0.8 + v.x, 1.57)
		}
		if (meshPool["diaochan"].status == 4) {
			meshPool["diaochan"].status = 5;
			meshPool["diaochan"].action.time = 0;
			meshPool["diaochan"].action.setEffectiveTimeScale(0.5);
			var rot = new TWEEN.Tween(meshPool["diaochan"].rotation).to({x: 0.5,y: -1.8,z: 1.57}, 500).start();
			var pos = new TWEEN.Tween(meshPool["diaochan"].position).to({x: v.x * 100,y: v.y + 300,z: v.z * -100
			}, 3000).easing(TWEEN.Easing.Elastic.InOut).onComplete(function() {
				window.location.href = locationJump
			}).start()
		}

		//捕获当前camera看向的矢量，有偏移的话,重新初始化全景、3D模型等的位置和角度
		if (!hasMoved && typeof(defaultCameraDirection) != "undefined") {

			var v = camera.getWorldDirection();
			if (v.x != defaultCameraDirection.x || v.y != defaultCameraDirection.y || v.z != defaultCameraDirection.z) {
				hasMoved = true;
				resetLocationAndRotation() //初始化
			}else{
				hasMoved = true;
				resetLocationAndRotation() //初始化
			}
		}
		//左右判断
		var dc = new THREE.Vector2(poi_dc.position.x, poi_dc.position.z);
		var eye = new THREE.Vector2(v.x, v.z);
		dt = dc.angle() - eye.angle();
		//上下判断
		var dc2 = new THREE.Vector2(poi_dc.position.y, poi_dc.position.z);
		var eye2 = new THREE.Vector2(v.y, v.z);
		dt2 = dc2.angle() - eye2.angle();
		if (Math.abs(dt) > 0.5) {
			if (dt < 0) {} else {}
		} else {
			if (Math.abs(dt) < 0.1 && Math.abs(dt2) < 0.1) {
				 //居中啦！
				if (!jc_tween_start && !dc_lock) {
					$(".target").addClass("flash");
					meshPool["jichan"].action.setEffectiveTimeScale(1);
					jc_tween.start();
					jc_tween_start = true;
					setTimeout(function() {
						$(".target").hide();
						$(".target").removeClass("flash")
					}, 2000)
				}
			}
		}
		if (meshPool["diaochan"].status == 3) {
			$(".target").html("连续对准貂蝉3秒，<br>即可解锁！");
			$(".target").show();
			if (Math.abs(dt) < 0.3 && Math.abs(dt2) < 0.3) {
				if (!targetTimeStart) {
					targetTimeStart = new Date().getTime()
				} else {
					targetTimeEnd = new Date().getTime();
					targetTime = targetTimeEnd - targetTimeStart;
					$(".target").html("已对准，请连续<b>3</b>秒！");
					$(".target").addClass("flash");
					if (targetTime >= 1000 && targetTime < 2000) {
						$(".target").html("已对准，请连续<b>2</b>秒！");
					} else {
						if (targetTime >= 2000 && targetTime < 3000) {
							$(".target").html("已对准，请连续<b>1</b>秒！");
						} else {
							if (targetTime > 3000) {
								$(".target").html("成功啦！");
								setTimeout(function() {
									$(".target").hide();
									meshPool["diaochan"].status = 4
								}, 1000);
								meshPool["diaochan"].status = 6
							}
						}
					}
				}
			} else {
				targetTimeStart = null;
				$(".target").removeClass("flash")
			}
		}
		poi_dc.lookAt(new THREE.Vector3(0, 0, 0))
	}
	var piaodai_lock = false;

	function render() {
		var r = Date.now() * 0.0005;
		var delta = clock.getDelta();

		for (var i in meshPool) {
			if (meshPool[i].mixer) {
				meshPool[i].mixer.update(delta);
				if (meshPool["diaochan"].action) {
					if (meshPool["diaochan"].action.time > 4.5) {
						meshPool["diaochan"].action.setEffectiveTimeScale(0)
					}
					if (meshPool["diaochan"].action.time > 4) {
						meshPool["piaodai"].visible = true
					} else {
						meshPool["piaodai"].visible = false
					}
					if (meshPool["piaodai"].action && meshPool["piaodai"].visible) {
						if (meshPool["piaodai"].action.time < 0.7) {
							meshPool["piaodai"].action.setEffectiveTimeScale(1)
						}
						if (meshPool["piaodai"].action.time < 0.8) {
							meshPool["piaodai"].action.setEffectiveTimeScale(0.3)
						}
						if (meshPool["piaodai"].action.time > 1.1) {
							meshPool["piaodai"].action.setEffectiveTimeScale(-0.3)
						}
					}
				}
			}
			if (meshPool[i].helper) {
				meshPool[i].helper.update()
			}
		}
		controls.update();
		renderer.clear();
		renderer.setViewport(0, 0, camera_w, camera_h);
		renderer.render(scene, camera);
		if (camera_debug) {
			renderer.setViewport(SCREEN_WIDTH - camera_w, SCREEN_HEIGHT - camera_h, camera_w, camera_h);
			renderer.render(scene, globalCamera)
		}
	}

	function getMedia() {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
		var exArray = [];//存储设备源ID  
		
		if (navigator.getUserMedia) {
			MediaStreamTrack.getSources(function(sourceInfos) {
				for (var i = 0; i != sourceInfos.length; ++i) {
					var sourceInfo = sourceInfos[i];
					//这里会遍历audio,video，所以要加以区分  
					if (sourceInfo.kind === "video") {
						exArray.push(sourceInfo.id)
						//alert(sourceInfo.id);
					}
				}
				navigator.getUserMedia({
					"video": {
						"optional": [{
							"sourceId": exArray[1] //0为前置摄像头，1为后置  使用getUserMedia()拉起摄像头时，默认是拉起前置摄像头的
						}]
					},
					"audio": false
				}, successFunc, errorFunc) //success是获取成功的回调函数  errorFunc是设备支持getUserMedia但是用户不同意调用摄像头的情况
			});

		} else {
			//设备不支持getUserMedia
			need_3droom = true;
		}
	}



	function successFunc(stream) {
		var video = document.createElement("video");
		$stage.appendChild(video);
		if (video.mozSrcObject !== undefined) {
			//Firefox中，video.mozSrcObject最初为null，而不是未定义的，我们可以靠这个来检测Firefox的支持  
			video.mozSrcObject = stream
		} else {
			video.src = window.URL && window.URL.createObjectURL(stream) || stream
		}
		video.play()
	}

	function errorFunc(e) {
		need_3droom = true;
		console.log("Error！" + e)
	}
	getMedia()
})();
window.hasMoved = false;
console.error = (function(origin) {
	return function(errorlog) {
		if (/THREE/.test(errorlog)) {
			//Three报错
			window.location.href = locationJump
		}
	}
})(console.error);
console.warn = (function(origin) {
	return function(errorlog) {
		if (/^THREE.WebGLRenderer:$/.test(errorlog)) {
			//Three渲染时报错
			window.location.href = locationJump
		}
	}
})(console.warn);

document.ontouchstart = function(evt) {
	if (evt.target.tagName == "B" || evt.target.tagName == "EM") {
		if (music.paused) {
			music.play();
			musicIcon.className = "music music_on";
			
		} else {
			music.pause();
			musicIcon.className = "music";
		}
	}
	evt.preventDefault()
};
window.onunload = function() {
	music.pause()
};