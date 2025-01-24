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

   useEffect(() => {
      if (!customization) {
         projectService
            .getCustomization(1)
            .then((res) => {
               dispatch(setCustomization(res))
            })
            .catch((error) => {
               toast.error(axiosErrorHandler.handleHttpError(error).message)
            })
      }
   }, [])

   return (
      <div
         style={
            customization
               ? {
                    backgroundImage: `url(${customization.background})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundBlendMode: "darken",
                    backgroundColor: "#0000004d",
                 }
               : { backgroundColor: "transparent" }
         }
         className="w-full h-background"
      >
         {children}
      </div>
   )
}
