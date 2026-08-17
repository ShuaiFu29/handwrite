// setTimeout 实现 setInterval
function mySetInterval(fn, delay, ...args) {
  let timerId = null
  let stop = false

  const loop = () => {
    if (stop) return
    fn(...args)
    timerId = setTimeout(loop, delay)
  }

  timerId = setTimeout(loop, delay)

  // 返回清除函数
  return () => {
    stop = true
    clearTimeout(timerId)
  }
}

// setInterval 实现 setTimeout
function mySetTimeout(fn, delay, ...args) {
  let timerId = setInterval(() => {
    fn(...args)
    clearInterval(timerId)
  }, delay)
  return timerId
}

// 测试
let count = 0
const cancel = mySetInterval(() => {
  console.log('tick', ++count)
  if (count >= 3) cancel()
}, 500)