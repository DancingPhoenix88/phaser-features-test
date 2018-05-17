"use strict";

function RecyclePool (capacity) {
    this.pool           = [];
    this.capacity       = capacity;
    this._takeIndex     = 0;
    this._giveIndex     = 0;
}
//-----------------------------------------------------------------------------------------------------------
RecyclePool.prototype = {
    takeOut : function () {
        var obj = this.pool[ this._takeIndex ];
        this._takeIndex = (this._takeIndex + 1) % this.capacity;
        return obj;
    },
    //-------------------------------------------------------------------------------------------------------
    giveBack : function (obj) {
        this.pool[ this._giveIndex ] = obj;
        this._giveIndex = (this._giveIndex + 1) % this.capacity;
    },
    //-------------------------------------------------------------------------------------------------------
    debug : function () {
        console.log( 'Pool stats: ' + this.pool.length + '/' + this.capacity 
            + ' objects. Take @ ' + this._takeIndex + ', Give @ ' + this._giveIndex );
        console.log( 'Pool content: ', this.pool );
    }
};