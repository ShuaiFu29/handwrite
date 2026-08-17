function deepClone(source, hash = new WeakMap()) {
  if (typeof source !== 'object' || source === null) return source;

  if (hash.has(source)) return hash.get(source);

  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source.source, source.flags);
  if (source instanceof Map) {
    const cloned = new Map();
    hash.set(source, cloned);
    source.forEach((value, key) => {
      cloned.set(deepClone(key, hash), deepClone(value, hash));
    });
    return cloned;
  }
  if (source instanceof Set) {
    const cloned = new Set();
    hash.set(source, cloned);
    source.forEach(value => cloned.add(deepClone(value, hash)));
    return cloned;
  }

  const cloned = Array.isArray(source) ? [] : {};
  hash.set(source, cloned);

  for (let key of Object.keys(source)) {
    cloned[key] = deepClone(source[key], hash)
  }

  return cloned;
}