import { AxiosError, CanceledError } from "axios"
import type { THandledAxiosError, THttpErrorResBody } from "./types"
import { HttpStatusCode } from "axios"

class AxiosErrorHandler {
   private readonly MAX_LEN_OF_ERROR_MESSAGE: number = 100

   handleHttpError(
      originalError: unknown | Error | AxiosError<THttpErrorResBody>
   ): THandledAxiosError {
      let statusCode: HttpStatusCode = HttpStatusCode.InternalServerError
      let message: string = "Unknown Error!"
      let isCanceled: boolean = false

      if (this.isAxiosError(originalError)) {
         const response_of_error = originalError.response

         if (response_of_error) {
            //if error was made by server at backend

            statusCode = response_of_error.status //update error status

            const data_of_response: THttpErrorResBody = response_of_error.data

            if (typeof data_of_response === "string") {
               message = "Invalid request"
            } else {
               message = data_of_response.message //update error message

               if (message.length > this.MAX_LEN_OF_ERROR_MESSAGE) {
                  message = `${message.slice(0, this.MAX_LEN_OF_ERROR_MESSAGE)}...`
               }
            }
         } else if (originalError.request) {
            //The request was made but no response was received
            statusCode = HttpStatusCode.BadGateway
            message = "Bad network or error from server."
         } else {
            //Something happened in setting up the request that triggered an Error
            message = originalError.message
         }
      } else if (originalError instanceof CanceledError) {
         isCanceled = true
         message = originalError.message
      } else if (originalError instanceof Error) {
         message = originalError.message
      }

      return {
         originalError,
         statusCode,
         message,
         isCanceled,
      }
   }

   isAxiosError<T = any, D = any>(error: any): error is AxiosError<T, D> {
      return error instanceof AxiosError
   }
}

const axiosErrorHandler = new AxiosErrorHandler()

export default axiosErrorHandler
