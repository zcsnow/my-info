/**
 * Created by JetBrains WebStorm.
 * User: actionmouse
 * Date: 1/21/12
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */

(function(window) {

    function LevelScreen(pos) {
        this._x = pos.x;
        this._y = pos.y;
        //this._data = data;
        //this.init();
    }

    LevelScreen.prototype.init = function() {
        ///make data
        //this._data = [1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var data = [];
        var level;
        var i;
        var v;
        for(i = 0;i < 20;i++){
            level = i + 1;
            if(level < _userCurrentLevel){
                v = 1;
            }
            else if(level == _userCurrentLevel){
                v = 2;
            }
            else{
                v = 0;
            }
            data.push(v);
        }
        this._data = data;
    }

    LevelScreen.prototype._x = null;
    LevelScreen.prototype._y = null;
    LevelScreen.prototype._data = null;
    LevelScreen.prototype._tiles = null;

    LevelScreen.prototype.update = function() {

    }

    LevelScreen.prototype.render = function() {
        _stage.clearRect(0,0,_canvas.width,_canvas.height);
        this._tiles = [];
        var i;
        var tile;
        var data;
        var dataStr;
        var numColor;
        var level;
        var xPos = 190;
        var yPos = 125;
        var cnt = 0;
        ///TILE
        data = _ssData.frames['chooseLevel.png'].frame;
        var centerX = (_canvas.width / 2) - (data.w / 2);
        _stage.drawImage(_assets, data.x, data.y, data.w, data.h, centerX, 10, data.w, data.h);
        ////TILES
        for(i = 0;i < this._data.length;i++){
            level = i + 1;
            switch(this._data[i]){
                case 0:
                dataStr = 'Locked';
                level = '';
                break;
                case 1:
                dataStr = 'White';
                numColor = '#000';
                break;
                default:
                dataStr = 'Black';
                numColor = '#FFF';
                break;
            }
            data = _ssData.frames['levelSelector' + dataStr + '.png'].frame;
            _stage.drawImage(_assets, data.x, data.y,data.w, data.h,xPos, yPos, data.w, data.h);
            _stage.save();
            _stage.fillStyle = numColor;
            _stage.font = "bold 30pt Helvetica";
            _stage.textBaseline = "middle";
            _stage.textAlign = "center";
            _stage.fillText(level,xPos + (data.w / 2),yPos + (data.h / 2) );
            _stage.restore();
            ///build object
            tile = {};
            var rect = {};
            rect.top = yPos;
            rect.right = xPos + data.w;
            rect.bottom = yPos + data.h;
            rect.left = xPos;
            tile.rect = rect;
            tile.level = level;
            this._tiles.push(tile);
            xPos += 65;
            cnt++;
            if(cnt > 3){
                cnt = 0;
                xPos = 190;
                yPos += 65;
            }
            
        }
    }
    LevelScreen.prototype.checkLevelClicked = function(){
        var i;
        var tile;
        var rect;
        for(i = 0;i < this._tiles.length;i++){
            tile = this._tiles[i];
            rect = tile.rect;
            if(_mouse.x < rect.left || _mouse.x > rect.right || _mouse.y < rect.top || _mouse.y > rect.bottom){
                ///NOT HIT
            }
            else{
                if(tile.level != ''){
                    return tile.level;
                }
            }
        }
        return 0;
    }
    window.LevelScreen = LevelScreen;

}(window));
