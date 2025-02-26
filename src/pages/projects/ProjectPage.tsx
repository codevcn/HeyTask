import { MainBoard } from "./MainBoard"
import { LeftSideNavigation } from "./LeftSideNavigation"
import { TopNavigation } from "../TopNavigation"
import { Background } from "./Background"
import { useEffect } from "react"
import { projectService } from "../../services/project-service"
import { useAppDispatch } from "../../hooks/redux"
import { useUser } from "../../hooks/user"
import { setUserInProject } from "../../redux/user/user-slice"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import { useParams } from "react-router-dom"
import { setProject, updateFetchedList } from "../../redux/project/project-slice"
import validator from "validator"
import type { TProjectPageParams } from "../../utils/types"

const ProjectPage = () => {
   const user = useUser()!
   const { projectId } = useParams<TProjectPageParams>()
   const dispatch = useAppDispatch()

   const fetchProjectData = async (projectId: number) => {
      projectService
         .getProjectData(projectId)
         .then((res) => {
            dispatch(setProject(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
         .finally(() => {
            dispatch(updateFetchedList(["project"]))
         })
   }

   const fetchUserInfoInProject = () => {
      projectService
         .getUserInfoInProject(user.id)
         .then((res) => {
            dispatch(setUserInProject(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   useEffect(() => {
      fetchUserInfoInProject()
      if (projectId) {
         if (validator.isInt(projectId)) {
            fetchProjectData(parseInt(projectId))
         } else {
            toast.error("Project id must be an integer")
         }
      }
   }, [])

   return (
      <div className="h-screen relative bg-gradient-to-b from-purple-from-ligr to-pink-to-ligr">
         <TopNavigation />
         <Background />
         <div className="w-full h-background bg-cover relative z-20">
            <section className="flex h-full">
               <LeftSideNavigation />
               <MainBoard />
            </section>
         </div>
      </div>
   )
}

export default ProjectPage
