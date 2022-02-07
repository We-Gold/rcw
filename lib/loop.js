// Runs an animation loop
export const runLoop = (callback) => {
	// Create a variable to track the id of the lastest animation frame request
	let animationFrameRequestId

	// Store the previous timestamp of the loop
	let previousTimestamp

	const calculateDeltaT = (timestamp) => {
		// Store the first timestamp
		if (previousTimestamp === undefined) {
			previousTimestamp = timestamp
		}

		// Calculate the time delta since the previous frame (seconds)
		const deltaT = (timestamp - previousTimestamp) / 1000

		// Update the previous timestamp to be the current one
		previousTimestamp = timestamp

		return deltaT
	}

	const loop = (timestamp) => {
		const deltaT = calculateDeltaT(timestamp)

		// Call the callback,
		// and provide it the time elapsed since the previous frame (sec)
		callback(deltaT)

		// Request another frame for the loop
		animationFrameRequestId = requestAnimationFrame(loop)
	}

	// Begin the animation loop
	animationFrameRequestId = requestAnimationFrame(loop)

	// Create methods to enable control of the loop
	const stopLoop = () => cancelAnimationFrame(animationFrameRequestId)
	const resumeLoop = () => {
		animationFrameRequestId = requestAnimationFrame(loop)
	}

	return { stopLoop, resumeLoop }
}
