"use strict";

function LevelManager (data) {
    this.levels     = data.levels;
    this.maxLevel   = this.levels.length;
    this._init();
}
//-----------------------------------------------------------------------------------------------------------
LevelManager.prototype = {
    _init : function () {
        var colorToCode = { "Y":1, "R":2, "G":3, "B":4, "P":5, "X":6, "W":7 };
        for (var i = this.maxLevel - 1; i >= 0; i--) {
            var settings = this.levels[i];
            settings._colors = settings.colors.slice(); // save text version for debugging
            for (var k = settings.colors.length - 1; k >= 0; k--) {
                settings.colors[k] = colorToCode[ settings.colors[k] ];
            }
            this.levels[i] = settings;
        }
    },
    //-------------------------------------------------------------------------------------------------------
    getLevel : function (lv) {
        return this.levels[ lv - 1 ];
    },
    //-------------------------------------------------------------------------------------------------------
    getMaxLevel : function () {
        return this.maxLevel;
    },
    //-------------------------------------------------------------------------------------------------------
    debug : function () {
        console.log( this.levels );
    }
};