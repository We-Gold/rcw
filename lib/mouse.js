export const map = (num, min1, max1, min2, max2) => {
    return min2 + (num - min1) * (max2 - min2) / (max1 - min1)
}

export const generateMouseMethods = (canvas, width, height) => {
    // Store the state of the mouse on the canvas
    const mouseState = {
        mouse_x: 0,
        mouse_y: 0,
        relative_x: 0,
        relative_y: 0,
        mousePressed: false,
        touches: [],
    } 

    const update_mouse_position = (e) => {
        const x = e.clientX
        const y = e.clientY

        mouseState.mouse_x = x
        mouseState.mouse_y = y

        // Convert the x and y to values from -1 to 1
        mouseState.relative_x = map(x, 0, width(), -1, 1)
        mouseState.relative_y = map(y, 0, height(), 1, -1)
    }

    canvas.addEventListener("mousedown", update_mouse_position) 
    canvas.addEventListener("mousemove", update_mouse_position) 
    canvas.addEventListener("mouseup", update_mouse_position)
    
    const get_mouse = () => ({
        mouse_x: mouseState.mouse_x,
        mouse_y: mouseState.mouse_y,
    })

    const get_mouse_relative = () => ({
        relative_x: mouseState.relative_x,
        relative_y: mouseState.relative_y,
    })
    
    const is_mouse_pressed = () => mouseState.mousePressed
    
    const get_touches = () => touches

    return { get_mouse, get_mouse_relative, is_mouse_pressed, get_touches }
}

