import { useCallback, useState } from "react"
import { DndContext, closestCenter, DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import {
   SortableContext,
   arrayMove,
   horizontalListSortingStrategy,
   useSortable,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableChildItem({ id }: { id: string }) {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
   return (
      <div
         ref={setNodeRef}
         style={{
            transform: CSS.Transform.toString(transform),
            transition,
            padding: "8px",
            border: "1px solid #ccc",
            marginBottom: "4px",
            backgroundColor: "white",
            borderRadius: "4px",
         }}
         {...attributes}
         {...listeners}
      >
         {id}
      </div>
   )
}

const ParentList = ({
   parentListId,
   childList,
   title,
}: {
   parentListId: string
   childList: string[]
   title: string
}) => {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: parentListId,
   })
   return (
      <div
         ref={setNodeRef}
         style={{
            transform: CSS.Transform.toString(transform),
            transition,
            padding: "8px",
            border: "1px solid #ccc",
            marginBottom: "4px",
            backgroundColor: "white",
            borderRadius: "4px",
         }}
         {...attributes}
         {...listeners}
      >
         {/* ChildList */}
         <SortableContext items={childList} strategy={verticalListSortingStrategy}>
            <div>
               <h4>{title}</h4>
               {childList.map((id) => (
                  <SortableChildItem key={id} id={id} />
               ))}
            </div>
         </SortableContext>
      </div>
   )
}

export default function App() {
   const [listA, setListA] = useState(["A1", "A2", "A3"])
   const [listB, setListB] = useState(["B1", "B2", "B3"])
   const [parentList, setParentList] = useState(["big1", "big2"])

   const handleDragOver = useCallback(
      (event: DragOverEvent) => {
         const { active, over } = event

         // Nếu không có đối tượng được kéo hoặc nơi thả, kết thúc sớm.
         if (!active || !over) return

         const activeId = active.id as string // ID của item đang kéo
         const overId = over.id as string // ID của nơi va chạm
         console.log(">>> active id:", activeId)
         console.log(">>> over id:", overId)

         const activeInParentList = parentList.includes(activeId) // Kiểm tra xem item đang kéo có phải từ parent list
         const overInParentList = parentList.includes(overId) // Kiểm tra xem nơi va chạm có trong parent list

         // Nếu item kéo là từ parent list, chỉ xử lý va chạm với các item trong parent list
         if (activeInParentList && overInParentList) {
            console.log(">>> run this")
            // Logic sắp xếp các parent list
            const activeIndex = parentList.indexOf(activeId)
            const overIndex = parentList.indexOf(overId)
            if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
               const updatedParentList = [...parentList]
               updatedParentList.splice(activeIndex, 1)
               updatedParentList.splice(overIndex, 0, activeId)
               setParentList(updatedParentList)
            }
         }
      },
      [listA, listB, parentList],
   )

   return (
      <DndContext collisionDetection={closestCenter} onDragOver={handleDragOver}>
         <SortableContext items={parentList} strategy={horizontalListSortingStrategy}>
            <div style={{ display: "flex", gap: "16px" }}>
               <ParentList parentListId={parentList[0]} childList={listA} title="Parent List 1" />
               <ParentList parentListId={parentList[1]} childList={listB} title="Parent List 2" />
            </div>
         </SortableContext>
      </DndContext>
   )
}
