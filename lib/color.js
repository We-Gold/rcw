// Create a class to represent an arbitrary color
export const Color = (r, g, b, a) => ({
	r,
	g,
	b,
	a,
	gl: {
		r: r / 255,
		g: g / 255,
		b: b / 255,
		a: a,
	}
})
