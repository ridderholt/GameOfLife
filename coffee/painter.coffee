'use strict'

class Painter

	paint: (cells) ->
		canvas = document.getElementById 'board'
		if canvas.getContext
			ctx = canvas.getContext '2d'
			ctx.clearRect 0, 0, canvas.width, canvas.height

			for cell in cells
				ctx.fillRect cell.x, cell.y, cell.w, cell.h 


module.exports = Painter
