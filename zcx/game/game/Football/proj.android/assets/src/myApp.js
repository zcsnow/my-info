//默认层MyLayer
var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    size:null,
    bg:null,
    slider:null,
    ball:null,
    scoreTTF:null,
    score:0,
    column:0,
    row:0,
    container:null,
    accessRoadPos:null,
    gameover:false,
    lastDirection:-1,
    needGoUp:false,


    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
    },


    init:function () {

        this._super();

        size = cc.Director.getInstance().getWinSize();

        this.initUI();

        this.container = new Array();

        //初始化存储通路数组
        this.accessRoadPos = new Array();
        this.accessRoadPos.push(4);

        this.preInit5Row();

        this.setTouchEnabled(true);

        return true;
    },

    //预先初始化5行
    preInit5Row:function(){
        for(var i = 0; i < 5; i++){
            var row = new Array();
            var sprite = cc.Sprite.create(s_Block);
            sprite.setPosition(sprite.getContentSize().width /2, 250 + sprite.getContentSize().height * i);
            this.addChild(sprite);
            row.push(sprite);

            var sprite1 = cc.Sprite.create(s_Block);
            sprite1.setPosition(size.width - sprite1.getContentSize().width /2, 250 + sprite1.getContentSize().height * i);
            this.addChild(sprite1);
            row.push(sprite1);

            this.container.push(row);
            this.row++;
        }

        this.schedule(this.addBlock);
    },

    //游戏逻辑：即update方法
    gameLogic:function(dt){

        if(!this.gameover){

            var location = this.ball.getPosition();

            //碰撞检测
            for(var i = 0; i < this.container.length; i++){

                var row = this.container[i];
                for(var j = 0; j < row.length; j++){
                    var sprite = row[j];
                    //if(cc.rectContainsPoint(sprite.getBoundingBox(),location)){
                    if(cc.rectIntersectsRect(sprite.getBoundingBox(),this.ball.getBoundingBox())){
                        if(!this.gameover){
                            this.gameover = true;
                            sprite.runAction(cc.Sequence.create(cc.Blink.create(0.9,3),cc.CallFunc.create(this.delayGameOver, this)));
                        }
                    }
                }
            }

            //遍历 下落移动
            for(var i = 0; i < this.container.length; i++){

                var row = this.container[i];
                for(var j = 0; j < row.length; j++){
                    var sprite = row[j];
                    var location = sprite.getPosition();
                    var nextLocation = cc.pAdd(location,cc.p(0,-6));
                    sprite.setPosition(nextLocation);
                }
            }

            //遍历移除行
            for(var i = 0; i < this.container.length; i++){

                var row = this.container[i];
                var sprite = row[0];
                var location = sprite.getPosition();

                if(location.y < 230){
                    for(var j = 0; j < row.length; j++){
                        var sprite = row[j];
                        this.removeChild(sprite);
                    }
                    this.container.splice(i,1);
                    this.row--;
                    this.score++;
                    this.scoreTTF.setString(""+this.score);
                }
            }
        }
    },

    delayGameOver:function(){

        var curHighScore = sys.localStorage.getItem("high_score");

        //todo
        sys.localStorage.setItem("current_score",""+this.score);

        if(this.score > curHighScore){
            sys.localStorage.setItem("high_score",""+this.score);
        }

        var scene = new FailedScene();
        cc.Director.getInstance().replaceScene(scene);

    },

    //动态添加障碍块的逻辑
    addBlock:function(dt){

        if(this.row < 6){
            this.addRow();
        }
    },

    //添加行
    addRow:function(){

        var row = new Array();

        //先取得最上边一列的坐标y
        var topRow = this.container[this.container.length - 1];
        var block = topRow[0];
        var location = block.getPosition();

        for(var i = 1; i <= 7; i++){

            var isOk = true;

            for(var j = 0; j < this.accessRoadPos.length; j++){
                if( this.accessRoadPos[j] == i ){
                    isOk = false;
                }
            }

            if(isOk){
                var sprite = cc.Sprite.create(s_Block);
                sprite.setPosition(sprite.getContentSize().width * (i - 0.5),location.y + sprite.getContentSize().height);
                this.addChild(sprite);
                row.push(sprite);
            }
        }
        this.container.push(row);
        this.row++;


        this.genNextRandomPos();
    },

    //生成下一列随机数位置信息
    genNextRandomPos:function(){

        //上一次的最左位置和最右位置
        var originPosLeft = this.accessRoadPos[0];
        var originPosRight = this.accessRoadPos[this.accessRoadPos.length - 1];

        //清空上一轮位置
        this.accessRoadPos.splice(0,this.accessRoadPos.length);

        //需要向上直行x步
        if(this.needGoUp){
            if(this.lastDirection == -1)
                this.accessRoadPos.push(originPosLeft);
            else
                this.accessRoadPos.push(originPosRight);

            this.needGoUp = false;
        }else{
            var originPos;
            if(this.lastDirection == -1)
                originPos = originPosLeft;
            else
                originPos = originPosRight;

            var randAddNum_0_3 = Math.floor(Math.random() * 4);
            var toPos = originPos;
            if(this.lastDirection == -1){
                this.lastDirection = 1;
                if(toPos + randAddNum_0_3 > 6)
                    toPos = 6;
                else
                    toPos += randAddNum_0_3;

                for(var i = parseInt(originPos); i <= parseInt(toPos); i++){
                    this.accessRoadPos.push(i);
                }
            }else{
                this.lastDirection = -1;
                if(toPos - randAddNum_0_3 < 2)
                    toPos = 2;
                else
                    toPos -= randAddNum_0_3;

                for(var i = parseInt(toPos); i <= parseInt(originPos); i++){
                    this.accessRoadPos.push(i);
                }
            }
            this.needGoUp = true;
        }





    },

    initUI:function(){
        //背景
        this.bg = cc.Sprite.create(s_Bg1);
        this.bg.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(this.bg, 0);
        //滑动条
        this.slider = cc.Sprite.create(s_Slider);
        this.slider.setPosition(size.width /2,size.height * 0.175);
        this.addChild(this.slider,1);
        //引导
        var labelTeach = cc.LabelTTF.create("左右滑动这里开始","",40);
        labelTeach.setPosition(this.slider.getContentSize().width/2, this.slider.getContentSize().height/2);
        this.slider.addChild(labelTeach,1);

        //炫耀
        var ad = cc.MenuItemImage.create(
            "res/ad.png",
            "res/ad.png",
            function () {
                if(sys.platform !== 'browser'){
                    var lss = ls.Leafsoar.create();
                    lss.openUrl();
                }

            },this);
        ad.setAnchorPoint(0.5, 0.5);
        ad.setPosition(size.width/2, ad.getContentSize().height * 0.5);

        var menu = cc.Menu.create(ad);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);

        //球
        this.ball = cc.Sprite.create(s_Ball);
        this.ball.setPosition(size.width/2,size.height * 0.35);
        this.addChild(this.ball,2);

        //分数背景
        var scoreBg = cc.Sprite.create(s_ScoreBg);
        scoreBg.setPosition(size.width * 0.5, size.height * 0.9);
        this.addChild(scoreBg,3);

        this.scoreTTF = cc.LabelTTF.create(""+this.score,"",60);
        this.scoreTTF.setPosition(scoreBg.getContentSize().width/2, scoreBg.getContentSize().height/2);
        scoreBg.addChild(this.scoreTTF);

    },

    onTouchesBegan:function (touches, event) {
        var touch = touches[0];
        var location = touch.getLocation();

        if (cc.rectContainsPoint(this.slider.getBoundingBox(),location)) {
            this.isMouseDown = true;
            this.schedule(this.gameLogic);
        }

    },

    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches && !this.gameover) {
                //this.circle.setPosition(touches[0].getLocation().x, touches[0].getLocation().y);
                var touch = touches[0];
                var location = touch.getLocation();
                this.ball.setPosition(cc.p(location.x, size.height * 0.35));
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }

});


//默认入口场景
var MyScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
