import * as rcw from "./lib/main"

const demo2dConfig = {
	id: "demo2d", 
	mode: rcw.CanvasMode.webgl, 
}

const c = rcw.initCanvas(demo2dConfig)

const CLEAR_COLOR = rcw.Color(0,0,0,1)

rcw.runLoop(() => {
	c.clear(CLEAR_COLOR)

	const { mouseX, mouseY } = c.getMouse()

	c.rect(c.width()/2 - 20, c.height()/2 - 20, 40, 40, rcw.Color(150, 150, 0, 1))
	c.rectLines(c.width()/3 - 20, c.height()/3 - 20, 40, 40, 8, rcw.Color(150, 150, 0, 1))

	c.circle(mouseX, mouseY, 40, rcw.Color(150, 150, 0, 1))
	c.circleLines(mouseX, mouseY, 60, 10, rcw.Color(150, 150, 0, 1))
	
	c.line(c.width()/2, c.height()/2, mouseX, mouseY, 2, rcw.Color(255, 255, 255, 1))

	// c.text("Hi", 40, 40, rcw.Font("serif", 20), rcw.Color(255, 255, 255, 1))
})