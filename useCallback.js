function myUseCallback(fn, dep) {
  return useMemo(() => fn(), dep)
}