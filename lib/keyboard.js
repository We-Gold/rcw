let keysState = {}

const setKeyState = (code, state) => {
    keysState[code] = state
}

// Track the state of the keyboard
window.addEventListener("keydown", (e) => setKeyState(e.code, true))
window.addEventListener("keyup", (e) => setKeyState(e.code, false))

// See here for a full list: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
export const isKeyDown = (code) => keysState[code] === true
export const isKeyUp = (code) => keysState[code] === false