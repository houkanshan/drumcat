var Backbone = require('backbone')
  , _ = require('underscore')

  , MainPage = require('./pages/main')
  , SettingPage = require('./pages/setting')

var PageSwitcherModel = Backbone.Model.extend({
  defaults: {
    settingPage: null
  , mainPage: null
  , currPage: null
  }
, initialize: function() {
  }
, switchTo: function(name, page) {
    this.set('currPage', name)
    this.set(name, page)
  }
})

module.exports = Backbone.Router.extend({
  routes: {
    '': 'mainPage'
  , 'setting': 'settingPage'
  }

, initialize: function() {
    this.pageSwitcherModel = new PageSwitcherModel()
    Backbone.history.start({
      pushState: true,
      root: ''
    })
  }

, switchTo: function(name, Page) {
    var page = this.pageSwitcherModel.get(name)
    if (!page) {
      page = new Page.View()
      page.model = new Page.Model()
      this.pageSwitcherModel.on('change:currPage', function(model, currPage) {
        page.$el.toggle(currPage === name)
      })
    }
    page.render()
    this.pageSwitcherModel.switchTo(name, page)
    return page
  }

, mainPage: function() {
    this.switchTo('mainPage', MainPage)
  }
, settingPage: function() {
    this.switchTo('settingPage', SettingPage)
  }
})
