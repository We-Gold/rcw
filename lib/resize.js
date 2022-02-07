let contexts = []

// Create an observer to watch canvases
const defaultCanvasObserver = new ResizeObserver(entries => {
    for(const entry of entries) {
        handleResize(entry)
    }
})

// Handle a resize event
const handleResize = (entry) => {
    // Resize the element
    if(entry.contentBoxSize){
        const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

        // Note: inlineSize is width, blockSize is height
        resizeCanvasToDisplaySize(entry.target, contentBoxSize.inlineSize, contentBoxSize.blockSize);
    } else {
        // Note: inlineSize is width, blockSize is height
        resizeCanvasToDisplaySize(entry.target, entry.contentRect.inlineSize, entry.contentRect.blockSize);
    }

    // Get the context of the current canvas
    const ctx = contexts.find((ctx) => ctx.canvas.id == entry.target.id)

    // Modify the viewport if it is gl context
    if(ctx.hasOwnProperty("viewport"))
        ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height)
}

// Automatically resizes the given canvas to match the on screen dimensions
// Note: this prevents stretching in the canvas contents
export const autoresizeCanvas = (canvasElement, context) => {
    // Store the canvas context
    contexts = [...contexts, context]

    // Perform an initial resize of the canvas element
    resizeCanvasToDisplaySize(canvasElement, canvasElement.clientWidth, canvasElement.clientHeight)

    // Watch for changes in the canvas
    defaultCanvasObserver.observe(canvasElement, {box: "content-box"})
}

// Source: https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
const resizeCanvasToDisplaySize = (canvasElement, displayWidth, displayHeight) => {
    // Check if the canvas has changed size
    const needResize = canvasElement.width != displayWidth || canvasElement.height != displayHeight;

    // Resize the canvas dimensions to match the dimensions of the element
    if (needResize) {
        canvasElement.width = displayWidth;
        canvasElement.height = displayHeight;
    }
}