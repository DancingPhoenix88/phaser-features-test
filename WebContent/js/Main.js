// add global variable for using in console: game.state.getCurrentState()
/** @type Phaser.Game */var game; // = Phaser.GAMES[0]

window.onload = function() {
	game = new Phaser.Game(450, 800, Phaser.CANVAS);
	
	// states
	game.state.add( 'Battle', Battle );
	game.state.start( 'Battle' );
};

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