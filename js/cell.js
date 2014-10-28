'use strict';
var Cell;

Cell = (function() {
  function Cell(x, y, alive) {
    this.x = x;
    this.y = y;
    this.alive = alive;
  }

  Cell.prototype.w = 10;

  Cell.prototype.h = 10;

  return Cell;

})();

module.exports = Cell;
