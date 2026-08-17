import { useLayoutEffect, useRef } from 'react';

function useUpdateLayoutEffect(effect, dependencies) {
  // 1. 创建一个 ref 来追踪是否为首次渲染
  const isFirstRender = useRef(true);

  // 2. 使用 useLayoutEffect 来注册副作用
  useLayoutEffect(() => {
    // 3. 判断是否为首次渲染
    if (isFirstRender.current) {
      // 首次渲染，将标记设为 false，并且不执行 effect
      isFirstRender.current = false;
      return;
    }

    // 非首次渲染（即更新时），执行用户传入的 effect 函数
    return effect();
  }, dependencies);
}

export default useUpdateLayoutEffect;