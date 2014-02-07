var Backbone = require('backbone')
  , _ = require('underscore')
  , ScoreModel = require('../modules/score-model')

var lights = [{
  name: 'gray'
}, {
  name: 'pink'
}, {
  name: 'pink'
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
    this.microphoneNumber = this.$('.microphone-score .number')
    return this
  }
, initModel: function() {
    this.scoreModel = new ScoreModel()
    this.listenTo(this.scoreModel, 'change', function(model) {
      var changed = model.changed
      _.each(changed, function(value, name) {
        this[name + 'Number'].text(value || '')
      }, this)
    })
  }
, play: function(index) {
    this.flash(index)
    this.score(index)
  }
, flash: function(index) {
    var className = 'color-' + lights[index].name

    this.metronomeEl.addClass(className)
    setTimeout(_.bind(function() {
      this.metronomeEl.removeClass(className)
    }, this), 100)
  }
, score: function(index) {
    this.scoreModel.stepUp('metronome')
  }
})
