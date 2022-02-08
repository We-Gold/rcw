export const styleCanvas = (canvasElement) => {
    // Style the canvas generically
    styleElement(canvasElement)

    // Prevent mouse scrolling
    canvasElement.style.touchAction = "none"
}

export const stylePage = () => {
    styleElement(document.documentElement)
    styleElement(document.body)
}

const styleElement = (element) => {
    element.style.width = "100%"
    element.style.height = "100%"
    element.style.margin = "0"
    element.style.padding = "0"
    element.style.overflow = "hidden"
}