function ImageSets(opts) {
  this.opts = opts
  this.images = opts.images
  this.init()
}

var fn = ImageSets.prototype

fn.init = function() {
  var image
  for(var name in this.images) {
    image = this.images[name]
    image.image = new Image()
    image.image.onload = function() {
      image.loaded = true
    }
    image.image.src = image.src
  }
}

fn.get = function(name) {
  return this.images[name]
}

module.exports = ImageSets
