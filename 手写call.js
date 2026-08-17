Function.prototype.myCall = function (context, ...args) {
  context = context || window
  const fn = Symbol()
  context[fn] = this
  let res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.myApply = function (context, args) {
  context = context || window
  args = args || []
  const fn = Symbol()
  context[fn] = this
  let res = context[fn](...args)
  delete context[fn]
  return res
}

Function.prototype.myBind = function (context, ...args) {
  let fn = this
  return function (...next) {
    if (this instanceof fn) {
      return new fn(...args, ...next)
    }
    return fn.apply(context, [...args, ...next])
  }
}
