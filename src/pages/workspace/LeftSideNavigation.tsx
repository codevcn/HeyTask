import { useUser } from "../../hooks/user"
import { useAppSelector } from "../../hooks/redux"
import { Skeleton, styled } from "@mui/material"
import { useState } from "react"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import SettingsIcon from "@mui/icons-material/Settings"

export const drawerWidth = 260

export const LeftSideNavigation = () => {
   const { workspace } = useAppSelector(({ workspace }) => workspace)
   const user = useUser()!
   const [open, setOpen] = useState<boolean>(true)

   const handleOpenSideNavigation = (open: boolean) => {
      setOpen(open)
   }

   return (
      <div className="bg-[#1F2123] text-[#9fadbc] w-left-side-nav-width h-full">
         <div className="flex items-center justify-between gap-x-2 px-3 py-3 border-b border-divider-cl w-full">
            <div className="flex items-center gap-x-2">
               <img src={user.avatar} alt="User Avatar" className="h-[32px] w-[32px]" />
               {workspace ? (
                  <div className="font-semibold">
                     <span>{workspace.title}</span>
                  </div>
               ) : (
                  <StyledSkeleton height={32} width={150} />
               )}
            </div>
            <div
               onClick={() => handleOpenSideNavigation(false)}
               className="flex items-center justify-center p-2 hover:bg-hover-silver-bgcl cursor-pointer rounded h-[28px] w-[28px] overflow-hidden"
            >
               <ArrowLeftIcon fontSize="large" />
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
      </div>
   )
}

const StyledSkeleton = styled(Skeleton)({
   backgroundColor: "#ffffff24",
})
