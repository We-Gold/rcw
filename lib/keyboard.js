let keysHistory = []
let keysState = {}

const QUEUE_LENGTH = 2

const pushToHistory = (value) => {
    // Add the value to the list
    keysHistory = [...keysHistory, value]

    // Delete the first element from the list
    if (keysHistory.length > QUEUE_LENGTH) keysHistory.splice(0, 1)
}

const setKeyState = (code, state) => {
    keysState[code] = state
}

// Track the state of the keyboard
window.addEventListener("keydown", (e) => {
    setKeyState(e.code, true)
    pushToHistory(keysState)
})
window.addEventListener("keyup", (e) => {
    setKeyState(e.code, false)
    pushToHistory(keysState)
})

// See here for a full list: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
export const is_key_down = (code) => keysState[code] === true
export const is_key_up = (code) => keysState[code] === false

// Checks if the given key was pressed and then released
export const is_key_pressed = (code) => {
    return keysHistory[0][code] === true && keysHistory[1][code] === false
}