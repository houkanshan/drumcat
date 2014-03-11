function ImageSets(opts) {
  this.opts = opts
  this.images = opts.images
  this.init()
}

var fn = ImageSets.prototype

fn.init = function() {
  var image
  this.imagesCount = this.imageLoadingCount = 0
  for(var name in this.images) {
    image = this.images[name]
    image.image = new Image()
    image.image.onload = function() {
      image.loaded = true
      fn.imageReady.call(this, image)
    }.bind(this)
    image.image.src = image.src
    this.imagesCount += 1
  }
  this.imageLoadingCount = this.imagesCount
}

fn.get = function(name) {
  return this.images[name]
}

fn.imageReady = function(image) {
  this.imageLoadingCount -= 1
  if (this.imageLoadingCount === 0) {
    this.onready(this.images)
  }
}

fn.onready = function(images) {}

module.exports = ImageSets
