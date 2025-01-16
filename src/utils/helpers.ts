export const pureNavigator = (href: string): void => {
   window.location.href = href || "/"
}

export const perfomDelay = (delayInMs: number): Promise<boolean> =>
   new Promise<boolean>((resolve) => {
      setTimeout(() => {
         resolve(true)
      }, delayInMs)
   })
