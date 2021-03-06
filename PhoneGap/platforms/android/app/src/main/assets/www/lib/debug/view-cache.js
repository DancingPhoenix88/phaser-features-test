// Generated by CoffeeScript 1.10.0
(function() {
  var Phaser, cacheKeys, groupEnd, groupStart, noop, ref, table;

  Phaser = this.Phaser;

  cacheKeys = ["binary", "bitmapData", "bitmapFont", "canvas", "image", "json", "physics", "renderTexture", "shader", "sound", "text", "texture", "tilemap", "video", "xml"];

  noop = function() {};

  groupEnd = ((ref = console.groupEnd) != null ? ref.bind(console) : void 0) || noop;

  groupStart = (console.groupCollapsed || console.group || console.log).bind(console);

  table = (console.table || console.log).bind(console);

  Phaser.Utils.Debug.prototype.cache = function() {
    var _cache, cache, i, len, length, name;
    _cache = this.game.cache._cache;
    for (i = 0, len = cacheKeys.length; i < len; i++) {
      name = cacheKeys[i];
      cache = _cache[name];
      length = Object.keys(cache).length;
      if (length > 0) {
        groupStart("Cache: " + name + " (" + length + ")");
        table(cache);
        groupEnd();
      } else {
        console.log("Cache: " + name + " is empty");
      }
    }
  };

}).call(this);
