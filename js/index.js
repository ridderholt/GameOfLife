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
