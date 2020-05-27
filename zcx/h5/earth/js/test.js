// Created by Bjorn Sandvik - thematicmapping.org
/*(function () {

	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width  = window.innerWidth,
		height = window.innerHeight;

	// Earth params
	var radius   = 0.5,
		segments = 32,
		rotation = 6;  

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 1.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5,3,5);
	scene.add(light);

    var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation; 
	scene.add(sphere)

    var clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
	scene.add(clouds)

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
		clouds.rotation.y += 0.0005;		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
				bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular:    new THREE.Color('grey')								
			})
		);
	}

	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);		
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

}());*/

(function () {
    var scene, camera, renderer, WIDTH, HEIGHT, aspectRatio, fieldOfView, nearPlane, farPlane,mesh;
	var webgl = document.getElementById('webgl');
	// 获得屏幕的宽和高，用它们设置相机的纵横比和渲染器的大小
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    init();

    // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
    window.addEventListener('resize',onWindowResize,false);

    function onWindowResize(){
        // 更新渲染器的高度和宽度以及相机的纵横比
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        camera.aspect = WIDTH/HEIGHT;
        camera.updateProjectionMatrix(); //更新投影矩阵
        renderer.setSize(WIDTH, HEIGHT);
    }

    function render(){
        requestAnimationFrame(render);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        //mesh.rotation.z += 0.1;
        renderer.render(scene, camera);//执行渲染操作
    }

    function init(){
    	createScene();
    	createCamera();
    	createRenderer();
    	createLight();
    	createEarth();
    }

    //创建场景
	function createScene(){
		scene = new THREE.Scene();
	}

    //创建相机
    function createCamera(){
	    aspectRatio = WIDTH/HEIGHT; //纵横比
	    fieldOfView = 45;  //视角 焦距接近人眼(60mm)
	    nearPlane = 0.01;   //近平面 
	    farPlane = 1000; //远平面  
	    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);//透视相机

	    //设置相机位置
	    camera.position.x = 0;
	    camera.position.y = 0;
	    camera.position.z = 1.5;
	    //camera.position.set(0,0,200);

	    //设置相机的上方向  up的方向和lookAt的方向必然是垂直的
	    camera.up.x = 0;
	    camera.up.y = 1;
	    camera.up.z = 0;

	    //设置相机聚焦的位置(指向的场景对象)
	    //camera.lookAt(0,0,0);
	    //camera.lookAt(new THREE.Vector3(0,0,0));//看空间中的原点(0,0,0)
	}

	//创建渲染器
	function createRenderer(){
	    renderer = new THREE.WebGLRenderer({
	        //alpha: true, //在css中设置背景色透明显示渐变色
	        //antialias: true, //开启抗锯齿，但这样会降低性能
	    });

	    //定义渲染器的尺寸,在这里它会填满整个屏幕
        renderer.setSize(WIDTH,HEIGHT);
        //renderer.setPixelRatio( window.devicePixelRatio );
        //renderer.setClearColor(0x000000,1);//设置默认颜色与透明度

        //body元素中插入canvas对象
        webgl.appendChild(renderer.domElement);//renderer.domElement的值是一个canvas对象，用appendChild方法可以在页面插入canvas。
        renderer.render(scene, camera);

	}

	//创建灯光
	function createLight(){
		var ambientLight = new THREE.AmbientLight(0x333333);  //环境光全局应用的基本光源，昏暗的环境光显示远离太阳的区域
		scene.add();
	    var directionLight = new THREE.DirectionalLight(0xffffff, 1);//方向光模仿太阳光，地球上接受的所有光线彼此平行
	    directionLight.position.set(5,3,5);
	    scene.add(directionLight);
	
	}


	//创建地球
	function createEarth(){
		var geometry = new THREE.SphereGeometry(0.5,32,32); //第一个参数是半径，第二和第三参数是宽度和高度段的数量
		var material = new THREE.MeshPhongMaterial({
			map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
			bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
			bumpScale:   0.005,
			specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
			specular:    new THREE.Color('grey')
		});

		var mesh = new THREE.Mesh(geometry,material);
		
		scene.add(mesh);
	}
	


}());
















