import { useAppSelector } from "../../hooks/redux"
import { Skeleton, styled, Tooltip, Avatar } from "@mui/material"
import { useState } from "react"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import SettingsIcon from "@mui/icons-material/Settings"
import { LogoLoading } from "../../components/Loadings"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { TUserData } from "../../services/types"

type TLeftSideNavigationProps = {
   userData: TUserData
}

export const LeftSideNavigation = ({ userData }: TLeftSideNavigationProps) => {
   const { project } = useAppSelector(({ project }) => project)
   const [open, setOpen] = useState<boolean>(true)

   const setNavPosition = (openNav: boolean): string => {
      if (openNav) {
         return "w-left-side-nav"
      }
      return "w-[20px]"
   }

   const setNavContentPosition = (openNav: boolean): string => {
      if (openNav) {
         return "translate-x-0"
      }
      return "-translate-x-[260px]"
   }

   return (
      <nav
         className={`bg-top-nav-bgcl text-regular-text-cl relative overflow-x-visible transition-[width] h-full border-r border-divider-bgcl ${setNavPosition(open)}`}
      >
         <div
            className={`flex flex-col h-full w-full transition-transform ${setNavContentPosition(open)}`}
         >
            {project ? (
               <>
                  <div className="flex items-center justify-between gap-x-2 px-3 py-3 border-b border-divider-bgcl w-full">
                     <div className="flex items-center gap-x-2">
                        {userData.avatar ? (
                           <Avatar
                              src={userData.avatar}
                              alt="User Avatar"
                              sx={{ height: 32, width: 32 }}
                           />
                        ) : (
                           <Avatar alt="User Avatar" sx={{ height: 32, width: 32 }}>
                              {userData.fullName[0]}
                           </Avatar>
                        )}
                        {project ? (
                           <div className="font-semibold truncate max-w-40">
                              <Tooltip title={project.title} arrow placement="bottom">
                                 <span>{project.title}</span>
                              </Tooltip>
                           </div>
                        ) : (
                           <StyledSkeleton height={32} width={150} />
                        )}
                     </div>
                     <button
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center p-2 hover:bg-hover-silver-bgcl cursor-pointer rounded h-[28px] w-[28px] overflow-hidden"
                     >
                        <ArrowLeftIcon fontSize="large" />
                     </button>
                  </div>
                  <div className="py-3 border-b border-divider-bgcl">
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
                  <div className="py-3 border-b border-divider-bgcl">
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
               <LogoLoading className="m-auto" />
            )}
         </div>
         <button
            hidden={open}
            onClick={() => setOpen(true)}
            className="flex absolute top-4 right-0 translate-x-1/2 border-divider-bgcl z-20 p-[5px] border border-solid rounded-full bg-top-nav-bgcl hover:bg-hover-silver-bgcl"
         >
            <ArrowForwardIosIcon sx={{ fontSize: 14, margin: "auto" }} />
         </button>
      </nav>
   )
}

const StyledSkeleton = styled(Skeleton)({
   backgroundColor: "#ffffff24",
})
