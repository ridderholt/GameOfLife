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
