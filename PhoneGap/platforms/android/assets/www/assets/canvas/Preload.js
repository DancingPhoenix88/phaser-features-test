
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.0 (Phaser v2.6.2)


/**
 * Preload.
 */
function Preload() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Preload_proto = Object.create(Phaser.State.prototype);
Preload.prototype = Preload_proto;
Preload.prototype.constructor = Preload;

Preload.prototype.init = function () {
	
};

Preload.prototype.preload = function () {
	
	//--Generated config (from canvas user code)
	// Load plugins
	addOptionalPlugin( Phaser.Plugin.EPSY );
	addOptionalPlugin( PhaserSpine.SpinePlugin );
	addOptionalPlugin( Phaser.Plugin.AdvancedTiming );
	addOptionalPlugin( Phaser.Plugin.SceneGraph );
	
	if (!this.game.device.desktop) { return; }
	addOptionalPlugin( Phaser.Plugin.Step );
	addOptionalPlugin( Phaser.Plugin.Debug );
	addOptionalPlugin( Phaser.Plugin.Inspector );
	
	this.load.pack('pack1', 'assets/pack.json');
	
	
	var _progress_bar = this.add.sprite(100.0, 405.0, 'progress-bar');
	_progress_bar.name = 'progress_bar';
	_progress_bar.scale.setTo(5.0, 1.0);
	_progress_bar.pivot.setTo(0.0, 5.0);
	_progress_bar.anchor.setTo(0.0, 0.5);
	_progress_bar.tint = 0x66ccff;
	
	var _txtLoading = this.add.text(100.0, 370.0, 'Loading ...', {"font":"16px Arial","fill":"#ffffff"});
	_txtLoading.name = 'txtLoading';
	
	
	
	this.load.setPreloadSprite(_progress_bar, 0);
	
};

Preload.prototype.create = function () {
	
	//--Generated state transition (from canvas user code)
	this.state.start( 'Menu' );
	
	
};

/* --- end generated code --- */
// -- user code here --
