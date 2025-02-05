import { useState } from "react"

export default function App() {
   console.log(">>> run re-render at APP")
   const [data, setData] = useState<string>()
   return (
      <div className={`${data || ""} bg-black`}>
         <h2 className="text-regular-text-cl">app testing</h2>
         <button
            onClick={() => {
               setData("bg-pink-300")
            }}
            className="text-regular-text-cl"
         >
            click me
         </button>
      </div>
   )
}
