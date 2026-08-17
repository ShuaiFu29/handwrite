function splitLucky(totalCount, n) {
  if (n <= 0 || totalCount < n) throw new Error('非法参数')
  let res = []
  let remain = totalCount
  let remainN = n
  for (let i = 0; i < n - 1; i++) {
    let max = Math.floor((remain / remainN) * 2) - 1
    let cur = Math.max(1, Math.floor(Math.random() * max) + 1)
    res.push(cur)
    remain -= cur
    remainN--
  }
  res.push(remain)
  return res
}

