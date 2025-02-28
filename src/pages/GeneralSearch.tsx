import { useCallback, useEffect, useRef, useState } from "react"
import { useDebounce } from "../hooks/debounce"
import { searchService } from "../services/search-service"
import { TGeneralSearchData } from "../services/types"
import { toast } from "react-toastify"
import axiosErrorHandler from "../utils/axios-error-handler"
import AssignmentIcon from "@mui/icons-material/Assignment"
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService"
import { LogoLoading } from "../components/Loadings"
import SearchOffIcon from "@mui/icons-material/SearchOff"
import { useUser } from "../hooks/user"
import SearchIcon from "@mui/icons-material/Search"
import WorkIcon from "@mui/icons-material/Work"

export const GeneralSearch = () => {
   const [startSearch, setStartSearch] = useState<boolean>(false)
   const debounce = useDebounce()
   const [searchRsult, setSearchResult] = useState<TGeneralSearchData>()
   const [loading, setLoading] = useState<boolean>(false)
   const searchcContainerRef = useRef<HTMLDivElement>(null)
   const user = useUser()!

   const handleSearch = useCallback(
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
         const keyword = e.target.value
         if (keyword && keyword.length > 0) {
            setLoading(true)
            searchService
               .generalSearch(keyword)
               .then((res) => {
                  setSearchResult(res)
               })
               .catch((error) => {
                  toast.error(axiosErrorHandler.handleHttpError(error).message)
               })
               .finally(() => {
                  setLoading(false)
               })
         } else {
            setSearchResult(undefined)
         }
      }, 400),
      [],
   )

   const handleMouseClickOnPage = (e: MouseEvent) => {
      const inputEle = searchcContainerRef.current
      if (inputEle && !inputEle.contains(e.target as Node)) {
         setStartSearch(false)
      }
   }

   useEffect(() => {
      document.addEventListener("mousedown", handleMouseClickOnPage)
      return () => {
         document.removeEventListener("mousedown", handleMouseClickOnPage)
      }
   }, [])

   const tasks = searchRsult?.tasks
   const phases = searchRsult?.phases
   const projects = searchRsult?.projects

   return (
      <div className="relative h-full">
         <div
            ref={searchcContainerRef}
            className={`${startSearch ? "w-[550px] border-outline-cl" : "w-[250px] border-regular-border-cl"} z-20 transition-[width] absolute right-0 -translate-y-1/2 top-1/2 border text-regular-text-cl rounded bg-regular-bgcl mr-2`}
         >
            <input
               type="text"
               onFocus={() => setStartSearch(true)}
               onChange={handleSearch}
               className="text-regular-text-cl bg-transparent hover:bg-hover-silver-bgcl outline-none px-2 py-1 pr-10 text-sm w-full rounded"
               placeholder="Enter task, phase, project title..."
            />
            <SearchIcon
               className="absolute top-1/2 right-2 -translate-y-1/2"
               color="inherit"
               fontSize="small"
            />
            {startSearch && (
               <div className="text-sm pt-4 pb-2 absolute top-[calc(100%+10px)] border-divider-cl shadow border left-0 bg-modal-popover-bgcl w-full rounded max-h-[400px] overflow-auto css-styled-vt-scrollbar">
                  {loading ? (
                     <div className="flex flex-col justify-center items-center w-full h-[250px] text-regular-text-cl">
                        <LogoLoading />
                        <p className="mt-8">Searching...</p>
                     </div>
                  ) : tasks && phases && projects ? (
                     tasks.length === 0 && phases.length === 0 && projects.length === 0 ? (
                        <div className="flex flex-col justify-center items-center gap-1 px-10 py-20 w-full text-regular-text-cl">
                           <SearchOffIcon sx={{ height: 50, width: 50 }} color="inherit" />
                           <p className="text-base font-bold text-center">
                              We couldn't find anything matching your search.
                           </p>
                           <p className="text-sm text-center">
                              Try again type task, phase, project title.
                           </p>
                        </div>
                     ) : (
                        <>
                           {searchRsult.tasks.length > 0 && (
                              <div className="mb-4">
                                 <h2 className="font-semibold mb-2 px-4">TASKS</h2>
                                 {searchRsult.tasks.map(({ id, title, project, phase }) => (
                                    <div
                                       key={id}
                                       className="flex items-center gap-1 p-2 px-4 hover:bg-hover-silver-bgcl cursor-pointer"
                                    >
                                       <AssignmentIcon sx={{ height: 36, width: 36 }} />
                                       <div>
                                          <p className="text-light-text-cl">{title}</p>
                                          <p className="text-xs">
                                             <span>{project.title}</span>
                                             <span>: </span>
                                             <span>{phase.title}</span>
                                          </p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                           {searchRsult.phases.length > 0 && (
                              <div className="mb-4">
                                 <h2 className="font-semibold mb-2 px-4">PHASES</h2>
                                 {searchRsult.phases.map(({ id, title, project }) => (
                                    <div
                                       key={id}
                                       className="flex items-center gap-1 p-2 px-4 hover:bg-hover-silver-bgcl cursor-pointer"
                                    >
                                       <HomeRepairServiceIcon sx={{ height: 36, width: 36 }} />
                                       <div>
                                          <p className="text-light-text-cl">{title}</p>
                                          <p className="text-xs">{project.title}</p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                           {searchRsult.projects.length > 0 && (
                              <div>
                                 <h2 className="font-semibold mb-2 px-4">PROJECTS</h2>
                                 {searchRsult.projects.map(({ id, title, background }) => (
                                    <div
                                       key={id}
                                       className="flex items-center gap-2 p-2 px-4 hover:bg-hover-silver-bgcl cursor-pointer"
                                    >
                                       {background ? (
                                          <img
                                             alt="Project background"
                                             className="w-8 h-8 rounded"
                                             src={background}
                                          />
                                       ) : (
                                          <div
                                             className="w-8 h-8 rounded"
                                             style={{
                                                backgroundImage:
                                                   "linear-gradient(to bottom, var(--ht-purple-from-ligr), var(--ht-pink-to-ligr))",
                                             }}
                                          ></div>
                                       )}
                                       <div>
                                          <p className="text-light-text-cl">{title}</p>
                                          <p className="text-xs">
                                             <span>From user: </span>
                                             <span>{user.fullName}</span>
                                          </p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </>
                     )
                  ) : (
                     <div className="flex p-10 gap-2 flex-col justify-center items-center h-[250px] w-full text-regular-text-cl">
                        <div className="flex gap-2">
                           <AssignmentIcon sx={{ height: 50, width: 50 }} color="inherit" />
                           <HomeRepairServiceIcon sx={{ height: 50, width: 50 }} color="inherit" />
                           <WorkIcon sx={{ height: 50, width: 50 }} color="inherit" />
                        </div>
                        <p className="text-base font-bold text-center">
                           Search your task, phase, project by typing title.
                        </p>
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}
