export const pureNavigator = (href: string): void => {
   window.location.href = href || "/"
}

export const perfomDelay = (delayInMs: number): Promise<boolean> =>
   new Promise<boolean>((resolve) => {
      setTimeout(() => {
         resolve(true)
      }, delayInMs)
   })

export const measureTextWidth = (text: string, font: string): number => {
   const context = document.createElement("canvas").getContext("2d")!
   context.font = font
   return context.measureText(text).width
}

/**
 * Generate a random number in min to max
 * @param min an integer to begin
 * @param max an integer to end
 * @returns a random number in min to max
 */
export const randomInteger = (min: number, max: number): number => {
   return Math.floor(Math.random() * (max - min + 1)) + min
}
