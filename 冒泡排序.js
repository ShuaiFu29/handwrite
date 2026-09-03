function bubbleSort(arr) {
  if (arr === null || arr.length <= 1) return arr
  let len = arr.length
  for (let end = len - 1; end > 0; end--) {
    for (let j = 0; j < end; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

console.log(bubbleSort([1, 2, 9, 7, 3, 5]))