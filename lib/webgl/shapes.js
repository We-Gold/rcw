import { initPointProgram, usePointProgram, DrawModes } from "./shaders"

export const generateGLShapeMethods = (gl) => {
	// Initialize the point shader
	initPointProgram(gl)

	// Get the current dimensions of the canvas
	const width = () => gl.canvas.width
	const height = () => gl.canvas.height
	const canvasX = () => gl.canvas.getBoundingClientRect().x
	const canvasY = () => gl.canvas.getBoundingClientRect().y

	const emptyAllBuffers = () => {
		// Make a temporary buffer
		const buffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
		const numberOfVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)

		for (let i = 0; i < numberOfVertexAttributes; ++i) {
			gl.vertexAttribPointer(i, 1, gl.FLOAT, false, 0, 0)
		}
	}

	const clear = (color) => {
		emptyAllBuffers()

		gl.clearColor(color.gl.r, color.gl.g, color.gl.b, color.gl.a)
		gl.clear(gl.COLOR_BUFFER_BIT)
	}

	// Create a utility function to calculate the angle between two points
	const angleBetweenPoints = (x1, y1, x2, y2) => {
		return Math.atan2(y2 - y1, x2 - x1)
	}

	const line = (x1, y1, x2, y2, thickness, color) => {
		// Calculate the x and y offsets necessary
		// to make the line face any direction correctly
		const offset = thickness / 2
		const angle = angleBetweenPoints(x1, y1, x2, y2)
		const yOffset = offset * Math.cos(angle)
		const xOffset = offset * Math.sin(angle)

		// Create a rectangle out of two triangles
		const points = [
			x1 - xOffset, y1 + yOffset,
			x1 + xOffset, y1 - yOffset,
			x2 - xOffset, y2 + yOffset,
			x2 - xOffset, y2 + yOffset,
			x2 + xOffset, y2 - yOffset,
			x1 + xOffset, y1 - yOffset,
		]

		usePointProgram(gl, points, color, DrawModes.triangles)
	}

	const rect = (x, y, w, h, color) => {
		// Create a rectangle out of two triangles
		const points = [
			x, y,
			x, y + h,
			x + w, y,
			x + w, y,
			x + w, y + h,
			x, y + h,
		]

		usePointProgram(gl, points, color, DrawModes.triangles)
	}

	const rectLines = (x, y, w, h, thickness, color) => {
		const offset = thickness / 2

		// Create a rectangle out of two triangles
		const points = [
			// Vertical lines
			[x, y, x, y + h],
			[x + w, y + h, x + w, y],
			// Horizontal lines
			[x - offset, y, x + w + offset, y],
			[x - offset, y + h, x + w + offset, y + h],
		]

		for (let i = 0; i < points.length; i++) {
			line(points[i][0], points[i][1], points[i][2], points[i][3], thickness, color)
		}
	}

	const circle = (x, y, r, color, segments=32) => {
		// Calculate the difference in angle between each segment
		const angleInterval = (Math.PI * 2) / segments

		// Create a circle out of triangles
		const points = []

		for (let angle = 0; angle < Math.PI * 2; angle += angleInterval) {
			// Add the first point of the triangle
			points.push(x + r * Math.cos(angle), y - r * Math.sin(angle))

			// Add the middle of the circle
			points.push(x, y)

			// Add the final point of the triangle
			points.push(x + r * Math.cos(angle + angleInterval), y - r * Math.sin(angle + angleInterval))
		}

		usePointProgram(gl, points, color, DrawModes.triangles)
	}

	const circleLines = (x, y, r, thickness, color, segments=32) => {
		// Calculate the difference in angle between each segment
		const angleInterval = (Math.PI * 2) / segments

		for (let angle = 0; angle < Math.PI * 2; angle += angleInterval) {
			// Add the first point of the (original) triangle
			const [x1, y1] = [x + r * Math.cos(angle), y - r * Math.sin(angle)]

			// Add the final point of the (original) triangle
			const [x2, y2] = [x + r * Math.cos(angle + angleInterval * 1.5), y - r * Math.sin(angle + angleInterval * 1.5)]

			line(x1, y1, x2, y2, thickness, color)
		}
	}

	return {
		width,
		height,
		canvasX,
		canvasY,
		clear,
		rect,
		rectLines,
		line,
		circle,
		circleLines
	}
}
