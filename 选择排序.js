function selectSort(arr) {
  const sortedArr = [...arr]
  const n = sortedArr.length
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (sortedArr[j] < sortedArr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]]
    }
  }
  return sortedArr
}