var Backbone = require('backbone')
  , _ = require('underscore')
  , Microphone = require('../drumcat-lib/microphone')
  , KickDetector = require('../drumcat-lib/kick-detector')

module.exports = Backbone.View.extend({
  initialize: function() {
    this.microphone = new Microphone({ process: true })
    this.kickDetector = new KickDetector()
    this.bindAudio()
  }
, bindAudio: function() {
    var array
    this.kickDetector.getArray = function(){
      return array
    }
    this.microphone.defaultProcessor
      .addEventListener('audioprocess', function(e) {
        array = e.inputBuffer.getChannelData(0)
        this.kickDetector.update()
        if (this.kickDetector.draw()) {
          this.trigger('kick:bang')
        }
      }.bind(this))
  }
, capture: function() {
    this.microphone.capture()
    // TODO: failed catch
  }
})
