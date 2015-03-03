"use strict";
var Dega = require('Dega');
var kefir = require('kefir');


function asStream(src, eventName, selector, transformer) {
  var el = Dega(src);
  if (transformer == null && selector != null && 'string' !== typeof selector) {
    transformer = selector;
    selector = null;
  }
  return kefir.fromSubUnsub(
    function(handler) { el.on(eventName, selector, handler) },
    function(handler) { el.off(eventName, selector, handler) },
    transformer
  ).setName('asKefirStream');
}

function asProperty(src, eventName, selector, getter) {
  if (getter == null) {
    getter = selector;
    selector = null;
  }
  return asStream(src, eventName, selector, getter)
    .toProperty(getter())
    .setName('asKefirProperty');
}

module.exports = {
  asStream: asStream,
  asProperty: asProperty
}