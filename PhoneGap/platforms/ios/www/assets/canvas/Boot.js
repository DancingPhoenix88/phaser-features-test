
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.0 (Phaser v2.6.2)


/**
 * Boot.
 */
function Boot() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Boot_proto = Object.create(Phaser.State.prototype);
Boot.prototype = Boot_proto;
Boot.prototype.constructor = Boot;

Boot.prototype.init = function () {
	
	//--Generated config (from canvas user code)
	// Support full-screen
	this.input.maxPointers 				= 1;
	this.stage.disableVisibilityChange 	= true;
	this.scale.pageAlignHorizontally 	= true;
	this.scale.pageAlignVertically 		= true;
	//this.scale.scaleMode 				= Phaser.ScaleManager.SHOW_ALL;
	
};

Boot.prototype.preload = function () {
	
	this.load.pack('preload', 'assets/pack.json');
	
};

Boot.prototype.create = function () {
	
	//--Generated config (from canvas user code)
	this.state.start( 'Preload' );
	
	
};

/* --- end generated code --- */
// -- user code here --
