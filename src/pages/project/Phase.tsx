import { FocusEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useAppDispatch } from "../../hooks/redux"
import { deletePhase, updateSinglePhase } from "../../redux/project/project-slice"
import type { TPhaseData } from "../../services/types"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { styled, TextField, Tooltip } from "@mui/material"
import { TaskPreviews } from "./TaskPreviews"
import CloseIcon from "@mui/icons-material/Close"
import { EInternalEvents, eventEmitter } from "../../utils/events"
import { Fade, Popover } from "@mui/material"

type TPhaseProps = {
   phaseData: TPhaseData
   className?: string
}

type TPhaseActions = "copy-phase" | "delete-phase" | "move-phase"

type TPhaseActionsProps = {
   phaseId: number
}

const PhaseActions = ({ phaseId }: TPhaseActionsProps) => {
   const [open, setOpen] = useState<boolean>(false)
   const anchorEleRef = useRef<HTMLButtonElement | null>(null)
   const dispatch = useAppDispatch()

   const hanleActions = (type: TPhaseActions) => {
      switch (type) {
         case "copy-phase":
            break
         case "move-phase":
            break
         case "delete-phase":
            dispatch(deletePhase(phaseId))
            break
      }
      setOpen(false)
   }

   const handleOpenActions = (e?: MouseEvent<HTMLButtonElement>) => {
      if (e) {
         anchorEleRef.current = e.currentTarget
         setOpen(true)
      } else {
         anchorEleRef.current = null
         setOpen(false)
      }
   }

   return (
      <>
         <Tooltip title="List actions" arrow>
            <button
               className="p-1 h-fit rounded-sm hover:bg-[#282F27]"
               ref={anchorEleRef}
               onClick={handleOpenActions}
            >
               <MoreHorizIcon fontSize="small" />
            </button>
         </Tooltip>

         <StyledPopover
            anchorEl={anchorEleRef.current}
            open={open}
            onClose={() => handleOpenActions()}
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
            <div className="bg-transparent min-w-52 py-1 pb-3 border border-solid border-divider-bgcl rounded-lg">
               <header className="flex py-1 px-2 items-center">
                  <h3 className="grow text-regular-text-cl font-semibold text-sm text-center">
                     Phase actions
                  </h3>
                  <button
                     onClick={() => handleOpenActions()}
                     className="flex h-8 w-8 hover:bg-hover-silver-bgcl rounded"
                  >
                     <CloseIcon fontSize="small" className="text-regular-text-cl m-auto" />
                  </button>
               </header>
               <ul className="mt-2">
                  <li
                     onClick={() => hanleActions("delete-phase")}
                     className="cursor-pointer hover:bg-hover-silver-bgcl py-[6px] px-3 text-regular-text-cl text-sm font-medium"
                  >
                     Delete Phase
                  </li>
                  <li
                     onClick={() => hanleActions("copy-phase")}
                     className="cursor-pointer hover:bg-hover-silver-bgcl py-[6px] px-3 text-regular-text-cl text-sm font-medium"
                  >
                     Copy Phase
                  </li>
                  <li
                     onClick={() => hanleActions("copy-phase")}
                     className="cursor-pointer hover:bg-hover-silver-bgcl py-[6px] px-3 text-regular-text-cl text-sm font-medium"
                  >
                     Move Phase
                  </li>
               </ul>
            </div>
         </StyledPopover>
      </>
   )
}

export const Phase = ({ phaseData, className }: TPhaseProps) => {
   const { taskPreviews, title, id } = phaseData
   // const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
   const dispatch = useAppDispatch()
   const [cssClass, setCssClass] = useState<string>("")

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
      eventEmitter.on(EInternalEvents.DROPPING_TASK_IN_PHASE, (payload, type) => {
         if (payload === id) {
            if (type === "start-dropping") {
               setCssClass("outline outline-2 outline-outline-cl")
            } else {
               setCssClass("")
            }
         }
      })
      return () => {
         eventEmitter.off(EInternalEvents.DROPPING_TASK_IN_PHASE)
      }
   }, [])

   return (
      <div
      // style={{
      //    transform: CSS.Transform.toString(transform),
      //    transition,
      // }}
      >
         <div
            className={`flex flex-col relative m-0 h-fit max-h-full z-20 text-regular-text-cl bg-phase-bgcl w-[272px] rounded-xl ${className} ${cssClass}`}
         >
            <div
               // ref={setNodeRef}
               // {...attributes}
               // {...listeners}
               className="flex justify-between text-[#B6C2CF] gap-x-2 p-2 pb-1"
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
                  />
               </div>
               <PhaseActions phaseId={id} />
            </div>
            <TaskPreviews phaseId={id} taskPreviews={taskPreviews} />
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
      backgroundColor: "#282E33",
      height: "fit-content",
      "& .MuiList-root": {
         backgroundColor: "#282E33",
         borderRadius: 8,
      },
   },
})
