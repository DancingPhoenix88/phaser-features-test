// add global variable for using in console: game.state.getCurrentState()
/** @type Phaser.Game */var game; // = Phaser.GAMES[0]
//-----------------------------------------------------------------------------------------------------------
var pConfig = {
    width       : 450,
    height      : 800,
    renderer    : Phaser.AUTO, // TODO: Must be Phaser.CANVAS for iOS
    antialias   : true,
    enableDebug : false,
    scaleMode   : Phaser.ScaleManager.SHOW_ALL
};
//-----------------------------------------------------------------------------------------------------------
window.onload = function() {
	game = new Phaser.Game( pConfig );
	
	// states
	game.state.add( 'Boot',    Boot    );
	game.state.add( 'Preload', Preload );
	game.state.add( 'Menu',    Menu    );
	game.state.add( 'Battle',  Battle  );
	game.state.start( 'Boot' );
};
//-----------------------------------------------------------------------------------------------------------
/**
 * Shortcut to add plugin safely.
 * Disable this plugin = comment <script> tag in index.html
 * @param plugin
 * @param parameter
 * @returns Added plugin
 */
function addOptionalPlugin (plugin, parameter) {
    if (plugin) {
        return game.add.plugin( plugin, parameter );
    }
    return null;
}
//-----------------------------------------------------------------------------------------------------------
/**
 * @param plugin : plugin class
 * @returns Found plugin
 */
function getPlugin (plugin) {
    var ps = game.plugins.plugins;
    var pp = plugin.prototype;
    for (var i = ps.length - 1; i >= 0; --i) {
        if (pp.isPrototypeOf( ps[i] )) {
            return ps[i];
        }
    }
    return null;
}
//-----------------------------------------------------------------------------------------------------------
/**
 * Define state transition effects (see canvas/Menu.js for usage)
 * Default transition
 * {
 *      ease    : options.ease      || Phaser.Easing.Exponential.InOut,
 *      duration: options.duration  || 500,
 *      intro   : options.intro     || false,
 *      props   : options.props     || {}
 * }
 */
var FadeIn = Phaser.Plugin.StateTransition.createTransition({
    intro   : true,
    duration: 1000,
    props   : { alpha : 0 }
}),
FadeOut = Phaser.Plugin.StateTransition.createTransition({
    duration: 1000,
    props   : { alpha : 0 }
});
