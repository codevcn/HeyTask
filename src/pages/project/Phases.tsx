import { KeyboardEvent, LegacyRef, useEffect, useState } from "react"
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
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { addNewPhase, setPhases } from "../../redux/project/project-slice"
import { projectService } from "../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import type { TPhaseData } from "../../services/types"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { styled, TextField, Tooltip } from "@mui/material"
import { useDragScroll } from "../../hooks/drag-scroll"
import { TaskPreviews } from "./TaskPreviews"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import { randomInteger } from "../../utils/helpers"
import { Phase } from "./Phase/Phase"

type TAddNewPhaseProps = {
   currentFinalPos: number | null
}

const AddNewPhase = ({ currentFinalPos }: TAddNewPhaseProps) => {
   const [isAdding, setIsAdding] = useState<boolean>(false)
   const dispatch = useAppDispatch()

   const handleAddNewPhase = (title: string) => {
      if (title && title.length > 0) {
         dispatch(
            addNewPhase({
               id: randomInteger(1, 1000),
               title,
               taskPreviews: null,
               position: currentFinalPos ? currentFinalPos + 1 : 1,
               description: null,
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
   const [dndItems, setDndItems] = useState<TPhaseData[]>([])
   const [refToScroll, refToDrag] = useDragScroll()
   const [draggingId, setDraggingId] = useState<number | null>(null)
   const dispatch = useAppDispatch()
   const dndItemIds: TPhaseData["id"][] = dndItems.map((phase) => phase.id)

   const handleDragging = (e?: DragStartEvent) => {
      if (e) {
         setDraggingId(e.active.id as number)
      } else {
         setDraggingId(null)
      }
   }

   const handleDragEnd = (e: DragEndEvent) => {
      const { over, active } = e
      if (over) {
         if (active.id !== over.id) {
            setDndItems((pre) => {
               return arrayMove(
                  pre,
                  pre.findIndex((phase) => phase.id === active.id),
                  pre.findIndex((phase) => phase.id === over.id),
               )
            })
         }
      }
      setDraggingId(null)
   }

   const initDndItems = () => {
      if (phases && phases.length > 0) {
         setDndItems((pre) => {
            if (phases.length !== pre.length) {
               if (pre.length > 0) {
                  const matchItems: TPhaseData[] = []
                  for (const dndItem of pre) {
                     const dndItemId = dndItem.id
                     const matchItem = phases.find((phase) => phase.id === dndItemId)
                     if (matchItem) matchItems.push(matchItem)
                  }
                  const newPhases: TPhaseData[] = []
                  for (const phase of phases) {
                     const phaseId = phase.id
                     if (!matchItems.some((dndItem) => dndItem.id === phaseId))
                        newPhases.push(phase)
                  }
                  return [...matchItems, ...newPhases]
               }
               return phases
            }
            return pre.map((dndItem) => phases.find((phase) => phase.id === dndItem.id)!)
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

   const findPhaseById = (phases: TPhaseData[], phaseId: number): TPhaseData => {
      return phases.find((phase) => phase.id === phaseId)!
   }

   return (
      <div className="grow relative">
         <div
            ref={refToScroll}
            className="flex css-phases-styled-hr-scrollbar p-3 pb-0 gap-x-3 overflow-x-auto overflow-y-hidden absolute bottom-2 top-0 left-0 right-0"
         >
            <DndContext
               sensors={sensors}
               collisionDetection={closestCenter}
               onDragEnd={handleDragEnd}
               onDragStart={(e) => handleDragging(e)}
               onDragCancel={() => handleDragging()}
            >
               <SortableContext items={dndItemIds} strategy={horizontalListSortingStrategy}>
                  <div className="flex gap-x-3 relative box-border h-full pb-2">
                     <DragScrollPlaceholder
                        dndItemsCount={(dndItems && dndItems.length + 1) || 0}
                        refToDrag={refToDrag}
                     />
                     {dndItems &&
                        dndItems.length > 0 &&
                        dndItems.map((phase) => (
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
                     <DragOverlayItem phaseData={findPhaseById(dndItems, draggingId)} />
                  ) : null}
               </DragOverlay>
            </DndContext>
            <AddNewPhase currentFinalPos={dndItems[dndItems.length - 1]?.position || null} />
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
