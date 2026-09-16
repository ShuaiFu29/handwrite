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
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        return runNext()
      })
  }
  let count = Math.min(requests.length, limit)
  let tasks = []
  for (let j = 0; j < count; j++) {
    tasks.push(runNext())
  }
  return Promise.all(tasks)
}