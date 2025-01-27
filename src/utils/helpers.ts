import dayjs from "dayjs"
import { EInternalEvents, eventEmitter } from "./events"

export const pureNavigator = (href: string): void => {
   window.location.href = href || "/"
}

/**
 * Function to delay a period of time before continue to execute the next codes
 * @param delayInMs time in miliseconds to wait
 * @returns a promise with boolean value
 */
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
 * Generate a random number in min to max ([min,max])
 * @param min an integer to begin
 * @param max an integer to end
 * @returns a random number in min to max ([min,max])
 */
export const randomInteger = (min: number, max: number): number => {
   return Math.floor(Math.random() * (max - min + 1)) + min
}

export const displayPreTimePeriod = (originalTime: Date | string): string => {
   const now = dayjs()
   const convertedTime = dayjs(originalTime)
   const diffInMinutes = now.diff(convertedTime, "minute")

   if (diffInMinutes < 1) {
      return "Just now"
   }
   if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
   }
   const diffInHours = now.diff(convertedTime, "hour")
   if (diffInHours < 24) {
      return `${diffInHours} hours ago`
   }
   const diffInDays = now.diff(convertedTime, "day")
   if (diffInDays < 31) {
      return `${diffInDays} days ago`
   }
   return convertedTime.format("MMM DD YYYY")
}

export const openFixedLoadingHandler = (isOpen: boolean) => {
   eventEmitter.emit(EInternalEvents.OPEN_FIXED_LOADING, isOpen)
}
