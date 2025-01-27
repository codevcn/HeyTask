import { MainBoard } from "./MainBoard"
import { LeftSideNavigation } from "./LeftSideNavigation"
import { TopNavigation } from "../TopNavigation"
import { Background } from "../../components/Background"
import { useEffect } from "react"
import { projectService } from "../../services/project-service"
import { useAppDispatch } from "../../hooks/redux"
import { useUser } from "../../hooks/user"
import { setUserInProject } from "../../redux/user/user-slice"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"

const ProjectPage = () => {
   const user = useUser()!
   const dispatch = useAppDispatch()

   useEffect(() => {
      projectService
         .getUserInfoInProject(user.id)
         .then((res) => {
            dispatch(setUserInProject(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }, [user])

   return (
      <div className="h-screen bg-gradient-to-b from-[#7B61FF] to-[#FF61A6]">
         <TopNavigation />
         <Background>
            <section className="flex h-full">
               <LeftSideNavigation userData={user} />
               <MainBoard />
            </section>
         </Background>
      </div>
   )
}

export default ProjectPage
