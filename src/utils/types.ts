import type { HttpStatusCode } from "axios"

export type TUserData = {
   id: number
   fullName: string
   email: string
   avatar: string
}

export type TSuccess = {
   success: boolean
}

export type THandledAxiosError = {
   originalError: unknown
   statusCode: HttpStatusCode
   message: string
   isCanceled: boolean
}

export type THttpErrorResBody =
   | {
        name: string
        message: string
        timestamp: string
        isUserError: boolean
     }
   | string
