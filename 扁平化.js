function flat1(arr) {
  let res = []
  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(flat(item))
    } else {
      res.push(item)
    }
  }
  return res
}
// 代码正确

function flat2(arr) {
  let stack = [...arr]
  let res = []
  while (stack.length) {
    let next = stack.pop()
    if (Array.isArray(next)) {
      stack.push(...next)
    } else {
      res.unshift(next)
    }
  }
  return res
}


function flatten(arr, depth = Infinity) {
  let res = []
  for (let item of arr) {
    if (Array.isArray(item) && depth > 0) {
      res = res.concat(flatten(item, depth - 1))
    } else {
      res.push(item)
    }
  }
  return res
}

