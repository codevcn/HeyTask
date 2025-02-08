import type { HttpStatusCode } from "axios"
import type { TTaskData, TTaskMemberData, TTaskPreviewData, TUserData } from "../services/types"
import type { PopoverOrigin } from "@mui/material"

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

export type TAddMembersBoardData = {
   anchorEle: HTMLButtonElement | null
   anchorOrigin?: PopoverOrigin
   transformOrigin?: PopoverOrigin
   phaseId: number
   taskId: number
}

export type TTaskDatesBoardData = {
   anchorEle: HTMLButtonElement | null
}

export type TUserPreviewBoardData = {
   anchorEle: HTMLElement | null
   userData: TUserData | null
}

export type TProjectPageParams = {
   projectId: string
}

export type TMoveTaskState = {
   taskId: number
   prePhaseId: number
   toPhaseId: number
   toPosition: number
}
