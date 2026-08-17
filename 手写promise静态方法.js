// ---------- 1. Promise.all ----------
// 全部成功才resolve，有一个失败就reject
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new TypeError('参数必须是数组'));
    const results = [];
    let count = 0;
    if (promises.length === 0) return resolve([]);

    promises.forEach((p, index) => {
      Promise.resolve(p).then((val) => {
        results[index] = val;
        count++;
        if (count === promises.length) resolve(results);
      }).catch(reject);
    });
  });
};


// ---------- 2. Promise.allSettled ----------
// 全部结束（无论成功失败），返回每个结果的状态
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    if (!Array.isArray(promises)) return resolve([]);
    if (promises.length === 0) return resolve([]);
    const results = [];
    let count = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((val) => {
          results[index] = { status: 'fulfilled', value: val };
        })
        .catch((err) => {
          results[index] = { status: 'rejected', reason: err };
        })
        .finally(() => {
          count++;
          if (count === promises.length) resolve(results);
        });
    });
  });
};


// ---------- 3. Promise.race ----------
// 第一个完成（无论成功失败）就返回
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new TypeError('参数必须是数组'));
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
  });
};


// ---------- 4. Promise.any ----------
// 第一个成功就resolve，全部失败才reject（AggregateError）
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return reject(new TypeError('参数必须是数组'));
    if (promises.length === 0) return reject(new AggregateError([], 'All promises were rejected'));
    const errors = [];
    let count = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[index] = err;
          count++;
          if (count === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
};


// ---------- 5. Promise.resolve ----------
Promise.myResolve = function (val) {
  // 如果是 Promise 实例，直接返回
  if (val instanceof Promise) return val;
  return new Promise((resolve) => resolve(val));
};


// ---------- 6. Promise.reject ----------
Promise.myReject = function (reason) {
  return new Promise((_, reject) => reject(reason));
};


// ========================================
// 使用示例
// ========================================

// Promise.all 示例
Promise.myAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then(console.log); // [1, 2, 3]

// Promise.allSettled 示例
Promise.myAllSettled([
  Promise.resolve('ok'),
  Promise.reject('fail'),
]).then(console.log);
// [{ status: 'fulfilled', value: 'ok' }, { status: 'rejected', reason: 'fail' }]

// Promise.race 示例
Promise.myRace([
  new Promise((res) => setTimeout(() => res('慢'), 200)),
  new Promise((res) => setTimeout(() => res('快'), 100)),
]).then(console.log); // '快'

// Promise.any 示例
Promise.myAny([
  Promise.reject('err1'),
  Promise.resolve('第一个成功'),
  Promise.resolve('第二个成功'),
]).then(console.log); // '第一个成功'