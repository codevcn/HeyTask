import { Fade, Dialog, styled, TextField, Tooltip, DialogContent, Popover } from "@mui/material"
import { FocusEvent, KeyboardEvent, useEffect, useState } from "react"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import SubtitlesIcon from "@mui/icons-material/Subtitles"
import CloseIcon from "@mui/icons-material/Close"
import { LogoLoading } from "../../../components/Loadings"
import { projectService } from "../../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../../utils/axios-error-handler"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { deleteTask, setTaskData, updateTaskData } from "../../../redux/project/project-slice"
import { Comments } from "./Comments"
import { Description } from "./Description"
import { TaskMembers } from "./TaskMembers"
import DeleteIcon from "@mui/icons-material/Delete"
import { useUserInProject } from "../../../hooks/user"
import { UserActions } from "./UserActions"
import { TaskDueDate } from "./Dates"
import { checkUserPermission } from "../../../configs/user-permissions"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import type { TTaskDataState } from "../../../utils/types"
import type { TPhaseData } from "../../../services/types"
import { MoveTask } from "./MoveTask"

type TTitleProps = {
   taskTitle: string
   taskIsComplete: boolean
   onClose: () => void
}

const Title = ({ taskTitle, onClose, taskIsComplete }: TTitleProps) => {
   const dispatch = useAppDispatch()
   const userInProject = useUserInProject()!
   const [editedTitle, setEditedTitle] = useState<string | null>(taskTitle)

   const quitEditing = (newTitle: string) => {
      if (newTitle && newTitle.length > 0) {
         dispatch(updateTaskData({ title: newTitle }))
      }
      setEditedTitle(newTitle)
   }

   const startEditing = () => {
      setEditedTitle(null)
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
         <div className="w-8" onClick={() => setEditedTitle("aaa")}>
            {taskIsComplete ? (
               <CheckCircleIcon className="text-success-text-cl mt-0.5" />
            ) : (
               <SubtitlesIcon className="text-regular-text-cl mt-0.5" />
            )}
         </div>
         {editedTitle ? (
            <div onClick={startEditing} className="w-full">
               <div
                  className={`${taskIsComplete ? "line-through" : ""} w-full leading-5 text-regular-text-cl font-bold text-[1.1rem] bg-transparent cursor-text px-2 py-[5px]`}
               >
                  {taskTitle}
               </div>
            </div>
         ) : (
            <EditableTitle
               multiline
               fullWidth
               autoFocus
               maxRows={5}
               defaultValue={taskTitle}
               onKeyDown={catchEditingEnter}
               variant="outlined"
               onBlur={blurListTitleInput}
               sx={{
                  pointerEvents: checkUserPermission(userInProject.projectRole, "CRUD-phase")
                     ? "auto"
                     : "none",
               }}
            />
         )}
         <button onClick={onClose} className="p-1 hover:bg-modal-btn-hover-bgcl rounded ml-3">
            <CloseIcon className="text-regular-text-cl" />
         </button>
      </header>
   )
}

type TTaskActionsProps = {
   phaseData: TPhaseData
   taskId: number
}

const TaskActions = ({ phaseData, taskId }: TTaskActionsProps) => {
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
      eventEmitter.emit(EInternalEvents.OPEN_TASK_DETAILS_MODAL, false, taskId, phaseData)
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

type TActionsProps = {
   taskData: TTaskDataState
   phaseData: TPhaseData
}

const Actions = ({ taskData, phaseData }: TActionsProps) => {
   const { phaseId } = taskData
   return (
      <section className="w-[168px] text-regular-text-cl">
         <UserActions taskData={taskData} phaseId={phaseId} />
         <TaskActions taskId={taskData.id} phaseData={phaseData} />
      </section>
   )
}

export const TaskDetails = () => {
   const { taskData } = useAppSelector(({ project }) => project)
   const dispatch = useAppDispatch()
   const [open, setOpen] = useState<boolean>(false)
   const [phaseData, setPhaseData] = useState<TPhaseData>()

   const getTaskDetailsHandler = (taskId: number, phaseId: number) => {
      projectService
         .getTaskDetails(taskId)
         .then((res) => {
            dispatch(setTaskData({ ...res, phaseId }))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   useEffect(() => {
      eventEmitter.on(EInternalEvents.OPEN_TASK_DETAILS_MODAL, (isOpen, taskId, phaseData) => {
         setOpen(isOpen)
         setPhaseData(phaseData)
         if (isOpen) {
            const phaseId = phaseData.id
            if (taskData) {
               if (taskId !== taskData.id) {
                  dispatch(setTaskData(null))
                  getTaskDetailsHandler(taskId, phaseId)
               }
            } else {
               getTaskDetailsHandler(taskId, phaseId)
            }
         }
      })
      return () => {
         eventEmitter.off(EInternalEvents.OPEN_TASK_DETAILS_MODAL)
      }
   }, [taskData])

   const closeModal = () => {
      setOpen(false)
   }

   return (
      <StyledDialog
         TransitionComponent={Fade}
         open={open}
         onClose={closeModal}
         scroll="body"
         maxWidth="md"
         fullWidth
         aria-hidden="true"
         customProp={{ taskIsComplete: taskData?.isComplete || false }}
      >
         <DialogContent>
            {taskData && phaseData ? (
               <div className="rounded-xl min-h-[300px]">
                  <Title
                     onClose={closeModal}
                     taskTitle={taskData.title}
                     taskIsComplete={taskData.isComplete}
                  />
                  <MoveTask taskId={taskData.id} phaseId={phaseData.id} />
                  <div className="flex justify-between gap-x-3 mt-6">
                     <section className="w-full">
                        <div className="flex gap-5">
                           <TaskMembers phaseId={taskData.phaseId} taskId={taskData.id} />
                           <TaskDueDate dueDate={taskData.dueDate} />
                        </div>
                        <Description description={taskData.description} />
                        <Comments comments={taskData.comments} />
                     </section>
                     <Actions taskData={taskData} phaseData={phaseData} />
                  </div>
               </div>
            ) : (
               <div className="flex rounded-xl min-h-[300px]">
                  <LogoLoading className="m-auto" />
               </div>
            )}
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
         lineHeight: "1.25rem",
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

type TStyledDialogCustomProps = {
   customProp: {
      taskIsComplete: boolean
   }
}

const StyledDialog = styled(Dialog, {
   shouldForwardProp: (prop) => prop !== "customProp",
})<TStyledDialogCustomProps>(({ customProp }) => ({
   "& .MuiPaper-root": {
      borderRadius: 9,
      backgroundColor: "var(--ht-modal-board-bgcl)",
      "& .MuiDialogContent-root": {
         borderRadius: 9,
         backgroundColor: "var(--ht-modal-board-bgcl)",
         borderWidth: 2,
         borderStyle: "solid",
         borderColor: customProp.taskIsComplete
            ? "var(--ht-success-text-cl)"
            : "var(--ht-modal-board-bgcl)",
      },
   },
}))

const StyledPopover = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 6,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      border: "1px var(--ht-regular-border-cl) solid",
   },
})
