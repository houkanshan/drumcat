function addAll(array) {
  var total = 0
  for(var i = 0, ilen = array.length; i < ilen; i++) {
    total = Math.abs(array[i])
  }
  return total
}

function KickDetector(options) {
  options = options || {}
  this.loudnessThreshold = 0.8
  this.kickCount = 0
  this.initLast()
}

var fn = KickDetector.prototype

fn.getArray = function() { return [] }

fn.update = function(dt) {
  this.array = this.getArray()

  var array = this.array
    , total = addAll(array) * 100

  if (total < this.loudnessThreshold) {
    this.initLast()
    return
  }

  if (!this.lastTotal) {
    this.lastTotal = total
    return
  }

  if (!this.kicking) {
    this.kicked = true
    this.kicking = true
  }

  this.isUp = total > this.lastTotal
  if (!this.isUp && this.wasUp) {
    this.kicking = false
  }

  this.wasUp = this.isUp
  this.lastTotal = total
}

fn.initLast = function() {
  this.wasUp = true // init
  this.lastTotal = this.loudnessThreshold
  this.kicked = false
  this.kicking = false
}

fn.draw = function() {
  if (this.kicked) {
    this.kickCount += 1
    this.kicked = false
    return true
  }
  return false
}

module.exports = KickDetector
