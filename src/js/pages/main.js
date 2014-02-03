var Backbone = require('backbone')
  , _ = require('underscore')
  , app = require('app')

var pageModel = Backbone.Model.extend({
})

var pageView = Backbone.View.extend({
  initialize: function() {
  }
, render: function() {
    console.log('haha')
  }
})

module.exports = {
  View: pageView
, Model: pageModel
}
