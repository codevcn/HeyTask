import { LogoLoading } from "../components/Loadings"

export default function page() {
   return (
      <div className="max-w-md mx-auto">
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Notifications</h1>
            <div className="flex items-center space-x-2">
               <span>Only show unread</span>
               <input type="checkbox" checked className="toggle-checkbox" />
               <i className="fas fa-ellipsis-v text-gray-400"></i>
            </div>
         </div>
         <button className="text-blue-500 mb-4">Mark all as read</button>
         <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg relative">
               <div className="flex items-center space-x-2 mb-2">
                  <img
                     src="https://placehold.co/32x32"
                     alt="Personal CodeVCN logo"
                     className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold">Personal CodeVCN</span>
               </div>
               <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                     HH
                  </div>
                  <div>
                     <span className="font-semibold">Hoa Ho</span>
                     <span>wants to join the Workspace</span>
                     <span className="text-blue-500">Personal CodeVCN</span>.
                     <div className="text-gray-400 text-sm">Feb 6, 2025, 5:41 PM</div>
                  </div>
               </div>
               <button className="bg-gray-700 text-white py-1 px-3 rounded">
                  Review pending requests
               </button>
               <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg relative">
               <div className="flex items-center space-x-2 mb-2">
                  <img
                     src="https://placehold.co/32x32"
                     alt="App interface sample"
                     className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold">Mẫu giao diện của App</span>
               </div>
               <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full">
                     <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div>
                     <span className="text-red-500">Feb 5</span>
                  </div>
               </div>
               <div className="text-gray-400 text-sm mb-2">blog team web: Concepts &amp; Notes</div>
               <div className="text-gray-400 text-sm">Reminder: Was due Feb 5, 2025, 3:16 PM</div>
               <div className="text-gray-400 text-sm">Feb 4, 2025, 3:16 PM</div>
               <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
         </div>
      </div>
   )
}
