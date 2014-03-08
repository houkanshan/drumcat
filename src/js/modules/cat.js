var Backbone = require('backbone')
  , _ = require('underscore')

  , Cat = require('../drumcat-lib/cat-animation/cat')
  , MainLoop = require('../drumcat-lib/cat-animation/mainloop')
  , Layer = require('../drumcat-lib/cat-animation/layer')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.mainloop = new MainLoop()
    this.cat = new Cat()

    this.mainloop.addSpirit(this.cat)
  }

, render: function() {
    var layer = this.layer = new Layer({ canvas: 'canvas' })

    this.cat.draw = function() {
      layer.drawImage(this.getImage())
    }

    this.mainloop.preDraw = function() {
      layer.clearLayer()
    }

    this.mainloop.start()
  }
})
