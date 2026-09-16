function concurrentScheduler(requests, limit) {
  let i = 0
  let runNext = () => {
    if (i >= requests.length) {
      return Promise.resolve()
    }
    let request = requests[i++]
    return Promise.resolve()
      .then(() => {
        return request()
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        return runNext()
      })
  }
  let tasks = []
  let count = Math.min(requests.length, limit)
  for (let j = 0; j < count; j++) {
    tasks.push(runNext())
  }
  return Promise.all(tasks)
}

// 模拟请求
const requests = Array.from({ length: 10 }, (_, i) => {
  return () => {
    console.log(`任务 ${i + 1} 开始`);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`任务 ${i + 1} 完成`);
        resolve();
      }, 1000);
    });
  };
});

concurrentScheduler(requests, 3);