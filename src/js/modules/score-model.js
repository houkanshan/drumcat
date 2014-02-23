var Backbone = require('backbone')
  , _ = require('underscore')

module.exports = Backbone.Model.extend({
  defaults: {
    metronome: 0
  , microphone: 0
  }
, initialize: function(options) {
    options = options || {}
    this.kickDelay = options.kickDelay || 80
    this.metronomeKicking = false
  }
, stepUp: function(key) {
    if (key === 'metronome') {
      this.stepUpMetronome()
    } else {
      this.stepUpMicrophone()
    }

    return this
  }
, stepUpMetronome: function() {
    this.set('metronome', this.get('metronome') + 1)
    this.metronomeKicking = true
    setTimeout(function() {
      this.metronomeKicking = false
    }.bind(this), this.kickDelay)
  }
, stepUpMicrophone: function() {
    var matched = false
    if (this.metronomeKicking) {
      this.set('microphone', this.get('microphone') + 1)
      this.metronomeKicking = false
      matched = true
    }
    this.trigger('microphone:matched?', matched)
  }
, clear: function() {
    this.set({
      metronome: 0
    , microphone: 0
    })
    return this
  }
})
