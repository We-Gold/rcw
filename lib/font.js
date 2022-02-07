// See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
export class Font {
    constructor(cssFont, fontSize, alignment = "center", baseline = "alphabetic") {
        this.cssFont = cssFont
        this.fontSize = fontSize
        this.alignment = alignment
        this.baseline = baseline
    }
}