var Backbone = require('backbone')
  , _ = require('underscore')
  , $ = require('jquery')
  , app = require('app')
  , Metronome = require('../modules/metronome')
  , arktouch = require('arktouch')

module.exports = Backbone.View.extend({
  events: {
    'tap .plus': 'plusSetting'
  , 'tap .minus': 'minusSetting'
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

, update: function(data) {
    if (!this.rendered) { return }
    _.each(data, function(value, key) {
      var elem = this[key + 'Number']
        , oldValue = elem.data('value')
        , changeOrder = value > oldValue ? [0, 1] : [1, 0]
      elem.eq(changeOrder[0]).text(value).data('value', value)
      setTimeout(function() {
        elem.eq(changeOrder[1]).text(value).data('value', value)
      }, 100)
    }, this)
  }

, plusSetting: function(e) {
    if (!this.rendered) { return }
    var settingName = $(e.target).closest('.control-item').data('name')
      , settingModel = this.settingModels[settingName]
      , max = settingModel.attr('max')
      , value = +settingModel.val()
      , res = value + 1
    //settingModel[0].stepUp() // should be better
    if (res > max) { return }
    settingModel
      .val(res).data('old', value)
      .trigger('change')
  }
, minusSetting: function(e) {
    if (!this.rendered) { return }
    var settingName = $(e.target).closest('.control-item').data('name')
      , settingModel = this.settingModels[settingName]
      , min = settingModel.attr('min')
      , value = +settingModel.val()
      , res = value - 1
    //settingModel[0].stepDown() // should be better
    if (res < min) { return }
    settingModel
      .val(res).data('old', value)
      .change()
  }
})
