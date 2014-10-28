'use strict'

class Painter

	paint: ->
		canvas = document.getElementById 'board'
		if canvas.getContext
			ctx = canvas.getContext '2d'
			ctx.fillRect 250, 250, 10, 10
			ctx.fillRect 260, 250, 10, 10
			ctx.fillRect 250, 270, 10, 10
			ctx.fillRect 260, 270, 10, 10
			ctx.fillRect 240, 260, 10, 10
			ctx.fillRect 270, 260, 10, 10
		

module.exports = new Painter
