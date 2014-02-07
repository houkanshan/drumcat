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
  target.addClass('hover')
  target.on('touchend.touch-hover touchcancel.touch-hover'
  , function() {
    setTimeout(function() {
      target.removeClass('hover')
      target.off('.touch-hover')
    }, 200)
  })
})

body.on('touchmove', function(e) {
  e.preventDefault()
})

if (! 'ontouchstart' in window) {
  body.on('click', function(e) {
    $(e.target).trigger('tap')
  })
}

app.router = new Router()
