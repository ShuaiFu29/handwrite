const data = [
  {
    id: '1',
    num: 1,
    children: [
      { id: '1-1', num: 2 },
      { id: '1-2', num: 5 },
      {
        id: '1-3',
        num: 7,
        children: [
          { id: '1-3-1', num: 4 },
          { id: '1-3-2', num: 3 },
          { id: '1-3-3', num: 6 }
        ]
      }
    ]
  }
]


function calcNum(data) {
  let res = 0
  for (let item of data) {
    res += item.num
    if (item.children && Array.isArray(item.children)) {
      res += calcNum(item.children)
    }
  }
  return res
}

console.log(calcNum(data))