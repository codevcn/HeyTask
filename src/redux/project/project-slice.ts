import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import type {
   TCommentData,
   TCustomizationData,
   TPhaseData,
   TProjectData,
   TTaskData,
} from "../../services/types"
import type { TPhaseTaskPreview } from "../../utils/types"

type TInitialState = {
   project: TProjectData | null
   customization: TCustomizationData | null
   phases: TPhaseData[] | null
   taskData: TTaskData | null
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
      setTaskData: (state, action: PayloadAction<TTaskData | null>) => {
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
         const currentComments = state.taskData!.comments
         if (currentComments && currentComments.length > 0) {
            currentComments.push(newComment)
         } else {
            state.taskData!.comments = [newComment]
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
} = projectSlice.actions
