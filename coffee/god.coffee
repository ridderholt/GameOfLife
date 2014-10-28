'use strict'

Cell = require './Cell.js'

class God
	constructor: (@width, @height) ->

	_contains: (arr, x, y) ->
		for item in arr
			if item.x is x and item.y is y then return true
		
		return false

	_countAliveNeighbors: (allCells, neighbors) ->
		matches = 0
		for nCell in neighbors
			for cell in allCells
				if cell.x is nCell.x and cell.y is nCell.y and cell.alive is true
					matches += 1

		matches

	_getNeighborsCoordinates: (x, y) ->
		[
			{ x: x + 10, y: y },
			{ x: x - 10, y: y },
			{ x: x, y: y + 10 },
			{ x: x, y: y - 10 },
			{ x: x + 10, y: y + 10 },
			{ x: x + 10, y: y - 10 },
			{ x: x - 10, y: y + 10 },
			{ x: x - 10, y: y - 10 }
		]

	_lifeOrDeath: (cell, nNeighbors) ->
		if cell.alive is true and nNeighbors < 2
			cell.alive = false
		if cell.alive is true and (nNeighbors is 2 or nNeighbors is 3)
			cell.alive = true
		if cell.alive is true and nNeighbors > 3
			cell.alive = false
		if cell.alive is false and nNeighbors is 3
			cell.alive = true

		cell

	_whatToDo: (allCells, cell) ->
		nearCells = @_getNeighborsCoordinates cell.x, cell.y
		aliveNeighbors = @_countAliveNeighbors allCells, nearCells
		cell = @_lifeOrDeath cell, aliveNeighbors
		cell

	decide: (aliveCells) ->
		allCells = []
		cellsToPlot = []

		for x in [0..@width]
			if x%10 is 0
				for y in [0..@height]
					if y%10 is 0
						if @_contains(aliveCells, x, y) is false
							allCells.push new Cell(x, y, false)

		for aliveCell in aliveCells
			allCells.push aliveCell

		for cell in allCells
			cell = @_whatToDo allCells, cell
			if cell.alive then cellsToPlot.push cell

		cellsToPlot


module.exports = God
