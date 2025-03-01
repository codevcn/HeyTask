import type { HttpStatusCode } from "axios"
import type {
   TPhaseData,
   TTaskData,
   TTaskMemberData,
   TTaskPreviewData,
   TUserData,
} from "../services/types"
import type { PopoverOrigin } from "@mui/material"
import type { TFilterTasksData } from "../pages/projects/Filter/sharing"
import type { EAppMessageTypes } from "./enums"

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
   fromPhaseId: number
   toPhaseId: number
   toPosition: number
}

export type TTaskStatus = "complete" | "uncomplete"

export type TFilterTasksWorkerMsg = {
   phases: TPhaseData[]
   filterData: TFilterTasksData
}

export type TFilterTasksWorkerRes = TTaskData["id"][]

export type TGoogleOAuthMsgData = {
   appMsgType: EAppMessageTypes
   code: string | null
}

export type TMovePhaseAction = {
   phaseId: number
   toPosition: number
}

export type TProjectFetchedItem = "project" | "phases" | "task-data" | "customization"

export type TUpdateFetchedListAction = {
   fetchedItems: TProjectFetchedItem[]
   type: "fetched" | "unfetched"
}
