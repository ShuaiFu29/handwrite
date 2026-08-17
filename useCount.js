function useCount(initVal = 0) {
  let [count, setCount] = useState(initVal)
  let add = (step = 1) => setCount(pre => pre + step)
  let dec = (step = 1) => setCount(pre => pre - step)
  let reset = () => setCount(initVal)
  return {
    count,
    add,
    dec,
    reset
  }
}