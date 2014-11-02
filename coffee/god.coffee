'use strict'

Cell = require './Cell.js'

class God
	constructor: (@width, @height) ->

	_buildDictionary: (cells) ->
		dict = []
		for c in cells
			if dict[c.x] is null or dict[c.x] is undefined 
				dict[c.x] = []
			dict[c.x][c.y] = c.alive

		dict

	_contains: (arr, x, y) ->
		arr.some (item, index, array) -> return item.x is x and item.y is y

	_countAliveNeighbors: (dictionary, neighbors) ->
		matches = 0

		for nCell in neighbors
			if dictionary[nCell.x][nCell.y] is true
				matches += 1

		matches

	_getNeighborsCoordinates: (x, y) ->
		cells =	[
			{ x: x + 10, y: y },
			{ x: x - 10, y: y },
			{ x: x, y: y + 10 },
			{ x: x, y: y - 10 },
			{ x: x + 10, y: y + 10 },
			{ x: x + 10, y: y - 10 },
			{ x: x - 10, y: y + 10 },
			{ x: x - 10, y: y - 10 }
		]

		f = (c) -> (c.x >= 0 and c.y >= 0) and (c.x <= 500 and c.y <= 500)
		cells.filter (f)

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
		dict = @_buildDictionary allCells
		nearCells = @_getNeighborsCoordinates cell.x, cell.y
		aliveNeighbors = @_countAliveNeighbors dict, nearCells
		cell = @_lifeOrDeath cell, aliveNeighbors
		cell

	decide: (aliveCells) ->
		aliveDict = @_buildDictionary aliveCells
		allCells = []
		cellsToPlot = []

		for x in [0..@width]
			if x%10 is 0
				for y in [0..@height]
					if y%10 is 0
						if aliveDict[x] is undefined or aliveDict[x][y] is undefined
							allCells.push new Cell(x, y, false)

		for aliveCell in aliveCells
			allCells.push aliveCell

		for cell in allCells
			cell = @_whatToDo allCells, cell
			if cell.alive then cellsToPlot.push cell

		cellsToPlot


module.exports = God
