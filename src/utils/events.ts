import EventEmitter from "eventemitter3"
import type { TPhaseData } from "../services/types"
import type { TAddMembersBoardData, TTaskDatesBoardData, TUserPreviewBoardData } from "./types"
import type { SnackbarOrigin } from "@mui/material/Snackbar"

export enum EInternalEvents {
   DRAGGING_TASK_IN_PHASE = "DRAGGING_TASK_IN_PHASE",
   OPEN_TASK_DETAILS_MODAL = "OPEN_TASK_DETAILS_MODAL",
   SHOW_UPLOADED_FILE_DETAILS = "SHOW_UPLOADED_FILE_DETAILS",
   OPEN_FIXED_LOADING = "OPEN_FIXED_LOADING",
   OPENING_COMMENT_EDITOR = "OPENING_COMMENT_EDITOR",
   OPEN_ADD_PHASE_DESCRIPTION = "OPEN_ADD_PHASE_DESCRIPTION",
   OPEN_ADD_TASK_MEMBERS_BOARD = "OPEN_ADD_TASK_MEMBERS_BOARD",
   OPEN_TASK_DATES_BOARD = "OPEN_TASK_DATES_BOARD",
   OPEN_APP_SNACKBAR = "OPEN_APP_SNACKBAR",
   OPEN_PROJECT_MENU = "OPEN_PROJECT_MENU",
   OPEN_USER_PREVIEW = "OPEN_USER_PREVIEW",
}

interface IEventEmitter {
   [EInternalEvents.DRAGGING_TASK_IN_PHASE]: (
      phaseId: number,
      type: "start-dragging" | "end-dragging",
   ) => void
   [EInternalEvents.OPEN_TASK_DETAILS_MODAL]: (
      isOpen: boolean,
      taskId: number,
      phaseId: number,
   ) => void
   [EInternalEvents.SHOW_UPLOADED_FILE_DETAILS]: (isShown: boolean, fileId: string) => void
   [EInternalEvents.OPEN_FIXED_LOADING]: (isOpen: boolean) => void
   [EInternalEvents.OPENING_COMMENT_EDITOR]: (commentId: number) => void
   [EInternalEvents.OPEN_ADD_PHASE_DESCRIPTION]: (isOpen: boolean, phaseData: TPhaseData) => void
   [EInternalEvents.OPEN_ADD_TASK_MEMBERS_BOARD]: (boardData: TAddMembersBoardData) => void
   [EInternalEvents.OPEN_TASK_DATES_BOARD]: (boardData: TTaskDatesBoardData) => void
   [EInternalEvents.OPEN_APP_SNACKBAR]: (
      message: string | JSX.Element,
      anchorOrigin?: SnackbarOrigin,
   ) => void
   [EInternalEvents.OPEN_PROJECT_MENU]: (isOpen: boolean) => void
   [EInternalEvents.OPEN_USER_PREVIEW]: (boardData: TUserPreviewBoardData) => void
}

export const eventEmitter = new EventEmitter<IEventEmitter>()
