window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    }
}())
window.cancelAnimationFrame = (function(){
  return window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.clearTimeout
})

function MainLoop(opts) {
  this.spirits = []
}

MainLoop.prototype = {
  constructor: MainLoop.prototype.constructor
, start: function() {
    this.lasttime = Date.now()
    var step = (function () {
      this.tick()
      this.timer = requestAnimationFrame(step)
    }).bind(this)

    this.timer = requestAnimationFrame(step)
  }
, stop: function() {
    cancelAnimationFrame(this.timer)
    this.timer = null
  }
, isRunning: function() {
    return !!this.timer
  }
, preUpdate: function() {}
, preDraw: function() {}
, tick: function() {
    var now = Date.now()
      , dt = (now - this.lasttime)
    if (dt < 5) { return }
    dt /= 1
    this.lasttime = now

    this.preUpdate(dt)
    this.preDraw()

    this.spirits.forEach(function(spirit, i) {
      spirit.update(dt)
      spirit.draw()
    })
  }
, addSpirit: function(spirit) {
    var origDestroy = spirit.destroy
      , spirits = this.spirits

    spirit.destroy = function() {
      var index = spirits.indexOf(spirit)
      if (index > -1) {
          spirits.splice(index, 1);
      }
      origDestroy.apply(this, arguments)
    }

    spirits.push(spirit)
  }
, resetSpirit: function() {
    this.spirits = []
  }
}

module.exports = MainLoop
