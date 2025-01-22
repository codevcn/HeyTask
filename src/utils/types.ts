import type { HttpStatusCode } from "axios"
import type { TTaskItemPreviewData } from "../services/types"

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

export type TPhaseTaskPreview = TTaskItemPreviewData & {
   phaseId: number
}

export type TProjectPageParams = {
   projectId: string
}

export type TRegularSizes = "small" | "medium" | "large"

export type TTinyMCEFilePickerCallback = (
   callback: (value: string, meta?: Record<string, any>) => void,
   value: string,
   meta: Record<string, any>,
) => void
