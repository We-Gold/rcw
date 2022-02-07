export const generateShapeMethods = (ctx) => {
	// Get the current dimensions of the canvas
	const width = () => ctx.canvas.width
	const height = () => ctx.canvas.height

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
		arc_path(x, y, r, 0, 2* Math.PI)
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

	return {
		clear,
		width,
		height,
		rect,
		rect_lines,
		ellipse,
		ellipse_lines,
        arc,
        arc_lines,
		circle,
		circle_lines,
        line
	}
}
