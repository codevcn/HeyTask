import { useEffect } from "react"
import { useAppSelector } from "../hooks/redux"
import { workspaceService } from "../services/workspace-service"
import { useDispatch } from "react-redux"
import { setCustomization } from "../redux/workspace/workspace-slice"
import { toast } from "react-toastify"
import axiosErrorHandler from "../utils/axios-error-handler"

type TBackgroundProps = {
   children: JSX.Element
}

export const Background = ({ children }: TBackgroundProps) => {
   const { customization } = useAppSelector(({ workspace }) => workspace)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!customization) {
         workspaceService
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
                 }
               : {}
         }
         className="bg-blend-darken	bg-[#0000004d] h-full w-full css-background"
      >
         {children}
      </div>
   )
}
