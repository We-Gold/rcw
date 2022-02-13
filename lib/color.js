// Create a class to represent an arbitrary color
export class Color {
	constructor(r, g, b, a) {
		this.r = r
		this.g = g
		this.b = b
		this.a = a

		// Scale the numbers from 0-255 to 0-1
		this.gl = {
			r: r / 255,
			g: g / 255,
			b: b / 255,
			a: a
		}
	}
}
