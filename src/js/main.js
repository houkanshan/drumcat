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

app.router = new Router()
