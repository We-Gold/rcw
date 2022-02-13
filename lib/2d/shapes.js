export const generate2dShapeMethods = (ctx) => {
	// Get the current dimensions of the canvas
	const width = () => ctx.canvas.width
	const height = () => ctx.canvas.height
    const canvasX = () => ctx.canvas.getBoundingClientRect().x
    const canvasY = () => ctx.canvas.getBoundingClientRect().y

	const clear = (color) => {
		rect(0, 0, width(), height(), color)
	}

	const fill = (color) => {
		ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`
		ctx.fill()
	}

	const stroke = (color, thickness = 1) => {
		ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`
		ctx.lineWidth = thickness
		ctx.stroke()
	}

	const rectPath = (x, y, w, h) => {
		ctx.beginPath()
		ctx.rect(x, y, w, h)
		ctx.closePath()
	}

	const rect = (x, y, w, h, color) => {
		rectPath(x, y, w, h)
		fill(color)
	}

	const rectLines = (x, y, w, h, thickness, color) => {
		rectPath(x, y, w, h)
		stroke(color, thickness)
	}

	const ellipsePath = (
		x,
		y,
		radiusX,
		radiusY,
		rotation,
		startAngle,
		endAngle
	) => {
		ctx.beginPath()
		ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
		ctx.closePath()
	}

	const ellipse = (
		x,
		y,
		radiusX,
		radiusY,
		rotation,
		startAngle,
		endAngle,
		color
	) => {
		ellipsePath(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
		fill(color)
	}

	const ellipseLines = (
		x,
		y,
		radiusX,
		radiusY,
		rotation,
		startAngle,
		endAngle,
		color
	) => {
		ellipsePath(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
		stroke(color)
	}

	const arcPath = (x, y, r, startAngle, endAngle) => {
		ctx.beginPath()
		ctx.arc(x, y, r, startAngle, endAngle)
		ctx.closePath()
	}

	const arc = (x, y, r, startAngle, endAngle, color) => {
		arcPath(x, y, r, startAngle, endAngle)
		fill(color)
	}

	const arcLines = (x, y, r, startAngle, endAngle, thickness, color) => {
		arcPath(x, y, r, startAngle, endAngle)
		stroke(color, thickness)
	}

	const circlePath = (x, y, r) => {
		arcPath(x, y, r, 0, 2 * Math.PI)
	}

	const circle = (x, y, r, color) => {
		circlePath(x, y, r)
		fill(color)
	}

	const circleLines = (x, y, r, thickness, color) => {
		circlePath(x, y, r)
		stroke(color, thickness)
	}

	const linePath = (x1, y1, x2, y2) => {
		ctx.beginPath()
		ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.closePath()
	}

	const line = (x1, y1, x2, y2, thickness, color) => {
		linePath(x1, y1, x2, y2)
		stroke(color, thickness)
	}

	const styleText = (font) => {
		ctx.font = `${font.fontSize}px ${font.cssFont}`
		ctx.textAlign = font.alignment
		ctx.textBaseline = font.baseline
	}

	const text = (message, x, y, font, color) => {
		styleText(font)
		fill(color)
		ctx.fillText(message, x, y)
	}

	const textLines = (message, x, y, font, color) => {
		styleText(font)
		stroke(color)
		ctx.strokeText(message, x, y)
	}

	const measureText = (message, font) => {
		// Set parameters for drawing the text
		styleText(font)

		const metrics = ctx.measureText(message)

        // Calculate important details about the text
		const width =
			Math.abs(metrics.actualBoundingBoxLeft) +
			Math.abs(metrics.actualBoundingBoxRight)
		const height =
			Math.abs(metrics.actualBoundingBoxDescent) +
			Math.abs(metrics.actualBoundingBoxAscent)
		const baseline = Math.abs(metrics.actualBoundingBoxDescent)

		return { width, height, baseline }
	}

    const createImageData = (w, h) => {
        return ctx.createImageData(w, h)
    }

    const getImageData = (x, y, w, h) => {
        return ctx.getImageData(x, y, w, h)
    }

    const putImageData = (image, x, y) => {
        ctx.putImageData(image, x, y)
    }

    const drawImage = (image, x, y, w, h) => {
        ctx.drawImage(image, x, y, w, h)
    }

    const bezierPath = (x1, y1, cx1, cy1, cx2, cy2, x2, y2) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2)
        ctx.closePath()
    }

    const bezier = (x1, y1, cx1, cy1, cx2, cy2, x2, y2, thickness, color) => {
        bezierPath(x1, y1, cx1, cy1, cx2, cy2, x2, y2)
        stroke(color, thickness)
    }

	return {
		clear,
		width,
		height,
        canvasX,
        canvasY,
		rect,
		rectLines,
		ellipse,
		ellipseLines,
		arc,
		arcLines,
		circle,
		circleLines,
		line,
		text,
		textLines,
        measureText,
        createImageData,
        getImageData,
        putImageData,
        drawImage,
        bezier
	}
}
