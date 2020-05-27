/**
 * Created by JetBrains WebStorm.
 * User: bradmanderscheid
 * Date: 1/25/12
 * Time: 11:37 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created by JetBrains WebStorm.
 * User: actionmouse
 * Date: 12/24/11
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */

(function(window) {

    function RecordScreen(pos) {
        this._x = pos.x;
        this._y = pos.y;
        this._centerPoint = {x:_canvas.width / 2,y:_canvas.height / 2};
        this.init();
    }

    RecordScreen.prototype.init = function() {
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

    RecordScreen.prototype._x = null;
    RecordScreen.prototype._y = null;
    RecordScreen.prototype._recordData = null;;
    RecordScreen.prototype._cnt = 0;
    RecordScreen.prototype._centerPoint = null;    

    ///////GET SET
    RecordScreen.prototype.setRecordData = function(data){
        this._recordData = data;
        this.render();
    }
    RecordScreen.prototype.getContinueRect = function(){
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
    RecordScreen.prototype.drawScore = function(score){
        _stage.clearRect(0,0,_canvas.width,_canvas.height);
        _stage.save();
        _stage.font = "bold 25pt Helvetica";
        _stage.textAlign = "center";
        _stage.fillStyle = "#FFFFFF";
        _stage.fillText("TOP 20 SCORES",_canvas.width / 2,50);
        _stage.font = "15px Calibri";
        _stage.fillText("powered by Scoreoid",_canvas.width / 2,70);
        _stage.restore();
    }
    RecordScreen.prototype.update = function() {

    }

    RecordScreen.prototype.render = function() {
        _stage.clearRect(0,100,_canvas.width,_canvas.height - 100);
        _stage.save();
        _stage.font = "bold 10pt Helvetica";
        _stage.fillStyle = "#FFFFFF";
        if(this._recordData == null){
            _stage.textAlign = "center";
            _stage.fillText("LOADING SCORES...",this._centerPoint.x, this._centerPoint.y);
        }
        else{
            for(var i = 0; i < this._recordData.length;i++){
                _stage.textAlign = "left";
                var num = i < 9 ? "0" + (i + 1) : (i + 1);
                _stage.fillText(num + '. ' + this._recordData[i].Player.username,180, 100 + (i * 16) );
                _stage.textAlign = "right";
                _stage.fillText(this._recordData[i].Score.score,450, 100 + (i * 16) );
            }
            ///FILL EMPTIES
            for(i = i;i < 20;i++){
                var num = i < 9 ? "0" + (i + 1) : (i + 1);
                _stage.textAlign = "left";
                _stage.fillText(num + '. ',180, 100 + (i * 16) );
            }
        }
        _stage.restore();
        var data = _ssData.frames['continueBtn.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
        ///BUILD CONTINUE RECT
        _continueRect = {};
        var rect = {};
        rect.top = 420;
        rect.right = centerX + data.w;
        rect.bottom = 420 + data.h;
        rect.left = centerX;
        return rect;
    }
    RecordScreen.prototype.renderPlayRoll = function(){
        var data = _ssData.frames['continueBtn_over.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.clearRect(centerX,420,data.w,data.h);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
    }
    RecordScreen.prototype.renderPlayOut = function(){
        var data = _ssData.frames['continueBtn.png'].frame;
        centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.clearRect(centerX,420,data.w,data.h);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 420, data.w, data.h);
    }
    
    window.RecordScreen = RecordScreen;

}(window));
