import { useState } from "react"

export default function App() {
   console.log(">>> run re-render at APP")
   const [data, setData] = useState<string>()
   return (
      <div className="bg-gray-900 text-white p-6 rounded-lg w-80">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filter</h2>
            <button className="text-gray-400 hover:text-gray-200">
               <i className="fas fa-times"></i>
            </button>
         </div>
         <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="keyword">
               Keyword
            </label>
            <input
               className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-300 placeholder-gray-500"
               id="keyword"
               placeholder="Enter a keyword..."
               type="text"
            />
            <p className="text-xs text-gray-500 mt-1">Search cards, members, labels, and more.</p>
         </div>
         <div>
            <h3 className="text-sm font-semibold mb-2">Members</h3>
            <div className="flex items-center mb-2">
               <input
                  className="form-checkbox h-4 w-4 text-blue-600 bg-gray-800 border-gray-700 rounded"
                  id="no-members"
                  type="checkbox"
               />
               <label className="ml-2 text-sm flex items-center" htmlFor="no-members">
                  <i className="fas fa-user text-gray-400"></i>
                  <span className="ml-2">No members</span>
               </label>
            </div>
            <div className="flex items-center mb-2">
               <input
                  className="form-checkbox h-4 w-4 text-blue-600 bg-gray-800 border-gray-700 rounded"
                  id="cards-assigned"
                  type="checkbox"
               />
               <label className="ml-2 text-sm flex items-center" htmlFor="cards-assigned">
                  <img
                     alt="Profile picture of a member with a red hat"
                     className="w-5 h-5 rounded-full"
                     height="20"
                     src="https://storage.googleapis.com/a1aa/image/RzZ9oGWXNRmMNtrAZjDDBGfRvrKD83A-nda8wqqwCQI.jpg"
                     width="20"
                  />
                  <span className="ml-2">Cards assigned to me</span>
               </label>
            </div>
            <div className="flex items-center">
               <input
                  className="form-checkbox h-4 w-4 text-blue-600 bg-gray-800 border-gray-700 rounded"
                  id="select-members"
                  type="checkbox"
               />
               <label className="ml-2 text-sm" htmlFor="select-members">
                  Select members
               </label>
            </div>
         </div>
      </div>
   )
}
