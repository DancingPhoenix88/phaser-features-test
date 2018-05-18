// add global variable for using in console: game.state.getCurrentState()
/** @type Phaser.Game */var game; // = Phaser.GAMES[0]
//-----------------------------------------------------------------------------------------------------------
/**
 * Game config (properties are defined by Phaser)
 */
var pConfig = {
    width       : 450,
    height      : 800,
    renderer    : Phaser.AUTO, // TODO: Must be Phaser.CANVAS for iOS
    antialias   : true,
    enableDebug : false,
    scaleMode   : Phaser.ScaleManager.SHOW_ALL
};
//-----------------------------------------------------------------------------------------------------------
/**
 * Entry point: Game starts here
 */
window.onload = function() {
    game = new Phaser.Game( pConfig );

    // states
    game.state.add( 'Boot',    Boot    );
    game.state.add( 'Preload', Preload );
    game.state.add( 'Menu',    Menu    );
    game.state.add( 'Battle',  Battle  );
    game.state.start( 'Boot' );

    // user-defined data
    game.data = {
        bgm         : '',
        userLevel   : 1
    };
};
//-----------------------------------------------------------------------------------------------------------
/**
 * Shortcut to add plugin safely.
 * Disable this plugin = comment <script> tag in index.html
 * NOTE: If game.config.enableDebug = false -> game.debug can't be used
 *
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
    if (!plugin) {
        return null;
    }
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
//-----------------------------------------------------------------------------------------------------------
/**
 * Check the assumption and throw an error if it's incorrect.
 * NOTE: We can't ignore function call in JS.
 * So you need to strip assert calls manually for release build (by commenting for example)
 * @param   condition
 * @param   message
 */
function assert (condition, message) {
    if (!condition) {
        message = message || 'Assertion failed';
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}
/**
 * Check the assumption that 2 values are equal and throw an error if it's incorrect.
 * NOTE: We can't ignore function call in JS.
 * So you need to strip assert calls manually for release build (by commenting for example)
 * @param   actual
 * @param   expect
 * @param   message
 */
//-----------------------------------------------------------------------------------------------------------
function assertEqual (actual, expect, message) {
    message = message || ('Assertion failed: ' + actual + ' should = ' + expect);
    assert( actual == expect, message );
}
//-----------------------------------------------------------------------------------------------------------
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle (a) {
    var k, x, i;
    for (i = a.length - 1; i > 0; i--) {
        k    = Math.floor(Math.random() * (i + 1));
        x    = a[i];
        a[i] = a[k];
        a[k] = x;
    }
    return a;
}