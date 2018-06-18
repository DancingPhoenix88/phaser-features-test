# phaser-features-test

I was checking several HTML5 game engines / frameworks and I kinda love CreateJS suit for its simplicity for years.
Then the popularity of Phaser has my attention, and especially PixiJS, Qici and PhaserEditor.

This project is used to test Phaser features so that I can understand how efficiently it works.

## Description
The game is inspired by [DOTS](https://www.dots.co/).

Game rule is simple: Connect dots with same color to make them disappear.
If you can form a square (or a rectangle), all dots with that color will disappear.
![Video](https://youtu.be/iZ3snVsQahc)
[https://youtu.be/iZ3snVsQahc](https://youtu.be/iZ3snVsQahc)

## Version 1
+ [**Phaser Editor**](https://phasereditor2d.com/):
  + It has an internal server, so that I can just create a new project and run it.
  + It can generate new project with many templates useful for learning Phaser.
  + It has an internal doc that you can search and view runnable examples immediately -> big plus.
  + It has some other tools that you can check in its website.
  + _After this step_: I can run a "game" (blank page) on my browser.
+ **Canvas/State**
  + Phaser Editor has a concept of Canvas which is a screen attached with a Phaser.State.
  + For version 1, I only have 1 canvas called Battle.
  + I design battle screen (canvas) with Phaser Editor GUI and when I save the .canvas file, the .js file attached with this canvas will be updated (generated). And that's how I learn core functions of Phaser.State: init, preload, create.
  + _After this step_: I can see the stage aligned in center on canvas.
+ **Render**
  + Now I need to draw a dot on screen.
  + First I need to load the sprite in preload function, but it's overwritten by saving .canvas file.
  + So I have some options: let .canvas generates loading commands, or add my own code in "user code" part of canvas.
  + Take your time to switch between tabs: `Design, Configuration (> Editor, > State)`.
  + To make position calculation easier, I create a group to contain all the dots, then move the group next to the stage.
  + At the end, I use Phaser.Sprite.tint to change dot color. So I replace all colored dot sprites by a single white dot sprite.
  + _After this step_: I can see colorful dots aligned in a grid perfectly.
+ **Input**
  + There're so many choices to catch events of a pointer !!!
  + From my experience, I will add interaction to the entire stage, not individual dots, for better performance.
  + When the game works perfectly on my browser, it doesn't work on my mobile, so I need to find other approach.
  + Finally, I stick with 3 functions:
    + `input.onDown.add`: to track when player touches screen.
    + `input.addMoveCallback`: to track when player moves his finger on screen.
    + `input.onUp.add`: to track when player stops touching screen.
  + Additionally, I use game.debug.spriteBounds to show which dot is under the cursor.
  + _After this step_: I can touch dots to highlight them.
+ **Tween**
  + `Logic of connecting dots is being code ... DONE`
  + I use a self-made object pool to re-use dots.
  + Now that's the time to make dots move.
  + Tween feature of Phaser is very similar to may other tween engine, and I have no difficulty in this part.
  + _After this step_: I can basically play the game: connect the dots to make them disappear (scale dots down), then spawn new dots (move them along Y-axis).
+ **Spine import**
  + Oh, tween works amazingly, but how about animation created by animators in popular program like Spine ?
  + Let's import them to test.
  + It works, in short.
  + If you want full story, I need to get familiar with adding plugin to Phaser with this one to support Spine: https://github.com/orange-games/phaser-spine
  + But you can't put Spine assets in an asset pack, because it uses a special function to load: `this.load.spine(...)`
  + _After this step_: A spine-boy shoots when you match dots and he even shoots when jumping if you form a square.
+ **Audio**
  + The graphic is good for now, but it needs more: sound effect.
  + There's no difference between background music and sound effect in Phaser. You use the same function to load and play them.
  + It takes me more time to tweak the volume.
  + _After this step_: You can play the game with sound. And it works on my phone too. Great !
+ **Particle**
  + Let's add fancy effects to the game.
  + My headache begins.
  + You don't have a tool to preview / design particle effect in Phaser Editor.
  + So I need to check some other tools like:
    	+ [EPSy](http://labs.ezelia.com/epsy/)
    	+ [Koreez's](https://github.com/koreezgames/phaser-particle-editor-plugin)
    	+ [PIXI](https://github.com/pixijs/pixi-particles-editor)
  + In short, you can design particle effect with an online web tool, then export effect as JSON data, then use a plugin to load and display effect in the game.
  + But I couldn't make it work.
  + So I create a particle effect manually from code (using parameters from web tool :) )
  + Finally, I place particle effect at fixed position in grid and start emitting when the right time comes. No need to create new particle everytime.
  + _After this step_: Dot disappears with style.
+ **Others**
  + To test the game on my phone, I use these tools:
    + PhoneGap desktop app (http://docs.phonegap.com/getting-started/1-install-phonegap/desktop/) is used to host a server on computer.
    + PhoneGap developer app (https://play.google.com/store/apps/details?id=com.adobe.phonegap.app&hl=vi) is used to load the game into a WebView, directly from your computer without compiling to .apk.
  + When I solved all the problems with NPM, Cordova, I can build and run the game on my phone by using 2 simple commands:
    	+ `cordova build android`
    	+ `cordova run android`
  + To emphasize connection between dots, I add white line sprites in a group under dots (fixed position as usual), then tint and show them later.
  + Add some debug plugins:
    	+ [Advanced Timing](https://github.com/samme/phaser-plugin-advanced-timing) to show FPS on screen
    	+ [Scene Graph] (https://github.com/samme/phaser-plugin-scene-graph) to show scene graph in console
    	+ [View Cache] (https://github.com/samme/phaser-view-cache) to show cache content in console
    	+ [Step] (https://github.com/samme/phaser-plugin-step) to pause the game and move frame by frame using keyboard shortcut
    	+ [Advanced Debug] (https://github.com/orange-games/phaser-advanced-debug) to show performance and WebGL draw calls
    	+ [Inspector] (https://github.com/netcell/phaser-inspector) to show scene graph in DOM (heavy) -> need a way to disable plugin quickly (next)
  + I add a function `addOptionalPlugin` to add plugin safely when it can be null. By this way, you can just comment out <script> tag of that plugins in index.html to disable that plugin.
  + **Atlas**: Invidual sprites are moved to Design folder, which is excluded from final build. Sprites are packed by Phaser Editor to generate a sprite atlas -> less request, less memory, less batches. Awesome!


## Version 2
+ **Canvas/State**
  + In order to make a re-usable template, I follow guides from [Orange Games](https://github.com/orange-games/phaser-ts-boilerplate)
  + So we have 4 states:
    + Boot: Init the game, load 'progress bar' sprite for next state.
    + Preload: Load everything including plugins, auto transit to next state when loading is done. Phaser Editor supports this state quite well.
    + Menu: Show a button to start the game.
    + Battle: The main state, which doesn't need to load tons of thing like version 1 anymore. Add a button to go back to Menu.
  + Use plugin [State Transition](https://github.com/cristianbote/phaser-state-transition) to transit between states
    + But it doesn't work with my Phaser version.
    + So I need to find compatible version (it took long long time).
    + Result: Not as smooth as expected, but acceptable.
  + Use `RecyclePool` to recycle objects like dots.
  + Refactor all collections in `Battle.js`
  + Try to re-use tweens but failed.
  + Add game config in Main.js. Important changes:
    	+ Switch renderer to AUTO for better performance on Android
    	+ Disable debug for better performance. Though my game is stable with 60 FPS from the beginning, I still leave this option here for later reference.
  + Found out plugin parameters are ignored by Phaser, so I need to get plugin to set parameters later -> `getPlugin` function is born.
  + Edit .xml file for better experience on mobile:
    	+ Add `android:debuggable="true"` to `<application>` in `AndroidManifest.xml` for Remote Debugging
    	+ Add `<preference name="Orientation" value="portrait" />` in `config.xml` to lock Portrait mode in Android
    	+ Add `<preference name="Fullscreen" value="true" />` in 'config.xml' and
    		`android:theme="@android:style/Theme.DeviceDefault.NoActionBar.Fullscreen"` to `<activity>` in `AndroidManifest.xml` to make game fullscreen


## Version 3
+ **New/Updated effect**
  + I spawn other sprites at fixed position on the grid, then animate them (alpha, scale) to highlight new connected dot. Now when my finger covers the dot, I can still know that it's connected.
  + When I form a square, I will enable a big semi-transparent square with tinted color to notify player about his square. But it's not attractive enough. So I turn it to a circle and animate it (alpha, scale). I even place that effect at the newest connected dot to make it looks like his finger is doing some magical things.
  + Last but not least, I add screen shake effect when a square clears all the dots with the same color. Yay
+ **"Reuse" tweens**
  + New effects (not screen shake) are made by tween, and they're the same all the time (no new target, no new property value). So I need to re-use them instead of creating new tween many times.
  + After trying some solutions online, I still can't find a way to do that, so I think of a trick.
  + Make the tween loops forever.
  + But I pause the tween everytime it starts a new loop using `onLoop.add` function.
  + So everytime I want to "restart" the tween, I can just call `tween.resume`.
+ **Background music**
  + Background music is played everytime we enters Menu state
  + So when we go back ad forth between Menu and Battle states, the music is played by another source -> multiple sounds can be heard at the same time
  + FIX: Add `data` property in global variable `game` to control this.
+ **Add PhoneGap folder**
  + Create a blank PhoneGap project
  + Copy `WebContent` folder to that and rename to `www`.
	  + `WebContent` is needed by Phaser Editor so I don't know how to change its name properly.
	  + On the other side, `www` is needed by Cordova/PhoneGap.
  + Edit `index.html` to un-comment the <script> of `cordova.js`.
  + Edit `config.xml` and `AndroidManifest.xml` as guided on Version 2.
  + Build and run (not tested on iDevice yet)


## Version 4
+ **Bitmap font**
    + Usually, your generated bitmap font will have a .fnt file and a .png file which contains all the letters.
    + Here is the problem, bitmap font image is not packed in atlas -> break batch.
    + So, if you want less draw call, you need to merge sprite with bitmap font.
    + In theory, you can do that in Phaser, because bitmap = image + .fnt file to indicate position and size of letters. The generated .xml file calculated the position and size of letters when there're only font letters, not other images. So if we merge bitmap font letters with other sprites, we just need to re-calculate data in .fnt file.
    + It can be your nightmare, but don't worry, some people faced that problem before and they got solution. YAY!
    + Follow this [tutorial](http://sbcgamesdev.blogspot.cz/2016/03/phaser-tutorial-merging-fonts-into.html)
        + Firstly, download the app (open .jar file)
        + Import single sprites
        + Import bitmap font (.xml and .fnt file should have same name)
        + Change export format to 'JSON - Texture Packer' (you may need to resize the app to see this option)
        + Click Optimize, then files you need is placed under export folder.
        + Back to Phaser Editor, you can add atlas (.png and .json file) to pack, and you can add xml to pack too.
        + Load xml separately in `preload` state, then create bitmap font by a special function (see `Main.js:addBitmapFontFromImage` & `Main.js:processBitmapFontData`).
        + By this way, Phaser Editor can't detect a bitmap font, so that you can't make UI using bitmap font visually.
        + So I add a function `makeBitmapTextFrom` to create new bitmap text object that copies properties from a normal text object. Then you can design your canvas using normal text, then replace it by bitmap text later (maybe not the best solution now).
    + Other [tutorial](http://sbcgamesdev.blogspot.cz/2016/07/phaser-tutorial-fun-with-bitmap-fonts.html) about setting image as a letter of bitmap font
    + Other [tutorial](http://sbcgamesdev.blogspot.com/2015/02/phaser-tutorial-how-to-wrap-bitmap-text.html) about wrapping bitmap text.
+ **Custom asset pack**
    + Default asset pack only allow defined data type.
    + Now we have 'spine' and 'mergedBitmapFont'.
    + Currently, we load these assets manually, by editting canvas user code, which is inconvenient.
    + So I make a `custom_pack.json` file copies `pack.json` structure and functions to process this custom pack.
    + To use it, you add `custom_pack.json` in `pack.json` to know what's in the pack first.
    + Next, when you want to load a 'section' of this custom pack, just use below command (spine and merged bitmap font will be handled automatically):
    + > this.load.customPack( 'custom_pack', 'customBattle' );
+ **Cordova plugin**
    + Use [Cordova Plugin Screen Orientation](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-screen-orientation/index.html) to lock orientation mode = Portrait, which is available in Phaser but doesn't work.
+ **UI**
    + Use interval UI editor of Phaser Editor. Nothing worth mentioning.
+ **Spice things up**
    + Update game logic to make "levels"
    + Add more colors
    + The game is really hard now

## What's coming next ?
+ Local Storage
+ Weighted random
