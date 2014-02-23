var Backbone = require('backbone')
  , _ = require('underscore')
  , $ = require('jquery')
  , app = require('app')
  , arktouch = require('arktouch')
  , Metronome = require('../modules/metronome')
  , AudioMaster = require('../modules/audio-master')
  , LightMaster = require('../modules/light-master')
  , ControlButtons = require('../modules/control-buttons')
  , Kicks = require('../modules/kicks')

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
  , 'tap .cat-area': 'toggle'
  , 'click [name=stop]': 'stop'
  }
, initialize: function() {
    this.metronome = new Metronome()

    this.audioMaster = new AudioMaster()
    this.lightMaster = new LightMaster()
    this.controlButtons = new ControlButtons()
    this.kicks = new Kicks()
    this.kicks.capture()

    this.listenTo(this.metronome, 'note:play', function(kind) {
      if (!this.rendered) { return }
      this.audioMaster.play(kind, 'metronome')
      this.lightMaster.play(kind, 'metronome')
    }, this)

    this.listenTo(this.kicks, 'kick:bang', function() {
      if (!this.rendered) { return }
      console.log('bang')
      this.lightMaster.play(3, 'microphone')
    })
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
    var value = +this.tempoEl.val()
    this.metronome.update({ tempo: value })
    this.controlButtons.update({ tempo: value })
  }
, updateBeats: function(e) {
    var value = +this.beatsEl.val()
    this.metronome.update({ beats: value })
    this.controlButtons.update({ beats: value })
  }
, updateSubdivision: function(e) {
    var value = +this.subdivisionEl.val()
    this.metronome.update({ subdivision: value })
    this.controlButtons.update({ subdivision: value })
  }

, render: function() {
    this.rendered = true
    this.$el.html(_.template(this.tmpl))
    this.tempoEl = this.$('[name=tempo]')
    this.beatsEl = this.$('[name=beats]')
    this.subdivisionEl = this.$('[name=subdivision]')

    this.lightMaster.render()
    this.controlButtons.render({ settingModels: {
      tempo: this.tempoEl
    , beats: this.beatsEl
    , subdivision: this.subdivisionEl
    } })

    return this
  }
})

module.exports = {
  View: pageView
, Model: pageModel
}
