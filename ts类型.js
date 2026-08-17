// JS 实现
function pick(obj, keys) {
  const keySet = new Set(Array.isArray(keys) ? keys : [keys])
  return Object.keys(obj).reduce((result, key) => {
    if (keySet.has(key)) result[key] = obj[key]
    return result
  }, {})
}

function omit(obj, keys) {
  const keySet = new Set(Array.isArray(keys) ? keys : [keys])
  return Object.keys(obj).reduce((result, key) => {
    if (!keySet.has(key)) result[key] = obj[key]
    return result
  }, {})
}

// 测试
const user = { id: 1, name: '张三', email: 'test@test.com', password: '123' }
console.log(pick(user, ['id', 'name']))     // { id: 1, name: '张三' }
console.log(omit(user, ['password']))       // { id: 1, name: '张三', email: 'test@test.com' }


