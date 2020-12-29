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
    enableDebug : true,
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
