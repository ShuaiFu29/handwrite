let url = 'www.baidu.com?a=1&b=2&c=3'

function solve(url) {
  let ans = {}
  let startIndex = url.indexOf('?') + 1
  let arr = url.slice(startIndex).split('&')
  for (let item of arr) {
    let [key, value] = item.split('=')
    ans[key] = value
  }
  return ans
}

console.log(solve(url))