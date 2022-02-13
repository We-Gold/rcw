// See: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
export const Font = (cssFont, fontSize, alignment = "center", baseline = "alphabetic") => ({
    cssFont,
    fontSize,
    alignment,
    baseline
})