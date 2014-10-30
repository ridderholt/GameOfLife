'use strict';

Painter = require './painter.js'
Cell = require './cell.js'
God = require './god.js'

class Game
	constructor: (@painter, @god) ->

	startCells: [new Cell(250, 250, true), new Cell(250, 260, true), new Cell(250, 270, true), new Cell(260, 250, true), new Cell(240, 260, true)]
	currentRound: 0
	currentCells: []

	start: ->
		@nextRound @
		setInterval @nextRound, 300, @

	nextRound: (self) ->
		if self.currentRound is 0
			self.currentCells = self.startCells
			self.painter.paint self.currentCells
		else
			self.currentCells = self.god.decide self.currentCells
			self.painter.paint self.currentCells
			
		self.currentRound += 1
		
		


game = new Game new Painter(), new God(500, 500)
game.start()

