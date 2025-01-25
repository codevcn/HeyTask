import {
   FocusEvent,
   KeyboardEvent,
   LegacyRef,
   MouseEvent,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react"
import {
   DndContext,
   closestCenter,
   MouseSensor,
   TouchSensor,
   useSensor,
   useSensors,
   DragOverlay,
} from "@dnd-kit/core"
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import {
   arrayMove,
   SortableContext,
   horizontalListSortingStrategy,
   useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { addNewPhase, setPhases, updateSinglePhase } from "../../redux/project/project-slice"
import { projectService } from "../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import type { TPhaseData } from "../../services/types"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { styled, TextField, Tooltip } from "@mui/material"
import { useDragScroll } from "../../hooks/drag-scroll"
import { TaskPreviews } from "./Tasks"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import { randomInteger } from "../../utils/helpers"
import { EInternalEvents, eventEmitter } from "../../utils/events"
import { Fade, Popover } from "@mui/material"

type TPhaseActions = "copy-phase" | "delete-phase" | "move-phase"

const PhaseActions = () => {
   const [open, setOpen] = useState<boolean>(false)
   const anchorEleRef = useRef<HTMLButtonElement | null>(null)

   const hanleActions = (type: TPhaseActions) => {
      switch (type) {
         case "copy-phase":
            break
         case "move-phase":
            break
         case "delete-phase":
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

type TPhaseProps = {
   phaseData: TPhaseData
   className?: string
}

const Phase = ({ phaseData, className }: TPhaseProps) => {
   const { taskPreviews, title, id } = phaseData
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
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
               className="flex justify-between text-[#B6C2CF] gap-x-2 p-2 pb-1"
            >
               <div className={`w-full`}>
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
               <PhaseActions />
            </div>
            <TaskPreviews phaseId={id} taskPreviews={taskPreviews} />
         </div>
      </div>
   )
}

type TAddNewPhaseProps = {
   finalPosition: number | null
}

const AddNewPhase = ({ finalPosition }: TAddNewPhaseProps) => {
   const [isAdding, setIsAdding] = useState<boolean>(false)
   const dispatch = useAppDispatch()

   const handleAddNewPhase = (title: string) => {
      if (title && title.length > 0) {
         dispatch(
            addNewPhase({
               id: randomInteger(1, 1000),
               title,
               taskPreviews: null,
               position: finalPosition ? finalPosition + 1 : 1,
            }),
         )
      }
      setIsAdding(false)
   }

   const catchAddingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         handleAddNewPhase((e.target as HTMLTextAreaElement).value)
      }
   }

   const submitAdding = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      handleAddNewPhase(formData.get("title") as string)
   }

   return (
      <div className="relative m-0 h-fit z-20 text-regular-text-cl min-w-[272px]">
         {isAdding ? (
            <form onSubmit={submitAdding} className="p-2 bg-phase-bgcl rounded-xl">
               <EditableTitle
                  multiline
                  maxRows={5}
                  variant="outlined"
                  placeholder="Enter a title..."
                  autoFocus
                  onKeyDown={catchAddingEnter}
                  name="title"
                  autoComplete="off"
                  defaultValue=""
               />
               <div className="flex mt-3 gap-x-2">
                  <button
                     type="submit"
                     className="py-[6px] px-3 leading-none border-none rounded bg-confirm-btn-bgcl text-[#1D2125] font-medium text-sm"
                  >
                     Add Phase
                  </button>
                  <Tooltip title="Cancel adding new card.">
                     <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="hover:bg-hover-silver-bgcl px-1 py-1 rounded"
                     >
                        <CloseIcon />
                     </button>
                  </Tooltip>
               </div>
            </form>
         ) : (
            <button
               onClick={() => setIsAdding(true)}
               className="flex gap-x-2 items-center p-2 bg-[#ffffff42] text-white w-full rounded-md hover:bg-[#ffffff52] font-semibold"
            >
               <AddIcon />
               <span>Add another phase</span>
            </button>
         )}
      </div>
   )
}

type TDragScrollPlaceholderProps = {
   refToDrag: LegacyRef<HTMLDivElement>
   dndItemsCount: number
}

const DragScrollPlaceholder = ({ refToDrag, dndItemsCount }: TDragScrollPlaceholderProps) => {
   return (
      <div ref={refToDrag} className="flex absolute top-0 left-0 h-full z-10">
         {Array.from({ length: dndItemsCount }, (_, index) => index).map((value) => (
            <div key={value} className="w-[272px]"></div>
         ))}
      </div>
   )
}

type TDragOverlayItemProps = {
   phaseData: TPhaseData
}

const DragOverlayItem = ({ phaseData }: TDragOverlayItemProps) => {
   const { taskPreviews, title, id } = phaseData

   return (
      <div className="flex relative m-0 h-fit max-h-full z-20 text-regular-text-cl opacity-60 rotate-6">
         <div className="flex flex-col bg-phase-bgcl w-[272px] rounded-xl">
            <div className="flex justify-between text-[#B6C2CF] gap-x-2 p-2">
               <p className="cursor-text text-base font-medium p-1 w-full m-0 break-words max-w-[calc(100%-28px-18px)]">
                  {title}
               </p>
               <Tooltip title="List actions" arrow>
                  <button className="p-1 h-fit rounded-sm hover:bg-[#282F27]">
                     <MoreHorizIcon fontSize="small" />
                  </button>
               </Tooltip>
            </div>
            <TaskPreviews phaseId={id} taskPreviews={taskPreviews} />
         </div>
      </div>
   )
}

export const Phases = () => {
   const { phases } = useAppSelector(({ project }) => project)
   const sensors = useSensors(
      useSensor(MouseSensor, {
         activationConstraint: {
            delay: 200, // Thời gian giữ chuột (ms)
            tolerance: 5, // Số pixel di chuyển tối đa trước khi kích hoạt drag
         },
      }),
      useSensor(TouchSensor),
   )
   const dispatch = useAppDispatch()
   const [dndItems, setDndItems] = useState<number[]>([])
   const [refToScroll, refToDrag] = useDragScroll()
   const [draggingId, setDraggingId] = useState<number | null>(null)

   const handleDragging = (e?: DragStartEvent) => {
      if (e) {
         setDraggingId(e.active.id as number)
      } else {
         setDraggingId(null)
      }
   }

   const handleDragEnd = (e: DragEndEvent) => {
      const { over } = e
      if (over) {
         const { active } = e
         if (active.id !== over.id) {
            setDndItems((items) => {
               return arrayMove(
                  items,
                  items.indexOf(active.id as number),
                  items.indexOf(over.id as number),
               )
            })
         }
      }
      setDraggingId(null)
   }

   const initDndItems = () => {
      if (phases && phases.length > 0) {
         setDndItems((pre) => {
            if (pre && pre.length > 0) {
               const newPhases: number[] = []
               for (const phase of phases) {
                  if (!pre.includes(phase.id)) {
                     newPhases.push(phase.id)
                  }
               }
               return [...pre, ...newPhases]
            }
            return phases.map(({ id }) => id)
         })
      }
   }

   useEffect(() => {
      initDndItems()
   }, [phases])

   const getPhases = () => {
      projectService
         .getPhases()
         .then((res) => {
            dispatch(setPhases(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   useEffect(() => {
      if (!phases) {
         getPhases()
      }
   }, [])

   const sortedDndItems = useMemo<TPhaseData[]>(() => {
      if (dndItems && dndItems.length > 0 && phases && phases.length > 0) {
         return dndItems.map((item) => phases.find((phase) => phase.id === item)!)
      }
      return []
   }, [dndItems, phases])

   const findPhase = (phases: TPhaseData[], phaseId: number): TPhaseData => {
      return phases.find((phase) => phase.id === phaseId)!
   }

   return (
      <div className="grow relative">
         <div
            ref={refToScroll}
            className="flex css-board-styled-scrollbar p-3 pb-0 gap-x-3 overflow-x-auto overflow-y-hidden absolute bottom-2 top-0 left-0 right-0"
         >
            <DndContext
               sensors={sensors}
               collisionDetection={closestCenter}
               onDragEnd={handleDragEnd}
               onDragStart={(e) => handleDragging(e)}
               onDragCancel={() => handleDragging()}
            >
               <SortableContext items={dndItems} strategy={horizontalListSortingStrategy}>
                  <div className="flex gap-x-3 relative box-border h-full pb-2">
                     <DragScrollPlaceholder
                        dndItemsCount={(sortedDndItems && sortedDndItems.length + 1) || 0}
                        refToDrag={refToDrag}
                     />
                     {sortedDndItems &&
                        sortedDndItems.length > 0 &&
                        sortedDndItems.map((phase) => (
                           <Phase
                              key={phase.id}
                              phaseData={phase}
                              className={phase.id === draggingId ? "opacity-0" : "opacity-100"}
                           />
                        ))}
                  </div>
               </SortableContext>
               <DragOverlay>
                  {draggingId ? (
                     <DragOverlayItem phaseData={findPhase(sortedDndItems, draggingId)} />
                  ) : null}
               </DragOverlay>
            </DndContext>
            <AddNewPhase
               finalPosition={sortedDndItems[sortedDndItems.length - 1]?.position || null}
            />
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

// const EditableTitle = styled(TextField)({
//    width: "100%",
//    "& .MuiInputBase-formControl": {
//       width: "100%",
//       padding: "5px 8px",
//       "& .MuiInputBase-input": {
//          width: "100%",
//          color: "var(--ht-regular-text-cl)",
//          fontWeight: 500,
//       },
//       "& .MuiOutlinedInput-notchedOutline": {
//          borderColor: "transparent",
//       },
//       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//          borderColor: "var(--ht-outline-cl)",
//       },
//    },
// })

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
