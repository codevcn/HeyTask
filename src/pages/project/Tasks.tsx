import { Avatar, styled, TextField, Tooltip } from "@mui/material"
import type { TTaskItemPreviewData } from "../../services/types"
import ReorderIcon from "@mui/icons-material/Reorder"
import AddIcon from "@mui/icons-material/Add"
import { KeyboardEvent, useEffect, useMemo, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { addNewTaskPreview } from "../../redux/project/project-slice"
import { useAppDispatch } from "../../hooks/redux"
import { randomInteger } from "../../utils/helpers"
import {
   arrayMove,
   SortableContext,
   useSortable,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
   closestCenter,
   DndContext,
   DragEndEvent,
   DragOverlay,
   DragStartEvent,
   MouseSensor,
   TouchSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core"
import { EInternalEvents, eventEmitter } from "../../utils/events"

type TTaskPreviewProps = {
   taskPreviewData: TTaskItemPreviewData
   className?: string
}

const Task = ({ taskPreviewData, className }: TTaskPreviewProps) => {
   const { id, firstMember, hasDescription, title } = taskPreviewData
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

   const openTaskDetails = () => {
      eventEmitter.emit(EInternalEvents.OPEN_PHASE_TASK_MODAL, true, id)
   }

   return (
      <div
         ref={setNodeRef}
         style={{
            transform: CSS.Transform.toString(transform),
            transition,
         }}
         {...attributes}
         {...listeners}
      >
         <div
            className={`bg-focused-textfield-bgcl cursor-pointer mb-2 rounded-lg py-2 px-3 pr-2 hover:outline outline-2 outline-white ${className || ""}`}
            onClick={openTaskDetails}
         >
            <h3 className="text-sm">{title}</h3>
            <div className="flex items-center justify-between mt-2">
               {hasDescription && (
                  <Tooltip title="This card has a description." arrow>
                     <div>
                        <ReorderIcon sx={{ fontSize: 16 }} />
                     </div>
                  </Tooltip>
               )}
               {firstMember && (
                  <div>
                     <Tooltip title={firstMember.fullName} arrow>
                        {firstMember.avatar ? (
                           <Avatar
                              alt="User Avatar"
                              src={firstMember.avatar}
                              sx={{ height: 24, width: 24 }}
                           />
                        ) : (
                           <Avatar sx={{ height: 24, width: 24 }}>{firstMember.fullName[0]}</Avatar>
                        )}
                     </Tooltip>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

type TAddNewTaskProps = {
   phaseId: number
   finalTaskPosition: number | null
}

const AddNewTask = ({ phaseId, finalTaskPosition }: TAddNewTaskProps) => {
   const [isAdding, setIsAdding] = useState<boolean>(false)
   const dispatch = useAppDispatch()

   const handleAddNewTask = (title?: string) => {
      if (title && title.length > 0) {
         dispatch(
            addNewTaskPreview({
               id: randomInteger(1, 1000),
               title,
               firstMember: null,
               hasDescription: false,
               phaseId,
               position: finalTaskPosition ? finalTaskPosition + 1 : 1,
            }),
         )
      }
      setIsAdding(false)
   }

   const submitAdding = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      handleAddNewTask(formData.get("title") as string)
   }

   const catchAddingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         handleAddNewTask((e.target as HTMLTextAreaElement).value)
      }
   }

   return (
      <div className="p-2">
         {isAdding ? (
            <form onSubmit={submitAdding} className="p-1 rounded-md bg-focused-textfield-bgcl">
               <EditableTitle
                  multiline
                  maxRows={5}
                  variant="outlined"
                  placeholder="Enter a title..."
                  autoFocus
                  onKeyDown={catchAddingEnter}
                  name="title"
               />
               <div className="flex mt-3 gap-x-2">
                  <button
                     type="submit"
                     className="py-[6px] px-3 leading-none border-none rounded bg-confirm-btn-bgcl text-[#1D2125] font-medium text-sm"
                  >
                     Add Task
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
               className="flex items-center w-full gap-x-2 p-1 bg-transparent border-none cursor-pointer hover:bg-[#282F27] rounded-md"
            >
               <AddIcon fontSize="small" />
               <span className="text-sm">Add a task</span>
            </button>
         )}
      </div>
   )
}

type TOverlayItemProps = {
   taskPreviewData: TTaskItemPreviewData
}

const OverlayItem = ({ taskPreviewData }: TOverlayItemProps) => {
   const { firstMember, hasDescription, title } = taskPreviewData

   return (
      <div className="bg-focused-textfield-bgcl cursor-pointer mb-2 rounded-lg py-2 px-3 pr-2 opacity-60 rotate-12">
         <h3 className="text-sm">{title}</h3>
         <div className="flex items-center justify-between mt-2">
            {hasDescription && (
               <Tooltip title="This card has a description." arrow>
                  <div>
                     <ReorderIcon sx={{ fontSize: 16 }} />
                  </div>
               </Tooltip>
            )}
            {firstMember && (
               <div>
                  <Tooltip title={firstMember.fullName} arrow>
                     {firstMember.avatar ? (
                        <Avatar
                           alt="User Avatar"
                           src={firstMember.avatar}
                           sx={{ height: 24, width: 24 }}
                        />
                     ) : (
                        <Avatar sx={{ height: 24, width: 24 }}>{firstMember.fullName[0]}</Avatar>
                     )}
                  </Tooltip>
               </div>
            )}
         </div>
      </div>
   )
}

type TTaskPreviewsProps = {
   phaseId: number
   taskPreviews: TTaskItemPreviewData[] | null
}

export const TaskPreviews = ({ taskPreviews, phaseId }: TTaskPreviewsProps) => {
   const [dndItems, setDndItems] = useState<number[]>([])
   const [draggingId, setDraggingId] = useState<number | null>(null)
   const sensors = useSensors(
      useSensor(MouseSensor, {
         activationConstraint: {
            delay: 200, // Thời gian giữ chuột (ms)
            tolerance: 5, // Số pixel di chuyển tối đa trước khi kích hoạt drag
         },
      }),
      useSensor(TouchSensor),
   )

   const handleDragStart = (e: DragStartEvent) => {
      setDraggingId(e.active.id as number)
      eventEmitter.emit(EInternalEvents.DROPPING_TASK_IN_PHASE, phaseId, "start-dropping")
   }

   const handleDragEnd = (e: DragEndEvent) => {
      const { active, over } = e
      if (over) {
         if (active.id !== over.id) {
            setDndItems((items) => {
               const oldIndex = items.indexOf(active.id as number)
               const newIndex = items.indexOf(over.id as number)
               return arrayMove(items, oldIndex, newIndex)
            })
         }
      }
      setDraggingId(null)
      eventEmitter.emit(EInternalEvents.DROPPING_TASK_IN_PHASE, phaseId, "end-dropping")
   }

   const handleDragCancel = () => {
      setDraggingId(null)
      eventEmitter.emit(EInternalEvents.DROPPING_TASK_IN_PHASE, phaseId, "end-dropping")
   }

   const initDndItems = () => {
      if (taskPreviews && taskPreviews.length > 0) {
         setDndItems((pre) => {
            if (pre && pre.length > 0) {
               const newTaskPreviews: number[] = []
               for (const taskPreview of taskPreviews) {
                  if (!pre.includes(taskPreview.id)) {
                     newTaskPreviews.push(taskPreview.id)
                  }
               }
               return [...pre, ...newTaskPreviews]
            }
            return taskPreviews.map(({ id }) => id)
         })
      }
   }

   useEffect(() => {
      initDndItems()
   }, [taskPreviews])

   const sortedDndItems = useMemo<TTaskItemPreviewData[]>(() => {
      if (dndItems && dndItems.length > 0 && taskPreviews && taskPreviews.length > 0) {
         return dndItems.map((item) => taskPreviews.find((task) => task.id === item)!)
      }
      return []
   }, [dndItems, taskPreviews])

   const findTaskPreview = (
      taskPreviews: TTaskItemPreviewData[],
      taskId: number,
   ): TTaskItemPreviewData => {
      return taskPreviews.find((task) => task.id === taskId)!
   }

   return (
      <>
         <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
         >
            <SortableContext items={dndItems} strategy={verticalListSortingStrategy}>
               <div className="flex flex-col flex-[1_1_auto] css-tasks-styled-scrollbar overflow-y-auto min-h-[70px] py-1 px-2">
                  {sortedDndItems && sortedDndItems.length > 0 ? (
                     sortedDndItems.map((task) => (
                        <Task
                           key={task.id}
                           taskPreviewData={task}
                           className={draggingId === task.id ? "opacity-0" : "opacity-100"}
                        />
                     ))
                  ) : (
                     <div className="text-regular-text-cl w-full text-center m-auto h-fit leading-tight">
                        This phase has no task now.
                     </div>
                  )}
               </div>
            </SortableContext>
            <DragOverlay>
               {draggingId ? (
                  <OverlayItem taskPreviewData={findTaskPreview(sortedDndItems, draggingId)} />
               ) : null}
            </DragOverlay>
         </DndContext>
         <AddNewTask
            phaseId={phaseId}
            finalTaskPosition={sortedDndItems[sortedDndItems.length - 1]?.position || null}
         />
      </>
   )
}

const EditableTitle = styled(TextField)({
   width: "100%",
   "& .MuiInputBase-formControl": {
      width: "100%",
      padding: "5px 8px",
      "& .MuiInputBase-input": {
         width: "100%",
         color: "var(--ht-regular-text-cl)",
         fontWeight: 500,
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "transparent",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
         borderColor: "transparent",
      },
   },
})
