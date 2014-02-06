var Backbone = require('backbone')
  , _ = require('underscore')
  , $ = require('jquery')
  , app = require('app')
  , Metronome = require('../modules/metronome')
  , AudioMaster = require('../modules/audio-master')

var pageModel = Backbone.Model.extend({
})

var pageView = Backbone.View.extend({
  el: '#main-layer'
, tmpl: $('#tmpl-main-layout').html()
, events: {
    'change [name=tempo]': 'updateTempo'
  , 'change [name=beats]': 'updateBeats'
  , 'change [name=subdivision]': 'updateSubdivision'
  , 'click [name=start]': 'start'
  , 'click .cat-area': 'toggle'
  , 'click [name=stop]': 'stop'
  }
, initialize: function() {
    this.metronome = new Metronome()
    this.start()

    this.audioMaster = new AudioMaster()

    this.listenTo(this.metronome, 'note:play', function(kind) {
      if (!this.rendered) { return }
      this.audioMaster.play(kind)
    }, this)
  }
, toggle: function() {
    this.metronome.toggle()
  }
, start: function() {
    this.metronome.start()
  }
, pause: function() {
    this.metronome.pause()
  }
, stop: function() {
    this.metronome.stop()
  }

, updateTempo: function(e) {
    this.metronome.update({ tempo: +this.tempoEl.val() })
  }
, updateBeats: function(e) {
    this.metronome.update({ beats: +this.beatsEl.val() })
  }
, updateSubdivision: function(e) {
    this.metronome.update({ subdivision: +this.subdivisionEl.val() })
  }
, render: function() {
    this.rendered = true
    this.$el.html(_.template(this.tmpl))
    this.tempoEl = this.$('[name=tempo]')
    this.beatsEl = this.$('[name=beats]')
    this.subdivisionEl = this.$('[name=subdivision]')

    return this
  }
})

module.exports = {
  View: pageView
, Model: pageModel
}
