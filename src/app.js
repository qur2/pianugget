import {default as Kefir} from 'kefir';
import {loadSound, soundSampled} from './sound-loader';


let keyStream = mkKeyboardStream(
  document.getElementById('keyboard'),
  (ev) => { return ev.keyCode; }
);


/**
 * Helper function to get a Kefir stream from keypress handler.
 * @param  {Element} input The input DOM element to listen to for keypress events
 * @param  {Function} transformer The function to run on keypress events
 * @return {Kefir.fromBinder} A Kefir stream
 */
function mkKeyboardStream(input, transformer) {
  return Kefir.fromSubUnsub(
    function(handler) { input.addEventListener('keypress', handler) },
    function(handler) { input.removeEventListener('keypress', handler) },
    transformer
  ).setName('asKefirStream');
}

// qwertyuiop
var validKeys = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112];

var noteStream = keyStream.map((key) => {
  return validKeys.indexOf(key);
}).filter((note) => {
  return note > -1;
});
noteStream.log();

loadSound.emit({type:'url', sound: 'dist/audio/pinkyfinger_Piano_G.ogg'});
var notes = Kefir.combine([soundSampled, noteStream], (conf, note) => {
  return conf.nodes[note];
}).tap((sample) => {
  sample.playOnce();
});
notes.log();
// take care of the no longer used audio nodes (probably shoul disconnect the pitch node?)
