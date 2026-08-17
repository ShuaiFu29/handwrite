class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback.apply(this, args)
      })
    } else {
      console.warn(`Event ${eventName} has no listeners`)
    }
  }
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
    }
  }
  once(eventName, callback) {
    const onceWrapper = (...args) => {
      callback.apply(this, args)
      this.off(eventName, onceWrapper)
    }
    this.on(eventName, onceWrapper)
  }
}