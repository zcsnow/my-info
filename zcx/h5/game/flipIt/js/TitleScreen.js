/**
 * Created by JetBrains WebStorm.
 * User: actionmouse
 * Date: 1/20/12
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */

(function(window) {

    function TitleScreen(pos) {
        this._x = pos.x;
        this._y = pos.y;
        this.init();
    }

    TitleScreen.prototype.init = function() {

    }

    TitleScreen.prototype._x = null;
    TitleScreen.prototype._y = null;
    TitleScreen.prototype._playBtn = null;

    TitleScreen.prototype.getPlayBtnRect = function(){
        var data = _ssData.frames['playBtn.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        //centerX, 400, data.w, data.h;
        var rect = {};
        rect.top = 360;
        rect.right = centerX + data.w;
        rect.bottom = 360 + data.h;
        rect.left = centerX;
        return rect;
    }
    TitleScreen.prototype.getScoresBtnRect = function(){
        var data = _ssData.frames['scores.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        var rect = {};
        rect.top = 420;
        rect.right = centerX + data.w;
        rect.bottom = 420 + data.h;
        rect.left = centerX;
        return rect;
    }
    TitleScreen.prototype.update = function() {

    }

    TitleScreen.prototype.render = function() {
        var data = _ssData.frames['homeScreenLogo.png'].frame;
        var centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 0, data.w, data.h);
        data = _ssData.frames['homeScreenTiles.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 150, data.w, data.h);

        data = _ssData.frames['playBtn.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 360, data.w, data.h);

        data = _ssData.frames['scores.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
    }

    TitleScreen.prototype.renderPlayRoll = function(){
        data = _ssData.frames['playBtn_over.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 360, data.w, data.h);
    }
    TitleScreen.prototype.renderPlayOut = function(){
        data = _ssData.frames['playBtn.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 360, data.w, data.h);
    }
    TitleScreen.prototype.renderScoresRoll = function(){
         data = _ssData.frames['scores_over.png'].frame;
         centerX = (_canvas.width / 2) - (data.w / 2);
         _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
    }
    TitleScreen.prototype.renderScoresOut = function(){
         data = _ssData.frames['scores.png'].frame;
         centerX = (_canvas.width / 2) - (data.w / 2);
         _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
    }

    window.TitleScreen = TitleScreen;

}(window));
