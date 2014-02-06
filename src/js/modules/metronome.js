var Backbone = require('backbone')
  , _ = require('underscore')

var defaults = {
  tempo: 120
, beats: 2
, subdivision: 4
}

module.exports = Backbone.View.extend({
  initialize: function(options) {
    options = _.defaults(defaults, options)
    _.extend(this, _.pick(options, 'tempo', 'beats', 'subdivision'))

    _.bindAll(this, 'tick')
  }

, start: function() {
    if (this.timer) { return }
    if (!this.schedule) { this.makeSchedule() }

    this.tick()
  }
, tick: function() {
    this.timer = setTimeout(this.tick, this.lookahead / 10)
    if (this.checkTime()) {
      // TODO: recover from miss time.
      this.goNextNote()
      this.playNote()
    }
  }
, isPlaying: function() {
    return !!this.timer
  }
, toggle: function() {
    this[this.isPlaying() ? 'pause' : 'start']()
  }
, pause: function() {
    clearTimeout(this.timer)
    this.timer = null
  }
, stop: function() {
    this.pause()
    this.currNoteIndex = 0
  }
, update: function(options) {
    _.extend(this, _.pick(options, 'tempo', 'beats', 'subdivision'))
    this.makeSchedule()
  }

, checkTime: function() {
    var actualRunningTime = Date.now() - this.startDate
      , theoreNextNoteTime = this.ticks * this.lookahead
      , isNextNote  = actualRunningTime >= theoreNextNoteTime
    if (isNextNote) {
      this.ticks = actualRunningTime / this.lookahead + 1
    }
    return isNextNote
  }
, goNextNote: function() {
    if (this.currNoteIndex >= this.schedule.length - 1) {
      this.currNoteIndex = 0
    } else {
      this.currNoteIndex ++
    }
  }
, playNote: function() {
    this.trigger('note:play', this.currNote())
  }
, currNote: function() {
    return this.schedule[this.currNoteIndex]
  }
, makeSchedule: function() {
    this.lookahead = 60 * 1000 / (this.tempo * this.subdivision)
    this.schedule = []
    for(var i = 0; i < this.beats; i++) {
      for (var j = 0; j < this.subdivision; j++) {
        this.schedule.push(j === 0 ? (i === 0 ? 2 : 1) : 0)
      }
    }
    console.log(this.schedule, this.lookahead)
    this.currNoteIndex = 0
    this.startDate = Date.now()
    this.ticks = 0
  }
})
