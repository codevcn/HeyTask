export const useDebounce = () => {
   let timer: number
   return <P extends any[]>(func: (...args: P) => void, delayInMs: number) => {
      return (...args: Parameters<typeof func>) => {
         clearTimeout(timer)
         timer = setTimeout(() => {
            func(...args)
         }, delayInMs)
      }
   }
}
