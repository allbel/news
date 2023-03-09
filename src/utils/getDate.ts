export const getDate = (unixTime: number) => {
  const date = new Date(unixTime * 1000)
  return `${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth()}.${
    date.getFullYear()
  }`
}
