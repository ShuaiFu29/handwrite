function getDayOfYear(date) {
  const target = new Date(date)
  if (isNaN(target.getTime())) {
    throw new Error('Invalid date')
  }
  const year = target.getFullYear()
  const startDay = new Date(year, 0, 1)
  const diffInMs = target - startDay
  const oneDay = 24 * 60 * 60
  const dayOfYear = Math.floor(diffInMs / oneDay) + 1
  return dayOfYear
}