import { useCallback, useState } from "react"
import { DndContext, closestCenter, DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableItem({ id }: { id: string }) {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: "8px",
      border: "1px solid #ccc",
      marginBottom: "4px",
      backgroundColor: "white",
      borderRadius: "4px",
   }

   return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
         {id}
      </div>
   )
}

export default function page404() {
   const [listA, setListA] = useState(["A1", "A2", "A3"])
   const [listB, setListB] = useState(["B1", "B2", "B3"])

   const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
         const { active, over } = event

         if (!over) return

         const activeList = listA.includes(active.id as string) ? listA : listB
         const overList = listA.includes(over.id as string) ? listA : listB

         // Nếu kéo trong cùng 1 danh sách, chỉ cần sắp xếp lại
         if (activeList === overList) {
            const activeIndex = activeList.indexOf(active.id as string)
            const overIndex = overList.indexOf(over.id as string)

            const updatedList = arrayMove(activeList, activeIndex, overIndex)

            if (activeList === listA) {
               setListA(updatedList)
            } else {
               setListB(updatedList)
            }
         } else {
            // Nếu kéo giữa 2 danh sách
            const activeIndex = activeList.indexOf(active.id as string)
            activeList.splice(activeIndex, 1)

            const overIndex = overList.indexOf(over.id as string)
            overList.splice(overIndex + 1, 0, active.id as string)

            setListA([...listA])
            setListB([...listB])
         }
      },
      [listA, listB],
   )

   const handleDragOver = useCallback(
      (event: DragOverEvent) => {
         const { active, over } = event

         if (!over) return

         const activeList = listA.includes(active.id as string) ? listA : listB
         const overList = listA.includes(over.id as string) ? listA : listB

         // Nếu kéo trong cùng 1 danh sách, chỉ cần sắp xếp lại
         if (activeList === overList) {
            const activeIndex = activeList.indexOf(active.id as string)
            const overIndex = overList.indexOf(over.id as string)

            const updatedList = arrayMove(activeList, activeIndex, overIndex)

            if (activeList === listA) {
               setListA(updatedList)
            } else {
               setListB(updatedList)
            }
         } else {
            // Nếu kéo giữa 2 danh sách
            const activeIndex = activeList.indexOf(active.id as string)
            activeList.splice(activeIndex, 1)

            const overIndex = overList.indexOf(over.id as string)
            overList.splice(overIndex + 1, 0, active.id as string)

            setListA([...listA])
            setListB([...listB])
         }
      },
      [listA, listB],
   )

   return (
      <DndContext collisionDetection={closestCenter} onDragOver={handleDragOver}>
         <div style={{ display: "flex", gap: "16px" }}>
            <SortableContext items={listA}>
               <div>
                  <h4>List A</h4>
                  {listA.map((id) => (
                     <SortableItem key={id} id={id} />
                  ))}
               </div>
            </SortableContext>

            <SortableContext items={listB}>
               <div>
                  <h4>List B</h4>
                  {listB.map((id) => (
                     <SortableItem key={id} id={id} />
                  ))}
               </div>
            </SortableContext>
         </div>
      </DndContext>
   )
}
