function leftTree(root) {
  const result = [];
  // 边界情况：如果树为空，直接返回空数组
  if (!root) return result
  // 创建一个队列，用于广度优先搜索（BFS）
  const queue = [root];
  // 当队列不为空时，持续遍历
  while (queue.length > 0) {
    // 获取当前层级的节点数量
    const levelSize = queue.length;
    // 遍历当前层级的所有节点
    for (let i = 0; i < levelSize; i++) {
      // 从队列头部取出一个节点
      const node = queue.shift();
      // 如果是当前层级的第一个节点（i === 0），
      // 那么它就是这一层最左侧的节点，将其值加入结果数组
      if (i === 0) {
        result.push(node.val);
      }
      // 将当前节点的所有子节点加入队列，
      // 这些子节点将在下一轮循环中被处理（即下一层级）
      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          queue.push(child);
        }
      }
    }
  }
  return result;
}

// 示例用法（根据题目图片中的树结构）
const tree = {
  val: 1,
  children: [
    {
      val: 2,
      children: [
        { val: 5, children: [{ val: 9, children: [{ val: 11, children: [] }] }] },
        { val: 6, children: [{ val: 10, children: [] }] }
      ]
    },
    { val: 3, children: [{ val: 7, children: [] }] },
    { val: 4, children: [{ val: 8, children: [] }] }
  ]
};

console.log(leftTree(tree)); // 输出: [1, 2, 5, 9, 11]