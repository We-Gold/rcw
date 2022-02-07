export const generateShapeMethods = (ctx) => {
    // Get the current dimensions of the canvas
    const width = () => ctx.canvas.width
    const height = () => ctx.canvas.height

    const fill = (color) => {
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`
        ctx.fill()
    }

    const stroke = (color, thickness=1) => {
        ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`
        ctx.lineWidth = thickness
        ctx.stroke()
    }

    const clear = (color) => {
        rect(0, 0, width(), height(), color)
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

    return {clear, width, height, rect, rect_lines}
}