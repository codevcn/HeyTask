import { Fade, Dialog, styled, TextField, Tooltip, DialogContent } from "@mui/material"
import { FocusEvent, KeyboardEvent, useEffect, useState } from "react"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import SubtitlesIcon from "@mui/icons-material/Subtitles"
import CloseIcon from "@mui/icons-material/Close"
import { LogoLoading } from "../../../components/Loadings"
import { projectService } from "../../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../../utils/axios-error-handler"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import {
   addNewTaskMember,
   removeTaskMember,
   setTaskData,
   updateTaskData,
} from "../../../redux/project/project-slice"
import GroupRemoveIcon from "@mui/icons-material/GroupRemove"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import GroupsIcon from "@mui/icons-material/Groups"
import { Comments } from "./Comments"
import { Description } from "./Description"
import { AddMemberBoard, TaskMembers } from "./TaskMembers"
import { useUser } from "../../../hooks/user"
import { checkIfUserInTaskSelector } from "../../../redux/project/selectors"

type TTitleProps = {
   taskTitle: string
   onClose: () => void
}

const Title = ({ taskTitle, onClose }: TTitleProps) => {
   const dispatch = useAppDispatch()

   const quitEditing = (newTitle: string) => {
      if (newTitle && newTitle.length > 0) {
         dispatch(updateTaskData({ title: newTitle }))
      }
   }

   const catchEditingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         const input = e.target as HTMLTextAreaElement
         input.blur()
         quitEditing(input.value || taskTitle)
      }
   }

   const blurListTitleInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      quitEditing((e.target as HTMLTextAreaElement).value || taskTitle)
   }

   return (
      <header className="flex">
         <div className="w-8">
            <SubtitlesIcon className="text-regular-text-cl mt-1" />
         </div>
         <EditableTitle
            multiline
            fullWidth
            maxRows={5}
            defaultValue={taskTitle}
            onKeyDown={catchEditingEnter}
            variant="outlined"
            onBlur={blurListTitleInput}
         />
         <button onClick={onClose} className="p-1 hover:bg-modal-btn-hover-bgcl rounded ml-3">
            <CloseIcon className="text-regular-text-cl" />
         </button>
      </header>
   )
}

const Actions = () => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement | null>(null)
   const user = useUser()!
   const isUserInTask = useAppSelector(checkIfUserInTaskSelector(user.id))
   const dispatch = useAppDispatch()

   const handleOpenAddMemberBoard = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(null)
      }
   }

   const joinTask = () => {
      dispatch(addNewTaskMember(user))
   }

   const leaveTask = () => {
      dispatch(removeTaskMember(user.id))
   }

   return (
      <section className="flex flex-col gap-y-2 w-[168px] text-regular-text-cl">
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
            onCloseBoard={() => handleOpenAddMemberBoard()}
            anchorEle={anchorEle}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
         />
      </section>
   )
}

export const TaskDetails = () => {
   const { taskData } = useAppSelector(({ project }) => project)
   const dispatch = useAppDispatch()
   const [open, setOpen] = useState<boolean>(false)

   const getTaskDetailsHandler = (taskId: number) => {
      projectService
         .getTaskDetails(taskId)
         .then((res) => {
            dispatch(setTaskData(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   useEffect(() => {
      eventEmitter.on(EInternalEvents.OPEN_PHASE_TASK_MODAL, (isOpen, taskId) => {
         setOpen(isOpen)
         if (isOpen) {
            if (taskData) {
               if (taskId !== taskData.id) {
                  dispatch(setTaskData(null))
                  getTaskDetailsHandler(taskId)
               }
            } else {
               getTaskDetailsHandler(taskId)
            }
         }
      })
      return () => {
         eventEmitter.off(EInternalEvents.OPEN_PHASE_TASK_MODAL)
      }
   }, [taskData])

   const closeModal = () => {
      setOpen(false)
   }

   return (
      <StyledDialog
         TransitionComponent={Fade}
         keepMounted
         open={open}
         onClose={closeModal}
         scroll="body"
         maxWidth="md"
         fullWidth
         aria-hidden="true"
      >
         <DialogContent>
            <div className="flex flex-col rounded-xl min-h-[300px]">
               {taskData ? (
                  <>
                     <Title onClose={closeModal} taskTitle={taskData.title} />
                     <div className="flex justify-between gap-x-3 mt-6">
                        <section className="w-full">
                           <TaskMembers />
                           <Description description={taskData.description} />
                           <Comments comments={taskData.comments} />
                        </section>
                        <Actions />
                     </div>
                  </>
               ) : (
                  <LogoLoading className="m-auto" />
               )}
            </div>
         </DialogContent>
      </StyledDialog>
   )
}

const EditableTitle = styled(TextField)({
   "& .MuiInputBase-formControl": {
      width: "100%",
      padding: "5px 8px",
      "& .MuiInputBase-input": {
         width: "100%",
         color: "var(--ht-regular-text-cl)",
         fontWeight: 700,
         fontSize: "1.1rem",
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "transparent",
      },
      "&:hover": {
         "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
         },
      },
      "&.Mui-focused": {
         backgroundColor: "var(--ht-focused-textfield-bgcl)",
         "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--ht-outline-cl)",
         },
      },
   },
})

const StyledDialog = styled(Dialog)({
   "& .MuiPaper-root": {
      borderRadius: 9,
      backgroundColor: "var(--ht-modal-board-bgcl)",
      "& .MuiDialogContent-root": {
         backgroundColor: "var(--ht-modal-board-bgcl)",
      },
   },
})
