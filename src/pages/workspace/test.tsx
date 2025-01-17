import { useState } from "react"
import {
   DndContext,
   closestCenter,
   MouseSensor,
   TouchSensor,
   useSensor,
   useSensors,
} from "@dnd-kit/core"
import {
   arrayMove,
   SortableContext,
   verticalListSortingStrategy,
   useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, Typography } from "@mui/material"

const SortableItem = ({ id }: { id: string }) => {
   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      marginBottom: "8px",
   }

   return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
         <Card>
            <CardContent>
               <Typography>{id}</Typography>
            </CardContent>
         </Card>
      </div>
   )
}

const DraggableList = () => {
   const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"])

   const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

   const handleDragEnd = (event: any) => {
      const { active, over } = event

      if (active.id !== over.id) {
         setItems((items) => {
            const oldIndex = items.indexOf(active.id)
            const newIndex = items.indexOf(over.id)

            return arrayMove(items, oldIndex, newIndex)
         })
      }
   }

   return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
         <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div style={{ width: "300px", margin: "0 auto" }}>
               {items.map((id) => (
                  <SortableItem key={id} id={id} />
               ))}
            </div>
         </SortableContext>
      </DndContext>
   )
}

export default DraggableList
