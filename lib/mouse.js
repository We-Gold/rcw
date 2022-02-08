export const map = (num, min1, max1, min2, max2) => {
    return min2 + (num - min1) * (max2 - min2) / (max1 - min1)
}

export const generateMouseMethods = (canvas, width, height, canvas_x, canvas_y) => {
    // Store the state of the mouse on the canvas
    const mouseState = {
        mouse_x: 0,
        mouse_y: 0,
        relative_x: 0,
        relative_y: 0,
        mousePressed: false,
        touches: [],
    } 

    const update_cursor_position = (x, y) => {
        mouseState.mouse_x = x
        mouseState.mouse_y = y

        // Convert the x and y to values from -1 to 1
        mouseState.relative_x = map(x, 0, width(), -1, 1)
        mouseState.relative_y = map(y, 0, height(), 1, -1)
    }

    const update_mouse_position = (e) => {
        const x = e.clientX
        const y = e.clientY

        update_cursor_position(x, y)
    }

    canvas.addEventListener("mousedown", update_mouse_position) 
    canvas.addEventListener("mousemove", update_mouse_position) 
    canvas.addEventListener("mouseup", update_mouse_position)

    const decode_touch = (touch) => {
        return { 
            id: touch.identifier,
            x: touch.clientX - canvas_x(),
            y: touch.clientY - canvas_y(),
        }
    }

    const update_touch_position = (e) => {
        // Prevent a mouse event from being activated
        e.preventDefault()

        // Update the internal touches list 
        mouseState.touches = []

        // Add all of the touches to the list
        for (let i = 0; i < e.touches.length; i++) {
            mouseState.touches.push(decode_touch(e.touches[i]))
        }

        // Avoid updating the mouse position if there are no touches
        if (mouseState.touches.length == 0) return

        const x = mouseState.touches[0].x
        const y = mouseState.touches[0].y

        update_cursor_position(x, y)
    }

    canvas.addEventListener("touchstart", update_touch_position) 
    canvas.addEventListener("touchmove", update_touch_position) 
    canvas.addEventListener("touchend", update_touch_position)
    canvas.addEventListener("touchcancel", update_touch_position)
    
    const get_mouse = () => ({
        mouse_x: mouseState.mouse_x,
        mouse_y: mouseState.mouse_y,
    })

    const get_mouse_relative = () => ({
        relative_x: mouseState.relative_x,
        relative_y: mouseState.relative_y,
    })
    
    const is_mouse_pressed = () => mouseState.mousePressed
    
    const get_touches = () => mouseState.touches

    return { get_mouse, get_mouse_relative, is_mouse_pressed, get_touches }
}

