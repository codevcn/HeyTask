import { FocusEvent, KeyboardEvent, useEffect, useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useAppDispatch } from "../../../hooks/redux"
import { deletePhase, updateSinglePhase } from "../../../redux/project/project-slice"
import type { TPhaseData } from "../../../services/types"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { styled, TextField, Tooltip } from "@mui/material"
import { TaskPreviews } from "./TaskPreviews"
import CloseIcon from "@mui/icons-material/Close"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import { Fade, Popover } from "@mui/material"
import { checkUserPermission } from "../../../configs/user-permissions"
import { useUserInProject } from "../../../hooks/user"

type TDeletePhaseConfirmProps = {
   phaseId: number
}

const DeletePhaseConfirm = ({ phaseId }: TDeletePhaseConfirmProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLElement>()
   const dispatch = useAppDispatch()

   const handleOpen = (e?: React.MouseEvent<HTMLElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(undefined)
      }
   }

   const deletePhaseHandler = () => {
      dispatch(deletePhase(phaseId))
   }

   return (
      <>
         <li
            onClick={handleOpen}
            className="cursor-pointer hover:bg-hover-silver-bgcl py-[6px] px-3 text-regular-text-cl text-sm font-medium"
         >
            Delete phase
         </li>

         <StyledPopover
            anchorEl={anchorEle}
            open={!!anchorEle}
            onClose={() => handleOpen()}
            TransitionComponent={Fade}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "center",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "center",
            }}
         >
            <div className="bg-modal-popover-bgcl border border-solid border-regular-border-cl rounded-lg p-3 text-regular-text-cl w-[300px]">
               <div className="relative w-full py-1">
                  <h3 className="w-full text-center text-sm font-bold">Delete phase</h3>
                  <button
                     onClick={() => handleOpen()}
                     className="flex absolute right-0 top-0 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
                  >
                     <CloseIcon className="text-regular-text-cl" fontSize="small" />
                  </button>
               </div>
               <p className="text-sm mt-2">Deleting a phase is forever. There is no undo.</p>
               <button
                  onClick={deletePhaseHandler}
                  className="text-sm mt-2 bg-delete-btn-bgcl rounded-md p-1 w-full text-black font-bold hover:bg-delete-btn-hover-bgcl"
               >
                  Delete phase
               </button>
            </div>
         </StyledPopover>
      </>
   )
}

type TPhaseActions = "copy-phase" | "move-phase" | "description"

type TPhaseActionsProps = {
   phaseData: TPhaseData
}

const PhaseMenu = ({ phaseData }: TPhaseActionsProps) => {
   const [anchorEle, setAnchorEle] = useState<HTMLButtonElement>()

   const hanleActions = (type: TPhaseActions) => {
      switch (type) {
         case "copy-phase":
            break
         case "move-phase":
            break
         case "description":
            eventEmitter.emit(EInternalEvents.OPEN_ADD_PHASE_DESCRIPTION, true, phaseData)
            break
      }
      setAnchorEle(undefined)
   }

   const handleOpen = (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) {
         setAnchorEle(e.currentTarget)
      } else {
         setAnchorEle(undefined)
      }
   }

   return (
      <>
         <Tooltip title="List actions" arrow>
            <button className="p-1 h-fit rounded-sm hover:bg-[#282F27]" onClick={handleOpen}>
               <MoreHorizIcon fontSize="small" />
            </button>
         </Tooltip>

         <StyledPopover
            anchorEl={anchorEle}
            open={!!anchorEle}
            onClose={() => handleOpen()}
            TransitionComponent={Fade}
            anchorOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
         >
            <div className="bg-transparent min-w-52 py-1 pb-3 border border-solid border-regular-border-cl rounded-lg">
               <header className="flex py-1 px-2 items-center">
                  <h3 className="grow text-regular-text-cl font-semibold text-sm text-center">
                     Phase actions
                  </h3>
                  <button
                     onClick={() => handleOpen()}
                     className="flex h-8 w-8 hover:bg-hover-silver-bgcl rounded"
                  >
                     <CloseIcon fontSize="small" className="text-regular-text-cl m-auto" />
                  </button>
               </header>
               <ul className="mt-2">
                  <DeletePhaseConfirm phaseId={phaseData.id} />
                  <li
                     onClick={() => hanleActions("copy-phase")}
                     className="cursor-pointer hover:bg-hover-silver-bgcl py-[6px] px-3 text-regular-text-cl text-sm font-medium"
                  >
                     Copy phase
                  </li>
                  <li
                     onClick={() => hanleActions("copy-phase")}
                     className="cursor-pointer hover:bg-hover-silver-bgcl py-[6px] px-3 text-regular-text-cl text-sm font-medium"
                  >
                     Move phase
                  </li>
                  <li
                     onClick={() => hanleActions("description")}
                     className="cursor-pointer hover:bg-hover-silver-bgcl py-[6px] px-3 text-regular-text-cl text-sm font-medium"
                  >
                     About phase
                  </li>
               </ul>
            </div>
         </StyledPopover>
      </>
   )
}

type TPhaseProps = {
   phaseData: TPhaseData
   className?: string
}

export const Phase = ({ phaseData, className }: TPhaseProps) => {
   const { taskPreviews, title, id } = phaseData
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
   const dispatch = useAppDispatch()
   const [cssClass, setCssClass] = useState<string>("")
   const userInProject = useUserInProject()!

   const quitEditing = (newTitle: string) => {
      if (newTitle && newTitle.length > 0) {
         dispatch(updateSinglePhase({ ...phaseData, title: newTitle }))
      }
   }

   const catchEditingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         const input = e.target as HTMLTextAreaElement
         input.blur()
         quitEditing(input.value || title)
      }
   }

   const blurListTitleInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      quitEditing((e.target as HTMLTextAreaElement).value || title)
   }

   useEffect(() => {
      eventEmitter.on(EInternalEvents.DRAGGING_TASK_IN_PHASE, (payload, type) => {
         if (payload === id) {
            if (type === "start-dragging") {
               setCssClass("outline outline-2 outline-outline-cl")
            } else {
               setCssClass("")
            }
         }
      })
      return () => {
         eventEmitter.off(EInternalEvents.DRAGGING_TASK_IN_PHASE)
      }
   }, [])

   return (
      <div
         style={{
            transform: CSS.Transform.toString(transform),
            transition,
         }}
      >
         <div
            className={`flex flex-col relative m-0 h-fit max-h-full z-20 text-regular-text-cl bg-phase-bgcl w-[272px] rounded-xl ${className} ${cssClass}`}
         >
            <div
               ref={setNodeRef}
               {...attributes}
               {...listeners}
               className="flex justify-between text-[#B6C2CF] gap-x-2 p-2 pb-1 cursor-grab active:cursor-grabbing"
            >
               <div className="w-full">
                  <EditableTitle
                     multiline
                     maxRows={5}
                     defaultValue={title}
                     onKeyDown={catchEditingEnter}
                     variant="outlined"
                     onBlur={blurListTitleInput}
                     onMouseDown={(e) => e.stopPropagation()}
                     sx={{
                        pointerEvents: checkUserPermission(userInProject.projectRole, "CRUD-phase")
                           ? "auto"
                           : "none",
                     }}
                  />
               </div>
               <PhaseMenu phaseData={phaseData} />
            </div>
            <TaskPreviews phaseData={phaseData} taskPreviews={taskPreviews || []} />
         </div>
      </div>
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

const StyledPopover = styled(Popover)({
   "& .MuiPaper-root": {
      borderRadius: 8,
      backgroundColor: "var(--ht-modal-popover-bgcl)",
      height: "fit-content",
      "& .MuiList-root": {
         backgroundColor: "var(--ht-modal-popover-bgcl)",
         borderRadius: 8,
      },
   },
})
