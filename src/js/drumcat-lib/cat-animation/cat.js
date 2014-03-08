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

function Cat() {
  this.imageSets = new ImageSets({ images: imageData })
  this.loopOrder = imageIndexArr.concat(imageIndexArr.slice(1, -1).reverse())
  this.initData()
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

fn.startKick = function(lastTime) {
  lastTime = lastTime || 400
  this.doingKick = true
  this.stepDelay = lastTime / this.loopOrder.length
}

fn.cancelKick = function() {
  this.initData()
}

fn.draw = function() {}

module.exports = Cat
