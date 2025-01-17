import { KeyboardEvent, useEffect, useMemo, useState } from "react"
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
import { setLists } from "../../redux/workspace/workspace-slice"
import { workspaceService } from "../../services/workspace-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import type { TListData } from "../../services/types"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { styled, TextField, Tooltip } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useDragScroll } from "../../hooks/drag-scroll"
import { Cards } from "./Cards"

type TListProps = {
   listData: TListData
   className?: string
}

const List = ({ listData, className }: TListProps) => {
   const { cards, title, id } = listData
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
   const [listUpdate, setListUpdate] = useState<TListData>()
   const [isEditing, setIsEditing] = useState<boolean>(false)

   const catchEditingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         setListUpdate({ id, cards, title: (e.target as HTMLTextAreaElement).value || "" })
         setIsEditing(false)
      }
   }

   return (
      <li
         style={{
            transform: CSS.Transform.toString(transform),
            transition,
         }}
         className={`relative m-0 h-fit z-20 text-regular-text-cl ${className || ""}`}
      >
         <div className="bg-list-bgcl w-[272px] p-2 rounded-xl">
            <div
               ref={setNodeRef}
               {...attributes}
               {...listeners}
               className="flex justify-between items-center text-[#B6C2CF]"
            >
               {isEditing ? (
                  <div className={`w-full`}>
                     <EditableTitle
                        multiline
                        maxRows={5}
                        defaultValue={listUpdate ? listUpdate.title : title}
                        onKeyDown={catchEditingEnter}
                        variant="outlined"
                        autoFocus
                        onMouseDown={(e) => e.stopPropagation()}
                        onMouseUp={(e) => e.stopPropagation()}
                        onBlur={() => setIsEditing(false)}
                     />
                  </div>
               ) : (
                  <p
                     onClick={() => setIsEditing(true)}
                     className="cursor-text text-base font-medium p-1 w-full m-0"
                  >
                     {listUpdate ? listUpdate.title : title}
                  </p>
               )}
               <Tooltip title="List actions." arrow>
                  <button className="p-1 rounded-sm hover:bg-[#282F27]">
                     <MoreHorizIcon fontSize="small" />
                  </button>
               </Tooltip>
            </div>
            <Cards cards={cards} />
            <div className="flex items-center gap-x-2 mt-3 p-1 cursor-pointer hover:bg-[#282F27] rounded-md">
               <AddIcon fontSize="small" />
               <span className="text-sm">Add a card</span>
            </div>
         </div>
      </li>
   )
}

export const BoardCanvas = () => {
   const { lists } = useAppSelector(({ workspace }) => workspace)
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

   useEffect(() => {
      if (lists && lists.length > 0) {
         setDndItems(lists.map(({ id }) => id))
      }
   }, [lists])

   const getLists = () => {
      workspaceService
         .getLists()
         .then((res) => {
            dispatch(setLists(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   useEffect(() => {
      if (!lists) {
         getLists()
      }
   }, [])

   const sortedDndItems = useMemo<TListData[]>(() => {
      if (dndItems && dndItems.length > 0 && lists && lists.length > 0) {
         return dndItems.map((item) => lists.find((list) => list.id === item)!)
      }
      return []
   }, [dndItems, lists])

   const findList = (lists: TListData[], listId: number): TListData => {
      return lists.find((list) => list.id === listId)!
   }

   return (
      <DndContext
         sensors={sensors}
         collisionDetection={closestCenter}
         onDragEnd={handleDragEnd}
         onDragStart={(e) => handleDrag(e)}
         onDragCancel={() => handleDrag()}
      >
         <SortableContext items={dndItems} strategy={horizontalListSortingStrategy}>
            <ul
               ref={refToScroll}
               className="flex gap-x-2 p-3 relative overflow-x-auto overflow-y-hidden css-board-styled-scrollbar css-board-list box-border"
            >
               <div ref={refToDrag} className="absolute top-0 left-0 h-full z-10"></div>
               {sortedDndItems &&
                  sortedDndItems.length > 0 &&
                  sortedDndItems.map((list) => (
                     <List
                        key={list.id}
                        listData={list}
                        className={list.id === draggingId ? "opacity-0" : "opacity-100"}
                     />
                  ))}
            </ul>
         </SortableContext>
         <DragOverlay>
            {draggingId ? (
               <List
                  key={draggingId}
                  listData={findList(sortedDndItems, draggingId)}
                  className="opacity-60"
               />
            ) : null}
         </DragOverlay>
      </DndContext>
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
