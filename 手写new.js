function create(obj) {
  function F() { }
  F.prototype = obj
  return new F()
}

function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype) // 更标准

  const res = fn.apply(obj, args)

  return (typeof res === 'object' && res !== null) || typeof res === 'function'
    ? res : obj
}
