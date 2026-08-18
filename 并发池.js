function concurrentScheduler(requests, max) {
  let i = 0;

  const runNext = () => {
    if (i >= requests.length) return Promise.resolve();

    const request = requests[i++];

    return Promise.resolve()
      .then(() => request())
      .finally(() => {
        runNext();
      });
  };

  const tasks = [];

  const startCount = Math.min(max, requests.length);

  for (let j = 0; j < startCount; j++) {
    tasks.push(runNext());
  }

  return Promise.all(tasks);
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