# phaser-features-test

I was checking several HTML5 game engines / frameworks and I kinda love CreateJS suit for its simplicity for years.
Then the popularity of Phaser has my attention, and especially PixiJS, Qici and PhaserEditor.

This project is used to test Phaser features so that I can understand how efficiently it works.

## Description
The game is inspired by DOTS (https://www.dots.co/).
Game rule is simple: Connect dots with same color to make them disappear.
If you can form a square (or a rectangle), all dots with that color will disappear.

## Version 1
+ **Phaser Editor** (https://phasereditor2d.com/): 
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
  + Take your time to switch between tabs: Design, Configuration (> Editor, > State).
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
    + EPSy (http://labs.ezelia.com/epsy/)
    + Koreez's (https://github.com/koreezgames/phaser-particle-editor-plugin)
    + PIXI (https://github.com/pixijs/pixi-particles-editor)
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
    + cordova build android
    + cordova run android
  + To emphasize connection between dots, I add white line sprites in a group under dots (fixed position as usual), then tint and show them later.
