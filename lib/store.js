export const store = (key, value) => localStorage.setItem(key, value)
export const retrieve = (key) => localStorage.getItem(key)