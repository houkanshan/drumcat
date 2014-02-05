var Backbone = require('backbone')
  , _ = require('underscore')
  , Howl = require('howler')

var sounds = [{
  name: 'media/rimshot'
}, {
  name: 'media/tom_1'
}, {
  name: 'media/tom_3'
}]

_.each(sounds, function(sound) {
  var name = sound.name
    , urls = ['.ogg', '.mp3'].map(function(ext) { return name + ext })
  sound.audio = new Howl({ urls: urls })
})

module.exports = Backbone.View.extend({
  initialize: function() {
  }
, play: function(index) {
    var sound = sounds[index]
    sound.audio.play()
    sound.currentTime = 0
  }
})
