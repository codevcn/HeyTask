import { useAppSelector } from "../../hooks/redux"
import { Tooltip, Avatar } from "@mui/material"
import { useMemo, useState } from "react"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import SettingsIcon from "@mui/icons-material/Settings"
import { LogoLoading } from "../../components/Loadings"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import type { TProjectData, TProjectMemberData, TUserData } from "../../services/types"
import { EProjectRoles } from "../../utils/enums"
import { projectService } from "../../services/project-service"
import { toast } from "react-toastify"
import axiosErrorHandler from "../../utils/axios-error-handler"
import { NavLink } from "react-router-dom"
import { checkIfUserIsProjectMember } from "../../utils/helpers"

type TGuestViewportProps = {
   userData: TUserData
   projectId: number
}

const GuestViewport = ({ userData, projectId }: TGuestViewportProps) => {
   const [loading, setLoading] = useState<boolean>(false)

   const joinProject = () => {
      setLoading(true)
      projectService
         .joinProject(projectId)
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
      <div className="flex flex-col items-center m-auto text-sm text-modal-text-cl p-3">
         <p className="w-fit text-center">
            <span>This is </span>
            <b>{userData.fullName}</b>
            <span>'s project.</span>
            <span>You are not in this project.</span>
         </p>
         <button
            onClick={joinProject}
            className="p-2 text-top-nav-bgcl bg-confirm-btn-bgcl hover:bg-confirm-btn-hover-bgcl rounded mt-3"
         >
            {loading ? (
               <div className="h-[20px]">
                  <LogoLoading color="var(--ht-top-nav-bgcl)" />
               </div>
            ) : (
               <b>Request to join this project</b>
            )}
         </button>
      </div>
   )
}

type TCreatorViewportProps = {
   projectData: TProjectData
   onCloseNav: () => void
   userData: TUserData
}

const Nav = ({ projectData, onCloseNav, userData }: TCreatorViewportProps) => {
   const { members } = projectData

   const projectCreator = useMemo<TProjectMemberData>(() => {
      return members.find((member) => member.projectRole === EProjectRoles.ADMIN)!
   }, [members])

   return (
      <>
         <div className="flex items-center justify-between gap-x-2 px-3 py-3 border-b border-divider-cl w-full">
            <div className="flex items-center gap-x-2">
               <NavLink to={`/profiles/${projectCreator.id}`}>
                  <>
                     {projectCreator.avatar ? (
                        <Avatar
                           src={projectCreator.avatar}
                           alt="User Avatar"
                           sx={{ height: 32, width: 32 }}
                        />
                     ) : (
                        <Avatar alt="User Avatar" sx={{ height: 32, width: 32 }}>
                           {projectCreator.fullName[0]}
                        </Avatar>
                     )}
                  </>
               </NavLink>
               <div className="font-semibold truncate max-w-40">
                  <Tooltip title={projectData.title} arrow placement="bottom">
                     <span>{projectData.title}</span>
                  </Tooltip>
               </div>
            </div>
            <button
               onClick={onCloseNav}
               className="flex items-center justify-center p-2 hover:bg-hover-silver-bgcl cursor-pointer rounded h-[28px] w-[28px] overflow-hidden"
            >
               <ArrowLeftIcon fontSize="large" />
            </button>
         </div>
         {checkIfUserIsProjectMember(projectData.members, userData.id) ? (
            <>
               <div className="py-3 border-b border-divider-cl">
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
               </div>
               <div className="py-3 border-b border-divider-cl">
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
               </div>
               <div className="py-3">
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
                  <div className="flex items-center gap-x-2 text-regular-text-cl py-2 px-3 hover:bg-hover-silver-bgcl cursor-pointer">
                     <SettingsIcon sx={{ fontSize: 16 }} />
                     <span>Menu Item</span>
                  </div>
               </div>
            </>
         ) : (
            <GuestViewport userData={userData} projectId={projectData.id} />
         )}
      </>
   )
}

type TLeftSideNavigationProps = {
   userData: TUserData
}

export const LeftSideNavigation = ({ userData }: TLeftSideNavigationProps) => {
   const { project } = useAppSelector(({ project }) => project)
   const [open, setOpen] = useState<boolean>(true)

   return (
      <nav
         className={`${open ? "w-left-side-nav" : "w-[20px]"} bg-top-nav-bgcl text-regular-text-cl relative overflow-x-visible transition-[width] h-full border-r border-divider-cl`}
      >
         <div
            className={`${open ? "translate-x-0" : "-translate-x-[260px]"} flex flex-col h-full w-full overflow-y-hidden overflow-x-hidden transition-transform`}
         >
            {project ? (
               <Nav projectData={project} onCloseNav={() => setOpen(false)} userData={userData} />
            ) : (
               <LogoLoading className="m-auto" />
            )}
         </div>
         <button
            hidden={open}
            onClick={() => setOpen(true)}
            className="flex absolute top-4 right-0 translate-x-1/2 border-divider-cl z-20 p-[5px] border border-solid rounded-full bg-top-nav-bgcl hover:bg-hover-silver-bgcl"
         >
            <ArrowForwardIosIcon sx={{ fontSize: 14, margin: "auto" }} />
         </button>
      </nav>
   )
}
