function forOf(obj, callback) {
  if (!obj[Symbol.iterator]) {
    throw new TypeError(obj + "is not iterable")
  }
  let iterator = obj[Symbol.iterator]()
  let res = iterator.next()
  while (!res.done) {
    callback(res.value)
    res = iterator.next()
  }
}

Array.prototype.myFilter = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    // 核心区别：只有当回调函数返回 true 时，才放入新数组
    // callback 返回真值 -> 留下；返回假值 -> 丢弃
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};


Array.prototype.myMap = function (callback) {
  // 1. 创建一个空数组，用来存放结果
  const result = [];

  // 2. 使用普通的 for 循环遍历当前数组
  // 这里的 this 指的就是调用该方法的数组（例如 ）
  for (let i = 0; i < this.length; i++) {

    // 3. 执行回调函数，拿到返回值
    // 依次传入：当前元素、索引、原数组
    const newValue = callback(this[i], i, this);

    // 4. 将返回值 push 到新数组中
    result.push(newValue);
  }

  // 5. 返回这个新数组
  return result;
};


Array.prototype.myReduce = function (callback, initalVal) {
  if (this.length === 0 && initalVal === undefined) {
    throw new TypeError("Reduce of empty Array with no inital value")
  }
  let result = initalVal ? initalVal : this[0]
  let start = initalVal ? 0 : 1
  for (let i = start; i < this.length; i++) {
    result = callback(result, this[i], i, this)
  }
  return result
}


const sum1 = [1, 2, 3].myReduce((acc, cur) => acc + cur, 0);
console.log(sum1); // 输出: 6
