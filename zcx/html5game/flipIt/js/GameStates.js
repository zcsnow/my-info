/**
 * Created by JetBrains WebStorm.
 * User: actionmouse
 * Date: 1/18/11
 * Time: 2:07 PM
 * To change this template use File | Settings | File Templates.
 */

(function(window) {

    function GameStates() {
        this.init();
    }

    GameStates.prototype.init = function() {

    }
    GameStates.GAME_STATE_ASSETS_LOADING = 9;
    GameStates.GAME_STATE_INIT = 10;
    GameStates.GAME_STATE_WAITING_FOR_NEW_GAME = 11;
    GameStates.GAME_STATE_WAIT_FOR_LOAD = 20
    GameStates.GAME_STATE_SPLASH = 30;
    GameStates.GAME_STATE_TITLE = 40;
    GameStates.GAME_STATE_INSTRUCTIONS_SCREEN = 40.5;
    GameStates.GAME_STATE_LEVEL_SCREEN = 41;
    GameStates.GAME_STATE_LEVEL_IN = 42;
    GameStates.GAME_STATE_HELP = 43;
    GameStates.GAME_STATE_NEW_GAME = 50;
    GameStates.GAME_STATE_NEW_LEVEL = 60;
    GameStates.GAME_STATE_WAIT_FOR_FLIP = 61;
    GameStates.GAME_STATE_FLIP_TILES = 62;
    GameStates.GAME_STATE_PLAYER_START = 70;
    GameStates.GAME_STATE_PLAY_LEVEL = 80;
    GameStates.GAME_STATE_LEVEL_COMPLETE = 81;
    GameStates.GAME_STATE_FADE_LEVEL = 82;
    GameStates.GAME_STATE_PAUSE = 83;
    GameStates.GAME_STATE_PLAYER_DIE = 90;
    GameStates.GAME_STATE_LEVEL_LOST = 91;
    GameStates.GAME_STATE_WAIT = 92;
    GameStates.GAME_STATE_GAME_OVER = 100;

    window.GameStates = GameStates;

}(window));

