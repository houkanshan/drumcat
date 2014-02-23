function addAll(array) {
  var total = 0
  for(var i = 0, ilen = array.length; i < ilen; i++) {
    total = Math.abs(array[i])
  }
  return total
}

function KickDetector(options) {
  options = options || {}
  this.timeWindow = options.timeWindow || 100
  this.kickCount = 0
  this.initLast()
}

var fn = KickDetector.prototype

fn.getArray = function() { return [] }

fn.update = function(dt) {
  this.array = this.getArray()

  var array = this.array
    , total = addAll(array) * 100

  if (total < 1) {
    this.initLast()
    return
  }

  if (!this.lastTotal) {
    this.lastTotal = total
    return
  }

  this.isUp = total > this.lastTotal

  if (!this.isUp && this.wasUp) {
    this.kicked = true
  }

  this.wasUp = this.isUp
  this.lastTotal = total
}

fn.initLast = function() {
  this.wasUp = true // init
  this.lastTotal = 1
}

fn.draw = function() {
  if (this.kicked && !this.windowOpen) {
    this.windowOpen = true

    this.kickCount += 1

    setTimeout(function() {
      this.windowOpen = false
      this.kicked = false
    }.bind(this), this.timeWindow)

    return true
  }
  return false
}

module.exports = KickDetector
