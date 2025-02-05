export const useDebounce =
   () =>
   <P extends any[]>(func: (...args: P) => void, delayInMs: number) => {
      let timer: number | undefined
      return (...args: Parameters<typeof func>) => {
         clearTimeout(timer)
         timer = setTimeout(() => {
            func(...args)
         }, delayInMs)
      }
   }
