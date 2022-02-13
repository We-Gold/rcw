// Some information from https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

const createShader = (gl, type, source) => {
	const shader = gl.createShader(type)

	gl.shaderSource(shader, source)
	gl.compileShader(shader)

	// Return the created shader
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
	else {
		// Error loading the shader
		console.error(gl.getShaderInfoLog(shader))
		gl.deleteShader(shader)
	}
}

const createProgram = (gl, vertexShader, fragmentShader) => {
	const program = gl.createProgram()

	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)

	// Return the created program
	if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program
	else {
		// Error loading the shader
		console.error(gl.getProgramInfoLog(program))
		gl.deleteProgram(program)
	}
}

const pointVertexShader = `
// Receive a position from the buffer
attribute vec2 position;
uniform vec2 resolution;

void main() {
    // Convert the position to a range of 0 to 1
    vec2 zeroToOne = position.xy / resolution;

    // Convert from 0 to 1 to 0 to 2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0 to 2 to -1 to +1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;

    // Return the given vertex
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`

const pointFragmentShader = `
// Receive a color from the buffer
precision mediump float;
uniform vec4 color;

void main() {
    // Return the given color
    gl_FragColor = color;
}
`

export const DrawModes = {
	"points": 0,
	"lines": 1,
	"lineStrip": 2,
	"lineLoop": 3,
	"triangles": 4,
	"triangleStrip": 5,
	"triangleFan": 6,
}

// Store the program for drawing with shapes
let pointProgram

export const initPointProgram = (gl) => {
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, pointVertexShader)
	const fragmentShader = createShader(
		gl,
		gl.FRAGMENT_SHADER,
		pointFragmentShader
	)

	pointProgram = createProgram(gl, vertexShader, fragmentShader)
}

export const usePointProgram = (gl, points, color, mode) => {
	const positionAttributeLocation = gl.getAttribLocation(
		pointProgram,
		"position"
	)    
	const positionBuffer = gl.createBuffer()

	// Configure the input points
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
	gl.useProgram(pointProgram)
	gl.enableVertexAttribArray(positionAttributeLocation)

    // Specify the resolution of the canvas
    const resolutionUniformLocation = gl.getUniformLocation(pointProgram, "resolution")
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

    // Specify the color to the fragment shader
	const colorUniformLocation = gl.getUniformLocation(pointProgram, "color")
	gl.uniform4fv(colorUniformLocation, [color.gl.r, color.gl.g, color.gl.b, color.gl.a])

	const size = 2 // Ex. a point has x and y, so it has two floats
	const type = gl.FLOAT
	const normalize = false
	const stride = 0
	const offset = 0
	gl.vertexAttribPointer(
		positionAttributeLocation,
		size,
		type,
		normalize,
		stride,
		offset
	)

	// Draw using the shader
	const primitiveType = mode
	const _offset = 0
	const count = points.length / size
	gl.drawArrays(primitiveType, _offset, count)
}
