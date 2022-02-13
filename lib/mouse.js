export const map = (num, min1, max1, min2, max2) => {
	return min2 + ((num - min1) * (max2 - min2)) / (max1 - min1)
}

export const generateMouseMethods = (
	canvas,
	width,
	height,
	canvasX,
	canvasY
) => {
	// Store the state of the mouse on the canvas
	const mouseState = {
		mouseX: 0,
		mouseY: 0,
		relativeX: 0,
		relativeY: 0,
		mousePressed: false,
		touches: [],
	}

	const updateCursorPosition = (x, y) => {
		mouseState.mouseX = x
		mouseState.mouseY = y

		// Convert the x and y to values from -1 to 1
		mouseState.relativeX = map(x, 0, width(), -1, 1)
		mouseState.relativeY = map(y, 0, height(), 1, -1)
	}

	const update_mouse_position = (e) => {
		const x = e.clientX
		const y = e.clientY

		updateCursorPosition(x, y)
	}

	canvas.addEventListener("mousedown", update_mouse_position)
	canvas.addEventListener("mousemove", update_mouse_position)
	canvas.addEventListener("mouseup", update_mouse_position)

	const decodeTouch = (touch) => {
		return {
			id: touch.identifier,
			x: touch.clientX - canvasX(),
			y: touch.clientY - canvasY(),
		}
	}

	const updateTouchPosition = (e) => {
		// Prevent a mouse event from being activated
		e.preventDefault()

		// Update the internal touches list
		mouseState.touches = []

		// Add all of the touches to the list
		for (let i = 0; i < e.touches.length; i++) {
			mouseState.touches.push(decodeTouch(e.touches[i]))
		}

		// Avoid updating the mouse position if there are no touches
		if (mouseState.touches.length == 0) return

		const x = mouseState.touches[0].x
		const y = mouseState.touches[0].y

		updateCursorPosition(x, y)
	}

	canvas.addEventListener("touchstart", updateTouchPosition)
	canvas.addEventListener("touchmove", updateTouchPosition)
	canvas.addEventListener("touchend", updateTouchPosition)
	canvas.addEventListener("touchcancel", updateTouchPosition)

	const getMouse = () => ({
		mouseX: mouseState.mouseX,
		mouseY: mouseState.mouseY,
	})

	const getMouseRelative = () => ({
		relativeX: mouseState.relativeX,
		relativeY: mouseState.relativeY,
	})

	const isMousePressed = () => mouseState.mousePressed

	const getTouches = () => mouseState.touches

	return { getMouse, getMouseRelative, isMousePressed, getTouches }
}
