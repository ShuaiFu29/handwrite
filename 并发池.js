/**
 * 并发调度器
 * @param {Array} requests - 请求函数数组，每个函数返回一个 Promise
 * @param {number} max - 最大并发数
 */
function concurrentScheduler(requests, max) {
  let i = 0; // 当前遍历到的任务下标

  // 执行下一个任务的函数
  const runNext = () => {
    // 如果所有任务都派发完了，直接结束
    if (i >= requests.length) return;

    // 取出当前要执行的任务
    const request = requests[i];
    i++; // 移动下标，准备下一个

    // 执行请求，并在完成后（无论成功或失败）继续调度下一个
    request().finally(() => {
      runNext();
    });
  };

  // 初始时，直接启动 max 个并发任务
  // 比如 max=5，就会先一口气启动 5 个请求
  const startCount = Math.min(max, requests.length);
  for (let j = 0; j < startCount; j++) {
    runNext();
  }
}

// ================= 测试代码 =================
// 模拟 10 个异步请求任务
const mockRequests = Array.from({ length: 10 }, (_, index) => {
  return () => {
    return new Promise((resolve) => {
      const time = Math.random() * 2000; // 随机模拟网络延迟
      console.log(`🚀 任务 ${index + 1} 开始执行，预计耗时 ${time.toFixed(0)}ms`);
      setTimeout(() => {
        console.log(`✅ 任务 ${index + 1} 执行完毕`);
        resolve(index + 1);
      }, time);
    });
  };
});

// 启动调度器，限制最多 5 个并发
console.log('开始调度...');
concurrentScheduler(mockRequests, 5);