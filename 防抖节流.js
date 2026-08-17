function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


function throttle(fn, interval) {
  let timer = null;
  return function (...args) {
    // 如果定时器存在，说明还在冷却期，直接返回
    if (timer) return;

    // 立即执行函数
    fn.apply(this, args);

    // 设置一个定时器，作为冷却时间
    timer = setTimeout(() => {
      timer = null; // 冷却结束，开锁
    }, interval);
  };
}

function throttle2(fn, interval) {
  let lastTime = 0; // 记录上一次执行的时间戳
  return function (...args) {
    const now = Date.now(); // 获取当前时间戳
    // 如果当前时间与上次执行时间的间隔大于等于设定的间隔，则执行
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now; // 更新上次执行的时间
    }
  };
}