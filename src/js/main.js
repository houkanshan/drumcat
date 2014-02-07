var Router = require('./router')
  , app = require('./app')
  , $ = require('jquery')
  , Backbone = require('backbone')
  , _ = require('underscore')

Backbone.$ = $ // hack for browserify

var body = $('body')

body.on('click', 'a[href="#"]', function(e) {
  e.preventDefault()
})
body.on('touchstart', 'a', function(e) {
  var target = $(e.currentTarget)
  console.log(target)
  target.addClass('hover')
  target.on('touchend.touch-hover touchcancel.touch-hover'
  , function() {
    target.removeClass('hover')
    target.off('.touch-hover')
  })
})

app.router = new Router()
