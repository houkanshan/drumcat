var Backbone = require('backbone')
  , _ = require('underscore')
  , app = require('app')

var pageModel = Backbone.Model.extend({
})

var pageView = Backbone.View.extend({
  initialize: function() {
    console.log('setting init')
  }
, render: function() {
    console.log('setting render')
  }
})

module.exports = {
  View: pageView
, Model: pageModel
}
