import { styled, Tooltip, Popover } from "@mui/material"
import { useState } from "react"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import CloseIcon from "@mui/icons-material/Close"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../../hooks/redux"
import { deleteTask } from "../../../redux/project/project-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import { useUserInProject } from "../../../hooks/user"
import { checkUserPermission } from "../../../configs/user-permissions"
import type { TPhaseData } from "../../../services/types"

type TTaskActionsProps = {
   phaseData: TPhaseData
   taskId: number
}

export const TaskActions = ({ phaseData, taskId }: TTaskActionsProps) => {
   const phaseId = phaseData.id
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)
   const dispatch = useAppDispatch()
   const userInProject = useUserInProject()!

   const handleOpenDeleteTaskBoard = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         if (checkUserPermission(userInProject.projectRole, "CRUD-task")) {
            setAnchorEle(e.currentTarget)
         } else {
            toast.error("You must be admin or leader to delete a task")
         }
      } else {
         setAnchorEle(null)
      }
   }

   const deleteTaskHandler = () => {
      dispatch(deleteTask({ phaseId, taskId }))
      eventEmitter.emit(EInternalEvents.OPEN_TASK_DETAILS_MODAL, false, taskId)
   }

   return (
      <>
         <h3 className="text-xs mt-5">Task actions</h3>
         <div className="flex flex-col gap-y-2 mt-1">
            <Tooltip title="Delete this task" arrow placement="left">
               <button
                  onClick={handleOpenDeleteTaskBoard}
                  className="flex items-center gap-x-2 py-[6px] px-3 bg-delete-btn-bgcl rounded hover:bg-delete-btn-hover-bgcl"
               >
                  <DeleteIcon fontSize="small" className="text-black" />
                  <span className="font-bold text-sm text-black">Delete</span>
               </button>
            </Tooltip>
         </div>

         <StyledPopover
            open={!!anchorEle}
            anchorEl={anchorEle}
            onClose={() => handleOpenDeleteTaskBoard()}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "right",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
         >
            <div className="bg-modal-popover-bgcl rounded-md p-3 text-regular-text-cl w-[300px]">
               <div className="relative w-full py-1">
                  <h3 className="w-full text-center text-sm font-bold">Delete task</h3>
                  <button
                     onClick={() => handleOpenDeleteTaskBoard()}
                     className="flex absolute right-0 top-0 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
                  >
                     <CloseIcon className="text-regular-text-cl" fontSize="small" />
                  </button>
               </div>
               <p className="text-sm mt-2">Deleting a task is forever. There is no undo.</p>
               <button
                  onClick={deleteTaskHandler}
                  className="text-sm mt-2 bg-delete-btn-bgcl rounded-md p-1 w-full text-black font-bold hover:bg-delete-btn-hover-bgcl"
               >
                  Delete task
               </button>
            </div>
         </StyledPopover>
      </>
   )
}

const StyledPopover = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 6,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      border: "1px var(--ht-regular-border-cl) solid",
   },
})
