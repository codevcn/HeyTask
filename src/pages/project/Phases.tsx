import { FocusEvent, KeyboardEvent, LegacyRef, useEffect, useMemo, useState } from "react"
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

type TListProps = {
   phaseData: TPhaseData
   className?: string
}

const Phase = ({ phaseData, className }: TListProps) => {
   const { taskPreviews, title, id } = phaseData
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const dispatch = useAppDispatch()

   const quitEditing = (newTitle: string) => {
      if (newTitle && newTitle.length > 0) {
         dispatch(updateSinglePhase({ ...phaseData, title: newTitle }))
      }
      setIsEditing(false)
   }

   const catchEditingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         quitEditing((e.target as HTMLTextAreaElement).value || title)
      }
   }

   const blurListTitleInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      quitEditing((e.target as HTMLTextAreaElement).value || title)
   }

   return (
      <li
         style={{
            transform: CSS.Transform.toString(transform),
            transition,
         }}
         className={`flex relative m-0 h-fit max-h-full z-20 text-regular-text-cl ${className || ""}`}
      >
         <div className="flex flex-col bg-list-bgcl w-[272px] rounded-xl">
            <div
               ref={setNodeRef}
               {...attributes}
               {...listeners}
               className="flex justify-between text-[#B6C2CF] gap-x-2 p-2"
            >
               {isEditing ? (
                  <div className={`w-full`}>
                     <EditableTitle
                        multiline
                        maxRows={5}
                        defaultValue={title}
                        onKeyDown={catchEditingEnter}
                        variant="outlined"
                        autoFocus
                        onBlur={blurListTitleInput}
                        onMouseDown={(e) => e.stopPropagation()}
                     />
                  </div>
               ) : (
                  <p
                     onClick={() => setIsEditing(true)}
                     className="cursor-text text-base font-medium p-1 w-full m-0 break-words max-w-[calc(100%-28px-18px)]"
                  >
                     {title}
                  </p>
               )}
               <Tooltip title="List actions" arrow>
                  <button className="p-1 h-fit rounded-sm hover:bg-[#282F27]">
                     <MoreHorizIcon fontSize="small" />
                  </button>
               </Tooltip>
            </div>
            <TaskPreviews phaseId={id} taskPreviews={taskPreviews} />
         </div>
      </li>
   )
}

const AddNewPhase = () => {
   const [isAdding, setIsAdding] = useState<boolean>(false)
   const dispatch = useAppDispatch()

   const quitAdding = (title: string) => {
      if (title && title.length > 0) {
         dispatch(addNewPhase({ id: randomInteger(1, 1000), title, taskPreviews: null }))
      }
      setIsAdding(false)
   }

   const catchAddingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         quitAdding((e.target as HTMLTextAreaElement).value || "")
      }
   }

   const blurListTitleInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      quitAdding((e.target as HTMLTextAreaElement).value || "")
   }

   return (
      <div className="relative m-0 h-fit z-20 text-regular-text-cl min-w-[272px]">
         {isAdding ? (
            <div className="p-2 bg-list-bgcl rounded-xl">
               <EditableTitle
                  multiline
                  maxRows={5}
                  variant="outlined"
                  placeholder="Enter a title..."
                  autoFocus
                  onBlur={blurListTitleInput}
                  onKeyDown={catchAddingEnter}
               />
               <div className="flex mt-3 gap-x-2">
                  <button className="py-[6px] px-3 leading-none border-none rounded bg-[#579DFF] text-[#1D2125] font-medium text-sm">
                     Add Phase
                  </button>
                  <Tooltip title="Cancel adding new card.">
                     <button className="hover:bg-hover-silver-bgcl px-1 py-1 rounded">
                        <CloseIcon />
                     </button>
                  </Tooltip>
               </div>
            </div>
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

   const handleDrag = (e?: DragStartEvent) => {
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
         return dndItems.map((item) => phases.find((list) => list.id === item)!)
      }
      return []
   }, [dndItems, phases])

   const findList = (phases: TPhaseData[], listId: number): TPhaseData => {
      return phases.find((list) => list.id === listId)!
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
               onDragStart={(e) => handleDrag(e)}
               onDragCancel={() => handleDrag()}
            >
               <SortableContext items={dndItems} strategy={horizontalListSortingStrategy}>
                  <ul className="flex gap-x-3 relative box-border h-full pb-2">
                     <DragScrollPlaceholder
                        dndItemsCount={(sortedDndItems && sortedDndItems.length + 1) || 0}
                        refToDrag={refToDrag}
                     />
                     {sortedDndItems &&
                        sortedDndItems.length > 0 &&
                        sortedDndItems.map((list) => (
                           <Phase
                              key={list.id}
                              phaseData={list}
                              className={list.id === draggingId ? "opacity-0" : "opacity-100"}
                           />
                        ))}
                  </ul>
               </SortableContext>
               <DragOverlay>
                  {draggingId ? (
                     <Phase
                        key={draggingId}
                        phaseData={findList(sortedDndItems, draggingId)}
                        className="opacity-60"
                     />
                  ) : null}
               </DragOverlay>
            </DndContext>
            <AddNewPhase />
         </div>
      </div>
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
         fontWeight: 500,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
         borderColor: "#85B8FF",
      },
   },
})
