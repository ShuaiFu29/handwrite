function splitStr(str) {
  let string = str.split('-')
  let ans = string.map((item, index) => {
    if (!item) return
    if (index === 0) {
      return item
    } else {
      return item.at(0).toUpperCase() + item.slice(1)
    }
  }).join('')
  return ans
}

console.log(splitStr('get-element-by-id'))