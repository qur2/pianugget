import {default as Kefir} from 'kefir';
import {default as xtend} from 'xtend';


// export default var playBus = Kefir.bus();
export var loadSound = Kefir.bus();
loadSound.log();

export var soundLoaded = loadSound.flatMap((config) => {
  if (config.type == 'url') {
    return Kefir.fromPromise(bufferSound(audioContext, config.sound));
  } else if (config.type == 'stream') {
    // like from the mic
  }
});
soundLoaded.log();

var audioContext = new AudioContext();

function bufferSound(ctx, url) {
  var p = new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    req.onload = function() {
      ctx.decodeAudioData(req.response, (buffer) => {
        resolve({context: ctx, buffer: buffer});
      }, reject);
    }
    req.send();
  });
  return p;
}

export var soundSampled = soundLoaded.map((audioConf) => {
  var source;
  var n = 10, nodes = [];
  while (n--) {
    source = audioConf.context.createBufferSource();
    source.buffer = audioConf.buffer;
    source.playOnce = playOnce.bind(source);
    source.playbackRate.value = (5-n) / 10 + 1;
    nodes.push(source);
  }
  return xtend({nodes: nodes}, audioConf);
});

/**
 * Bind this function to an audio node to enable it to be played multiple
 * times. It achieves replayability by not directly calling `this.start()`.
 * Instead, it creates a temporary node that will be started.
 *
 * @this AudioNode
 */
function playOnce() {
  var src = this.context.createBufferSource();
  src.buffer = this.buffer;
  src.loop = false;
  src.connect(this.context.destination);
  src.playbackRate.value = this.playbackRate.value;
  src.start();
}