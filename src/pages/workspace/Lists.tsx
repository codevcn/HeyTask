import { useEffect, useMemo, useState } from "react"
import {
   DndContext,
   closestCenter,
   MouseSensor,
   TouchSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
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
import ReorderIcon from "@mui/icons-material/Reorder"
import { Avatar, Tooltip } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useDragScroll } from "../../hooks/drag-scroll"

type TListProps = {
   id: string
   listData: TListData
}

const List = ({ id, listData }: TListProps) => {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
   const { cards, title } = listData

   return (
      <li
         ref={setNodeRef}
         className="m-0 h-fit z-20 text-regular-text-cl"
         style={{ transform: CSS.Transform.toString(transform), transition }}
         {...attributes}
         {...listeners}
      >
         <div className="bg-list-bgcl w-[272px] p-2 rounded-xl">
            <div className="flex justify-between items-center text-[#B6C2CF]">
               <h3 className="cursor-text text-base font-medium p-1">{title}</h3>
               <Tooltip title="List actions." arrow>
                  <button className="p-1 rounded-sm hover:bg-[#282F27]">
                     <MoreHorizIcon fontSize="small" />
                  </button>
               </Tooltip>
            </div>
            <div className="mt-2">
               {cards &&
                  cards.length > 0 &&
                  cards.map(({ firstMember, hasDescription, id, title }) => (
                     <div
                        key={id}
                        className="bg-[#22272B] mb-2 rounded-lg py-2 px-3 pr-2 hover:outline outline-2 outline-white"
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
                                       <Avatar sx={{ height: 24, width: 24 }}>
                                          {firstMember.fullName[0]}
                                       </Avatar>
                                    )}
                                 </Tooltip>
                              </div>
                           )}
                        </div>
                     </div>
                  ))}
            </div>
            <div className="flex items-center gap-x-2 mt-3 p-1 hover:bg-[#282F27] rounded-md">
               <AddIcon fontSize="small" />
               <span className="text-sm">Add a card</span>
            </div>
         </div>
      </li>
   )
}

export const BoardCanvas = () => {
   const { lists } = useAppSelector(({ workspace }) => workspace)
   const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
   const dispatch = useAppDispatch()
   const [dndItems, setDndItems] = useState<string[]>([])
   const [refToScroll, refToDrag] = useDragScroll()

   const handleDragEnd = (e: DragEndEvent) => {
      const { over } = e
      if (over) {
         const { active } = e
         if (active.id !== over.id) {
            setDndItems((items) => {
               return arrayMove(
                  items,
                  items.indexOf(active.id as string),
                  items.indexOf(over.id as string),
               )
            })
         }
      }
   }

   useEffect(() => {
      if (lists && lists.length > 0) {
         setDndItems(lists.map(({ id }) => setDndItemId(id)))
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

   const setDndItemId = (listId: number): string => `list-${listId}`

   const sortedDndItems = useMemo<TListData[]>(() => {
      if (dndItems && dndItems.length > 0 && lists && lists.length > 0) {
         return dndItems.map((item) => lists.find((list) => setDndItemId(list.id) === item)!)
      }
      return []
   }, [dndItems, lists])

   return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
         <SortableContext items={dndItems} strategy={horizontalListSortingStrategy}>
            <ul
               ref={refToScroll}
               className="flex gap-x-2 p-3 relative overflow-x-auto overflow-y-hidden css-board-styled-scrollbar css-board-list box-border"
            >
               <div ref={refToDrag} className="absolute top-0 left-0 w-full h-full z-10"></div>
               {sortedDndItems &&
                  sortedDndItems.length > 0 &&
                  sortedDndItems.map((list) => (
                     <List key={list.id} id={setDndItemId(list.id)} listData={list} />
                  ))}
            </ul>
         </SortableContext>
      </DndContext>
   )
}
