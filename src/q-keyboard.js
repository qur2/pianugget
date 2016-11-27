import skate from 'skatejs';
import { el, EL } from 'charata/src/index';


const svg = (elms, key, props) => new EL('svg', elms, key, props);
const g = (elms, key, props) => new EL('g', elms, key, props);
const filter = (elms, key, props) => new EL('filter', elms, key, props);
const rect = (key, props) => new EL('rect', null, key, props);
const text = (elms, key, props) => new EL('text', elms, key, props);

const GuaussianStroke = () => filter([
  new EL('feGaussianBlur', null, null, ['stdDeviation', 1])
], null, ['id', 'gauss-stroke']);

const GradientDark = () => new EL('linearGradient', [
  new EL('stop', null, null, ['offset', "0%", 'style', {stopColor:'#000'}]),
  new EL('stop', null, null, ['offset', "3%", 'style', {stopColor:'#2b2b2b'}]),
  new EL('stop', null, null, ['offset', "70%", 'style', {stopColor:'#3b3b3b'}]),
  new EL('stop', null, null, ['offset', "100%", 'style', {stopColor:'#4b4b4b'}]),
], null, ['id', "gradient-dark", 'x1', "0%", 'y1', "0%", 'x2', "0%", 'y2', "100%"]);

const GradientLight = () => new EL('linearGradient', [
  new EL('stop', null, null, ['offset', "0%", 'style', {stopColor:'#f9f9f9'}]),
  new EL('stop', null, null, ['offset', "50%", 'style', {stopColor:'#efefef'}]),
  new EL('stop', null, null, ['offset', "100%", 'style', {stopColor:'#f9f9f9'}]),
], null, ['id', "gradient-light", 'x1', "0%", 'y1', "0%", 'x2', "0%", 'y2', "100%"]);

const DarkKey = (pos, label, note) => g([
  rect(null, ['style', {fill:'#1b1b1b'}, 'x', 0, 'y', 0, 'rx', 8, 'ry', 8, 'width', 95, 'height', 100]),
  rect(null, ['style', {stroke:'#000',strokeWidth:3,fillOpacity:0, filter:'url(#gauss-stroke)'}, 'x', 0, 'y', 0, 'rx', 8, 'ry', 8, 'width', 95, 'height', 100]),
  rect(null, ['style', {fill:'url(#gradient-dark)'}, 'x', 10, 'y', 10, 'rx', 8, 'ry', 8, 'width', 75, 'height', 82]),
  rect(null, ['style', {stroke:'#3b3b3b',strokeWidth:3,fillOpacity:0, filter:'url(#gauss-stroke)'}, 'x', 10, 'y', 10, 'rx', 8, 'ry', 8, 'width', 75, 'height', 82]),
  text(label, null, ['transform', 'matrix(1 0 0 1 20 79)', 'style', {fontFamily:'sans-serif',fontSize:'1.8em',fill:'#ececec'}])
], `key-${label}`, ['class', "key dark", 'transform', `translate(${pos * 100 + 65})`, 'data-note', note]);

const LightKey = (pos, label, note) => g([
  rect(null, ['style', {fill:'#aaa'}, 'x', 0, 'y', 0, 'rx', 8, 'ry', 8, 'width', 97, 'height', 200]),
  rect(null, ['style', {stroke:'#333',strokeWidth:3,fillOpacity:0, filter:'url(#gauss-stroke)'}, 'x', 0, 'y', 0, 'rx', 8, 'ry', 8, 'width', 97, 'height', 200]),
  rect(null, ['style', {fill:'url(#gradient-light)'}, 'x', 10, 'y', 3, 'rx', 8, 'ry', 8, 'width', 77, 'height', 187]),
  rect(null, ['style', {stroke:'#ECECEC',strokeWidth:3,fillOpacity:0, filter:'url(#gauss-stroke)'}, 'x', 10, 'y', 3, 'rx', 8, 'ry', 8, 'width', 77, 'height', 187]),
  text(label, null, ['transform', 'matrix(1 0 0 1 20 174)', 'style', {fontFamily:'sans-serif',fontSize:'1.8em',fill:'#2b2b2b'}])
], `key-${label}`, ['class', "key light", 'transform', `translate(${pos * 100})`, 'data-note', note]);


const keyMap = [LightKey, DarkKey];
const layouts = {
          //  0,1,2,3,4.5,6,7,8,9,10,11.12,13,14,15,16.17
          //  w,b,w,b,w,w,b,w,b,w, b, w, w, b, w, b, w, w
  // qwerty: "a,w,s,e,d,f,t,g,y,h, u, j, k, o, l, p, ;, '",
  qwerty: "awsedftgyhujkolp;'",
}
// while(letters.length) {
//   for (let i=0; i<5 && letters.length; i++) {
//     // c to d
//     keyMap[i%2](Math.floor(i/2), l)
//   }
//   for (let i=0; i<7 && letters.length; i++) {
//     // f to g
//   }
// }
//            " a   w  s   e  d  f   t  g   y  h   u  j  k   o  l   p  ;  '"
// const notes = 'c4,c#4,d4,d#4,e4,f4,f#4,g4,g#4,a4,a#4,b4,c5,c#5,d5,d#5,e5,f5'.split(',');

function renderKeys(layout) {
  const keys = layout.split('').reduce((acc, l, i) => {
    const o = Math.floor(i / 12);
    const g = i - (o*12);
    const skip = g > 4 ? 1 : 0;
    const k = keyMap[(i + skip) % 2](Math.floor((i + skip)/2) + o, l, 40+i);
    if ((i + skip) % 2) return acc.concat(k);
    else return [k].concat(acc);
  }, []);
  return svg([new EL('defs', [
    GradientLight(), GradientDark(), GuaussianStroke(),
  ])].concat(keys), null, ['viewBox', '-3 -3 1103 210']);
}

const QKeyboard = skate('q-keyboard', {
  created: function (element) {
    element.layout = layouts.qwerty.toUpperCase();
    renderKeys(element.layout).renderTo(element);
  },

  events: {
    'click .key': function (evt) {
      // dataset on svg elements is not widely supported yet
      // use getAttribute instead
      this.dispatchNote(evt.currentTarget.getAttribute('data-note') >> 0);
    },
    'keydown': function (evt) {
      const note = this.layout.indexOf(String.fromCharCode(evt.keyCode));
        if (note > -1) this.dispatchNote(note + 40);
    },
  },

  prototype: {
    dispatchNote(note) {
      const e = new CustomEvent('note', {detail: {note}});
      this.dispatchEvent(e);
    }
  }
});

export default QKeyboard;
