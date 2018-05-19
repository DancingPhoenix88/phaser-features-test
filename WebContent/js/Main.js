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
//-----------------------------------------------------------------------------------------------------------
/**
 * Modified 'Phaser.Cache.prototype.addBitmapFont'
 * to allow bitmap font atlas shares same atlas with other sprites -> same texture -> not break batching
 *
 * @param string key       Font name (must be unique in the cache)
 * @param string url       null
 * @param string imageName Atlas name. In original version of 'addBitmapFont', this is an object.
 * @param object atlasData Bitmap font data.
 * @param string atlasType Data format (json / xml)
 * @param number xSpacing  Extra x-spacing between letters
 * @param number ySpacing  Extra y-spacing between letters
 */
Phaser.Cache.prototype.addBitmapFontFromImage = function (key, url, imageName, atlasData, atlasType, xSpacing, ySpacing) {
    var img = this.getImage( imageName, true );
    var obj = {
        url     : url,
        data    : img.data,
        font    : null,
        base    : img.base // key-point here: use same image as other sprites
    };

    if (xSpacing === undefined) { xSpacing = 0; }
    if (ySpacing === undefined) { ySpacing = 0; }

    if (atlasType === 'json') {
        obj.font = Phaser.LoaderParser.jsonBitmapFont(atlasData, obj.base, xSpacing, ySpacing, null, 1);
    } else {
        obj.font = Phaser.LoaderParser.xmlBitmapFont(atlasData, obj.base, xSpacing, ySpacing, null, 1);
    }

    this._cache.bitmapFont[key] = obj;
    this._resolveURL(url, obj);
};
/**
 * Shorter version of 'addBitmapFontFromImage' and remove XML from cache after adding bitmap font
 *
 * @param string key       Font name (must be unique in the cache)
 * @param object dataKey   Key to bitmap font data (must be cached first, should be in asset pack)
 * @param string imageName Atlas name. In original version of 'addBitmapFont', this is an object.
 * @param number xSpacing  Extra x-spacing between letters
 * @param number ySpacing  Extra y-spacing between letters
 */
Phaser.Cache.prototype.processBitmapFontData = function (fontName, dataKey, imageName, xSpacing, ySpacing) {
    this.addBitmapFontFromImage( fontName, null, imageName, this.getXML( dataKey ), 'xml', xSpacing, ySpacing );
    this.removeXML( dataKey );
};
//-----------------------------------------------------------------------------------------------------------
Phaser.Loader.prototype.customPack = function (pack, section, callback, context) {
    console.log( 'custom loading pack ' + pack + '.' + section );
    var packContent = this.cache.getJSON( pack );
    if (packContent && packContent[section]) {
        for (var i = packContent[section].length - 1; i >= 0; i--) {
            this.customFile( packContent[section][i] );
        }
    }
    this._onCustomComplete( callback, context );
};
//-----------------------------------------------------------------------------------------------------------
Phaser.Loader.prototype.customFile = function (file) {
    switch (file.type) {
        case 'spine': {
            console.log( 'custom loading spine ', file );
            this.spine( file.key, file.url, file.scales );
            return true;
        }
        case 'mergedBitmapFont': {
            console.log( 'custom loading merged bitmap font  ', file );
            if (file.singleFontInData) {
                this.cache.processBitmapFontData( file.key, file.dataKey, file.textureKey, file.xSpacing, file.ySpacing );
            } else {
                this.cache.addBitmapFontFromImage( file.key, null, file.textureKey, this.cache.getXML( file.dataKey ), 'xml', xSpacing, ySpacing );
            }
            return true;
        }
        default: {
            return false;
        }
    }
};
//-----------------------------------------------------------------------------------------------------------
Phaser.Loader.prototype._onCustomComplete = function (callback, context) {
    if (typeof(callback) == 'function') {
        callback.apply( context );
    }
};
//-----------------------------------------------------------------------------------------------------------
/**
 * Create a bitmap text with settings copied from existed normal text
 *
 * @param  Phaser.Text  txt      Text object to copy from.
 * @param  string       fontName Bitmap font name.
 * @param  bool         replace  Should new bitmap text replace old text ?
 *
 * @return newly created bitmap text
 */
Phaser.State.prototype.makeBitmapTextFrom = function (txt, fontName, replace) {
    var txtBitmap = this.add.bitmapText( 0, 0, fontName, txt.text, txt.fontSize );
    txtBitmap.name = txt.name;
    if (replace) {
        if (txt.parent) {
            if (txt.parent != txtBitmap.parent) {
                txt.parent.addAt( txtBitmap, txt.z ); // 'txt.z' = index of 'txt' within group 'txt.parent'
            } else {
                txt.parent.swap( txt, txtBitmap );
            }
            txtBitmap.position.set( txt.position.x, txt.position.y );
        }
        txt.destroy();
    } else {
        txtBitmap.position.set( txt.worldPosition.x, txt.worldPosition.y );
    }
    return txtBitmap;

    // TODO: use txt.data to mark text which should be replaced by bitmap text to do it automatically
};
