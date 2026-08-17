function insertSort(arr) {
  let sortedArr = [...arr]
  let n = sortedArr.length
  for (let i = 1; i < n; i++) {
    let current = sortedArr[i]
    let j = i - 1
    while (j >= 0 && sortedArr[j] > current) {
      sortedArr[j + 1] = sortedArr[j]
      j--
    }
    sortedArr[j + 1] = current
  }
  return sortedArr
}

// 代码正确