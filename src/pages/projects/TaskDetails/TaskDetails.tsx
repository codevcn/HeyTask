import { Fade, Dialog, styled, TextField, DialogContent } from "@mui/material"
import { FocusEvent, KeyboardEvent, useEffect, useState } from "react"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import SubtitlesIcon from "@mui/icons-material/Subtitles"
import CloseIcon from "@mui/icons-material/Close"
import { LogoLoading } from "../../../components/Loadings"
import { projectService } from "../../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../../utils/axios-error-handler"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { setTaskData, updateTaskData } from "../../../redux/project/project-slice"
import { Comments } from "./Comments"
import { Description } from "./Description"
import { TaskMembers } from "./TaskMembers"
import { useUserInProject } from "../../../hooks/user"
import { UserActions } from "./UserActions"
import { TaskDueDate } from "./Dates"
import { checkUserPermission } from "../../../configs/user-permissions"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import type { TTaskDataState } from "../../../utils/types"
import type { TPhaseData } from "../../../services/types"
import { MoveTask } from "./MoveTask"
import { TaskActions } from "./TaskActions"

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
   const { taskData, phases } = useAppSelector(({ project }) => project)
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

   const findPhaseByTaskId = (phases: TPhaseData[], taskId: number): TPhaseData | undefined => {
      return phases?.find((phase) => phase.taskPreviews?.some((task) => task.id === taskId))
   }

   const listenOpenTaskDetails = () => {
      eventEmitter.on(EInternalEvents.OPEN_TASK_DETAILS_MODAL, (isOpen, taskId) => {
         setOpen(isOpen)
         if (isOpen && phases) {
            const phaseData = findPhaseByTaskId(phases, taskId)
            if (phaseData) {
               if (taskData) {
                  if (taskId !== taskData.id) {
                     dispatch(setTaskData(null))
                     getTaskDetailsHandler(taskId, phaseData.id)
                  }
               } else {
                  getTaskDetailsHandler(taskId, phaseData.id)
               }
            }
         }
      })
   }

   const initPhaseData = () => {
      if (taskData && phases) {
         setPhaseData(findPhaseByTaskId(phases, taskData.id))
      }
   }

   useEffect(() => {
      listenOpenTaskDetails()
      initPhaseData()
      return () => {
         eventEmitter.off(EInternalEvents.OPEN_TASK_DETAILS_MODAL)
      }
   }, [taskData, phases])

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
         customProp={{ taskIsComplete: taskData?.status === "complete" || false }}
      >
         <DialogContent>
            {taskData && phaseData ? (
               <div className="rounded-xl min-h-[300px]">
                  <Title
                     onClose={closeModal}
                     taskTitle={taskData.title}
                     taskIsComplete={taskData.status === "complete"}
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
