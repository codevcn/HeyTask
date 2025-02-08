import { Drawer, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { EInternalEvents, eventEmitter } from "../../../utils/events"
import { useAppSelector } from "../../../hooks/redux"
import CloseIcon from "@mui/icons-material/Close"
import LogoutIcon from "@mui/icons-material/Logout"
import { AboutProject } from "./AboutProject"
import { openFixedLoadingHandler, pureNavigator } from "../../../utils/helpers"
import { projectService } from "../../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../../utils/axios-error-handler"
import { ProjectMenuContext, useProjectMenuContext } from "./sharing"
import type { TProjectMenuActive } from "./sharing"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

type TTitleSectionProps = {
   onCloseMenu: () => void
}

const TitleSection = ({ onCloseMenu }: TTitleSectionProps) => {
   const { menuItemActive, setMenuItemActive } = useProjectMenuContext()

   const displayTitle = (active: TProjectMenuActive) => {
      switch (active) {
         case "about-project":
            return "About Project"
      }
      return "Project Menu"
   }

   return (
      <header className="relative py-2 px-3 w-full">
         {menuItemActive && (
            <button
               onClick={() => setMenuItemActive(undefined)}
               className="flex absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
            >
               <ArrowBackIosNewIcon className="text-modal-text-cl" sx={{ height: 18, width: 18 }} />
            </button>
         )}
         <h3 className="w-full text-center text-base font-bold text-regular-text-cl">
            {displayTitle(menuItemActive)}
         </h3>
         <button
            onClick={onCloseMenu}
            className="flex absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-modal-btn-hover-bgcl"
         >
            <CloseIcon className="text-regular-text-cl" fontSize="small" />
         </button>
      </header>
   )
}

type TContextProviderProps = {
   children: JSX.Element
}

const ContextProvider = ({ children }: TContextProviderProps) => {
   const [menuItemActive, setMenuItemActive] = useState<TProjectMenuActive>()

   return (
      <ProjectMenuContext.Provider value={{ menuItemActive, setMenuItemActive }}>
         {children}
      </ProjectMenuContext.Provider>
   )
}

export const ProjectMenu = () => {
   const [open, setOpen] = useState<boolean>(false)
   const projectData = useAppSelector(({ project }) => project.project!)

   useEffect(() => {
      eventEmitter.on(EInternalEvents.OPEN_PROJECT_MENU, (isOpen) => {
         setOpen(isOpen)
      })
      return () => {
         eventEmitter.off(EInternalEvents.OPEN_PROJECT_MENU)
      }
   }, [])

   const leaveProject = () => {
      openFixedLoadingHandler(true)
      projectService
         .leaveProject()
         .then(() => {
            pureNavigator("", true)
         })
         .catch((error) => {
            toast.error(axiosErrorHandler.handleHttpError(error).message)
         })
   }

   return (
      <StyledDrawer anchor="right" open={open} onClose={() => setOpen(false)} keepMounted>
         <ContextProvider>
            <section className="flex flex-col py-3 h-full">
               <TitleSection onCloseMenu={() => setOpen(false)} />
               <hr className="my-2" />
               <div className="css-styled-vt-scrollbar overflow-y-auto overflow-x-hidden text-modal-text-cl text-sm px-3 grow relative">
                  <AboutProject projectData={projectData} />
                  <div className="relative z-10">
                     <hr className="my-2" />
                     <button
                        onClick={leaveProject}
                        className="flex items-center gap-x-3 p-2 hover:bg-modal-btn-hover-bgcl rounded w-full mt-1"
                     >
                        <LogoutIcon fontSize="small" />
                        <div>
                           <p className="w-fit">Leave this project</p>
                        </div>
                     </button>
                  </div>
               </div>
            </section>
         </ContextProvider>
      </StyledDrawer>
   )
}

const StyledDrawer = styled(Drawer)({
   "&.MuiDrawer-root": {
      "& .MuiDrawer-paper": {
         width: 350,
         backgroundColor: "var(--ht-modal-board-bgcl)",
      },
   },
})
