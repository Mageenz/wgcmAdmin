export function formatTime(v){
  if(!v) {
    return ''
  }
  const date = new Date(v)

  try {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  } catch(e) {
    return `转译失败${e}`
  }
}