import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // 初始化时，尝试从 localStorage 读取数据，没有则使用默认值
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // 更新状态时，同步更新 React 的 state 和浏览器的 localStorage
  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}