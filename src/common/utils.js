//防抖函数 func:要执行防抖的函数对象  delay:防抖延迟的时间
export function debounce(func, delay) {
  let timer = null
  return function(...args) {  
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}