/**
 * Created by JetBrains WebStorm.
 * User: actionmouse
 * Date: 1/18/12
 * Time: 1:08 PM
 * To change this template use File | Settings | File Templates.
 */

(function(window) {

    function Tile(pos,value,key) {
        this._targetX = pos.x;
        this._y = pos.y;
        this._value = value;
        this._key = key;
        this._data = { "images": ["flipTile.png"],
                       "frames": {"count": 23, "width": 50, "height": 50, "regX": 0, "regY": 0},
                       "animations": {"turnwhite": [11, 19], "turnblack": [1, 8], "white": [0, 0], "black": [10, 10]} };
        this._width = 80;
        this._height = 77;
        this._x = 0 - (this._key * 50);
        this._introSpeed = (this._key + 1) * 20;
        this.init();
    }

    Tile.prototype.init = function() {
        ///RENDER INIT STATE
        var frame = this._data.animations[this._value][1];
        this._cnt = frame;
        var sx =  frame * this._width;
        var sy =  0;
        this.render();
        //_stage.drawImage(_ss, sx, sy, this._width,this._height,this._x, this._y, this._width, this._height);
    }

    Tile.prototype._data = null;
    Tile.prototype._x = null;
    Tile.prototype._y = null;
    Tile.prototype._targetX = null;
    Tile.prototype._width = null;
    Tile.prototype._height = null;
    Tile.prototype._value = null;
    Tile.prototype._key = null;
    Tile.prototype._introSpeed = null;

    Tile.prototype._isFlipping = false;
    Tile.prototype._cnt = 0;

    Tile.prototype.getRect = function(){
        var rect = {};
        rect.top = this._y + 13;
        rect.right = this._x + (this._width - 13);
        rect.bottom = this._y + (this._height - 13);
        rect.left = this._x + 13;
        return rect;
    }
    Tile.prototype.getIsFlipping = function(){
        return this._isFlipping;
    }
    Tile.prototype.getKey = function(){
        return this._key;
    }
    Tile.prototype.getValue = function(){
        return this._value;
    }
    Tile.prototype.flip = function(){
        this._value = this._value == 'white' ? 'black' : 'white';
        var frame = this._data.animations['turn' + this._value][0];
        this._cnt = frame;
        this._isFlipping = true;
    }
    Tile.prototype.updateIntro = function(){
        this._x += this._introSpeed;
        if(this._x > this._targetX){
            this._x = this._targetX;
        }
    }
    Tile.prototype.update = function() {
        var endFrame = this._data.animations['turn' + this._value][1];
        if(this._cnt > endFrame){
            this._isFlipping = false;
        }
        this._cnt ++;
    }

    Tile.prototype.render = function() {
        var sx =  this._cnt * this._width;
        var sy =  0;
        _stage.drawImage(_ss, sx, sy, this._width,this._height,this._x, this._y, this._width, this._height);
        //DEV
    }

    window.Tile = Tile;

}(window));
