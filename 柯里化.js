// 简单版柯里化
function curry(fn) {
  return function curried(...args) {
    // 参数够了，直接执行
    if (args.length >= fn.length) {
      return fn(...args)
    }

    // 参数不够，继续收集
    return function (...nextArgs) {
      return curried(...args, ...nextArgs)
    }
  }
}