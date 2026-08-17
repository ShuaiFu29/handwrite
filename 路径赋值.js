function set(obj, keyPaths, value) {
  const keys = keyPaths.split('.');
  let cur = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    // 最后一层，直接赋值
    if (i === keys.length - 1) {
      cur[key] = value;
      return obj;
    }

    // 如果不存在或者不是对象，就初始化为空对象
    if (!cur[key] || typeof cur[key] !== 'object') {
      cur[key] = {};
    }

    cur = cur[key];
  }

  return obj;
}


const obj = {};

set(obj, 'a.b.c', 100);
console.log(obj.a.b.c); // 100

set(obj, 'd.e', 300);
console.log(obj.d.e); // 300