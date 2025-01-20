import { Fade, Modal, styled, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { EInternalEvents, eventEmitter } from "../../utils/events"
import SubtitlesIcon from "@mui/icons-material/Subtitles"
import CloseIcon from "@mui/icons-material/Close"
import { LogoLoading } from "../../components/Loadings"
import { projectService } from "../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setTaskData } from "../../redux/project/project-slice"

type TTitleProps = {
   taskTitle: string
}

const Title = ({ taskTitle }: TTitleProps) => {
   // const quitEditing = (newTitle: string) => {
   //    if (newTitle && newTitle.length > 0) {
   //       dispatch(updateSinglePhase({ ...phaseData, title: newTitle }))
   //    }
   //    setIsEditing(false)
   // }

   // const catchEditingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
   //    if (e.key === "Enter") {
   //       e.preventDefault()
   //       quitEditing((e.target as HTMLTextAreaElement).value || title)
   //    }
   // }

   // const blurListTitleInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   //    quitEditing((e.target as HTMLTextAreaElement).value || title)
   // }

   return (
      <header className="flex gap-x-2">
         <SubtitlesIcon className="text-regular-text-cl mt-1" />
         <EditableTitle
            multiline
            maxRows={5}
            defaultValue={taskTitle}
            // onKeyDown={catchEditingEnter}
            variant="outlined"
            // onBlur={blurListTitleInput}
         />
         <button className="p-1 hover:bg-hover-silver-bgcl rounded">
            <CloseIcon className="text-regular-text-cl" />
         </button>
      </header>
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
            getTaskDetailsHandler(taskId)
         }
      })
      return () => {
         eventEmitter.off(EInternalEvents.OPEN_PHASE_TASK_MODAL)
      }
   }, [])

   return (
      <Modal keepMounted open={open} onClose={() => setOpen(false)}>
         <Fade in={open}>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-task-modal p-4 bg-modal-bgcl rounded-xl">
               {taskData ? (
                  <>
                     <Title taskTitle={taskData.title} />
                  </>
               ) : (
                  <LogoLoading />
               )}
            </div>
         </Fade>
      </Modal>
   )
}

const EditableTitle = styled(TextField)({
   width: "100%",
   "& .MuiInputBase-formControl": {
      width: "100%",
      padding: "5px 8px",
      "& .MuiInputBase-input": {
         width: "100%",
         color: "#9fadbc",
         fontWeight: 700,
         fontSize: "1.1rem",
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "transparent",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
         borderColor: "#85B8FF",
      },
   },
})
