/**
 * Created by JetBrains WebStorm.
 * User: actionmouse
 * Date: 1/24/12
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */

(function(window) {

    function HelpScreen(pos) {
        this._x = pos.x;
        this._y = pos.y;
        this.init();
    }

    HelpScreen.prototype.init = function() {

    }

    HelpScreen.prototype._x = null;
    HelpScreen.prototype._y = null;
    HelpScreen.prototype._playBtn = null;

    HelpScreen.prototype.getPlayBtnRect = function(){
        var data = _ssData.frames['continueBtn.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        //centerX, 400, data.w, data.h;
        var rect = {};
        rect.top = 420;
        rect.right = centerX + data.w;
        rect.bottom = 420 + data.h;
        rect.left = centerX;
        return rect;
    }

    HelpScreen.prototype.update = function() {

    }

    HelpScreen.prototype.render = function() {
        var data = _ssData.frames['help.png'].frame;
        var centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 0, data.w, data.h);
        
        data = _ssData.frames['continueBtn.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
    }
    HelpScreen.prototype.renderPlayRoll = function(){        
        data = _ssData.frames['continueBtn_over.png'].frame;
        _stage.clearRect(centerX,420,data.w,data.h);
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
    }
    HelpScreen.prototype.renderPlayOut = function(){
        data = _ssData.frames['continueBtn.png'].frame;
        _stage.clearRect(centerX,420,data.w,data.h);
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
    }

    window.HelpScreen = HelpScreen;

}(window));
