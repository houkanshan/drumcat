function Layer(opts) {
  this.canvas = document.querySelector(opts.canvas)
  this.ctx = this.canvas.getContext('2d')
  this.init()
}

var fn = Layer.prototype

fn.init = function() {
  this.canvas.width = this.canvas.clientWidth
  this.canvas.height = this.canvas.clientHeight
}

fn.clearLayer = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
}
fn.drawImage = function(image) {
  this.ctx.drawImage(image, 0, 0, image.width, image.height)
}

module.exports = Layer
