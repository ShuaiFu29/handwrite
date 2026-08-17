class EventTarget {
  constructor() {
    this.events = {};
  }

  addEventListener(type, callback, options = {}) {
    if (typeof callback !== "function") return;

    if (!this.events[type]) {
      this.events[type] = [];
    }

    this.events[type].push({
      callback,
      once: options.once
    });
  }

  removeEventListener(type, callback) {
    const listeners = this.events[type];
    if (!listeners) return;

    this.events[type] = listeners.filter(
      listener => listener.callback !== callback
    );
  }

  dispatchEvent(type, data = {}) {
    const listeners = this.events[type];
    if (!listeners) return;

    const event = {
      type,
      target: this,
      currentTarget: this,
      ...data
    };

    this.events[type] = listeners.filter(listener => {
      listener.callback.call(this, event);
      return !listener.once;
    });
  }
}