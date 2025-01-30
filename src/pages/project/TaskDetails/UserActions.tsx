import { Tooltip } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { removeTaskMember } from "../../../redux/project/project-slice"
import GroupRemoveIcon from "@mui/icons-material/GroupRemove"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import GroupsIcon from "@mui/icons-material/Groups"
import { checkIfUserInTaskSelector } from "../../../redux/project/selectors"
import { useUserInProject } from "../../../hooks/user"
import { addNewTaskMemberAction } from "../../../redux/project/actions"
import { useState } from "react"
import { AddMemberBoard } from "./TaskMembers"
import type { TTaskData } from "../../../services/types"
import { DatesBoard } from "./Dates"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

type TDatesProps = {
   dueDate: string | null
}

const Dates = ({ dueDate }: TDatesProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)

   const openAssignDueDates = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   return (
      <>
         <Tooltip title="View members of this task" arrow placement="left">
            <button
               onClick={openAssignDueDates}
               className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl"
            >
               <AccessTimeIcon fontSize="small" />
               <span>Dates</span>
            </button>
         </Tooltip>

         <DatesBoard
            anchorEle={anchorEle}
            onOpenDatesBoard={openAssignDueDates}
            dueDate={dueDate}
         />
      </>
   )
}

type TMembersProps = {
   phaseId: number
   taskId: number
}

const TaskMembers = ({ phaseId, taskId }: TMembersProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)

   const handleOpenAddMemberBoard = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   return (
      <>
         <Tooltip title="View members of this task" arrow placement="left">
            <button
               onClick={handleOpenAddMemberBoard}
               className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl"
            >
               <GroupsIcon fontSize="small" />
               <span>Members</span>
            </button>
         </Tooltip>

         <AddMemberBoard
            phaseId={phaseId}
            taskId={taskId}
            onCloseBoard={() => handleOpenAddMemberBoard()}
            anchorEle={anchorEle}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
         />
      </>
   )
}

type TUserActionsProps = {
   phaseId: number
   taskData: TTaskData
}

export const UserActions = ({ phaseId, taskData }: TUserActionsProps) => {
   const { id } = taskData
   const userInProject = useUserInProject()!
   const isUserInTask = useAppSelector(checkIfUserInTaskSelector(userInProject.id))
   const dispatch = useAppDispatch()

   const joinTask = () => {
      dispatch(addNewTaskMemberAction(userInProject, phaseId, id))
   }

   const leaveTask = () => {
      dispatch(removeTaskMember({ memberId: userInProject.id, phaseId, taskId: id }))
   }

   return (
      <>
         <h3 className="text-xs">User actions</h3>
         <div className="flex flex-col gap-y-2 mt-1">
            {isUserInTask ? (
               <Tooltip title="Leave this task" arrow placement="left">
                  <button
                     onClick={leaveTask}
                     className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl"
                  >
                     <GroupRemoveIcon fontSize="small" />
                     <span>Leave</span>
                  </button>
               </Tooltip>
            ) : (
               <Tooltip title="Join this task" arrow placement="left">
                  <button
                     onClick={joinTask}
                     className="flex items-center gap-x-2 font-medium text-sm py-[6px] px-3 bg-modal-btn-bgcl rounded hover:bg-modal-btn-hover-bgcl"
                  >
                     <GroupAddIcon fontSize="small" />
                     <span>Join</span>
                  </button>
               </Tooltip>
            )}
            <TaskMembers taskId={id} phaseId={phaseId} />
            <Dates dueDate={taskData.dueDate} />
         </div>
      </>
   )
}
