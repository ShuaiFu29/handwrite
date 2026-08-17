// 循环版（不用正则）
function formatNumber(num) {
  let [int, dec] = String(num).split('.')
  const isNegative = int[0] === '-'
  if (isNegative) int = int.slice(1)

  let res = ''
  const len = int.length
  for (let i = len - 1; i >= 0; i--) {
    const rightPos = len - i - 1
    if (rightPos !== 0 && rightPos % 3 === 0) {
      res = ',' + res
    }
    res = int[i] + res
  }

  return (isNegative ? '-' : '') + res + (dec ? '.' + dec : '')
}

// toLocaleString 版（简洁）
function formatNumberLocale(num) {
  return num.toLocaleString('en-US')
}

// 测试
console.log(formatNumber(1234567))       // 1,234,567
console.log(formatNumber(-1234567.89))   // -1,234,567.89


