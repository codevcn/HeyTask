import { createSelector } from "@reduxjs/toolkit"
import type { TRootState } from "../store"

export const checkIfUserInTaskSelector = (userId: number) =>
   createSelector([({ project }: TRootState) => project.taskData], (taskData) => {
      return !!taskData?.members?.some(({ id }) => id === userId)
   })

export const getAllMembersSelector = () =>
   createSelector([({ project }: TRootState) => project], (projectState) => {
      return {
         taskMembers: projectState.taskData!.members,
         projectMembers: projectState.project!.members!,
      }
   })
