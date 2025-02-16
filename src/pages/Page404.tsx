import { useEffect, useState } from "react"

const ChildC = ({ state }: { state: number }) => {
   const todo = () => {
      console.log(">>> state:", state)
   }

   useEffect(() => {
      todo()
   }, [])

   return (
      <button onClick={todo}>
         <span>Click</span>
         <span> </span>
         <span>{state}</span>
      </button>
   )
}

export default function page() {
   const [state, setState] = useState<number>(-1)

   const todo = () => {
      setState((pre) => pre + 1)
   }

   const todo2 = () => {
      console.log(">>> pre:", state)
   }

   return (
      <div>
         <ChildC state={state} />
         <br />
         <button onClick={todo}>Test</button>
         <br />
         <button onClick={todo2}>demo</button>
      </div>
   )
}
