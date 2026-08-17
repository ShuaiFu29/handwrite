const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.status !== PENDING) return
      this.status = FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach(fn => fn())
    }

    const reject = (reason) => {
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn())
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }

    return new MyPromise((resolve, reject) => {
      const handle = (fn, value) => {
        queueMicrotask(() => {
          try {
            const x = fn(value)
            x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === FULFILLED) handle(onFulfilled, this.value)
      else if (this.status === REJECTED) handle(onRejected, this.reason)
      else {
        this.onFulfilledCallbacks.push(() => handle(onFulfilled, this.value))
        this.onRejectedCallbacks.push(() => handle(onRejected, this.reason))
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    )
  }
}