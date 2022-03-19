
export default {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },

  getItem: (key) => JSON.parse(localStorage.getItem(key)),

  removeItem: (key) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    localStorage.clear()
  },

  isSupported: () => {
    let supported = true

    if (!this.storage) {
      supported = false
    }

    return supported
  },
}
