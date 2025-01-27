import type { HttpStatusCode } from "axios"
import type { TTaskData, TTaskMemberData, TTaskPreviewData } from "../services/types"

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

export type TPhaseTaskPreview = TTaskPreviewData & {
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

export type TDeleteTaskAction = {
   phaseId: number
   taskId: number
}

export type TRemoveTaskMemberAction = {
   phaseId: number
   taskId: number
   memberId: number
}

export type TAddNewTaskMemberAction = {
   taskMemberData: TTaskMemberData
   taskId: number
   phaseId: number
}

export type TTaskDataState = TTaskData & {
   phaseId: number
}
