/**
 * Created by JetBrains WebStorm.
 * User: actionmouse
 * Date: 1/20/12
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */

(function(window) {

    function SplashScreen(pos) {
        this._x = pos.x;
        this._y = pos.y;
        this.init();
    }

    SplashScreen.prototype.init = function() {

    }

    SplashScreen.prototype._x = null;
    SplashScreen.prototype._y = null;
    SplashScreen.prototype._cnt = 0;
    SplashScreen.prototype._rotation = -90;
    SplashScreen.prototype._alpha = 1;
    SplashScreen.prototype._splashComplete = false;

    SplashScreen.prototype.getSplashComplete = function(){
        return this._splashComplete;
    }

    SplashScreen.prototype.update = function() {
        this._cnt++;
        this._rotation += 10;
    }

    SplashScreen.prototype.render = function() {
        if(this._rotation < 0){
            _cnt = 0;
            this.renderHead();
        }
        else{
            this.popTitle();
        }
    }
    SplashScreen.prototype.renderHead = function(){
        _stage.clearRect(0,0,_canvas.width,_canvas.height);
        var data = _ssData.frames['logo.png'].frame;
        _stage.save();
        _stage.translate((_canvas.width / 2) - (data.w / 2), 140);
        _stage.translate(data.w / 2, data.h / 2);
        _stage.rotate(this._rotation * TO_RADIANS);
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,-(data.w / 2),-(data.h / 2),data.w, data.h);
        _stage.restore();
    }
    SplashScreen.prototype.popTitle = function(){
        _stage.clearRect(0,0,_canvas.width,_canvas.height);
        var data = _ssData.frames['logo.png'].frame;
        var com = _ssData.frames['com.png'].frame;
        if(this._cnt > 60){
            this._alpha -= .11;
            if(this._alpha <= 0){
                this._splashComplete = true;
                return;
            }
        }
        _stage.save();
        _stage.globalAlpha = this._alpha;
        _stage.drawImage(_assets, data.x, data.y,data.w, data.h,(_canvas.width / 2) - (data.w / 2), 140,data.w, data.h);
        _stage.drawImage(_assets, com.x, com.y,com.w, com.h,(_canvas.width / 2) - (com.w / 2), 270,com.w, com.h);
        _stage.restore();
    }

    window.SplashScreen = SplashScreen;

}(window));
