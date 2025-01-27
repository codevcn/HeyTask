import { Avatar, styled, TextField, Tooltip } from "@mui/material"
import type { TTaskPreviewData } from "../../services/types"
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
   DragOverEvent,
} from "@dnd-kit/core"
import { EInternalEvents, eventEmitter } from "../../utils/events"

type TTaskPreviewProps = {
   taskPreviewData: TTaskPreviewData
   className?: string
   phaseId: number
}

const Task = ({ taskPreviewData, className, phaseId }: TTaskPreviewProps) => {
   const { id, taskMembers, hasDescription, title } = taskPreviewData
   const firstMember = taskMembers?.at(0)
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

   const openTaskDetails = () => {
      eventEmitter.emit(EInternalEvents.OPEN_TASK_DETAILS_MODAL, true, id, phaseId)
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
               taskMembers: null,
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
   taskPreviewData: TTaskPreviewData
}

const OverlayItem = ({ taskPreviewData }: TOverlayItemProps) => {
   const { taskMembers, hasDescription, title } = taskPreviewData
   const firstMember = taskMembers?.at(0)

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
   taskPreviews: TTaskPreviewData[] | null
}

export const TaskPreviews = ({ taskPreviews, phaseId }: TTaskPreviewsProps) => {
   const [dndItems, setDndItems] = useState<TTaskPreviewData["id"][]>([])
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
            if (taskPreviews.length !== pre.length) {
               if (pre.length > 0) {
                  const newPhases: number[] = []
                  const filteredItems = pre.filter((dndItem) =>
                     taskPreviews.some((task) => task.id === dndItem),
                  )
                  for (const task of taskPreviews) {
                     if (!filteredItems.includes(task.id)) {
                        newPhases.push(task.id)
                     }
                  }
                  return [...filteredItems, ...newPhases]
               }
               return taskPreviews.map(({ id }) => id)
            }
            return pre
         })
      }
   }

   useEffect(() => {
      initDndItems()
   }, [taskPreviews])

   const sortedDndItems = useMemo<TTaskPreviewData[]>(() => {
      if (dndItems && dndItems.length > 0 && taskPreviews && taskPreviews.length > 0) {
         return dndItems.map((item) => taskPreviews.find((task) => task.id === item)!)
      }
      return []
   }, [dndItems])

   const findTaskPreview = (taskPreviews: TTaskPreviewData[], taskId: number): TTaskPreviewData => {
      return taskPreviews.find((task) => task.id === taskId)!
   }

   return (
      <>
         {/* <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            // onDragOver={handleDragOver}
         > */}
         <SortableContext items={dndItems} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col flex-[1_1_auto] css-tasks-styled-scrollbar overflow-y-auto min-h-[70px] py-1 px-2">
               {sortedDndItems && sortedDndItems.length > 0 ? (
                  sortedDndItems.map((task) => (
                     <Task
                        key={task.id}
                        taskPreviewData={task}
                        className={draggingId === task.id ? "opacity-0" : "opacity-100"}
                        phaseId={phaseId}
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
         {/* </DndContext> */}
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
