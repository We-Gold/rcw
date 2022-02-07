import * as rcw from "./lib/main"

const demo2dConfig = {
	id: "demo2d", 
	mode: rcw.CanvasMode.default, 
}

const c = rcw.initCanvas(demo2dConfig)

const CLEAR_COLOR = new rcw.Color(0,0,0,1)

rcw.runLoop(() => {
	c.clear(CLEAR_COLOR)
	c.rect(c.width()/2 - 20, c.height()/2 - 20, 40, 40, new rcw.Color(150, 150, 0, 1))
})