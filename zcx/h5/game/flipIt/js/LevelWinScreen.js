/**
 * Created by JetBrains WebStorm.
 * User: actionmouse
 * Date: 1/20/12
 * Time: 8:29 PM
 * To change this template use File | Settings | File Templates.
 */

(function(window) {

    function LevelWinScreen(pos) {
        this._x = pos.x;
        this._y = pos.y;
        this.init();
    }

    LevelWinScreen.prototype.init = function() {

    }

    LevelWinScreen.prototype._x = null;
    LevelWinScreen.prototype._y = null;
    LevelWinScreen.prototype._cnt = 0;
    LevelWinScreen.prototype._rotation = -90;
    LevelWinScreen.prototype._alpha = 1;
    LevelWinScreen.prototype._splashComplete = false;
    LevelWinScreen.prototype._score = 0;
    LevelWinScreen.prototype._bonusScore = 0;
    LevelWinScreen.prototype._continueBtn = null;
    LevelWinScreen.prototype._submitBtn = null;    

    LevelWinScreen.prototype.getSplashComplete = function(){
        return this._splashComplete;
    }

    LevelWinScreen.prototype.setBonus = function(bonus,score){
        this._bonusScore = bonus;
        this._score = score;
        this.renderContinueButton();
    }
    LevelWinScreen.prototype.renderContinueButton = function(){
        _stage.globalAlpha = 1;
        var data = _ssData.frames['continueBtn.png'].frame;
        var centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,centerX,382,data.w,data.h);
        this._continueBtn = {};
        var rect = {};
        rect.top = 382;
        rect.right = centerX + data.w;
        rect.bottom = 382 + data.h;
        rect.left = centerX;
        this._continueBtn.rect = rect;

        //////SUBMIT
        data = _ssData.frames['submit.png'].frame;
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,centerX,440,data.w,data.h);
        this._submitBtn = {};
        rect = {};
        rect.top = 440;
        rect.right = centerX + data.w;
        rect.bottom = 440 + data.h;
        rect.left = centerX;
        this._submitBtn.rect = rect;
    }
    LevelWinScreen.prototype.getContinueRect = function(){
        return this._continueBtn.rect;
    }
    LevelWinScreen.prototype.getSubmitRect = function(){
        return this._submitBtn.rect;
    }
    LevelWinScreen.prototype.update = function() {
        this._cnt++;
        this._rotation += 1;
        this._bonusScore -= 75;
        if(this._bonusScore < 0){
            this._bonusScore = 0;
        }
        else{
            this._score += 75;
        }
        
    }
    LevelWinScreen.prototype.render = function() {
        _stage.clearRect(0,0,_canvas.width,_canvas.height - 100);
        this.renderBurst();
        this.renderStatic();
        this.renderScores();
    }
    LevelWinScreen.prototype.renderBurst = function(){
        var data = _ssData.frames['starburst.png'].frame;
        _stage.save();
        _stage.translate((_canvas.width / 2) - (data.w / 2), 15);
        _stage.translate(data.w / 2, data.h / 2);
        _stage.rotate(this._rotation * TO_RADIANS);
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,-(data.w / 2),-(data.h / 2),data.w, data.h);
        _stage.restore();
    }
    LevelWinScreen.prototype.renderStatic = function(){
        var data = _ssData.frames['levelWin.png'].frame;
        var centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,centerX,10,data.w,data.h);
    }
    LevelWinScreen.prototype.renderScores = function(){
        var centerX = _canvas.width / 2;
        _stage.save();
        _stage.fillStyle = '#000000';
        _stage.font = "bold 12pt Helvetica";
        _stage.textBaseline = "middle";
        _stage.textAlign = "center";
        _stage.fillText(this._bonusScore,centerX,270);
        _stage.restore();
        _stage.save();
        _stage.fillStyle = '#FFFFFF';
        _stage.font = "bold 40pt Helvetica";
        _stage.textBaseline = "middle";
        _stage.textAlign = "center";
        _stage.fillText(this._score,centerX,340);
        _stage.restore();
    }
    LevelWinScreen.prototype.renderPlayRoll = function(){
        var data = _ssData.frames['continueBtn_over.png'].frame;
        var centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.clearRect(centerX,382,data.w,data.h);
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,centerX,382,data.w,data.h); 
    }
    LevelWinScreen.prototype.renderPlayOut = function(){    
        var data = _ssData.frames['continueBtn.png'].frame;        
        var centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.clearRect(centerX,382,data.w,data.h);
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,centerX,382,data.w,data.h); 
    }
    LevelWinScreen.prototype.renderScoresRoll = function(){        
        data = _ssData.frames['submit_over.png'].frame;
        var centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.clearRect(centerX,440,data.w,data.h);
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,centerX,440,data.w,data.h);                
    }
    LevelWinScreen.prototype.renderScoresOut = function(){       
        data = _ssData.frames['submit.png'].frame; 
        var centerX = (_canvas.width / 2) - (data.w / 2);                
        _stage.clearRect(centerX,440,data.w,data.h);
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,centerX,440,data.w,data.h);           
    }
    window.LevelWinScreen = LevelWinScreen;

}(window));
















