import { projectService } from "../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setProject } from "../../redux/project/project-slice"
import { FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import GroupIcon from "@mui/icons-material/Group"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { Tooltip } from "@mui/material"
import { Phases } from "./Phases"
import type { TProjectData, TUserInProjectData } from "../../services/types"
import { measureTextWidth } from "../../utils/helpers"
import { useParams } from "react-router-dom"
import type { TProjectPageParams } from "../../utils/types"
import { TaskDetails } from "./TaskDetails/TaskDetails"
import { TaskFileDetails } from "./TaskDetails/TaskFileDetails"
import { useUserInProject } from "../../hooks/user"
import { AboutPhase } from "./Phase/AboutPhase"
import { ShareProject } from "./ShareProject"
import { EProjectRoles } from "../../utils/enums"

type TEditableSectionProps = {
   projectData: TProjectData
}

const EditableSection = ({ projectData }: TEditableSectionProps) => {
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
      editingTitleInput()
      setIsEditing(true)
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
                  className="h-full max-w-full px-2 bg-transparent text-white font-bold border-none outline-none text-base rounded"
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
            <Tooltip title="Change visibility.">
               <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
                  <GroupIcon fontSize="small" />
               </button>
            </Tooltip>
         </div>
      </>
   )
}

type THeaderProps = {
   userInProject: TUserInProjectData
}

const Header = ({ userInProject }: THeaderProps) => {
   const { project } = useAppSelector(({ project }) => project)
   const dispatch = useAppDispatch()
   const { projectId } = useParams<TProjectPageParams>()

   const getProjectHandler = async (projectId: number) => {
      projectService
         .getProjectData(projectId)
         .then((res) => {
            dispatch(setProject(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
         .finally(() => {})
   }

   useEffect(() => {
      if (!project && projectId) {
         getProjectHandler(parseInt(projectId))
      }
   }, [])

   return (
      <header className="flex justify-between items-center flex-wrap h-top-nav overflow-x-hidden gap-y-3 gap-x-5 py-3 px-5 bg-[#0000003d] backdrop-blur-sm w-full">
         {project && (
            <>
               <EditableSection projectData={project} />
               <div className="flex gap-x-3 items-center">
                  {userInProject.projectRole === EProjectRoles.ADMIN && (
                     <ShareProject projectData={project} />
                  )}
                  <button className="p-1 rounded-sm hover:bg-[#ffffff33]">
                     <MoreHorizIcon fontSize="small" />
                  </button>
               </div>
            </>
         )}
      </header>
   )
}

export const MainBoard = () => {
   const userInProject = useUserInProject()

   return (
      userInProject && (
         <div className="flex flex-col flex-1 text-white w-main-board">
            <Header userInProject={userInProject} />
            <Phases />
            <TaskDetails />
            <TaskFileDetails />
            <AboutPhase />
         </div>
      )
   )
}
