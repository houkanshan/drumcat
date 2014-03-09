var Backbone = require('backbone')
  , _ = require('underscore')

var defaults = {
  tempo: 120
, beats: 2
, subdivision: 2
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
    this.currNoteIndex = 0

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
    this.currNoteIndex ++
    this.currNoteIndex %= this.schedule.length
  }
, playNote: function() {
    this.trigger('note:play', this.currNote())

    var nextDelay = this.lookahead
    this.trigger('note:next', this.nextNode(), nextDelay)
  }
, currNote: function() {
    return this.schedule[this.currNoteIndex]
  }
, nextNode: function() {
    return this.schedule[(this.currNoteIndex + 1) % this.schedule.length]
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
    this.startDate = Date.now()
    this.ticks = 0

    this.trigger('schedule:maked', this.schedule)
  }
})
