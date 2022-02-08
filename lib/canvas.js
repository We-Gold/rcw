import { styleCanvas, stylePage } from "./styles"
import { autoresizeCanvas } from "./resize"
import { generateShapeMethods } from "./2d/shapes"
import { generateMouseMethods } from "./mouse"

// Create an enum for context modes
const CanvasMode = {
	default: "2d",
	webgl: "webgl",
}

const initCanvas = ({
	id,
	mode,
	autostyleCanvas = true,
	autostylePage = true,
	autoresize = true,
}) => {
	const canvasElement = document.querySelector(`#${id}`)

	// Verify that the canvas is valid
	if (!verifyCanvas(canvasElement)) {
		return
	}

	// Automatically style the canvas and the page
	if (autostyleCanvas) styleCanvas(canvasElement)
	if (autostylePage) stylePage()

	// Get the drawing context for the canvas
	const ctx = canvasElement.getContext(mode)

	// Automatically resize the canvas
	if (autoresize) autoresizeCanvas(canvasElement, ctx)

	// Generate shape methods for the canvas
	const shapeMethods = generateShapeMethods(ctx)

	// Generate mouse methods for the canvas
	const mouseMethods = generateMouseMethods(
		canvasElement,
		shapeMethods.width,
		shapeMethods.height,
		shapeMethods.canvas_x,
		shapeMethods.canvas_y
	)

	return { ctx, ...shapeMethods, ...mouseMethods }
}

const verifyCanvas = (canvasElement) => {
	if (canvasElement) {
		return true
	} else {
		console.error("Error: canvas id is invalid")

		return false
	}
}

export { CanvasMode, initCanvas }
