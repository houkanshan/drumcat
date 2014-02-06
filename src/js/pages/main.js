var Backbone = require('backbone')
  , _ = require('underscore')
  , $ = require('jquery')
  , app = require('app')
  , Metronome = require('../modules/metronome')
  , AudioMaster = require('../modules/audio-master')
  , LightMaster = require('../modules/light-master')

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
  , 'click .plus': 'plusSetting'
  , 'click .minus': 'minusSetting'
  }
, initialize: function() {
    this.metronome = new Metronome()
    this.start()

    this.audioMaster = new AudioMaster()
    this.lightMaster = new LightMaster()

    this.listenTo(this.metronome, 'note:play', function(kind) {
      if (!this.rendered) { return }
      this.audioMaster.play(kind)
      this.lightMaster.play(kind)
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
, plusSetting: function(e) {
    var settingName = $(e.target).closest('.control-item').data('name')
      , settingModel = this[settingName+'El']
      , max = settingModel.attr('max')
      , res = +settingModel.val() + 1
    //settingModel[0].stepUp() // should be better
    if (res > max) { return }
    settingModel.val(res).trigger('change')
  }
, minusSetting: function(e) {
    var settingName = $(e.target).closest('.control-item').data('name')
      , settingModel = this[settingName+'El']
      , min = settingModel.attr('min')
      , res = +settingModel.val() - 1
    //settingModel[0].stepDown() // should be better
    if (res < min) { return }
    settingModel.val(res).change()
  }

, updateTempo: function(e) {
    var value = +this.tempoEl.val()
    this.metronome.update({ tempo: value })
  }
, updateBeats: function(e) {
    var value = +this.beatsEl.val()
    this.metronome.update({ beats: value })
  }
, updateSubdivision: function(e) {
    var value = +this.subdivisionEl.val()
    this.metronome.update({ subdivision: value })
  }
, render: function() {
    this.rendered = true
    this.$el.html(_.template(this.tmpl))
    this.tempoEl = this.$('[name=tempo]')
    this.beatsEl = this.$('[name=beats]')
    this.subdivisionEl = this.$('[name=subdivision]')

    this.lightMaster.render()

    return this
  }
})

module.exports = {
  View: pageView
, Model: pageModel
}
