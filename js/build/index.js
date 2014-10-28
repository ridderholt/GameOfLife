(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
module.exports=require(1)
},{}],3:[function(require,module,exports){
'use strict';
var Cell, Game, God, Painter, game;

Painter = require('./painter.js');

Cell = require('./cell.js');

God = require('./god.js');

Game = (function() {
  function Game(painter, god) {
    this.painter = painter;
    this.god = god;
  }

  Game.prototype.startCells = [new Cell(250, 250, true), new Cell(250, 260, true), new Cell(250, 270, true), new Cell(260, 250, true), new Cell(240, 260, true)];

  Game.prototype.currentRound = 0;

  Game.prototype.currentCells = [];

  Game.prototype.start = function() {
    return setInterval(this.nextRound, 300, this);
  };

  Game.prototype.nextRound = function(self) {
    if (self.currentRound === 0) {
      self.currentCells = self.startCells;
      self.painter.paint(self.currentCells);
    } else {
      self.currentCells = self.god.decide(self.currentCells);
      self.painter.paint(self.currentCells);
    }
    return self.currentRound += 1;
  };

  return Game;

})();

game = new Game(new Painter(), new God(500, 500));

game.start();

},{"./cell.js":2,"./god.js":4,"./painter.js":5}],4:[function(require,module,exports){
'use strict';
var Cell, God;

Cell = require('./Cell.js');

God = (function() {
  function God(width, height) {
    this.width = width;
    this.height = height;
  }

  God.prototype._contains = function(arr, x, y) {
    var item, _i, _len;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      item = arr[_i];
      if (item.x === x && item.y === y) {
        return true;
      }
    }
    return false;
  };

  God.prototype._countAliveNeighbors = function(allCells, neighbors) {
    var cell, matches, nCell, _i, _j, _len, _len1;
    matches = 0;
    for (_i = 0, _len = neighbors.length; _i < _len; _i++) {
      nCell = neighbors[_i];
      for (_j = 0, _len1 = allCells.length; _j < _len1; _j++) {
        cell = allCells[_j];
        if (cell.x === nCell.x && cell.y === nCell.y && cell.alive === true) {
          matches += 1;
        }
      }
    }
    return matches;
  };

  God.prototype._getNeighborsCoordinates = function(x, y) {
    return [
      {
        x: x + 10,
        y: y
      }, {
        x: x - 10,
        y: y
      }, {
        x: x,
        y: y + 10
      }, {
        x: x,
        y: y - 10
      }, {
        x: x + 10,
        y: y + 10
      }, {
        x: x + 10,
        y: y - 10
      }, {
        x: x - 10,
        y: y + 10
      }, {
        x: x - 10,
        y: y - 10
      }
    ];
  };

  God.prototype._lifeOrDeath = function(cell, nNeighbors) {
    if (cell.alive === true && nNeighbors < 2) {
      cell.alive = false;
    }
    if (cell.alive === true && (nNeighbors === 2 || nNeighbors === 3)) {
      cell.alive = true;
    }
    if (cell.alive === true && nNeighbors > 3) {
      cell.alive = false;
    }
    if (cell.alive === false && nNeighbors === 3) {
      cell.alive = true;
    }
    return cell;
  };

  God.prototype._whatToDo = function(allCells, cell) {
    var aliveNeighbors, nearCells;
    nearCells = this._getNeighborsCoordinates(cell.x, cell.y);
    aliveNeighbors = this._countAliveNeighbors(allCells, nearCells);
    cell = this._lifeOrDeath(cell, aliveNeighbors);
    return cell;
  };

  God.prototype.decide = function(aliveCells) {
    var aliveCell, allCells, cell, cellsToPlot, x, y, _i, _j, _k, _l, _len, _len1, _ref, _ref1;
    allCells = [];
    cellsToPlot = [];
    for (x = _i = 0, _ref = this.width; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      if (x % 10 === 0) {
        for (y = _j = 0, _ref1 = this.height; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          if (y % 10 === 0) {
            if (this._contains(aliveCells, x, y) === false) {
              allCells.push(new Cell(x, y, false));
            }
          }
        }
      }
    }
    for (_k = 0, _len = aliveCells.length; _k < _len; _k++) {
      aliveCell = aliveCells[_k];
      allCells.push(aliveCell);
    }
    for (_l = 0, _len1 = allCells.length; _l < _len1; _l++) {
      cell = allCells[_l];
      cell = this._whatToDo(allCells, cell);
      if (cell.alive) {
        cellsToPlot.push(cell);
      }
    }
    return cellsToPlot;
  };

  return God;

})();

module.exports = God;

},{"./Cell.js":1}],5:[function(require,module,exports){
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

},{}]},{},[3])