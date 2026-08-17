class Scheduler {
  constructor() {
    this.queue = []; // 任务等待队列
    this.maxCount = 2; // 最大并发限制
    this.runCount = 0; // 当前正在执行的任务数
  }

  add(promiseGenerator) {
    // 返回一个新的 Promise，这样外部可以使用 .then()
    return new Promise((resolve) => {
      // 将任务逻辑包装后存入队列
      this.queue.push(() => promiseGenerator().then(resolve));
      // 尝试执行任务
      this.requestNext();
    });
  }

  requestNext() {
    // 如果队列中有任务，且当前运行任务数小于限制，则启动新任务
    if (this.queue.length > 0 && this.runCount < this.maxCount) {
      this.runCount++;
      const task = this.queue.shift(); // 取出队列首部任务

      task().then(() => {
        this.runCount--; // 任务完成后，释放名额
        this.requestNext(); // 递归调用，尝试启动下一个排队任务
      });
    }
  }
}

// --- 测试代码 ---
const timeout = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// 预期输出: 2 3 1 4



// 这是一个非常经典的 JavaScript 编程面试题。其核心考察点在于并发控制（Concurrency Control）：如何利用 Promise 和队列机制，限制同时进行的异步任务数量。
// 以下是完整的代码实现及详细思路：
// 代码实现
// class Scheduler {
//   constructor() {
//     this.queue = []; // 任务等待队列
//     this.maxCount = 2; // 最大并发限制
//     this.runCount = 0; // 当前正在执行的任务数
//   }

//   add(promiseGenerator) {
//     // 返回一个新的 Promise，这样外部可以使用 .then()
//     return new Promise((resolve) => {
//       // 将任务逻辑包装后存入队列
//       this.queue.push(() => promiseGenerator().then(resolve));
//       // 尝试执行任务
//       this.requestNext();
//     });
//   }

//   requestNext() {
//     // 如果队列中有任务，且当前运行任务数小于限制，则启动新任务
//     if (this.queue.length > 0 && this.runCount < this.maxCount) {
//       this.runCount++;
//       const task = this.queue.shift(); // 取出队列首部任务

//       task().then(() => {
//         this.runCount--; // 任务完成后，释放名额
//         this.requestNext(); // 递归调用，尝试启动下一个排队任务
//       });
//     }
//   }
// }

// // --- 测试代码 ---
// const timeout = (time) => new Promise((resolve) => {
//   setTimeout(resolve, time);
// });

// const scheduler = new Scheduler();

// const addTask = (time, order) => {
//   scheduler
//     .add(() => timeout(time))
//     .then(() => console.log(order));
// };

// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");

// // 预期输出: 2 3 1 4

// 思路解析
//   * 构造函数(constructor):
//    * 我们需要一个数组 queue 来存储因为并发限制而暂时不能执行的任务。
//    * runCount 记录当前活跃的 Promise 数量。
//  * add 方法:
//    * 该方法必须返回一个 Promise。这样当内部任务最终完成并调用 resolve 时，外部的.then(order) 才会触发。
//    * 我们将 promiseGenerator 包装成一个函数存入队列。注意：存入的是函数而不是 Promise 实例，因为 Promise 一旦创建就会立即执行，而我们需要的是“延迟执行”。
//  * 核心调度逻辑(requestNext):
//    * 这是整个类的“发动机”。它检查当前是否有空闲槽位(runCount < 2)。
//    * 当一个任务执行完毕（.then() 触发），我们将 runCount 减 1，并再次调用 requestNext。这种递归触发机制保证了只要队列里有任务，执行器就会一直运转。
// 执行流程拆解（以本题为例）
//  * 0ms: 任务 1 和 2 进队并立即开始执行。runCount = 2。
//  * 500ms: 任务 2 完成，输出 "2"。runCount 变 1，触发 requestNext，任务 3 开始执行。
//  * 800ms: 任务 3 完成（500ms + 300ms），输出 "3"。runCount 变 1，触发 requestNext，任务 4 开始执行。
//  * 1000ms: 任务 1 完成，输出 "1"。runCount 变 1。
//  * 1200ms: 任务 4 完成（800ms + 400ms），输出 "4"。
// 这个实现优雅地处理了异步流的顺序和并发压力。你是否需要我进一步解释如何将这个类扩展为支持 async / await 语法的版本？
