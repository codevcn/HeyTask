import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import type {
   TCommentData,
   TCustomizationData,
   TPhaseData,
   TProjectData,
   TProjectMemberData,
   TTaskData,
} from "../../services/types"
import type {
   TAddNewTaskMemberAction,
   TDeleteTaskAction,
   TMoveTaskState,
   TPhaseTaskPreview,
   TRemoveTaskMemberAction,
   TTaskDataState,
} from "../../utils/types"

type TProjectFetchedState = ("project" | "phases" | "task-data" | "customization")[]

type TInitialState = {
   fetchedList: TProjectFetchedState
   project: TProjectData | null
   customization: TCustomizationData | null
   phases: TPhaseData[] | null
   taskData: TTaskDataState | null
}

const initialState: TInitialState = {
   fetchedList: [],
   project: null,
   customization: null,
   phases: null,
   taskData: null,
}

export const projectSlice = createSlice({
   name: "project",
   initialState,
   reducers: {
      updateFetchedList: (state, action: PayloadAction<TProjectFetchedState>) => {
         state.fetchedList.push(...action.payload)
      },
      setProject: (state, action: PayloadAction<TProjectData>) => {
         state.project = action.payload
      },
      updateProject: (state, action: PayloadAction<Partial<TProjectData>>) => {
         const currentProject = state.project
         if (currentProject) {
            Object.assign(currentProject, action.payload)
         }
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
      updateSinglePhase: (state, action: PayloadAction<Partial<TPhaseData>>) => {
         const updates = action.payload
         const updatesId = updates.id
         if (updatesId) {
            const phase = state.phases?.find((phase) => phase.id === updatesId)
            if (phase) {
               Object.assign(phase, updates)
            }
         }
      },
      updateTaskPreview: (state, action: PayloadAction<Partial<TPhaseTaskPreview>>) => {
         const updates = action.payload
         const { phaseId, id } = updates
         if (phaseId && id) {
            const currentTaskPreviews = state.phases?.find(
               (phase) => phase.id === phaseId,
            )?.taskPreviews
            const taskPreview = currentTaskPreviews?.find((task) => task.id === id)
            if (taskPreview) {
               Object.assign(taskPreview, updates)
            }
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
            currentComments.unshift(newComment)
         } else {
            if (state.taskData) {
               state.taskData.comments = [newComment]
            }
         }
      },
      updateComment: (state, action: PayloadAction<Partial<Omit<TCommentData, "user">>>) => {
         const updates = action.payload
         const currentComments = state.taskData?.comments
         if (currentComments) {
            for (const comment of currentComments) {
               if (comment.id === updates.id) {
                  Object.assign(comment, updates)
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
      updateMemberInProject: (state, action: PayloadAction<Partial<TProjectMemberData>>) => {
         const updates = action.payload
         const memberId = updates.id
         if (memberId) {
            const member = state.project?.members.find((mem) => mem.id === memberId)
            if (member) {
               Object.assign(member, updates)
            }
         }
      },
      removeMemberFromProject: (state, action: PayloadAction<TProjectMemberData["id"]>) => {
         const memberId = action.payload
         const project = state.project!
         project.members = project.members.filter((member) => member.id !== memberId)
      },
      moveTask: (state, action: PayloadAction<TMoveTaskState>) => {
         const { taskId, prePhaseId, toPhaseId, toPosition } = action.payload
         const prePhase = state.phases!.find(({ id }) => id === prePhaseId)!
         const preTaskIndex = prePhase.taskPreviews!.findIndex(({ id }) => id === taskId)
         const [movedTask] = prePhase.taskPreviews!.splice(preTaskIndex, 1)
         const toPhase = state.phases!.find(({ id }) => id === toPhaseId)!
         const toTaskPreviews = toPhase.taskPreviews!
         if (toTaskPreviews && toTaskPreviews.length > 0) {
            const toIndex = toTaskPreviews.findIndex(({ position }) => position === toPosition)
            toTaskPreviews.splice(toIndex, 0, movedTask)
            toPhase.taskPreviews = toTaskPreviews.map((task, idx) => ({
               ...task,
               // >>> go on here
               position: idx + 1,
            }))
         } else {
            toPhase.taskPreviews = [movedTask]
         }
      },
   },
})

export const {
   updateFetchedList,
   setProject,
   updateProject,
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
   updateComment,
   deleteComment,
   deleteTask,
   deletePhase,
   updateMemberInProject,
   removeMemberFromProject,
   moveTask,
} = projectSlice.actions
