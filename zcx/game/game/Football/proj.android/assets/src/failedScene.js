//默认层MyLayer
var FailedLayer = cc.Layer.extend({
    isMouseDown:false,


    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
    },

    init:function () {

        this._super();

        //广告
        if(sys.platform !== 'browser'){
            var lss = ls.Leafsoar.create();
            lss.functionTest();
        }


        size = cc.Director.getInstance().getWinSize();

        cc.log("FAILED!!!");

        var highScore = sys.localStorage.getItem("high_score");
        var curScore = sys.localStorage.getItem("current_score");

        //UI初始化
        //背景
        var bg = cc.Sprite.create(s_Bg);
        bg.setPosition(size.width/2, size.height/2);
        this.addChild(bg);

        var gameoverLabel = cc.LabelTTF.create("游戏结束","",60);
        gameoverLabel.setPosition(size.width/2, size.height * 0.92);
        this.addChild(gameoverLabel,1);

        //分数版背景
        var highScoreBg = cc.Sprite.create(s_HighScoreBg);
        highScoreBg.setPosition(size.width/2, size.height * 0.73);
        this.addChild(highScoreBg,1);

        var labelScore = cc.LabelTTF.create("分数","",40);
        labelScore.setPosition(highScoreBg.getContentSize().width/2, highScoreBg.getContentSize().height/5 * 4);
        highScoreBg.addChild(labelScore);

        var labelScore1 = cc.LabelTTF.create(""+curScore,"",60);
        labelScore1.setPosition(highScoreBg.getContentSize().width/2, highScoreBg.getContentSize().height/5 * 3);
        highScoreBg.addChild(labelScore1);

        var labelHighScore = cc.LabelTTF.create("最高分","",40);
        labelHighScore.setPosition(highScoreBg.getContentSize().width/2, highScoreBg.getContentSize().height/5 * 2);
        highScoreBg.addChild(labelHighScore);

        var labelHighScore1 = cc.LabelTTF.create(""+highScore,"",60);
        labelHighScore1.setPosition(highScoreBg.getContentSize().width/2, highScoreBg.getContentSize().height/5 * 1);
        highScoreBg.addChild(labelHighScore1);

        //炫耀
        var share = cc.MenuItemImage.create(
            "res/button.png",
            "res/button.png",
            function () {
                if(sys.platform !== 'browser'){
                    var lss = ls.Leafsoar.create();
                    lss.share();
                }

            },this);
        share.setAnchorPoint(0.5, 0.5);
        share.setPosition(size.width/2, size.height * 0.5);

        var menu = cc.Menu.create(share);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);

        var labelShare = cc.LabelTTF.create("炫耀"," ",60);
        labelShare.setPosition(share.getContentSize().width /2, share.getContentSize().height /2);
        share.addChild(labelShare);

        this.scheduleOnce(this.retry, 0.5);

        return true;
    },

    retry:function(dt){

        var retry = cc.MenuItemImage.create(
            "res/button.png",
            "res/button.png",
            function () {
                var scene = new MyScene();
                cc.Director.getInstance().replaceScene(scene);
            },this);
        retry.setAnchorPoint(0.5, 0.5);
        retry.setPosition(size.width/2, size.height * 0.33);

        var menu = cc.Menu.create(retry);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);

        var tryAgainLabel = cc.LabelTTF.create("重来"," ",60);
        tryAgainLabel.setPosition(retry.getContentSize().width /2, retry.getContentSize().height /2);
        retry.addChild(tryAgainLabel);

    }

});


//默认入口场景
var FailedScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },

    onEnter:function () {
        this._super();
        var layer = new FailedLayer();
        this.addChild(layer);
        layer.init();
    }
});
