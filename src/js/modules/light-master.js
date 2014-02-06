var Backbone = require('backbone')
  , _ = require('underscore')

var lights = [{
  name: 'gray'
}, {
  name: 'pink'
}, {
  name: 'pink'
}]

module.exports = Backbone.View.extend({
  initialize: function() {
  }
, render: function() {
    this.setElement('.cat-light')
    this.metronomeEl = this.$('.metronome-leaf')
    return this
  }
, play: function(index) {
    var className = 'color-' + lights[index].name
    this.metronomeEl.addClass(className)
    setTimeout(_.bind(function() {
      this.metronomeEl.removeClass(className)
    }, this), 100)
  }
})
