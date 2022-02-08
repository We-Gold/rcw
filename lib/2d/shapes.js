export const generateShapeMethods = (ctx) => {
	// Get the current dimensions of the canvas
	const width = () => ctx.canvas.width
	const height = () => ctx.canvas.height
    const canvas_x = () => ctx.canvas.getBoundingClientRect().x
    const canvas_y = () => ctx.canvas.getBoundingClientRect().y

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

	const rect_path = (x, y, w, h) => {
		ctx.beginPath()
		ctx.rect(x, y, w, h)
		ctx.closePath()
	}

	const rect = (x, y, w, h, color) => {
		rect_path(x, y, w, h)
		fill(color)
	}

	const rect_lines = (x, y, w, h, thickness, color) => {
		rect_path(x, y, w, h)
		stroke(color, thickness)
	}

	const ellipse_path = (
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
		ellipse_path(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
		fill(color)
	}

	const ellipse_lines = (
		x,
		y,
		radiusX,
		radiusY,
		rotation,
		startAngle,
		endAngle,
		color
	) => {
		ellipse_path(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
		stroke(color)
	}

	const arc_path = (x, y, r, startAngle, endAngle) => {
		ctx.beginPath()
		ctx.arc(x, y, r, startAngle, endAngle)
		ctx.closePath()
	}

	const arc = (x, y, r, startAngle, endAngle, color) => {
		arc_path(x, y, r, startAngle, endAngle)
		fill(color)
	}

	const arc_lines = (x, y, r, startAngle, endAngle, thickness, color) => {
		arc_path(x, y, r, startAngle, endAngle)
		stroke(color, thickness)
	}

	const circle_path = (x, y, r) => {
		arc_path(x, y, r, 0, 2 * Math.PI)
	}

	const circle = (x, y, r, color) => {
		circle_path(x, y, r)
		fill(color)
	}

	const circle_lines = (x, y, r, thickness, color) => {
		circle_path(x, y, r)
		stroke(color, thickness)
	}

	const line_path = (x1, y1, x2, y2) => {
		ctx.beginPath()
		ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.closePath()
	}

	const line = (x1, y1, x2, y2, thickness, color) => {
		line_path(x1, y1, x2, y2)
		stroke(color, thickness)
	}

	const style_text = (font) => {
		ctx.font = `${font.fontSize}px ${font.cssFont}`
		ctx.textAlign = font.alignment
		ctx.textBaseline = font.baseline
	}

	const text = (message, x, y, font, color) => {
		style_text(font)
		fill(color)
		ctx.fillText(message, x, y)
	}

	const text_lines = (message, x, y, font, color) => {
		style_text(font)
		stroke(color)
		ctx.strokeText(message, x, y)
	}

	const measure_text = (message, font) => {
		// Set parameters for drawing the text
		style_text(font)

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

    const create_image_data = (w, h) => {
        return ctx.createImageData(w, h)
    }

    const get_image_data = (x, y, w, h) => {
        return ctx.getImageData(x, y, w, h)
    }

    const put_image_data = (image, x, y) => {
        ctx.putImageData(image, x, y)
    }

    const draw_image = (image, x, y, w, h) => {
        ctx.drawImage(image, x, y, w, h)
    }

    const bezier_path = (x1, y1, cx1, cy1, cx2, cy2, x2, y2) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2)
        ctx.closePath()
    }

    const bezier = (x1, y1, cx1, cy1, cx2, cy2, x2, y2, thickness, color) => {
        bezier_path(x1, y1, cx1, cy1, cx2, cy2, x2, y2)
        stroke(color, thickness)
    }

	return {
		clear,
		width,
		height,
        canvas_x,
        canvas_y,
		rect,
		rect_lines,
		ellipse,
		ellipse_lines,
		arc,
		arc_lines,
		circle,
		circle_lines,
		line,
		text,
		text_lines,
        measure_text,
        create_image_data,
        get_image_data,
        put_image_data,
        draw_image,
        bezier
	}
}
