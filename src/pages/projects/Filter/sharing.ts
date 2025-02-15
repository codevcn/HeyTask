import type { TProjectMemberData } from "../../../services/types"
import type { TTaskStatus } from "../../../utils/types"

export enum EPickDateValues {
   NO_DUE_DATES = "NO_DUE_DATES",
   OVERDUE = "OVERDUE",
   DUE_IN_NEXT_DAY = "DUE_IN_NEXT_DAY",
   DUE_IN_NEXT_WEEK = "DUE_IN_NEXT_WEEK",
   DUE_IN_NEXT_MONTH = "DUE_IN_NEXT_MONTH",
}

export type TFilterTasksData = Partial<{
   memberIds: TProjectMemberData["id"][]
   taskStatus: TTaskStatus
   dueDate: EPickDateValues
   taskTitle: string
}>
