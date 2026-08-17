function sortVersions(versions) {
  return versions.sort((a, b) => {
    // 1. 分割字符串为数组
    const partsA = a.split('.');
    const partsB = b.split('.');

    // 2. 获取最大长度，用于逐位比较
    const maxLen = Math.max(partsA.length, partsB.length);

    // 3. 逐位比较
    for (let i = 0; i < maxLen; i++) {
      // 核心技巧：如果某一位不存在，就当做 0 处理
      // 使用一元加号 (+) 快速将字符串转为数字，自动去除前导零
      const numA = +(partsA[i] || 0);
      const numB = +(partsB[i] || 0);

      if (numA > numB) return 1;   // a 更大，排在后面
      if (numA < numB) return -1;  // b 更大，排在前面
    }

    return 0; // 所有位都相等
  });
}

// 使用示例
const versions = ['1.10.2', '1.2.0', '2.3.4', '1.0.0', '1.5'];
console.log(sortVersions(versions));
// 输出: [ '1.0.0', '1.2.0', '1.5', '1.10.2', '2.3.4' ]