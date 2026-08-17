const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lines = [];

rl.on('line', function (line) {
  lines.push(line.trim());

  // 【改动点1】：根据题目要求，判断攒够几行数据开始计算（比如有的题是1行，有的是2行）
  if (lines.length === 2) {
    // 【改动点2】：根据题目输入格式，修改这里的解析逻辑（比如分隔符是空格还是逗号）
    const nums = lines[0].split(',').map(Number);
    const target = parseInt(lines[1]);

    // 调用你写的核心算法（这部分和力扣里写的一模一样，不需要重新学）
    const result = yourAlgorithm(nums, target);

    // 打印结果
    console.log(result);

    // 清空，准备下一组测试用例
    lines = [];
  }
});

// 你的核心算法逻辑（和力扣里写的一模一样）
function yourAlgorithm(nums, target) {
  // 在这里写你的算法...
  return nums + target;
}