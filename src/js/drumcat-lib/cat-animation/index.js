var mainloop = new MainLoop()
var cat = new Cat()
var layer = new Layer({ canvas: 'canvas' })

cat.draw = function() {
  layer.drawImage(this.getImage())
}

mainloop.preDraw = function() {
  layer.clearLayer()
}

mainloop.addSpirit(cat)
mainloop.start()
