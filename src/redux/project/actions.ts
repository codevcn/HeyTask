import { toast } from "react-toastify"
import type { TTaskMemberData } from "../../services/types"
import type { TAppDispatch, TGetState } from "../store"
import { addNewTaskMember } from "./project-slice"

export const addNewTaskMemberAction =
   (memberData: TTaskMemberData, phaseId: number, taskId: number) =>
   (dispatch: TAppDispatch, getState: TGetState) => {
      const currentMembers = getState().project.taskData?.members
      if (currentMembers && currentMembers.length > 0) {
         const taskMemberId = memberData.id
         if (currentMembers.some((member) => member.id === taskMemberId)) {
            toast.error("User's already been assigned to this task")
         }
      }
      dispatch(addNewTaskMember({ taskMemberData: memberData, phaseId, taskId }))
   }
