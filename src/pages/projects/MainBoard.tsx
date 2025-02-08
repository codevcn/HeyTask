import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setProject } from "../../redux/project/project-slice"
import { FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { Tooltip } from "@mui/material"
import { Phases } from "./Phases"
import type { TProjectData, TProjectMemberData } from "../../services/types"
import { checkFetchedState, measureTextWidth } from "../../utils/helpers"
import { TaskDetails } from "./TaskDetails/TaskDetails"
import { TaskFileDetails } from "./TaskDetails/TaskFileDetails"
import { useUserInProject } from "../../hooks/user"
import { AboutPhase } from "./Phase/AboutPhase"
import { ShareProject } from "./ShareProject/ShareProject"
import { checkUserPermission } from "../../configs/user-permissions"
import { ProjectMenu } from "./ProjectMenu/ProjectMenu"
import { EInternalEvents, eventEmitter } from "../../utils/events"
import { UserPreview } from "./UserPreview"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import { projectService } from "../../services/project-service"
import { LogoLoading } from "../../components/Loadings"
import { TProjectPageParams } from "../../utils/types"
import { useParams } from "react-router-dom"

type TEditableSectionProps = {
   projectData: TProjectData
   userInProject: TProjectMemberData
}

const EditableSection = ({ projectData, userInProject }: TEditableSectionProps) => {
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const { title } = projectData
   const titleInputRef = useRef<HTMLInputElement | null>(null)
   const dispatch = useAppDispatch()

   const quitEditing = (newTitle: string) => {
      if (newTitle && newTitle.length > 0) {
         dispatch(setProject({ ...projectData, title: newTitle }))
      }
      setIsEditing(false)
   }

   const catchEditingEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         quitEditing((e.target as HTMLTextAreaElement).value || "")
      }
   }

   const blurListTitleInput = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      quitEditing((e.target as HTMLTextAreaElement).value || title)
   }

   const editingTitleInput = () => {
      const titleInput = titleInputRef.current
      if (titleInput) {
         titleInput.style.width = `${measureTextWidth(titleInput.value, window.getComputedStyle(titleInput).font) + 20}px`
      }
   }

   const startToEditTitleInput = () => {
      if (checkUserPermission(userInProject.projectRole, "CRUD-project")) {
         editingTitleInput()
         setIsEditing(true)
      }
   }

   useEffect(() => {
      const input = titleInputRef.current
      if (input) {
         input.focus()
         input.select()
      }
   }, [isEditing])

   return (
      <>
         <div className="flex gap-x-3 items-center max-w-[calc(100%-100px)]">
            <div
               hidden={!isEditing}
               className="bg-phase-bgcl h-full rounded border-outline-cl border-solid border-2 max-w-full"
            >
               <input
                  defaultValue={title}
                  onBlur={blurListTitleInput}
                  onChange={editingTitleInput}
                  ref={titleInputRef}
                  onKeyDown={catchEditingEnter}
                  className="h-full max-w-full px-2 bg-transparent font-bold border-none outline-none text-base rounded"
               />
            </div>
            <div
               hidden={isEditing}
               onClick={startToEditTitleInput}
               className="border-none bg-transparent text-base font-bold max-w-full whitespace-nowrap truncate"
            >
               {title}
            </div>
            <Tooltip
               title="Click to star or unstar this board. Starred boards show up at the top of your boards list."
               arrow
            >
               <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
                  <StarOutlineIcon fontSize="small" />
               </button>
            </Tooltip>
         </div>
      </>
   )
}

type TStrangerViewportProps = {
   userInProject: TProjectMemberData
}

const StrangerViewport = ({ userInProject }: TStrangerViewportProps) => {
   const [loading, setLoading] = useState<boolean>(false)
   const projectId = useParams<TProjectPageParams>().projectId!

   const joinProject = () => {
      setLoading(true)
      projectService
         .joinProject(parseInt(projectId))
         .then(() => {
            toast.success("Request to join this project successfully")
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
         .finally(() => {
            setLoading(false)
         })
   }

   return (
      <div className="flex items-center justify-center grow bg-top-nav-bgcl">
         <div className="bg-top-nav-bgcl text-regular-text-cl p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold">This board is private.</h2>
            <p className="mt-2 text-modal-text-cl">
               Send a request to the project administrator to gain access.
            </p>

            <p className="mt-4">You are logged in as</p>
            <div className="mt-1 flex items-center space-x-3 border border-gray-600 p-3 rounded-lg">
               <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-xl font-semibold">
                  HH
               </div>
               <div>
                  <p className="font-medium">{userInProject.fullName}</p>
                  <p className="text-modal-text-cl text-sm">{userInProject.email}</p>
               </div>
            </div>

            <p className="mt-4 text-modal-text-cl text-sm">
               By requesting access, you agree to share your account information, including your
               email address, with the project administrators.
            </p>

            <button
               onClick={joinProject}
               className="flex justify-center mt-4 w-full bg-confirm-btn-bgcl hover:bg-confirm-btn-hover-bgcl text-black py-2 rounded-lg transition"
            >
               {loading ? (
                  <div className="m-auto h-[20px]">
                     <LogoLoading color="var(--ht-top-nav-bgcl)" size="small" />
                  </div>
               ) : (
                  <b>Request to join this project</b>
               )}
            </button>
         </div>
      </div>
   )
}

type THeaderProps = {
   userInProject: TProjectMemberData
   projectData: TProjectData
}

const Header = ({ userInProject, projectData }: THeaderProps) => {
   const openProjectMenu = () => {
      eventEmitter.emit(EInternalEvents.OPEN_PROJECT_MENU, true)
   }

   return (
      <header className="flex justify-between items-center text-white flex-wrap h-top-nav overflow-x-hidden gap-y-3 gap-x-5 py-3 px-5 bg-[#0000003d] backdrop-blur-sm w-full">
         {projectData && (
            <>
               <EditableSection projectData={projectData} userInProject={userInProject} />
               <div className="flex gap-x-3 items-center">
                  <ShareProject projectData={projectData} />
                  <button onClick={openProjectMenu} className="p-1 rounded-sm hover:bg-[#ffffff33]">
                     <MoreHorizIcon fontSize="small" />
                  </button>
               </div>
               <ProjectMenu />
            </>
         )}
      </header>
   )
}

export const MainBoard = () => {
   const { project } = useAppSelector(({ project }) => project)
   const userInProject = useUserInProject()
   const { fetchedList } = useAppSelector(({ project }) => project)

   return (
      userInProject &&
      (project ? (
         <div className="flex flex-col flex-1 text-regular-text-cl w-main-board">
            <Header userInProject={userInProject} projectData={project} />
            <Phases userInProject={userInProject} />
            <TaskDetails />
            <TaskFileDetails />
            <AboutPhase />
            <UserPreview />
         </div>
      ) : (
         checkFetchedState(fetchedList, "project") && (
            <StrangerViewport userInProject={userInProject} />
         )
      ))
   )
}
