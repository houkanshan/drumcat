var Backbone = require('backbone')
  , _ = require('underscore')
  , ScoreModel = require('../modules/score-model')

var lights = [{
  name: 'gray'
}, {
  name: 'pink'
}, {
  name: 'pink'
}, {
  name: 'red'
}]

module.exports = Backbone.View.extend({
  events: {
    'doubleTap .metronome-leaf': 'resetTickCount'
  , 'doubleTap .microphone-leaf': 'resetMatchCount'
  }
, initialize: function() {
    this.initModel()
  }
, render: function() {
    this.setElement('.cat-bg')
    this.metronomeEl = this.$('.metronome-leaf')
    this.metronomeNumber = this.$('.metronome-score .number')
    this.microphoneEl = this.$('.microphone-leaf')
    this.microphoneNumber = this.$('.microphone-score .number')
    return this
  }
, initModel: function() {
    this.scoreModel = new ScoreModel()
    this.firstChanged = false
    this.listenTo(this.scoreModel, 'change', function(model) {
      var changed = model.changed
      _.each(changed, function(value, name) {
        this[name + 'Number'].text(value || 0)
      }, this)
      if (!this.firstChanged) {
        this.firstChanged = true
        this.microphoneNumber.text(0)
      }
    })

    this.listenTo(this.scoreModel, 'microphone:matched?', function(matched) {
      var index = matched ? 1 : 3
      this.flash(index, 'microphone')
    }, this)
  }
, play: function(index, key) {
    if (key === 'metronome') {
      this.flash(index, key)
    }
    this.score(index, key)
  }
, flash: function(index, key) {
    var className = 'color-' + lights[index || 0].name
      , leafEl = this[key + 'El']

    leafEl.addClass(className)
    setTimeout(_.bind(function() {
      leafEl.removeClass(className)
    }, this), 100)
  }
, score: function(index, key) {
    this.scoreModel.stepUp(key)
  }
})
