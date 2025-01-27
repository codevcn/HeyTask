import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import type {
   TCommentData,
   TCustomizationData,
   TPhaseData,
   TProjectData,
   TTaskData,
} from "../../services/types"
import type {
   TAddNewTaskMemberAction,
   TDeleteTaskAction,
   TPhaseTaskPreview,
   TRemoveTaskMemberAction,
   TTaskDataState,
} from "../../utils/types"

type TInitialState = {
   project: TProjectData | null
   customization: TCustomizationData | null
   phases: TPhaseData[] | null
   taskData: TTaskDataState | null
}

const initialState: TInitialState = {
   project: null,
   customization: null,
   phases: null,
   taskData: null,
}

export const projectSlice = createSlice({
   name: "project",
   initialState,
   reducers: {
      setProject: (state, action: PayloadAction<TProjectData>) => {
         state.project = action.payload
      },
      setCustomization: (state, action: PayloadAction<TCustomizationData>) => {
         state.customization = action.payload
      },
      setPhases: (state, action: PayloadAction<TPhaseData[]>) => {
         state.phases = action.payload
      },
      deletePhase: (state, action: PayloadAction<TPhaseData["id"]>) => {
         const phaseIdToDelete = action.payload
         state.phases = state.phases?.filter((phase) => phase.id !== phaseIdToDelete) || null
      },
      updateSinglePhase: (state, action: PayloadAction<TPhaseData>) => {
         const currentPhases = current(state).phases
         const newPhase = action.payload
         state.phases = currentPhases
            ? currentPhases.map((phase) => {
                 if (phase.id === newPhase.id) {
                    return { ...phase, ...newPhase }
                 }
                 return phase
              })
            : null
      },
      updateTaskPreview: (state, action: PayloadAction<TPhaseTaskPreview>) => {
         const currentPhases = current(state).phases
         const updates = action.payload
         const currentTaskPreviews = currentPhases?.find(
            (phase) => phase.id === updates.phaseId,
         )?.taskPreviews
         const taskPreview = currentTaskPreviews?.find((task) => task.id === updates.id)
         if (taskPreview) {
            Object.assign(taskPreview, updates)
         }
      },
      addNewTaskPreview: (state, action: PayloadAction<TPhaseTaskPreview>) => {
         const newTaskPreview = action.payload
         const taskPhase = state.phases?.find((phase) => phase.id === newTaskPreview.phaseId)
         if (taskPhase) {
            const currentTaskPreviews = taskPhase.taskPreviews
            if (currentTaskPreviews && currentTaskPreviews.length > 0) {
               currentTaskPreviews.push(newTaskPreview)
            } else {
               taskPhase.taskPreviews = [newTaskPreview]
            }
         }
      },
      addNewPhase: (state, action: PayloadAction<TPhaseData>) => {
         state.phases?.push(action.payload)
      },
      setTaskData: (state, action: PayloadAction<TTaskDataState | null>) => {
         state.taskData = action.payload
      },
      updateTaskData: (state, action: PayloadAction<Partial<TTaskData>>) => {
         const currentTaskData = state.taskData
         if (currentTaskData) {
            Object.assign(currentTaskData, action.payload)
         }
      },
      addNewComment: (state, action: PayloadAction<TCommentData>) => {
         const newComment = action.payload
         const currentComments = state.taskData?.comments
         if (currentComments && currentComments.length > 0) {
            currentComments.push(newComment)
         } else {
            if (state.taskData) {
               state.taskData.comments = [newComment]
            }
         }
      },
      editComment: (state, action: PayloadAction<Omit<TCommentData, "user">>) => {
         const updates = action.payload
         const currentComments = state.taskData?.comments
         if (currentComments) {
            for (const comment of currentComments) {
               if (comment.id === updates.id) {
                  comment.content = updates.content
                  comment.createdAt = updates.createdAt
                  break
               }
            }
         }
      },
      deleteComment: (state, action: PayloadAction<TCommentData["id"]>) => {
         const commentId = action.payload
         const taskData = state.taskData
         if (taskData) {
            taskData.comments = taskData.comments!.filter((comment) => comment.id !== commentId)
         }
      },
      addNewTaskMember: (state, action: PayloadAction<TAddNewTaskMemberAction>) => {
         const { taskMemberData, phaseId, taskId } = action.payload
         const currentMembers = state.taskData?.members
         if (currentMembers && currentMembers.length > 0) {
            currentMembers.push(taskMemberData)
         } else {
            if (state.taskData) {
               state.taskData.members = [taskMemberData]
            }
         }
         const taskPreviews = state.phases?.find((phase) => phase.id === phaseId)?.taskPreviews
         if (taskPreviews) {
            for (const taskPreview of taskPreviews) {
               if (taskPreview.id === taskId) {
                  if (taskPreview.taskMembers) {
                     taskPreview.taskMembers.push(taskMemberData)
                  } else {
                     taskPreview.taskMembers = [taskMemberData]
                  }
                  break
               }
            }
         }
      },
      removeTaskMember: (state, action: PayloadAction<TRemoveTaskMemberAction>) => {
         const { memberId, phaseId, taskId } = action.payload
         const task = state.taskData
         if (task) {
            const currentMembers = task.members
            if (currentMembers && currentMembers.length > 0) {
               task.members = currentMembers.filter((member) => member.id !== memberId)
            }
         }
         const taskPreviews = state.phases?.find((phase) => phase.id === phaseId)?.taskPreviews
         if (taskPreviews) {
            for (const taskPreview of taskPreviews) {
               if (taskPreview.id === taskId) {
                  taskPreview.taskMembers =
                     taskPreview.taskMembers?.filter((member) => member.id !== memberId) || null
                  break
               }
            }
         }
      },
      deleteTask: (state, action: PayloadAction<TDeleteTaskAction>) => {
         const phaseId = action.payload.phaseId
         const taskId = action.payload.taskId
         const phase = state.phases?.find((phase) => phase.id === phaseId)
         if (phase && phase.taskPreviews) {
            phase.taskPreviews = phase.taskPreviews.filter(
               (taskPreview) => taskPreview.id !== taskId,
            )
         }
         if (state.taskData?.id === taskId) {
            state.taskData = null
         }
      },
   },
})

export const {
   setProject,
   setCustomization,
   setPhases,
   updateSinglePhase,
   updateTaskPreview,
   addNewTaskPreview,
   addNewPhase,
   setTaskData,
   updateTaskData,
   addNewComment,
   addNewTaskMember,
   removeTaskMember,
   editComment,
   deleteComment,
   deleteTask,
   deletePhase,
} = projectSlice.actions
