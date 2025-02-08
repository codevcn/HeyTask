import { useEffect } from "react"
import { useAppSelector } from "../hooks/redux"
import { projectService } from "../services/project-service"
import { useDispatch } from "react-redux"
import { setCustomization } from "../redux/project/project-slice"
import { toast } from "react-toastify"
import axiosErrorHandler from "../utils/axios-error-handler"

type TBackgroundProps = {
   children: JSX.Element
}

export const Background = ({ children }: TBackgroundProps) => {
   const { customization } = useAppSelector(({ project }) => project)
   const dispatch = useDispatch()

   const fetchCustomization = () => {
      projectService
         .getCustomization(1)
         .then((res) => {
            dispatch(setCustomization(res))
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   useEffect(() => {
      fetchCustomization()
   }, [])

   return (
      <div
         className="w-full h-background bg-cover bg-[center_center] bg-blend-darken bg-[#0000004d]"
         style={{
            backgroundImage:
               customization && customization.background
                  ? `url(${customization.background})`
                  : "none",
         }}
      >
         {children}
      </div>
   )
}
