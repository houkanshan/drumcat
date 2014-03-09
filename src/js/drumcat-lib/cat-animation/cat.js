var ImageSets = require('./image-sets')

var imageData = {}

var imageCount = 15
var imageIndexArr = []

for(var i = 0, ilen = imageCount; i < ilen; i++) {
  imageIndexArr.push(i + 1)
}

;(imageIndexArr).forEach(function(v) {
  imageData[v] = {
    src: './pic/cat/cat-' + v + '.png'
  }
})

var loopOrder = imageIndexArr.slice().reverse().concat([2, 4, 6, 8, 10, 12, 14])

var readyOrder = imageIndexArr.slice()

function Cat() {
  this.imageSets = new ImageSets({ images: imageData })
  this.loopOrder = readyOrder
  this.initData()
  this.goRest()
}
var fn = Cat.prototype

fn.update = function(dt) {
  if (!this.doingKick) {
    this.currIndex = 0
    return
  }

  this.timeStep += dt
  this.currIndex = (this.timeStep / this.stepDelay) | 0
  if (this.currIndex >= this.loopOrder.length) {
    this.initData()
    if (this.onceKickDone) {
      this.onceKickDone()
      this.onceKickDone = null
    }
  }
}

fn.initData = function() {
  this.currIndex = 0
  this.doingKick = false
  this.timeStep = 0
}

fn.getImage = function() {
  var image = this.imageSets.get(this.loopOrder[this.currIndex])
  return image.image
}

fn.startKick = function(nextDelay) {
  this.loopOrder = loopOrder
  nextDelay = nextDelay || 400
  this.countDelay(nextDelay)
  this.doingKick = true
  this.timeStep = 0
}

fn.countDelay = function(nextDelay) {
  this.stepDelay = nextDelay / this.loopOrder.length
}

fn.cancelKick = function() {
  this.initData()
}

fn.goRest = function() {
  this.loopOrder = readyOrder
  this.currIndex = 0
  this.countDelay(500)
  console.log('rest')
}

fn.goReady = function() {
  this.goRest()
  this.doingKick = true
  console.log('now go ready')
  this.onceKickDone = function() {
    this.loopOrder = loopOrder
    console.log('now ready')
  }.bind(this)
}

fn.draw = function() {}

module.exports = Cat
