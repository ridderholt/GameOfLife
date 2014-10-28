(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var Painter;

Painter = (function() {
  function Painter() {}

  Painter.prototype.paint = function(cells) {
    var canvas, cell, ctx, _i, _len, _results;
    canvas = document.getElementById('board');
    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      _results = [];
      for (_i = 0, _len = cells.length; _i < _len; _i++) {
        cell = cells[_i];
        _results.push(ctx.fillRect(cell.x, cell.y, cell.w, cell.h));
      }
      return _results;
    }
  };

  return Painter;

})();

module.exports = Painter;

},{}]},{},[1])