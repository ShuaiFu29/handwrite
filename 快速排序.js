/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  if (nums.length < 2) return nums
  return quickSort(nums, 0, nums.length - 1)
};

function quickSort(nums, left, right) {
  if (left >= right) return
  let [leftIndex, rightIndex] = partition(nums, left, right)
  quickSort(nums, left, leftIndex - 1)
  quickSort(nums, rightIndex, right)
  return nums
}

function partition(nums, leftIndex, rightIndex) {
  let cur = nums[getRandomIndex(leftIndex, rightIndex)]
  let index = leftIndex
  while (index <= rightIndex) {
    if (nums[index] < cur) {
      [nums[leftIndex], nums[index]] = [nums[index], nums[leftIndex]]
      leftIndex++
      index++
      continue
    }
    if (nums[index] === cur) {
      index++
      continue
    }
    if (nums[index] > cur) {
      [nums[rightIndex], nums[index]] = [nums[index], nums[rightIndex]]
      rightIndex--
    }
  }
  return [leftIndex, rightIndex]
}

function getRandomIndex(left, right) {
  return Math.floor(Math.random() * (right - left + 1)) + left
}