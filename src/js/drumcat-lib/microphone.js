window.AudioContext = window.AudioContext
  || window.mozAudioContext
  || window.webkitAudioContext
  || window.msAudioContext
  || window.oAudioContext
navigator.getUserMedia = navigator.getUserMedia
  || navigator.mozGetUserMedia
  || navigator.webkitGetUserMedia
  || navigator.msGetUserMedia
  || navigator.oGetUserMedia

function Microphone(options) {
  options = options || {}

  var audioContext = this.audioContext = new AudioContext()
  var bufferSize = this.bufferSize = options.bufferSize || 2048
  this.processors = []

  this.filterNoise()

  if (options.analyse) {
    this.defaultAnalyser = this.addAnalyser()
    this.freqs = new Uint8Array(this.defaultAnalyser.frequencyBinCount)
    this.times = new Uint8Array(this.defaultAnalyser.frequencyBinCount)
  }
  if (options.process) {
    this.defaultProcessor = this.addProcessor()
  }
}

var fn = Microphone.prototype

fn.filterNoise = function() {
  // Simple noise filter.
  var lp = this.lp = this.audioContext.createBiquadFilter()
  lp.type = lp.LOWPASS
  lp.frequency = 8000
  lp.Q = 0.1

  var hp = this.hp = this.audioContext.createBiquadFilter()
  hp.type = hp.HIGHPASS
  hp.frequency = 20
  hp.Q = 0.1
}

fn.capture = function() {
  navigator.getUserMedia({
    audio: true
  }, success.bind(this), error.bind(this))

  function success(stream) {
    this.stream = stream
    var src = this.audioContext.createMediaStreamSource(stream)
      , node = src
    if (this.lp) {
      node.connect(this.lp)
      node = this.lp
    }
    if (this.hp) {
      node.connect(this.hp)
      node = this.hp
    }
    node.connect(this.audioContext.destination)

    this.processors.forEach(function(processor) {
      processor(node)
    }.bind(this))
  }
  function error(e) {
    throw new Error(e)
  }
}

fn.getFreqs = function() {
  this.defaultAnalyser.getByteFrequencyData(this.freqs)
  return this.freqs
}

fn.getTimes = function() {
  this.defaultAnalyser.getByteTimeDomainData(this.times)
  return this.times
}

fn.addProcessor = function() {
  var processor = this.audioContext.createScriptProcessor(this.bufferSize, 1, 1)
  processor.connect(this.audioContext.destination)

  this.processors.push(function(source, stream) {
    source.connect(processor)
  })

  return processor
}

fn.addAnalyser = function() {
  var analyser = this.audioContext.createAnalyser()
  analyser.connect(this.audioContext.destination)
  analyser.smoothingTimeConstant = 0.8
  analyser.fftSize = this.bufferSize
  analyser.minDecibels = -140
  analyser.maxDecibels = 0

  this.processors.push(function(source, stream) {
    source.connect(analyser)
  })
  return analyser
}

module.exports = Microphone
