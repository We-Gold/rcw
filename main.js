import * as rcw from "./lib/main"

const demo2dConfig = {
	id: "demo2d", 
	mode: rcw.CanvasMode.default, 
}

const c = rcw.initCanvas(demo2dConfig)

const CLEAR_COLOR = new rcw.Color(0,0,0,1)

let x = 40

rcw.runLoop(() => {
	c.clear(CLEAR_COLOR)

	c.rect(c.width()/2 - 20, c.height()/2 - 20, 40, 40, new rcw.Color(150, 150, 0, 1))
	c.rect_lines(c.width()/3 - 20, c.height()/3 - 20, 40, 40, 2, new rcw.Color(150, 150, 0, 1))

	c.circle(c.width()/4, c.height()/2, 40, new rcw.Color(150, 150, 0, 1))
	
	c.ellipse(x, 40, 40, 50, 0, 0, Math.PI, new rcw.Color(150, 150, 0, 1))

	c.line(c.width()/2, c.height()/2, c.width()/4, c.height()/2, 2, new rcw.Color(255, 255, 255, 1))

	if (rcw.is_key_down("ArrowRight")) x += 1
})