function arrayToTree(list, rootId = null) {
  const map = {}
  const tree = []
  list.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })
  list.forEach(item => {
    const node = map[item.id]
    const parentId = item.parentId
    if (parentId === rootId || parentId === null || parentId === undefined) {
      tree.push(node)
    } else {
      if (map[parentId]) {
        map[parentId].children.push(node)
      }
    }
  })
  return tree
}