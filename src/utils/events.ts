import EventEmitter from "eventemitter3"

export enum EInternalEvents {
   DROPPING_TASK_IN_PHASE = "DROPPING_TASK_IN_PHASE",
   OPEN_PHASE_TASK_MODAL = "OPEN_PHASE_TASK_MODAL",
   SHOW_UPLOADED_FILE_DETAILS = "SHOW_UPLOADED_FILE_DETAILS",
   OPEN_FIXED_LOADING = "OPEN_FIXED_LOADING",
   OPENING_COMMENT_EDITOR = "OPENING_COMMENT_EDITOR",
}

interface IEventEmitter {
   [EInternalEvents.DROPPING_TASK_IN_PHASE]: (
      phaseId: number,
      type: "start-dropping" | "end-dropping",
   ) => void
   [EInternalEvents.OPEN_PHASE_TASK_MODAL]: (isOpen: boolean, taskId: number) => void
   [EInternalEvents.SHOW_UPLOADED_FILE_DETAILS]: (isShown: boolean, fileId: string) => void
   [EInternalEvents.OPEN_FIXED_LOADING]: (isShown: boolean) => void
   [EInternalEvents.OPENING_COMMENT_EDITOR]: (commentId: number) => void
}

export const eventEmitter = new EventEmitter<IEventEmitter>()
