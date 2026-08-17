const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

let running = true

function trafficLight() {

  if (!running) return

  const light = (color, ms) => {
    return function () {
      if (!running) return
      console.log(color)
      return sleep(ms)
    }
  }

  Promise.resolve()
    .then(light('红灯', 3000))
    .then(light('绿灯', 2000))
    .then(light('黄灯', 1000))
    .then(() => {
      if (running) {
        trafficLight()
      }
    })
}

trafficLight()


setTimeout(() => {
  running = false
}, 10000)