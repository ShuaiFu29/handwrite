import { useState, useEffect, useRef } from 'react';

function useRequest(requestFn, options = {}) {
  const { manual = false, pollingInterval = 0 } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!manual);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const run = async () => {
    // 取消上一次未完成的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await requestFn();
      if (!controller.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      // 只有在未取消时才更新错误
      if (!controller.signal.aborted) {
        setError(err);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
      // 清理当前 controller（避免内存泄漏）
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  useEffect(() => {
    let pollTimer = null;

    const startPolling = () => {
      if (pollingInterval > 0) {
        pollTimer = setInterval(() => {
          run();
        }, pollingInterval);
      }
    };

    // 如果不是手动模式，挂载时自动请求并启动轮询
    if (!manual) {
      run();
      startPolling();
    }

    // 清理函数：清除轮询 + 取消请求
    return () => {
      if (pollTimer) {
        clearInterval(pollTimer);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // 注意：requestFn 应保持引用稳定（建议用 useCallback 包裹）

  return {
    data,
    loading,
    error,
    run,
  };
}

export default useRequest;