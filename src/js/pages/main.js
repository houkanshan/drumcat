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
  }
, initialize: function() {
    this.metronome = new Metronome()
    this.metronome.start()

    this.audioMaster = new AudioMaster()

    this.listenTo(this.metronome, 'note:play', function(kind) {
      if (!this.rendered) { return }
      this.audioMaster.play(kind)
    }, this)
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
