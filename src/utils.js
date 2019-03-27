function formatNum(m){
  return m < 10 ? '0' + m : m
}

export function formatTime(v){
  try {
    const date = new Date(v)
    return `${date.getFullYear()}-${formatNum(date.getMonth()+1)}-${formatNum(date.getDate())} ${formatNum(date.getHours())}:${formatNum(date.getMinutes())}`
  } catch(e) {
    return ''
  }
}