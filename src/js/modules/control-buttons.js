var Backbone = require('backbone')
  , _ = require('underscore')
  , $ = require('jquery')
  , app = require('app')
  , Metronome = require('../modules/metronome')
  , AudioMaster = require('../modules/audio-master')
  , LightMaster = require('../modules/light-master')

module.exports = Backbone.View.extend({
  events: {
    'click .plus': 'plusSetting'
  , 'click .minus': 'minusSetting'
  }

, render: function(data) {
    this.settingModels = data.settingModels

    this.setElement('.control-panel')
    this.tempoNumber = this.$('.tempo .number')
    this.beatsNumber = this.$('.beats .number')
    this.subdivisionNumber = this.$('.subdivision .number')

    this.rendered = true
    return this
  }

, update: function(options) {
    if (!this.rendered) { return }
    _.each(options, function(value, key) {
      this[key + 'Number'].text(value)
    }, this)
  }

, plusSetting: function(e) {
    if (!this.rendered) { return }
    var settingName = $(e.target).closest('.control-item').data('name')
      , settingModel = this.settingModels[settingName]
      , max = settingModel.attr('max')
      , res = +settingModel.val() + 1
    //settingModel[0].stepUp() // should be better
    if (res > max) { return }
    settingModel.val(res).trigger('change')
  }
, minusSetting: function(e) {
    if (!this.rendered) { return }
    var settingName = $(e.target).closest('.control-item').data('name')
      , settingModel = this.settingModels[settingName]
      , min = settingModel.attr('min')
      , res = +settingModel.val() - 1
    //settingModel[0].stepDown() // should be better
    if (res < min) { return }
    settingModel.val(res).change()
  }
})
