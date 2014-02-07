var Backbone = require('backbone')
  , _ = require('underscore')

module.exports = Backbone.Model.extend({
  defaults: {
    metronome: 0
  , microphone: 0
  }
, initialize: function() {
  }
, stepUp: function(key) {
    this.set(key, this.get(key) + 1)
    return this
  }
, clear: function() {
    this.set({
      metronome: 0
    , microphone: 0
    })
    return this
  }
})
